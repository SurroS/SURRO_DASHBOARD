import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// This proxy handles all requests to /api/... that are NOT auth/login or auth/logout
// It forwards them to the external API with the auth token attached.

async function proxyRequest(
  request: NextRequest,
  params: { params: { path: string[] } }
) {
  // Get the path after /api
  // params.path is an array, e.g. ['v1', 'users']
  const path = params.params.path.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : "";

  const targetUrl = `${
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.surrosantara.space"
  }/api/${path}${queryString}`;

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  const headers = new Headers(request.headers);
  // Remove host to avoid conflicts
  headers.delete("host");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const body = request.body ? request.body : null;
    // Note: passing the request body stream directly
    // We need to be careful with methods. GET/HEAD have no body.
    const isBodyMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(
      request.method
    );

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
      body: isBodyMethod ? body : undefined,
      // @ts-expect-error - duplex is required for streaming bodies in recent Node/Next versions
      duplex: "half",
    });

    // Forward response
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(request, context);
}
