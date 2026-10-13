// ==========================================================
// BETTING BANTU: KYC & RESPONSIBLE GAMING PROVIDER
// Provider -> Adapter -> Identity Verification -> UI
// ==========================================================

import {
  IKycProvider,
  KycStatus,
  KycVerificationDocument,
} from "./types";

let mockKycState: KycStatus = {
  tier: "tier_1_basic",
  isVerified: true,
  dailyDepositLimit: 100000,
  dailyWithdrawalLimit: 50000,
  documents: [
    {
      id: "doc_aadhaar_8921",
      type: "aadhaar",
      documentNumber: "XXXX-XXXX-4819",
      frontImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      submittedAt: "2026-08-15T10:30:00Z",
      status: "verified",
    },
  ],
};

class BantuKycProvider implements IKycProvider {
  async getStatus(userId: string): Promise<KycStatus> {
    return { ...mockKycState };
  }

  async submitDocument(
    userId: string,
    document: Omit<KycVerificationDocument, "id" | "submittedAt" | "status">
  ): Promise<{ success: boolean; documentId: string; newTier: KycStatus["tier"] }> {
    const docId = `doc_${document.type}_${Math.floor(Math.random() * 10000)}`;

    const newDoc: KycVerificationDocument = {
      ...document,
      id: docId,
      submittedAt: new Date().toISOString(),
      status: "verified", // Automatic high-speed OCR validation simulation
    };

    mockKycState.documents.push(newDoc);
    mockKycState.tier = "tier_2_fully_verified";
    mockKycState.dailyDepositLimit = 1000000;
    mockKycState.dailyWithdrawalLimit = 500000;

    return {
      success: true,
      documentId: docId,
      newTier: mockKycState.tier,
    };
  }

  async setResponsibleGamingLimits(
    userId: string,
    limits: { dailyLossLimit?: number; coolOffHours?: number; selfExclusionDays?: number }
  ): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: "Responsible gaming limits updated immediately. Changes are irrevocable for 24 hours.",
    };
  }
}

export const kycProvider = new BantuKycProvider();
