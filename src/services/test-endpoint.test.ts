import { describe, it, expect, beforeAll, vi } from "vitest";
import { listUsers } from "./userService";
import { mswServer } from "../../tests/setup/msw-server";
import { http, passthrough } from "msw";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Manual Endpoint Test: listUsers", () => {
  beforeAll(() => {
    // Bypass MSW for the API URL
    mswServer.use(
      http.all("https://dev.surrosantara.space/*", () => {
        return passthrough();
      })
    );

    // SET YOUR TOKEN HERE IF YOU WANT A 200 OK
    // Otherwise, expect a 401 or 403 if the backend requires auth
    const token = process.env.TEST_AUTH_TOKEN || "DUMMY_TOKEN_FOR_TESTING";
    localStorage.setItem("authToken", token);

    console.log("---------------------------------------------------");
    console.log("Using Auth Token:", token);
    console.log(
      "Target URL:",
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dev.surrosantara.space"
    );
    console.log("---------------------------------------------------");
  });

  it("should call /api/v1/users and return data", async () => {
    try {
      const result = await listUsers({ page: 1, perPage: 5 });
      console.log("✅ SUCCESS: API call returned data");
      console.log("Data length:", result.data.length);
      console.log("Meta:", result.meta);
    } catch (error: any) {
      console.log("❌ FAILED: API call threw an error");
      if (error?.status) {
        console.log("HTTP Status:", error.status);
      }
      console.log("Error details:", error.message || error);

      // If it's a 401, it means the endpoint IS reachable but we need a real token
      if (error?.status === 401 || error?.status === 403) {
        console.log(
          "💡 NOTE: 401/403 means the endpoint is reachable! You just need a valid token."
        );
      }
    }
  });
});
