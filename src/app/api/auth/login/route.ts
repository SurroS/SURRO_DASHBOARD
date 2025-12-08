import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwtPayload, mapUserRole } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.surrosantara.space";
    const apiUrl = `${baseUrl}/api/v1/auth/admin/login`;

    let response;
    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (fetchError) {
      throw fetchError;
    }

    let data;
    try {
      data = await response.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid response from server" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Authentication failed" },
        { status: response.status }
      );
    }

    // Extract token and user data
    const token = data.token || data.accessToken || data.data?.token;

    // If the backend response doesn't include full user details, try to extract them from the token
    const user = data.user || data.data?.user || {};

    // Fallback: Decode token payload if user role is missing
    if (!user.role) {
      try {
        const payload = decodeJwtPayload(token);
        user.id = user.id || payload.sub || payload.id;
        user.email = user.email || payload.email;
        user.role = payload.role;
      } catch {
        // Ignore decode errors
      }
    }

    // Apply role mapping
    user.role = mapUserRole(user.role);

    // Set HttpOnly Cookie
    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day (adjust as needed)
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("[login] Login route error:", error);
    console.error(
      "[login] Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    console.error("[login] Error type:", typeof error);
    console.error(
      "[login] Error message:",
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
