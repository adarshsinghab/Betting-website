# Universal Design Ethics, Usability Laws & Architectural Standards
# Binding Instructions for AI Agents & Developers across all sessions

This document codifies the mandatory, universal UI/UX design ethics, cognitive psychology laws, WCAG accessibility rules, and spatial layout architecture followed by world-class software engineers and product designers (PariMatch, Bet365, TradingView, Apple HIG, Material Design 3, Nielsen Norman Group).

**MANDATORY RULE FOR AI AGENTS**: Before designing or modifying any user interface, layout, component, or interaction in this codebase, you MUST strictly adhere to all principles codified below. Failure to maintain these ethical standards is unacceptable.

---

## 1. Spatial Layout Architecture & Independent Viewport Scroll (Zero Parent Drag)

### The Principle
In data-dense, transactional web applications (sportsbooks, crypto/trading terminals, e-commerce checkouts), primary navigation and transactional action panels MUST NEVER scroll off-screen with the parent document.

### The Universal Architecture
1. **Root Viewport Shell**:
   - The outer container must be locked to the viewport: `h-screen w-full flex flex-col overflow-hidden` (using `100dvh` where supported).
   - The root document (`html`, `body`) must NEVER allow whole-page parent drag that scrolls the primary action buttons into oblivion.
2. **Fixed Header & Sub-Navigation**:
   - Header (Brand Logo, Wallet Balance, Search, Deposit CTA) and Sub-Navigation must be pinned with `shrink-0 z-40`.
3. **Independent 3-Column Desktop Grid**:
   - **Left Column (Directory / Sports Menu)**: Pinned height (`shrink-0 h-full overflow-y-auto`). Scrolls internally only if sports categories exceed viewport height.
   - **Center Column (Main Content & Fixtures Feed)**: The **ONLY** element that scrolls through the long feed of matches, tournaments, or games (`flex-1 h-full overflow-y-auto`).
   - **Right Column (Bet Slip / Transaction Ticket)**: Pinned height (`shrink-0 h-full flex flex-col`). Does NOT scroll away. Selections scroll internally, while the Stake input and **"PLACE BET" CTA** remain permanently docked at the bottom of the right panel, 100% visible at zero scroll distance.
4. **Mobile Web App Ergonomics (Natural Thumb Zone)**:
   - On screens `< 1024px`, the right sidebar is hidden.
   - When selections exist in the slip, a **Floating Quick Bet Bar** sits docked directly in the Natural Thumb Zone (`fixed bottom-[70px] inset-x-0 z-30`), providing a 1-tap view of selections, potential return, and immediate `PLACE BET >` trigger.
   - The persistent bottom navigation bar (`fixed bottom-0 inset-x-0 z-40`) anchors Sports, In-Play, elevated Betslip counter, Casino, and Menu.

---

## 2. Universal Human-Computer Interaction (HCI) Laws

### A. Fitts's Law (Target Acquisition & CTA Placement)
- **Law**: The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target.
- **Rules**:
  - Primary CTAs (`PLACE BET`, `DEPOSIT`, `CASHOUT`) must be large, high-contrast, and placed closest to the user's natural resting focus.
  - Interactive touch targets must be at least **44×44px** (Apple HIG) or **48×48px** (WCAG 2.5.8 / Material Design) on mobile devices to prevent mis-clicks.
  - Odds buttons must feature generous click/tap padding (minimum `py-2 px-3`) with clear hover and active states.

### B. Jakob's Law (Mental Models & Interaction Familiarity)
- **Law**: Users spend most of their time on other websites. They expect your site to work like the ones they already know.
- **Rules**:
  - Strictly adhere to established international sportsbook design conventions (PariMatch, Bet365, 1xBet):
    - Team 1 (Home) on left, Team 2 (Away) on right.
    - 1X2 odds buttons clearly segregated in decimal format (e.g., `1.85`, `3.40`, `4.10`).
    - Clicking an odds button instantly toggles selection in the slip with zero page jumps.
    - Selected odds highlighted in brand accent (`#FEE500` electric yellow).
    - Bet Slip clearly separates "My Betslip" from "My Bets" (settled & open wagers).

### C. Hick's Law (Decision Delay & Choice Architecture)
- **Law**: The time it takes to make a decision increases logarithmically with the number and complexity of choices.
- **Rules**:
  - **No Wall-of-Numbers Overcrowding**: Do not flood the screen with 20 columns of raw odds numbers. Show the primary Match Winner / 1X2 market prominently, with a clean `+38 >` indicator to view secondary markets.
  - Group odds logically into tabs: All, Match Winner, Handicap, Over/Under, Half Time.

### D. Miller's Law & Visual Chunking
- **Law**: The average person can only keep 7 ± 2 items in their working memory.
- **Rules**:
  - Information must be chunked into clean visual modules using surface cards (`bg-[#212631]`), subtle borders (`border-[#2E3544]`), and distinct league headers.
  - Do not cram multiple unrelated fixtures into an unstructured list.

### E. Steven Hoober's Mobile Thumb Zone Ergonomics
- **Law**: Over 75% of mobile interactions are single-handed thumb-driven.
- **Rules**:
  - The bottom 30% of the mobile viewport is the "Natural Thumb Zone" (easy reach).
  - Primary navigation, drawer toggles, and betting actions must live in the bottom thumb zone.
  - Never place primary transactional confirmation buttons in the top-left or top-right "hard reach" corners on mobile.

---

## 3. Aesthetic Ethics: Eliminating the "AI-Generated" Look

### Color Theory (PariMatch Slate Palette)
- **NEVER use pitch-black voids** (`#000000`, `#060608`) with glowing neon green/purple outlines. This creates severe visual fatigue and instantly signals amateur AI generation.
- **Use authentic, calm charcoal-slate tokens**:
  - Canvas Base: `#171A21`
  - Elevated Card Surfaces: `#212631`
  - Interactive / Hover Surfaces: `#282D3A` / `#292F3D`
  - Subtle Structural Borders: `#2E3544`
  - High-Contrast Accent: `#FEE500` (PariMatch electric gold/yellow)
  - Primary Text: `#F3F4F6` (calm off-white)
  - Secondary Text / Metadata: `#8E96A6` (readable muted slate)
  - Success / Live: `#10B981` (calm emerald) / `#EF4444` (calm crimson)

### Typography & Numeric Stability
- Use modern Google Fonts (`Inter` for UI, `JetBrains Mono` for tabular figures).
- **Mandatory Tabular Numbers**: Always apply `font-variant-numeric: tabular-nums` (`tabular-nums` in Tailwind) to odds, scores, match clocks, and currency balances so live updates do not cause jitter or layout shift.

### Clean Animations (No Deceptive Flashing)
- Ban artificial flashing gimmicks (`animate-ping`, harsh strobing lights).
- Micro-interactions must be subtle and instantaneous (120ms-180ms ease transitions).

---

## 4. iGaming Regulatory Ethics & Fintech Transparency

1. **Zero Dark Patterns**:
   - Payout calculations must be 100% transparent: `Potential Win = Stake × Total Odds`.
   - Combo booster multipliers must explicitly explain how bonuses are calculated (e.g., `+5% for 3 legs`, `+10% for 4 legs`).
   - No hidden fees, no deceptive pre-selected stakes, no forced opt-ins.
2. **Responsible Gaming by Design**:
   - Visible 18+ compliance badges.
   - Accessible Responsible Gaming controls: Deposit Limits, Session Limits, Self-Exclusion.
3. **Dual Persona Separation (Consumer Face vs Investor Pitch)**:
   - Consumer-facing site must look 100% authentic, real, operational, and trustworthy.
   - Do NOT put "Under Construction" or "Waiting for Funding" banners on the consumer UI.
   - Investor presentation decks and licensing capital roadmaps belong strictly in dedicated presentation modals/drawers (`InvestorPitchModal`).

---

## 5. WCAG 2.2 Accessibility Standards

- **Contrast Ratios**: Minimum 4.5:1 for body text; minimum 3:1 for large text and interactive components.
- **Keyboard Navigation & ARIA**: All modals, drawers, and odds buttons must have descriptive `aria-label` attributes and keyboard focus styling (`focus-visible:ring-2 focus-visible:ring-[#FEE500]`).
- **Semantic HTML**: Proper use of `<main>`, `<aside>`, `<nav>`, `<header>`, `<footer>`, `<button>`, and `<section>`.

---

**EVERY TIME THE AI ASSISTANT RUNS OR EDITS CODE, IT MUST ADHERE TO THIS CODE OF ETHICS.**
