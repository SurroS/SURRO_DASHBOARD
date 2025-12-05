# Secure Invite-Only Signup Feature Build Plan

This plan outlines the steps to restrict public signup and implement a secure, role-based invitation system for adding employees.

## 1. Architecture & API Contract

- [x] **Define API Requirements**: Document the expected backend endpoints for invitations.
  - `POST /api/v1/invites`: Generate a signed token for an email + role (valid 24h).
  - `GET /api/v1/invites/:token`: Validate token and return associated email/role.
  - `POST /api/v1/invites/resend`: (Optional) Resend invite email.

## 2. Frontend: Service Layer (Mock/Implementation)

- [x] **Create `inviteService.ts`**: Implement methods to interface with the invite API.
  - `generateInvite(email: string, role: string)`
  - `validateInvite(token: string)`
  - _Note: Will use mock data initially if backend is not ready._

## 3. Frontend: Public Access Restriction

- [x] **Modify Middleware/Route Guards**:
  - Check if user is accessing `/signup`.
  - If no valid token is present in query params (or dynamic route), redirect to `/login`.
  - Alternatively, replace `/signup` page content with a "Invites Only" message.

## 4. Frontend: Super Admin "Add Employee" UI

- [x] **Create/Update `src/app/employee-management/add`**:
  - Add form: Email, Role Selection.
  - "Generate Invite" button.
- [x] **Display Invite Link**:
  - Upon success, show the generated URL (e.g., `https://.../signup?token=xyz`).
  - Add "Copy to Clipboard" functionality.
  - (Optional) "Send via Email" button trigger.

## 5. Frontend: Invite-Only Signup Page

- [x] **Create Dynamic Route**: `src/app/signup/invite/page.tsx` (or handle query param in existing signup).
- [x] **Token Validation**:
  - On mount, call `validateInvite(token)`.
  - If invalid/expired: Show "Link Expired" or "Invalid Link" error.
  - If valid: Pre-fill Email and Role (read-only), allow setting Password.

## 6. Frontend: Employee Status Management

- [x] **Update Employee List UI**:
  - Display status columns: `Active`, `Pending` (Invite sent), `Expired` (24h passed).
  - Add visual indicators (badges) for these statuses.
