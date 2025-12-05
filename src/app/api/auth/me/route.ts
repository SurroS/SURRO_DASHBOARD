import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/jwt";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    // Decode JWT and extract user with role mapping applied
    const user = getUserFromToken(token);

    return NextResponse.json({ authenticated: true, user });
  } catch (error) {
    console.error("Auth check decode error:", error);
    // If token is malformed or cannot be parsed, treat as unauthenticated
    return NextResponse.json(
      { authenticated: false, error: "Invalid token" },
      { status: 401 }
    );
  }
}
