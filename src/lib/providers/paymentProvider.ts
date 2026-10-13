// ==========================================================
// BETTING BANTU: NORMALIZED PAYMENT & AUDITABLE LEDGER PROVIDER
// Provider -> Adapter -> Ledger Transactions -> UI
// ==========================================================

import {
  IPaymentProvider,
  NormalizedPaymentMethod,
  NormalizedLedgerEntry,
} from "./types";

export const PAYMENT_METHODS: NormalizedPaymentMethod[] = [
  {
    id: "upi_instant",
    name: "UPI FastPay (PhonePe / GPay / Paytm)",
    type: "upi",
    icon: "bolt",
    minAmount: 300,
    maxAmount: 100000,
    feePercentage: 0,
    processingTime: "Instant (10-30s)",
    supportedCurrencies: ["INR"],
    instructions: "Scan the Dynamic UPI QR or copy VPA. Confirm UTR / Reference ID after sending funds.",
  },
  {
    id: "netbanking_imps",
    name: "Instant NetBanking / IMPS",
    type: "netbanking",
    icon: "bank",
    minAmount: 500,
    maxAmount: 500000,
    feePercentage: 0,
    processingTime: "1-5 minutes",
    supportedCurrencies: ["INR"],
    instructions: "Direct bank transfer through HDFC, SBI, ICICI, Axis, Kotak secure gateways.",
  },
  {
    id: "usdt_crypto",
    name: "Tether USDT (TRC-20 / ERC-20)",
    type: "crypto",
    icon: "diamond",
    minAmount: 1000,
    maxAmount: 1000000,
    feePercentage: 0,
    processingTime: "2-10 minutes (Network confirmed)",
    supportedCurrencies: ["USDT", "INR"],
    instructions: "Send only USDT TRC-20 to the treasury address. Automatically converted to INR balance at real-time market rate.",
  },
  {
    id: "crypto_btc_eth",
    name: "Bitcoin & Ethereum",
    type: "crypto",
    icon: "coins",
    minAmount: 2500,
    maxAmount: 2000000,
    feePercentage: 0,
    processingTime: "10-20 minutes",
    supportedCurrencies: ["BTC", "ETH", "INR"],
    instructions: "Requires 2 blockchain confirmations for instant deposit crediting.",
  },
];

// Initial mock ledger entries for realistic user transaction history
let ledgerStore: NormalizedLedgerEntry[] = [
  {
    id: "tx_init_dep_01",
    referenceId: "UPI2026090818293021",
    userId: "usr_bantu_vip",
    type: "deposit",
    amount: 15000,
    currency: "INR",
    status: "completed",
    createdAt: "2026-09-08T14:20:00Z",
    paymentMethod: "UPI FastPay",
    description: "Instant UPI Top-up to Main Wallet",
    balanceAfter: 15000,
  },
  {
    id: "tx_bet_02",
    referenceId: "SLIP-981023",
    userId: "usr_bantu_vip",
    type: "bet_stake",
    amount: -2500,
    currency: "INR",
    status: "completed",
    createdAt: "2026-09-08T18:45:00Z",
    description: "Stake placed on Mumbai Indians vs CSK (Match Winner)",
    balanceAfter: 12500,
  },
  {
    id: "tx_win_03",
    referenceId: "WIN-981023",
    userId: "usr_bantu_vip",
    type: "bet_win",
    amount: 4725,
    currency: "INR",
    status: "completed",
    createdAt: "2026-09-08T22:30:00Z",
    description: "Won: Mumbai Indians vs CSK @ 1.89",
    balanceAfter: 17225,
  },
  {
    id: "tx_bonus_04",
    referenceId: "PROMO-VIP-CASHBACK",
    userId: "usr_bantu_vip",
    type: "bonus",
    amount: 1000,
    currency: "INR",
    status: "completed",
    createdAt: "2026-09-09T10:00:00Z",
    description: "Weekly VIP Royalty Tier-2 Cashback Credit",
    balanceAfter: 18225,
  },
  {
    id: "tx_bet_05",
    referenceId: "SLIP-990412",
    userId: "usr_bantu_vip",
    type: "bet_stake",
    amount: -1500,
    currency: "INR",
    status: "completed",
    createdAt: "2026-09-09T20:15:00Z",
    description: "Stake placed on Arsenal vs Man City (Both Teams to Score)",
    balanceAfter: 16725,
  },
];

class BantuPaymentProvider implements IPaymentProvider {
  async getMethods(type?: "deposit" | "withdrawal"): Promise<NormalizedPaymentMethod[]> {
    if (type === "withdrawal") {
      // Filter methods suitable for withdrawal
      return PAYMENT_METHODS.filter((m) => m.id !== "crypto_btc_eth");
    }
    return PAYMENT_METHODS;
  }

  async createDepositIntent(
    methodId: string,
    amount: number
  ): Promise<{ intentId: string; qrUrl?: string; vpa?: string; paymentLink?: string }> {
    const method = PAYMENT_METHODS.find((m) => m.id === methodId) || PAYMENT_METHODS[0];
    const timestamp = Date.now();
    const intentId = `DEP-${timestamp}-${Math.floor(Math.random() * 10000)}`;

    if (method.type === "upi") {
      const vpa = "bettingbantu.pay@icici";
      // Genuine standard UPI deep-link URI
      const upiUri = `upi://pay?pa=${encodeURIComponent(vpa)}&pn=Betting%20Bantu%20Treasury&am=${amount}&cu=INR&tn=${intentId}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiUri)}`;

      return {
        intentId,
        vpa,
        qrUrl,
        paymentLink: upiUri,
      };
    }

    if (method.type === "crypto") {
      const trc20Address = "TJn8XkGvB9X7sLmQ32zFwYr1A6e4PqK8tN";
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${trc20Address}`;
      return {
        intentId,
        vpa: trc20Address,
        qrUrl,
      };
    }

    return {
      intentId,
      vpa: "HDFC0001890 - Account: 50200084729103 (Betting Bantu Global Treasury)",
    };
  }

  async requestWithdrawal(
    methodId: string,
    amount: number,
    accountDetails: Record<string, string>
  ): Promise<{ withdrawalId: string; status: string; estimatedArrival: string; fee: number }> {
    const timestamp = Date.now();
    const withdrawalId = `WTH-${timestamp}-${Math.floor(Math.random() * 1000)}`;
    const fee = 0; // Zero withdrawal fee for VIP players

    const lastEntry = ledgerStore[ledgerStore.length - 1];
    const currentBalance = lastEntry ? lastEntry.balanceAfter : 25450;

    if (amount > currentBalance) {
      throw new Error(`Insufficient funds: Requested ₹${amount}, Available ₹${currentBalance}`);
    }

    const newEntry: NormalizedLedgerEntry = {
      id: `tx_${withdrawalId}`,
      referenceId: withdrawalId,
      userId: "usr_bantu_vip",
      type: "withdrawal",
      amount: -amount,
      currency: "INR",
      status: "pending",
      createdAt: new Date().toISOString(),
      paymentMethod: methodId,
      description: `Withdrawal to ${accountDetails.vpa || accountDetails.accountNumber || "Registered Account"}`,
      balanceAfter: currentBalance - amount,
    };

    ledgerStore.push(newEntry);

    return {
      withdrawalId,
      status: "pending_verification",
      estimatedArrival: "Within 15-45 minutes",
      fee,
    };
  }

  async getLedger(userId: string): Promise<NormalizedLedgerEntry[]> {
    return [...ledgerStore].reverse();
  }

  // Helper for bet placement & wins updating the auditable ledger
  recordBetTransaction(
    type: "bet_stake" | "bet_win" | "cashout" | "refund",
    amount: number,
    description: string,
    refId: string
  ): NormalizedLedgerEntry {
    const lastEntry = ledgerStore[ledgerStore.length - 1];
    const prevBalance = lastEntry ? lastEntry.balanceAfter : 25000;
    const delta = type === "bet_stake" ? -Math.abs(amount) : Math.abs(amount);
    const balanceAfter = Math.max(0, prevBalance + delta);

    const entry: NormalizedLedgerEntry = {
      id: `tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      referenceId: refId,
      userId: "usr_bantu_vip",
      type,
      amount: delta,
      currency: "INR",
      status: "completed",
      createdAt: new Date().toISOString(),
      description,
      balanceAfter,
    };

    ledgerStore.push(entry);
    return entry;
  }
}

export const paymentProvider = new BantuPaymentProvider();
