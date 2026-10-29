import { rest } from "msw";
import { describe, it, expect } from "vitest";
import { mswServer } from "../setup/msw-server";
import {
  listUsers,
  mapAdminUserToLocalUser,
} from "@/services/userService";
import { ApiError } from "@/lib/apiClient";

const USERS_ENDPOINT =
  "https://dev.surrosantara.space/api/v1/admin/users";

describe("userService", () => {
  it("fetches admin users and maps them to local format", async () => {
    mswServer.use(
      rest.get(USERS_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            data: [
              {
                id: "user_1",
                name: "Jane Doe",
                email: "jane@example.com",
                role: "surrogate",
                status: "active",
                verificationStatus: "verified",
                walletBalance: 1250.5,
              },
            ],
            meta: { total: 1 },
          })
        )
      )
    );

    const response = await listUsers();

    expect(response.meta?.total).toBe(1);
    expect(response.data[0]?.id).toBe("user_1");

    const localUser = mapAdminUserToLocalUser(response.data[0]!);

    expect(localUser.email).toBe("jane@example.com");
    expect(localUser.walletBalance).toBe(1250.5);
    expect(localUser.verificationStatus).toBe("verified");
  });

  it("throws ApiError when API payload is invalid", async () => {
    mswServer.use(
      rest.get(USERS_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            data: [{ name: "Missing id" }],
          })
        )
      )
    );

    await expect(listUsers()).rejects.toBeInstanceOf(ApiError);
  });
});

