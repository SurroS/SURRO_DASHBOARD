const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_MAX_RETRIES = 2;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
  getAuthToken?: () => string | undefined;
  onRequest?: (info: { id: string; url: string; init: RequestInit }) => void;
  onResponse?: (info: {
    id: string;
    url: string;
    status: number;
    durationMs: number;
  }) => void;
}

export interface ApiRequestOptions<TBody = unknown> {
  query?: Record<string, string | number | boolean | undefined>;
  body?: TBody;
  headers?: HeadersInit;
  timeoutMs?: number;
  maxRetries?: number;
  signal?: AbortSignal;
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private getAuthToken?: () => string | undefined;
  private onRequest?: ApiClientConfig["onRequest"];
  private onResponse?: ApiClientConfig["onResponse"];

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.defaultHeaders = config.defaultHeaders ?? {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    this.getAuthToken = config.getAuthToken;
    this.onRequest = config.onRequest;
    this.onResponse = config.onResponse;
  }

  async get<TResponse>(
    path: string,
    options?: ApiRequestOptions
  ): Promise<TResponse> {
    return this.request<TResponse>("GET", path, options);
  }

  async post<TResponse, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>
  ): Promise<TResponse> {
    return this.request<TResponse>("POST", path, options);
  }

  async put<TResponse, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>
  ): Promise<TResponse> {
    return this.request<TResponse>("PUT", path, options);
  }

  async patch<TResponse, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>
  ): Promise<TResponse> {
    return this.request<TResponse>("PATCH", path, options);
  }

  async delete<TResponse>(
    path: string,
    options?: ApiRequestOptions
  ): Promise<TResponse> {
    return this.request<TResponse>("DELETE", path, options);
  }

  private buildUrl(path: string, query?: ApiRequestOptions["query"]): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const fullPath = `${this.baseUrl}${normalizedPath}`;

    // Check if fullPath is absolute
    const isAbsolute =
      fullPath.startsWith("http://") || fullPath.startsWith("https://");

    // Use a dummy base for relative URLs to allow URL object construction
    const base = isAbsolute ? undefined : "http://localhost";
    const url = new URL(fullPath, base);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value === undefined) return;
        url.searchParams.set(key, String(value));
      });
    }

    // If we used a dummy base, return relative path
    if (!isAbsolute) {
      return url.pathname + url.search;
    }

    return url.toString();
  }

  private async request<TResponse, TBody = unknown>(
    method: HttpMethod,
    path: string,
    options: ApiRequestOptions<TBody> = {}
  ): Promise<TResponse> {
    const {
      body,
      headers,
      query,
      timeoutMs = DEFAULT_TIMEOUT_MS,
      maxRetries = DEFAULT_MAX_RETRIES,
      signal,
    } = options;

    const url = this.buildUrl(path, query);
    const requestId = `${method}:${url}:${Date.now()}`;

    const init: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      signal,
    };

    if (body !== undefined && method !== "GET" && method !== "DELETE") {
      init.body = typeof body === "string" ? body : JSON.stringify(body);
    }

    const token = this.getAuthToken?.();
    if (token) {
      (init.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }
    (init.headers as Record<string, string>)["X-Request-ID"] = requestId;

    let attempt = 0;
    const startTime = Date.now();

    while (true) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      const combinedSignal = this.mergeSignals(signal, controller.signal);

      try {
        const attemptInit = { ...init, signal: combinedSignal };
        this.onRequest?.({ id: requestId, url, init: attemptInit });

        const response = await fetch(url, attemptInit);
        clearTimeout(timeout);

        const duration = Date.now() - startTime;
        this.onResponse?.({
          id: requestId,
          url,
          status: response.status,
          durationMs: duration,
        });

        if (!response.ok) {
          if (this.shouldRetry(response.status) && attempt < maxRetries) {
            attempt++;
            await this.delay(this.backoffDelay(attempt));
            continue;
          }

          const errorBody = await this.safeParseJson(response);
          throw new ApiError(
            `Request failed with status ${response.status}`,
            response.status,
            errorBody
          );
        }

        return (await this.safeParseJson(response)) as TResponse;
      } catch (error) {
        clearTimeout(timeout);

        if (
          error instanceof ApiError ||
          attempt >= maxRetries ||
          !this.isRetryableError(error)
        ) {
          throw error;
        }

        attempt++;
        await this.delay(this.backoffDelay(attempt));
      }
    }
  }

  private mergeSignals(signalA?: AbortSignal, signalB?: AbortSignal) {
    if (!signalA) return signalB;
    if (!signalB) return signalA;

    const controller = new AbortController();

    const abort = (signal: AbortSignal) => {
      if (signal.aborted) {
        controller.abort(signal.reason);
      } else {
        signal.addEventListener("abort", () => controller.abort(signal.reason));
      }
    };

    abort(signalA);
    abort(signalB);

    return controller.signal;
  }

  private shouldRetry(status: number) {
    return status >= 500 || status === 429;
  }

  private isRetryableError(error: unknown) {
    if (error instanceof ApiError) return false;
    if (typeof error !== "object" || !error) return false;
    return "name" in error && error.name === "AbortError" ? false : true;
  }

  private backoffDelay(attempt: number) {
    return Math.min(1000 * 2 ** (attempt - 1), 5000);
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async safeParseJson(response: Response) {
    const text = await response.text();
    if (!text) return undefined;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
}

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const apiClient = new ApiClient({
  baseUrl: "/api",
  getAuthToken: () => {
    // Try to get token from document.cookie for direct API calls (client-side only)
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";");
      const authToken = cookies.find((cookie) =>
        cookie.trim().startsWith("authToken=")
      );
      return authToken ? authToken.split("=")[1] : undefined;
    }
    // Server-side: no access to browser cookies
    return undefined;
  },
  onRequest: ({ id, url, init }) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[api][request]", { id, url, init });
    }
  },
  onResponse: ({ id, url, status, durationMs }) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[api][response]", { id, url, status, durationMs });
    }
  },
});
