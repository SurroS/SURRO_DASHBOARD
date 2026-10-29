# Invite System API Contract

To support the secure, invite-only signup feature, the backend needs to implement the following endpoints.

## 1. Generate Invite

**Endpoint:** `POST /api/v1/invites`
**Access:** Super Admin only
**Description:** Generates a unique, time-limited (24h) invitation token for a specific email and role.

**Request Body:**

```json
{
  "email": "employee@example.com",
  "role": "marketer" // or "compliance", "support", etc.
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsIn...", // Signed JWT or random secure string
  "expiresAt": "2023-12-01T12:00:00Z",
  "inviteLink": "https://surrosantara.space/signup?token=eyJhbGciOiJIUzI1NiIsIn..."
}
```

## 2. Validate Invite

**Endpoint:** `GET /api/v1/invites/:token`
**Access:** Public (Rate limited)
**Description:** Validates the token when a user clicks the signup link. Returns the email and role to pre-fill the signup form.

**Response (200 OK):**

```json
{
  "valid": true,
  "email": "employee@example.com",
  "role": "marketer",
  "expiresAt": "2023-12-01T12:00:00Z"
}
```

**Response (400/404):**

```json
{
  "valid": false,
  "error": "Invite expired" // or "Invalid token"
}
```

## 3. List Invites (Optional)

**Endpoint:** `GET /api/v1/invites`
**Access:** Super Admin
**Description:** Returns list of pending invites to show in the employee table.

**Response:**

```json
{
  "data": [
    {
      "id": "inv_123",
      "email": "employee@example.com",
      "status": "pending", // pending, accepted, expired
      "createdAt": "..."
    }
  ]
}
```
