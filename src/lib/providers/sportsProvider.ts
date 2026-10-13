import {
  ISportsProvider,
  NormalizedMatch,
  NormalizedMatchIncident,
  NormalizedMatchStats,
  PitchVisualizerState,
} from "./types";
import { SportType } from "@/types";

export const MOCK_NORMALIZED_MATCHES: NormalizedMatch[] = [
  // ==========================================
  // 1. CRICKET (IPL 2026 & INTERNATIONAL)
  // ==========================================
  {
    id: "match-ipl-01",
    sport: "cricket",
    sportName: "Cricket",
    league: "IPL 2026",
    country: "India",
    countryCode: "IN",
    isLive: true,
    status: "live",
    startTime: "Today, 19:30 IST",
    liveMinute: 17,
    period: "Innings 2",
    homeTeam: {
      id: "csk",
      name: "Chennai Super Kings",
      shortName: "CSK",
      score: 188,
      subScore: "188/4 (20 ov)",
    },
    awayTeam: {
      id: "mi",
      name: "Mumbai Indians",
      shortName: "MI",
      score: 152,
      subScore: "152/3 (16.4 ov) • Need 37 in 20b",
    },
    pitchState: {
      zone: "home_danger",
      action: "attack",
      possessionTeam: "away",
      ballCoords: [78, 48],
      message: "Bumrah to Jadeja: 4 RUNS! Smashed through extra cover!",
    },
    stats: {
      possession: [50, 50],
      shotsOnTarget: [12, 14],
      shotsOffTarget: [4, 6],
      corners: [0, 0],
      fouls: [2, 1],
      yellowCards: [0, 0],
      redCards: [4, 3],
    },
    incidents: [
      { minute: 17, type: "goal", team: "home", description: "BOUNDARY! Jadeja hits a cracking cover drive for 4." },
      { minute: 15, type: "var", team: "away", description: "DRS Review: LBW appeal against Rohit Sharma - NOT OUT (Ball missing leg stump)." },
      { minute: 12, type: "red_card", team: "away", description: "WICKET! Suryakumar Yadav c Dhoni b Pathirana 48(28)." },
      { minute: 6, type: "goal", team: "away", description: "MAXIMUM! Rohit pulls over deep square leg for 6." },
    ],
    markets: [
      {
        id: "mkt-match-winner",
        name: "Match Winner (2-Way)",
        category: "main",
        selections: [
          { id: "sel-csk-win", name: "Chennai Super Kings", odds: 1.82, previousOdds: 1.78, status: "active" },
          { id: "sel-mi-win", name: "Mumbai Indians", odds: 2.05, previousOdds: 2.12, status: "active" },
        ],
      },
      {
        id: "mkt-total-runs",
        name: "Total Match Sixes (Over/Under 16.5)",
        category: "goals",
        selections: [
          { id: "sel-sixes-over", name: "Over 16.5", odds: 1.90, status: "active" },
          { id: "sel-sixes-under", name: "Under 16.5", odds: 1.90, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-ipl-02",
    sport: "cricket",
    sportName: "Cricket",
    league: "IPL 2026",
    country: "India",
    countryCode: "IN",
    isLive: false,
    status: "upcoming",
    startTime: "Today, 19:30 IST",
    homeTeam: {
      id: "rcb",
      name: "Royal Challengers Bengaluru",
      shortName: "RCB",
    },
    awayTeam: {
      id: "kkr",
      name: "Kolkata Knight Riders",
      shortName: "KKR",
    },
    markets: [
      {
        id: "mkt-ipl2-winner",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-rcb-win", name: "RCB", odds: 1.92, status: "active" },
          { id: "sel-kkr-win", name: "KKR", odds: 1.92, status: "active" },
        ],
      },
      {
        id: "mkt-ipl2-sixes",
        name: "Total Match Sixes (Over/Under 17.5)",
        category: "goals",
        selections: [
          { id: "sel-rcb-six-o", name: "Over 17.5", odds: 1.85, status: "active" },
          { id: "sel-rcb-six-u", name: "Under 17.5", odds: 1.95, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-cricket-ind-aus",
    sport: "cricket",
    sportName: "Cricket",
    league: "ICC T20 Series",
    country: "India",
    countryCode: "IN",
    isLive: false,
    status: "upcoming",
    startTime: "Tomorrow, 19:00 IST",
    homeTeam: {
      id: "ind",
      name: "India",
      shortName: "IND",
    },
    awayTeam: {
      id: "aus",
      name: "Australia",
      shortName: "AUS",
    },
    markets: [
      {
        id: "mkt-ind-aus-winner",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-ind-win", name: "India", odds: 1.65, status: "active" },
          { id: "sel-aus-win", name: "Australia", odds: 2.25, status: "active" },
        ],
      },
      {
        id: "mkt-ind-aus-runs",
        name: "1st Innings Score (Over/Under 185.5)",
        category: "goals",
        selections: [
          { id: "sel-ind-runs-o", name: "Over 185.5", odds: 1.88, status: "active" },
          { id: "sel-ind-runs-u", name: "Under 185.5", odds: 1.92, status: "active" },
        ],
      },
    ],
  },

  // ==========================================
  // 2. FOOTBALL (PREMIER LEAGUE, UCL, LA LIGA)
  // ==========================================
  {
    id: "match-epl-01",
    sport: "football",
    sportName: "Football",
    league: "Premier League",
    country: "England",
    countryCode: "GB",
    isLive: true,
    status: "live",
    startTime: "Today, 21:00 BST",
    liveMinute: 68,
    period: "2H",
    homeTeam: {
      id: "ars",
      name: "Arsenal FC",
      shortName: "ARS",
      score: 2,
    },
    awayTeam: {
      id: "che",
      name: "Chelsea FC",
      shortName: "CHE",
      score: 1,
    },
    pitchState: {
      zone: "away_attack",
      action: "shot_on_target",
      possessionTeam: "away",
      ballCoords: [22, 65],
      message: "Cole Palmer curling shot from 20 yards saved by Raya!",
    },
    stats: {
      possession: [56, 44],
      shotsOnTarget: [6, 4],
      shotsOffTarget: [5, 3],
      corners: [7, 3],
      fouls: [8, 11],
      yellowCards: [1, 2],
      redCards: [0, 0],
    },
    incidents: [
      { minute: 64, type: "goal", team: "away", description: "GOAL! Cole Palmer strikes into bottom right corner." },
      { minute: 52, type: "yellow_card", team: "away", description: "Yellow Card: Moises Caicedo (tactical foul)." },
      { minute: 38, type: "goal", team: "home", description: "GOAL! Bukayo Saka header from Martinelli cross." },
      { minute: 14, type: "goal", team: "home", description: "GOAL! Martin Odegaard free kick rocket into top corner." },
    ],
    markets: [
      {
        id: "mkt-1x2",
        name: "Full Time Result (1X2)",
        category: "main",
        selections: [
          { id: "sel-1", name: "Arsenal", odds: 1.45, previousOdds: 1.52, status: "active" },
          { id: "sel-x", name: "Draw", odds: 4.10, previousOdds: 3.90, status: "active" },
          { id: "sel-2", name: "Chelsea", odds: 6.80, previousOdds: 6.20, status: "active" },
        ],
      },
      {
        id: "mkt-total-goals",
        name: "Total Goals (Over/Under 3.5)",
        category: "goals",
        selections: [
          { id: "sel-o35", name: "Over 3.5", odds: 1.75, status: "active" },
          { id: "sel-u35", name: "Under 3.5", odds: 2.05, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-epl-02",
    sport: "football",
    sportName: "Football",
    league: "Premier League",
    country: "England",
    countryCode: "GB",
    isLive: false,
    status: "upcoming",
    startTime: "Saturday, 17:30 IST",
    homeTeam: {
      id: "liv",
      name: "Liverpool FC",
      shortName: "LIV",
    },
    awayTeam: {
      id: "mun",
      name: "Manchester United",
      shortName: "MUN",
    },
    markets: [
      {
        id: "mkt-epl2-1x2",
        name: "Full Time Result (1X2)",
        category: "main",
        selections: [
          { id: "sel-liv-win", name: "Liverpool", odds: 1.58, status: "active" },
          { id: "sel-liv-x", name: "Draw", odds: 4.30, status: "active" },
          { id: "sel-mun-win", name: "Man Utd", odds: 5.40, status: "active" },
        ],
      },
      {
        id: "mkt-epl2-goals",
        name: "Total Goals (Over/Under 2.5)",
        category: "goals",
        selections: [
          { id: "sel-liv-o25", name: "Over 2.5", odds: 1.52, status: "active" },
          { id: "sel-liv-u25", name: "Under 2.5", odds: 2.50, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-ucl-01",
    sport: "football",
    sportName: "Football",
    league: "UEFA Champions League",
    country: "Europe",
    countryCode: "EU",
    isLive: false,
    status: "upcoming",
    startTime: "Tomorrow, 00:30 IST",
    homeTeam: {
      id: "rma",
      name: "Real Madrid",
      shortName: "RMA",
    },
    awayTeam: {
      id: "mci",
      name: "Manchester City",
      shortName: "MCI",
    },
    markets: [
      {
        id: "mkt-ucl-1x2",
        name: "Match Result (1X2)",
        category: "main",
        selections: [
          { id: "sel-rma", name: "Real Madrid", odds: 2.65, status: "active" },
          { id: "sel-ucl-x", name: "Draw", odds: 3.50, status: "active" },
          { id: "sel-mci", name: "Man City", odds: 2.55, status: "active" },
        ],
      },
      {
        id: "mkt-ucl-o25",
        name: "Total Goals (Over/Under 2.5)",
        category: "goals",
        selections: [
          { id: "sel-ucl-o25", name: "Over 2.5", odds: 1.68, status: "active" },
          { id: "sel-ucl-u25", name: "Under 2.5", odds: 2.18, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-seriea-01",
    sport: "football",
    sportName: "Football",
    league: "Serie A",
    country: "Italy",
    countryCode: "EU",
    isLive: true,
    status: "live",
    startTime: "Today, 22:15 IST",
    liveMinute: 74,
    period: "2H",
    homeTeam: {
      id: "int",
      name: "Inter Milan",
      shortName: "INT",
      score: 1,
    },
    awayTeam: {
      id: "acm",
      name: "AC Milan",
      shortName: "MIL",
      score: 1,
    },
    markets: [
      {
        id: "mkt-milan-1x2",
        name: "Match Result (1X2)",
        category: "main",
        selections: [
          { id: "sel-int-w", name: "Inter", odds: 2.20, status: "active" },
          { id: "sel-mil-x", name: "Draw", odds: 2.40, status: "active" },
          { id: "sel-mil-w", name: "Milan", odds: 4.10, status: "active" },
        ],
      },
      {
        id: "mkt-milan-goals",
        name: "Next Goal",
        category: "goals",
        selections: [
          { id: "sel-nxt-int", name: "Inter Milan", odds: 2.60, status: "active" },
          { id: "sel-nxt-no", name: "No Goal", odds: 2.20, status: "active" },
        ],
      },
    ],
  },

  // ==========================================
  // 3. TENNIS (WIMBLEDON & US OPEN)
  // ==========================================
  {
    id: "match-tennis-01",
    sport: "tennis",
    sportName: "Tennis",
    league: "ATP Wimbledon Finals",
    country: "United Kingdom",
    countryCode: "GB",
    isLive: true,
    status: "live",
    startTime: "Today, 18:00 BST",
    liveMinute: 84,
    period: "Set 3",
    homeTeam: {
      id: "alcaraz",
      name: "Carlos Alcaraz",
      shortName: "ALC",
      score: 1,
      subScore: "6-4, 5-7, 4-3 (40-30*)",
    },
    awayTeam: {
      id: "sinner",
      name: "Jannik Sinner",
      shortName: "SIN",
      score: 1,
      subScore: "4-6, 7-5, 3-4",
    },
    markets: [
      {
        id: "mkt-tennis-winner",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-alc-win", name: "Carlos Alcaraz", odds: 1.74, previousOdds: 1.80, status: "active" },
          { id: "sel-sin-win", name: "Jannik Sinner", odds: 2.12, previousOdds: 2.05, status: "active" },
        ],
      },
      {
        id: "mkt-total-games",
        name: "Total Games (Over/Under 38.5)",
        category: "goals",
        selections: [
          { id: "sel-tg-over", name: "Over 38.5", odds: 1.85, status: "active" },
          { id: "sel-tg-under", name: "Under 38.5", odds: 1.95, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-tennis-02",
    sport: "tennis",
    sportName: "Tennis",
    league: "US Open Championship",
    country: "USA",
    countryCode: "US",
    isLive: false,
    status: "upcoming",
    startTime: "Tomorrow, 21:00 IST",
    homeTeam: {
      id: "djokovic",
      name: "Novak Djokovic",
      shortName: "DJO",
    },
    awayTeam: {
      id: "medvedev",
      name: "Daniil Medvedev",
      shortName: "MED",
    },
    markets: [
      {
        id: "mkt-djo-med-win",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-djo-win", name: "Novak Djokovic", odds: 1.62, status: "active" },
          { id: "sel-med-win", name: "Daniil Medvedev", odds: 2.30, status: "active" },
        ],
      },
      {
        id: "mkt-djo-sets",
        name: "Total Sets (Over/Under 3.5)",
        category: "goals",
        selections: [
          { id: "sel-sets-o", name: "Over 3.5", odds: 1.60, status: "active" },
          { id: "sel-sets-u", name: "Under 3.5", odds: 2.25, status: "active" },
        ],
      },
    ],
  },

  // ==========================================
  // 4. BASKETBALL (NBA)
  // ==========================================
  {
    id: "match-nba-live",
    sport: "basketball",
    sportName: "Basketball",
    league: "NBA Regular Season",
    country: "USA",
    countryCode: "US",
    isLive: true,
    status: "live",
    startTime: "Today, Live Q3",
    liveMinute: 32,
    period: "Q3",
    homeTeam: {
      id: "den",
      name: "Denver Nuggets",
      shortName: "DEN",
      score: 76,
    },
    awayTeam: {
      id: "mia",
      name: "Miami Heat",
      shortName: "MIA",
      score: 72,
    },
    markets: [
      {
        id: "mkt-nba-live-ml",
        name: "Moneyline (Inc. Overtime)",
        category: "main",
        selections: [
          { id: "sel-den-ml", name: "Denver Nuggets", odds: 1.55, status: "active" },
          { id: "sel-mia-ml", name: "Miami Heat", odds: 2.45, status: "active" },
        ],
      },
      {
        id: "mkt-nba-live-pts",
        name: "Total Points (Over/Under 214.5)",
        category: "goals",
        selections: [
          { id: "sel-pts-o", name: "Over 214.5", odds: 1.90, status: "active" },
          { id: "sel-pts-u", name: "Under 214.5", odds: 1.90, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-nba-01",
    sport: "basketball",
    sportName: "Basketball",
    league: "NBA Playoffs",
    country: "USA",
    countryCode: "US",
    isLive: false,
    status: "upcoming",
    startTime: "Tomorrow, 06:30 IST",
    homeTeam: {
      id: "lal",
      name: "Los Angeles Lakers",
      shortName: "LAL",
    },
    awayTeam: {
      id: "bos",
      name: "Boston Celtics",
      shortName: "BOS",
    },
    markets: [
      {
        id: "mkt-nba-winner",
        name: "Moneyline (Inc. Overtime)",
        category: "main",
        selections: [
          { id: "sel-lal-ml", name: "LA Lakers", odds: 2.15, status: "active" },
          { id: "sel-bos-ml", name: "Boston Celtics", odds: 1.72, status: "active" },
        ],
      },
      {
        id: "mkt-nba-total",
        name: "Total Points (Over/Under 224.5)",
        category: "goals",
        selections: [
          { id: "sel-pts-over", name: "Over 224.5", odds: 1.90, status: "active" },
          { id: "sel-pts-under", name: "Under 224.5", odds: 1.90, status: "active" },
        ],
      },
    ],
  },

  // ==========================================
  // 5. ESPORTS (CS2, DOTA 2, VALORANT)
  // ==========================================
  {
    id: "match-esports-01",
    sport: "esports",
    sportName: "Esports",
    league: "CS2 Blast Premier World Final",
    country: "Global",
    countryCode: "EU",
    isLive: true,
    status: "live",
    startTime: "Live In-Play",
    liveMinute: 42,
    period: "Map 2 (Mirage)",
    homeTeam: {
      id: "faze",
      name: "FaZe Clan",
      shortName: "FAZE",
      score: 1,
      subScore: "Map 1: 13-9 • Map 2: 10-7",
    },
    awayTeam: {
      id: "navi",
      name: "Natus Vincere",
      shortName: "NAVI",
      score: 0,
      subScore: "Map 1: 9-13 • Map 2: 7-10",
    },
    markets: [
      {
        id: "mkt-cs2-winner",
        name: "Match Winner (Best of 3)",
        category: "main",
        selections: [
          { id: "sel-faze-win", name: "FaZe Clan", odds: 1.35, previousOdds: 1.42, status: "active" },
          { id: "sel-navi-win", name: "Natus Vincere", odds: 3.10, previousOdds: 2.85, status: "active" },
        ],
      },
      {
        id: "mkt-total-maps",
        name: "Total Maps (Over/Under 2.5)",
        category: "goals",
        selections: [
          { id: "sel-maps-o25", name: "Over 2.5", odds: 3.20, status: "active" },
          { id: "sel-maps-u25", name: "Under 2.5", odds: 1.33, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-esports-02",
    sport: "esports",
    sportName: "Esports",
    league: "Valorant Champions Tour",
    country: "Global",
    countryCode: "EU",
    isLive: false,
    status: "upcoming",
    startTime: "Tomorrow, 18:00 IST",
    homeTeam: {
      id: "sen",
      name: "Sentinels",
      shortName: "SEN",
    },
    awayTeam: {
      id: "fnc",
      name: "Fnatic",
      shortName: "FNC",
    },
    markets: [
      {
        id: "mkt-val-winner",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-sen-win", name: "Sentinels", odds: 1.88, status: "active" },
          { id: "sel-fnc-win", name: "Fnatic", odds: 1.88, status: "active" },
        ],
      },
      {
        id: "mkt-val-maps",
        name: "Handicap Maps (+1.5)",
        category: "handicap",
        selections: [
          { id: "sel-sen-hd", name: "Sentinels (+1.5)", odds: 1.40, status: "active" },
          { id: "sel-fnc-hd", name: "Fnatic (-1.5)", odds: 2.75, status: "active" },
        ],
      },
    ],
  },

  // ==========================================
  // 6. TABLE TENNIS (WTT CHAMPIONS)
  // ==========================================
  {
    id: "match-tt-01",
    sport: "table-tennis",
    sportName: "Table Tennis",
    league: "WTT Champions",
    country: "China",
    countryCode: "EU",
    isLive: true,
    status: "live",
    startTime: "Live Game 5",
    liveMinute: 28,
    period: "Game 5",
    homeTeam: {
      id: "fan",
      name: "Fan Zhendong",
      shortName: "FAN",
      score: 2,
      subScore: "11-8, 9-11, 11-7, 8-11, (10-9*)",
    },
    awayTeam: {
      id: "ma",
      name: "Ma Long",
      shortName: "MA",
      score: 2,
      subScore: "8-11, 11-9, 7-11, 11-8, (9-10)",
    },
    markets: [
      {
        id: "mkt-tt-win",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-fan-w", name: "Fan Zhendong", odds: 1.45, status: "active" },
          { id: "sel-ma-w", name: "Ma Long", odds: 2.65, status: "active" },
        ],
      },
      {
        id: "mkt-tt-pts",
        name: "Game 5 Total Points (Over/Under 20.5)",
        category: "goals",
        selections: [
          { id: "sel-tt-o", name: "Over 20.5", odds: 1.95, status: "active" },
          { id: "sel-tt-u", name: "Under 20.5", odds: 1.80, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-tt-02",
    sport: "table-tennis",
    sportName: "Table Tennis",
    league: "WTT Finals",
    country: "Japan",
    countryCode: "EU",
    isLive: false,
    status: "upcoming",
    startTime: "Today, 18:30 IST",
    homeTeam: {
      id: "wang",
      name: "Wang Chuqin",
      shortName: "WAN",
    },
    awayTeam: {
      id: "harimoto",
      name: "Tomokazu Harimoto",
      shortName: "HAR",
    },
    markets: [
      {
        id: "mkt-tt2-win",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-wan-w", name: "Wang Chuqin", odds: 1.38, status: "active" },
          { id: "sel-har-w", name: "Tomokazu Harimoto", odds: 2.90, status: "active" },
        ],
      },
      {
        id: "mkt-tt2-sets",
        name: "Total Games (Over/Under 5.5)",
        category: "goals",
        selections: [
          { id: "sel-tt2-o", name: "Over 5.5", odds: 1.70, status: "active" },
          { id: "sel-tt2-u", name: "Under 5.5", odds: 2.05, status: "active" },
        ],
      },
    ],
  },

  // ==========================================
  // 7. UFC / MMA
  // ==========================================
  {
    id: "match-mma-01",
    sport: "mma",
    sportName: "UFC / MMA",
    league: "UFC 312 Championship",
    country: "USA",
    countryCode: "US",
    isLive: true,
    status: "live",
    startTime: "Live Round 3",
    liveMinute: 12,
    period: "Round 3",
    homeTeam: {
      id: "omalley",
      name: "Sean O'Malley",
      shortName: "OMA",
      score: 1,
      subScore: "Significant Strikes: 64",
    },
    awayTeam: {
      id: "merab",
      name: "Merab Dvalishvili",
      shortName: "DVA",
      score: 1,
      subScore: "Takedowns: 6/11",
    },
    markets: [
      {
        id: "mkt-mma-win",
        name: "Bout Winner",
        category: "main",
        selections: [
          { id: "sel-oma-w", name: "Sean O'Malley", odds: 2.10, status: "active" },
          { id: "sel-dva-w", name: "Merab Dvalishvili", odds: 1.74, status: "active" },
        ],
      },
      {
        id: "mkt-mma-dist",
        name: "Fight To Go The Distance",
        category: "goals",
        selections: [
          { id: "sel-dist-y", name: "Yes (To Distance)", odds: 1.45, status: "active" },
          { id: "sel-dist-n", name: "No (Stoppage)", odds: 2.70, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-mma-02",
    sport: "mma",
    sportName: "UFC / MMA",
    league: "UFC 312 Lightweight Title",
    country: "USA",
    countryCode: "US",
    isLive: false,
    status: "upcoming",
    startTime: "Sunday, 08:30 IST",
    homeTeam: {
      id: "mak",
      name: "Islam Makhachev",
      shortName: "MAK",
    },
    awayTeam: {
      id: "tsa",
      name: "Arman Tsarukyan",
      shortName: "TSA",
    },
    markets: [
      {
        id: "mkt-mak-win",
        name: "Fight Winner",
        category: "main",
        selections: [
          { id: "sel-mak-w", name: "Islam Makhachev", odds: 1.30, status: "active" },
          { id: "sel-tsa-w", name: "Arman Tsarukyan", odds: 3.40, status: "active" },
        ],
      },
      {
        id: "mkt-mak-rnd",
        name: "Method of Victory",
        category: "goals",
        selections: [
          { id: "sel-mak-sub", name: "Makhachev by Sub", odds: 2.25, status: "active" },
          { id: "sel-mak-dec", name: "Makhachev by Decision", odds: 2.80, status: "active" },
        ],
      },
    ],
  },

  // ==========================================
  // 8. BADMINTON (BWF WORLD TOUR)
  // ==========================================
  {
    id: "match-bad-01",
    sport: "badminton",
    sportName: "Badminton",
    league: "BWF All England Open",
    country: "United Kingdom",
    countryCode: "GB",
    isLive: true,
    status: "live",
    startTime: "Live Game 2",
    liveMinute: 40,
    period: "Game 2",
    homeTeam: {
      id: "axe",
      name: "Viktor Axelsen",
      shortName: "AXE",
      score: 1,
      subScore: "21-16, (18-17*)",
    },
    awayTeam: {
      id: "shi",
      name: "Shi Yuqi",
      shortName: "SHI",
      score: 0,
      subScore: "16-21, (17-18)",
    },
    markets: [
      {
        id: "mkt-bad-win",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-axe-w", name: "Viktor Axelsen", odds: 1.25, status: "active" },
          { id: "sel-shi-w", name: "Shi Yuqi", odds: 3.75, status: "active" },
        ],
      },
      {
        id: "mkt-bad-pts",
        name: "Game 2 Total Points (Over/Under 39.5)",
        category: "goals",
        selections: [
          { id: "sel-bad-o", name: "Over 39.5", odds: 1.88, status: "active" },
          { id: "sel-bad-u", name: "Under 39.5", odds: 1.88, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-bad-02",
    sport: "badminton",
    sportName: "Badminton",
    league: "BWF World Tour Finals",
    country: "India",
    countryCode: "IN",
    isLive: false,
    status: "upcoming",
    startTime: "Today, 16:30 IST",
    homeTeam: {
      id: "sin",
      name: "PV Sindhu",
      shortName: "SIN",
    },
    awayTeam: {
      id: "an",
      name: "An Se-young",
      shortName: "AN",
    },
    markets: [
      {
        id: "mkt-bad2-win",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-sin-w", name: "PV Sindhu", odds: 2.80, status: "active" },
          { id: "sel-an-w", name: "An Se-young", odds: 1.42, status: "active" },
        ],
      },
      {
        id: "mkt-bad2-games",
        name: "Total Games (Over/Under 2.5)",
        category: "goals",
        selections: [
          { id: "sel-bg2-o", name: "Over 2.5", odds: 2.10, status: "active" },
          { id: "sel-bg2-u", name: "Under 2.5", odds: 1.68, status: "active" },
        ],
      },
    ],
  },

  // ==========================================
  // 9. VOLLEYBALL (FIVB NATIONS LEAGUE)
  // ==========================================
  {
    id: "match-vol-01",
    sport: "volleyball",
    sportName: "Volleyball",
    league: "FIVB Nations League",
    country: "Poland",
    countryCode: "EU",
    isLive: true,
    status: "live",
    startTime: "Live Set 3",
    liveMinute: 55,
    period: "Set 3",
    homeTeam: {
      id: "pol",
      name: "Poland",
      shortName: "POL",
      score: 1,
      subScore: "25-22, 23-25, (22-20*)",
    },
    awayTeam: {
      id: "bra",
      name: "Brazil",
      shortName: "BRA",
      score: 1,
      subScore: "22-25, 25-23, (20-22)",
    },
    markets: [
      {
        id: "mkt-vol-win",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-pol-w", name: "Poland", odds: 1.68, status: "active" },
          { id: "sel-bra-w", name: "Brazil", odds: 2.12, status: "active" },
        ],
      },
      {
        id: "mkt-vol-pts",
        name: "Total Points (Over/Under 184.5)",
        category: "goals",
        selections: [
          { id: "sel-vol-o", name: "Over 184.5", odds: 1.90, status: "active" },
          { id: "sel-vol-u", name: "Under 184.5", odds: 1.90, status: "active" },
        ],
      },
    ],
  },
  {
    id: "match-vol-02",
    sport: "volleyball",
    sportName: "Volleyball",
    league: "FIVB World Championship",
    country: "Italy",
    countryCode: "EU",
    isLive: false,
    status: "upcoming",
    startTime: "Tomorrow, 19:30 IST",
    homeTeam: {
      id: "ita",
      name: "Italy",
      shortName: "ITA",
    },
    awayTeam: {
      id: "usa-vol",
      name: "United States",
      shortName: "USA",
    },
    markets: [
      {
        id: "mkt-vol2-win",
        name: "Match Winner",
        category: "main",
        selections: [
          { id: "sel-ita-w", name: "Italy", odds: 1.55, status: "active" },
          { id: "sel-usa-w", name: "USA", odds: 2.40, status: "active" },
        ],
      },
      {
        id: "mkt-vol2-sets",
        name: "Total Sets (Over/Under 3.5)",
        category: "goals",
        selections: [
          { id: "sel-vs-o", name: "Over 3.5 Sets", odds: 1.45, status: "active" },
          { id: "sel-vs-u", name: "Under 3.5 Sets", odds: 2.65, status: "active" },
        ],
      },
    ],
  },
];

export class MockSportsProvider implements ISportsProvider {
  private matches: NormalizedMatch[] = [...MOCK_NORMALIZED_MATCHES];

  async getMatches(sport?: SportType | "all", isLive?: boolean): Promise<NormalizedMatch[]> {
    let result = this.matches;
    if (sport && sport !== "all") {
      result = result.filter((m) => m.sport === sport);
    }
    if (isLive !== undefined) {
      result = result.filter((m) => m.isLive === isLive);
    }
    return result;
  }

  async getMatchById(id: string): Promise<NormalizedMatch | null> {
    return this.matches.find((m) => m.id === id) || null;
  }

  async getLiveIncidents(matchId: string): Promise<NormalizedMatchIncident[]> {
    const match = await this.getMatchById(matchId);
    return match?.incidents || [];
  }

  async getLiveStats(matchId: string): Promise<NormalizedMatchStats | null> {
    const match = await this.getMatchById(matchId);
    return match?.stats || null;
  }

  async getPitchState(matchId: string): Promise<PitchVisualizerState | null> {
    const match = await this.getMatchById(matchId);
    return match?.pitchState || null;
  }

  // Operator method: Suspend / Reopen Market
  toggleMarketSuspension(matchId: string, marketId: string, suspend: boolean) {
    const match = this.matches.find((m) => m.id === matchId);
    if (!match) return false;
    const market = match.markets.find((m) => m.id === marketId);
    if (!market) return false;
    market.isSuspended = suspend;
    market.selections.forEach((s) => {
      s.status = suspend ? "suspended" : "active";
    });
    return true;
  }
}

export const sportsProvider = new MockSportsProvider();
