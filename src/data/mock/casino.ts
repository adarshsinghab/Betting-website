import { MOCK_CASINO_GAMES as REAL_GAMES } from "@/lib/providers/casinoProvider";

export const CASINO_PROVIDERS = [
  "All Providers",
  "Pragmatic Play",
  "Evolution",
  "Spribe",
  "BGaming",
  "Hacksaw",
];

// Re-export real playable games with full provider links
export const MOCK_CASINO_GAMES = REAL_GAMES.map((g) => ({
  id: g.id,
  title: g.title,
  slug: g.slug || g.id,
  provider: g.provider,
  category: g.category === "live-dealer" ? "live" : g.category,
  thumbnail: g.thumbnail,
  isHot: g.isHot,
  isNew: g.isNew,
  rtp: g.rtp,
  minBet: g.minBet,
  maxBet: g.maxBet,
  demoUrl: g.demoUrl,
  hasLiveDemo: g.hasLiveDemo,
  tags: g.tags,
}));
