import { EsportMatch } from "@/types";

export const MOCK_ESPORT_MATCHES: EsportMatch[] = [
  {
    id: "esp-1",
    gameTitle: "cs2",
    tournament: "PGL Major - Grand Finals",
    teamA: { id: "navi", name: "Natus Vincere", shortName: "NAVI" },
    teamB: { id: "faze", name: "FaZe Clan", shortName: "FAZE" },
    scoreA: 1,
    scoreB: 1,
    currentMap: 3,
    bestOf: 3,
    isLive: true,
    liveStreamAvailable: true,
    markets: [
      {
        id: "esp-mkt-series",
        name: "Series Winner",
        category: "main",
        isMain: true,
        selections: [
          { id: "esp-navi-win", name: "Natus Vincere", odds: 1.82, status: "active" },
          { id: "esp-faze-win", name: "FaZe Clan", odds: 1.98, status: "active" },
        ],
      },
      {
        id: "esp-mkt-map3",
        name: "Map 3 (Inferno) Winner",
        category: "main",
        isMain: true,
        selections: [
          { id: "esp-navi-m3", name: "Natus Vincere", odds: 1.75, status: "active" },
          { id: "esp-faze-m3", name: "FaZe Clan", odds: 2.05, status: "active" },
        ],
      },
      {
        id: "esp-mkt-rounds",
        name: "Map 3 Total Rounds (Over/Under 21.5)",
        category: "goals",
        selections: [
          { id: "esp-o21", name: "Over 21.5", odds: 1.85, status: "active" },
          { id: "esp-u21", name: "Under 21.5", odds: 1.95, status: "active" },
        ],
      },
    ],
  },
  {
    id: "esp-2",
    gameTitle: "dota2",
    tournament: "The International - Upper Bracket",
    teamA: { id: "spirit", name: "Team Spirit", shortName: "TS" },
    teamB: { id: "liquid", name: "Team Liquid", shortName: "TL" },
    scoreA: 0,
    scoreB: 0,
    currentMap: 1,
    bestOf: 3,
    isLive: false,
    markets: [
      {
        id: "esp-dota-winner",
        name: "Match Winner",
        category: "main",
        isMain: true,
        selections: [
          { id: "esp-ts", name: "Team Spirit", odds: 1.65, status: "active" },
          { id: "esp-tl", name: "Team Liquid", odds: 2.25, status: "active" },
        ],
      },
    ],
  },
  {
    id: "esp-3",
    gameTitle: "valorant",
    tournament: "VCT Champions - Playoffs",
    teamA: { id: "fnc", name: "Fnatic", shortName: "FNC" },
    teamB: { id: "sen", name: "Sentinels", shortName: "SEN" },
    scoreA: 1,
    scoreB: 0,
    currentMap: 2,
    bestOf: 3,
    isLive: true,
    markets: [
      {
        id: "esp-val-winner",
        name: "Series Winner",
        category: "main",
        isMain: true,
        selections: [
          { id: "esp-fnc-win", name: "Fnatic", odds: 1.40, status: "active" },
          { id: "esp-sen-win", name: "Sentinels", odds: 2.90, status: "active" },
        ],
      },
    ],
  },
];
