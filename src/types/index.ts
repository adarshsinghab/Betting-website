export type SportSlug =
  | "football"
  | "basketball"
  | "tennis"
  | "cricket"
  | "esports"
  | "mma"
  | "ice-hockey"
  | "volleyball"
  | "boxing"
  | "table-tennis"
  | "baseball"
  | "badminton"
  | "american-football";

export type SportType = SportSlug;

export type ProductTab =
  | "sports"
  | "live"
  | "casino"
  | "live-casino"
  | "instant-games"
  | "virtuals"
  | "predictions"
  | "esports"
  | "promotions"
  | "account"
  | "admin";

export type Match = MatchEvent;

export interface Sport {
  id: string;
  name: string;
  slug: SportSlug;
  iconName: string;
  liveCount: number;
  totalCount: number;
}

export interface Competition {
  id: string;
  name: string;
  sportId: string;
  country: string;
  countryCode?: string;
  priority?: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
}

export type OddsDirection = "up" | "down" | "neutral";
export type SelectionStatus = "active" | "suspended" | "unavailable";

export interface MarketSelection {
  id: string;
  name: string;
  odds: number;
  previousOdds?: number;
  direction?: OddsDirection;
  status?: SelectionStatus;
  handicapValue?: string;
}

export interface Market {
  id: string;
  name: string;
  category: "main" | "goals" | "handicap" | "halves" | "corners" | "cards" | "specials";
  selections: MarketSelection[];
  isMain?: boolean;
}

export interface MatchStatistics {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  attacks: [number, number];
  dangerousAttacks: [number, number];
}

export interface TimelineEvent {
  minute: number;
  type: "goal" | "card_yellow" | "card_red" | "corner" | "sub" | "penalty";
  team: "home" | "away";
  description: string;
}

export interface MatchEvent {
  id: string;
  sportId: string;
  sportSlug: SportSlug;
  sport?: SportSlug;
  competition: Competition;
  league?: string;
  homeTeam: Team;
  awayTeam: Team;
  status: "live" | "upcoming" | "finished" | "suspended";
  isLive?: boolean;
  liveMinute?: number;
  livePeriod?: string;
  homeScore: number;
  awayScore: number;
  liveScore?: { home: number | string; away: number | string; detail?: string };
  setScores?: string[];
  kickoffTime: string;
  startTime?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  markets: Market[];
  odds?: { home: number; draw?: number; away: number };
  totalMarkets?: number;
  statistics?: MatchStatistics;
  timeline?: TimelineEvent[];
}

export interface BetSlipItem {
  id: string;
  eventId?: string;
  matchId?: string;
  eventName?: string;
  matchTitle?: string;
  sportSlug?: SportSlug | string;
  sport?: string;
  competitionName?: string;
  marketId?: string;
  marketName?: string;
  market?: string;
  selectionId?: string;
  selectionName?: string;
  selection?: string;
  odds: number;
  previousOdds?: number;
  status?: "normal" | "suspended" | "changed";
  isLive?: boolean;
  currentScore?: string;
}

export type BetType = "single" | "multiple" | "system" | "builder";

export interface PlacedBet {
  id: string;
  timestamp: string;
  type: BetType;
  selections: BetSlipItem[];
  stake: number;
  totalOdds: number;
  potentialReturn: number;
  status: "open" | "won" | "lost" | "cashed_out";
  cashOutAvailable?: boolean;
  cashOutValue?: number;
}

export interface CasinoGame {
  id: string;
  title: string;
  slug: string;
  provider: string;
  category: "slots" | "live" | "table" | "jackpots" | "instant" | "new" | "popular";
  thumbnail: string;
  isHot?: boolean;
  isNew?: boolean;
  rtp?: number;
  minBet?: number;
  maxBet?: number;
  jackpotAmount?: number;
  dealerName?: string;
}

export interface PredictionMarket {
  id: string;
  question: string;
  category: string;
  yesOdds: number;
  noOdds: number;
  yesPercent: number;
  noPercent: number;
  volume: number;
  closesAt: string;
  resolutionSource: string;
}

export interface EsportMatch {
  id: string;
  gameTitle: "cs2" | "dota2" | "lol" | "valorant" | "pubg" | "mobile_legends";
  tournament: string;
  teamA: Team;
  teamB: Team;
  scoreA: number;
  scoreB: number;
  currentMap: number;
  bestOf: number;
  isLive: boolean;
  liveStreamAvailable?: boolean;
  markets: Market[];
}

export interface Promotion {
  id: string;
  title: string;
  category: "welcome" | "sports" | "casino" | "live" | "esports" | "vip";
  subtitle: string;
  bonusTag: string;
  tag?: string;
  description: string;
  expiryDate: string;
  minDeposit?: number;
  maxBonus?: number;
  wageringRequirement?: string;
  terms: string[];
  promoCode?: string;
  code?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  phone: string;
  isVerified: boolean;
  kycTier: 1 | 2 | 3;
  twoFactorEnabled: boolean;
  currency: string;
  vipTier: "Bronze" | "Silver" | "Gold" | "Platinum" | "Black Elite";
}

export interface Wallet {
  cashBalance: number;
  bonusBalance: number;
  pendingWithdrawal: number;
  currency: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: "deposit" | "withdrawal" | "bet" | "win" | "bonus" | "cashout";
  amount: number;
  status: "completed" | "pending" | "failed";
  method?: string;
  reference?: string;
}

export interface ResponsibleGamingLimits {
  dailyDepositLimit: number | null;
  weeklyDepositLimit: number | null;
  monthlyDepositLimit: number | null;
  sessionTimeLimitMinutes: number | null;
  realityCheckIntervalMinutes: number;
  isCoolingOff: boolean;
  coolingOffUntil: string | null;
}
