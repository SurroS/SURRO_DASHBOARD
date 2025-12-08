import { getUserById, updateUser, getUsers } from "./userManagement";
import type { DocumentMetadata } from "@/types/user";

export function getDocuments(userId: string): DocumentMetadata[] {
  const user = getUserById(userId);
  return user?.documents || [];
}

export function addDocument(
  userId: string,
  document: Omit<DocumentMetadata, "userId">
): DocumentMetadata | null {
  const user = getUserById(userId);
  if (!user) return null;

  const newDocument: DocumentMetadata = {
    ...document,
    userId,
  };

  const updatedDocuments = [...user.documents, newDocument];
  updateUser(userId, { documents: updatedDocuments });

  return newDocument;
}

export function updateDocumentStatus(
  userId: string,
  documentId: string,
  status: "pending" | "approved" | "rejected" | "needs_reupload",
  reviewNotes: string,
  adminId: string,
  adminEmail: string
): boolean {
  const user = getUserById(userId);
  if (!user) return false;

  const documentIndex = user.documents.findIndex(
    (doc: DocumentMetadata) => doc.id === documentId
  );
  if (documentIndex === -1) return false;

  const updatedDocuments = [...user.documents];
  updatedDocuments[documentIndex] = {
    ...updatedDocuments[documentIndex],
    status,
    reviewNotes,
  };

  updateUser(userId, { documents: updatedDocuments });

  // If all documents approved, update verification status
  if (
    status === "approved" &&
    updatedDocuments.every((doc) => doc.status === "approved")
  ) {
    updateUser(userId, { verificationStatus: "verified" });
  }

  return true;
}

export function approveDocument(
  userId: string,
  documentId: string,
  adminId: string,
  adminEmail: string,
  notes?: string
): boolean {
  return updateDocumentStatus(
    userId,
    documentId,
    "approved",
    notes || "Document approved",
    adminId,
    adminEmail
  );
}

export function rejectDocument(
  userId: string,
  documentId: string,
  notes: string,
  adminId: string,
  adminEmail: string
): boolean {
  return updateDocumentStatus(
    userId,
    documentId,
    "rejected",
    notes,
    adminId,
    adminEmail
  );
}

export function requestDocumentReupload(
  userId: string,
  documentId: string,
  notes: string,
  adminId: string,
  adminEmail: string
): boolean {
  return updateDocumentStatus(
    userId,
    documentId,
    "needs_reupload",
    notes,
    adminId,
    adminEmail
  );
}

export function getPendingDocuments(): DocumentMetadata[] {
  const users = getUsers();

  return users.flatMap((user) =>
    user.documents.filter((doc: DocumentMetadata) => doc.status === "pending")
  );
}
