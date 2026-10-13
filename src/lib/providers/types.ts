// ==========================================================
// BETTING BANTU: PROVIDER & NORMALIZED DOMAIN ABSTRACTIONS
// Provider -> Adapter -> Normalized Data -> API/Realtime -> UI
// ==========================================================

import { SportType } from "@/types";

export interface NormalizedOdds {
  id: string;
  name: string;
  odds: number;
  previousOdds?: number;
  status: "active" | "suspended" | "settled";
  probability?: number;
}

export interface NormalizedMarket {
  id: string;
  name: string;
  category: "main" | "goals" | "halves" | "handicap" | "corners" | "cards" | "specials";
  selections: NormalizedOdds[];
  isSuspended?: boolean;
}

export interface NormalizedMatchIncident {
  minute: number;
  type: "goal" | "yellow_card" | "red_card" | "substitution" | "corner" | "penalty" | "var";
  team: "home" | "away";
  description: string;
}

export interface NormalizedMatchStats {
  possession: [number, number]; // [home%, away%]
  shotsOnTarget: [number, number];
  shotsOffTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
}

export interface PitchVisualizerState {
  zone: "midfield" | "home_attack" | "away_attack" | "home_danger" | "away_danger";
  action: "normal" | "attack" | "free_kick" | "corner" | "shot_on_target" | "goal";
  possessionTeam: "home" | "away";
  ballCoords: [number, number]; // [x%, y%] on pitch
  message: string;
}

export interface NormalizedMatch {
  id: string;
  sport: SportType;
  sportName: string;
  league: string;
  country: string;
  countryCode: string;
  isLive: boolean;
  status: "upcoming" | "live" | "interrupted" | "finished";
  startTime: string;
  liveMinute?: number;
  period?: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    logo?: string;
    score?: number;
    subScore?: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    logo?: string;
    score?: number;
    subScore?: string;
  };
  markets: NormalizedMarket[];
  incidents?: NormalizedMatchIncident[];
  stats?: NormalizedMatchStats;
  pitchState?: PitchVisualizerState;
}

export interface NormalizedCasinoGame {
  id: string;
  title: string;
  slug?: string;
  category: "slots" | "live-dealer" | "instant" | "table-games" | "megaways" | "jackpots";
  provider: "Pragmatic Play" | "Evolution" | "Spribe" | "Evoplay" | "NetEnt" | "BGaming" | "Hacksaw" | "PG Soft" | string;
  rtp: number;
  volatility: "Low" | "Medium" | "High" | "Very High";
  thumbnail: string;
  isHot?: boolean;
  isNew?: boolean;
  hasLiveDemo: boolean;
  demoUrl?: string;
  minBet: number;
  maxBet: number;
  maxMultiplier: string;
  tags: string[];
}

export interface CasinoSessionResponse {
  sessionId: string;
  gameId: string;
  provider: string;
  launchUrl: string;
  mode: "demo" | "real";
  token: string;
  balanceCurrency: string;
}

export interface NormalizedPaymentMethod {
  id: string;
  name: string;
  type: "upi" | "netbanking" | "crypto" | "card" | "wallet";
  icon: string;
  minAmount: number;
  maxAmount: number;
  feePercentage: number;
  processingTime: string;
  supportedCurrencies: string[];
  instructions?: string;
  qrPayload?: string;
}

export interface NormalizedLedgerEntry {
  id: string;
  referenceId: string;
  userId: string;
  type: "deposit" | "withdrawal" | "bet_stake" | "bet_win" | "cashout" | "bonus" | "refund";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "rejected";
  createdAt: string;
  paymentMethod?: string;
  description: string;
  balanceAfter: number;
}

export interface KycVerificationDocument {
  id: string;
  type: "aadhaar" | "pan" | "passport" | "driving_license";
  documentNumber: string;
  frontImageUrl: string;
  backImageUrl?: string;
  submittedAt: string;
  status: "pending" | "verified" | "rejected";
  rejectionReason?: string;
}

export interface KycStatus {
  tier: "tier_0_unverified" | "tier_1_basic" | "tier_2_fully_verified";
  isVerified: boolean;
  dailyDepositLimit: number;
  dailyWithdrawalLimit: number;
  documents: KycVerificationDocument[];
}

export interface ISportsProvider {
  getMatches(sport?: SportType | "all", isLive?: boolean): Promise<NormalizedMatch[]>;
  getMatchById(id: string): Promise<NormalizedMatch | null>;
  getLiveIncidents(matchId: string): Promise<NormalizedMatchIncident[]>;
  getLiveStats(matchId: string): Promise<NormalizedMatchStats | null>;
  getPitchState(matchId: string): Promise<PitchVisualizerState | null>;
}

export interface ICasinoProvider {
  getGames(category?: string, provider?: string, search?: string): Promise<NormalizedCasinoGame[]>;
  getGameById(id: string): Promise<NormalizedCasinoGame | null>;
  createSession(gameId: string, mode: "demo" | "real"): Promise<CasinoSessionResponse>;
}

export interface IPaymentProvider {
  getMethods(type?: "deposit" | "withdrawal"): Promise<NormalizedPaymentMethod[]>;
  createDepositIntent(methodId: string, amount: number): Promise<{ intentId: string; qrUrl?: string; vpa?: string }>;
  requestWithdrawal(methodId: string, amount: number, accountDetails: Record<string, string>): Promise<{ withdrawalId: string; status: string }>;
  getLedger(userId: string): Promise<NormalizedLedgerEntry[]>;
}

export interface IKycProvider {
  getStatus(userId: string): Promise<KycStatus>;
  submitDocument(userId: string, document: Omit<KycVerificationDocument, "id" | "submittedAt" | "status">): Promise<{ success: boolean; documentId: string }>;
}
