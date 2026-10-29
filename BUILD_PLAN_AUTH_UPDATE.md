# Auth Update Build Plan

This plan outlines the steps to update the authentication flow to use the real `/api/v1/auth/admin/login` endpoint, implement secure token storage (using HttpOnly cookies via a Next.js proxy), and handle role mapping.

## 1. Architecture: Secure Token Storage (Proxy Pattern)

To meet industry standards for token security, we will not store the access token in `localStorage` (which is vulnerable to XSS). Instead, we will implement a **Next.js API Route Proxy**.

- **Flow**: Client `POST /api/login` (Internal) → Next.js Server `POST /api/v1/auth/admin/login` (External) → Next.js Server sets `HttpOnly` Cookie → Client (Success).

- [ ] **Create Proxy Route**: `src/app/api/auth/login/route.ts`

  - Receive `email` and `password` from client.
  - Forward request to `${NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/admin/login`.
  - Handle response:
    - If success: Set `authToken` as an `HttpOnly`, `Secure`, `SameSite=Strict` cookie.
    - Return user details (excluding token) to client.
  - Error handling: Forward upstream errors.

- [ ] **Create Logout Route**: `src/app/api/auth/logout/route.ts`
  - Clear the `authToken` cookie.

## 2. Frontend: Update Auth Service

- [ ] **Modify `src/lib/auth.ts`**:
  - Remove `localStorage.setItem("authToken", ...)` logic.
  - Update `login` function to call the new internal proxy: `apiClient.post("/api/auth/login", ...)`.
  - Update `logout` function to call `apiClient.post("/api/auth/logout")`.
  - Update `checkAuth` (initial load) logic:
    - Since we can't read HttpOnly cookies in client JS, we need a way to verify auth state.
    - Add a new internal route `GET /api/auth/me` (proxy to decode the JWT server-side).
    - Update `AuthProvider` to fetch user status from this endpoint on mount.

## 3. Role Logic Implementation

- [ ] **Implement Role Mapping in Proxy**:
  - Inside `src/app/api/auth/login/route.ts` and `src/app/api/auth/me/route.ts`:
  - Extract the role from the token (decode JWT) or backend response.
  - Logic:
    ```typescript
    let userRole = tokenData.role || upstreamData.role;
    if (userRole === "admin") {
      userRole = "super_admin";
    }
    // Ensure role matches one of the AdminRole types
    ```
  - Return the mapped role to the client.

## 4. Cleanup

- [ ] Remove mock login logic from `src/lib/auth.ts`.
- [ ] Remove `experiment_id` logic if it interferes with the new flow (optional, but cleaner).

## 5. Verification

- [ ] Test login with "admin" role -> verify redirected to Super Admin dashboard.
- [ ] Verify `authToken` is NOT in localStorage.
- [ ] Verify `authToken` IS in browser cookies (HttpOnly).
