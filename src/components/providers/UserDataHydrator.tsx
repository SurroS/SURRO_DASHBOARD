"use client";

import { useUsers } from "@/hooks/useUsers";

export function UserDataHydrator() {
  useUsers();
  return null;
}

