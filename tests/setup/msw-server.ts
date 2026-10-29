import { beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";

export const mswServer = setupServer();

beforeAll(() => mswServer.listen({ onUnhandledRequest: "error" }));
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

