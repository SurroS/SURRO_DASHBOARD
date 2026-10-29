# API Migration Notes

## Current Mock Usage

- `src/hooks/useUsers.ts` returns a hard-coded array after a `setTimeout`, so components that import this hook never reach a backend.
- `src/lib/userManagement.ts` persists the mock dataset from `src/data/mockUsers.json` into `localStorage` and exposes helpers (`getUsers`, `updateUserStatus`, `bulkUpdateStatus`, etc.). Pages under `src/app/user-management/*` ultimately rely on these helpers through shared UI components.

## Consumers to Update

1. Dashboard widgets and tables that consume `useUsers` (e.g., `src/app/user-management/page.tsx`, `src/app/user-management/suspensions/page.tsx`).
2. Any feature invoking `userManagement.ts` helpers for read operations (`getUsers`, `searchUsers`, `getUserStats`). These reads should eventually be backed by `/api/v1/admin/users` or related endpoints once implemented.

This document will be updated as endpoints replace the mock/localStorage flow.

