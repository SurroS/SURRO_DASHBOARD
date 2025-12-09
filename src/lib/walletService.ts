import { updateUser } from "./userManagement";

export interface WalletTransaction {
  id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  reason: string;
  adminId: string;
  adminEmail: string;
  timestamp: string;
  balanceAfter: number;
}

const WALLET_TRANSACTIONS_KEY = "surro_wallet_transactions";

export function getTransactions(userId: string): WalletTransaction[] {
  try {
    const data = localStorage.getItem(WALLET_TRANSACTIONS_KEY);
    if (!data) return [];
    const allTransactions: WalletTransaction[] = JSON.parse(data);
    return allTransactions.filter((t) => t.userId === userId);
  } catch (error) {
    console.error("Failed to get transactions:", error);
    return [];
  }
}

export function getAllTransactions(): WalletTransaction[] {
  try {
    const data = localStorage.getItem(WALLET_TRANSACTIONS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to get all transactions:", error);
    return [];
  }
}

export function getCurrentBalance(userId: string): number {
  const transactions = getTransactions(userId);
  return transactions.length > 0 ? transactions[0].balanceAfter : 0;
}

export function adjustWallet(
  userId: string,
  amount: number,
  type: "credit" | "debit",
  reason: string,
  adminId: string,
  adminEmail: string
): WalletTransaction | null {
  try {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    const currentBalance = getCurrentBalance(userId);
    const balanceAfter =
      type === "credit"
        ? currentBalance + amount
        : Math.max(0, currentBalance - amount);

    const transaction: WalletTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      amount,
      reason,
      adminId,
      adminEmail,
      timestamp: new Date().toISOString(),
      balanceAfter,
    };

    const allTransactions = getAllTransactions();
    allTransactions.unshift(transaction);

    // Keep only last 5000 transactions
    const trimmedTransactions = allTransactions.slice(0, 5000);
    localStorage.setItem(
      WALLET_TRANSACTIONS_KEY,
      JSON.stringify(trimmedTransactions)
    );

    // Update user balance
    updateUser(userId, { walletBalance: balanceAfter }, adminId, adminEmail);

    return transaction;
  } catch (error) {
    console.error("Failed to adjust wallet:", error);
    return null;
  }
}

export function getTransactionStats(userId?: string) {
  const transactions = userId ? getTransactions(userId) : getAllTransactions();
  const totalCredits = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalDebits = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalTransactions: transactions.length,
    totalCredits,
    totalDebits,
    netAmount: totalCredits - totalDebits,
  };
}
