# Project Guidelines & Design Ethics for Betting Bantu

Before performing any UI/UX, styling, or architecture changes in this project, you MUST review and strictly follow the universal design ethics and engineering standards codified below and in `.agents/rules/DESIGN_ETHICS.md`.

## Mandatory Architecture & Design Rules

1. **Independent Viewport Scroll (Zero Parent Drag)**:
   - The desktop shell must be `h-screen overflow-hidden flex flex-col`.
   - Header is pinned (`shrink-0 z-40`).
   - Left Sidebar (sports directory) and Right Bet Slip (transaction panel) MUST remain permanently anchored to the screen (`h-full shrink-0`).
   - The Center feed is the ONLY scrollable element (`overflow-y-auto`).
   - The **"PLACE BET" CTA** and Bet Slip must NEVER scroll out of view when the user scrolls down through match lists.

2. **Mobile Web App Ergonomics (Natural Thumb Zone)**:
   - Persistent bottom navigation bar (`fixed bottom-0 z-40`).
   - Floating quick-action bet bar (`fixed bottom-[70px] z-30`) docked in the bottom thumb zone when selections exist in the slip.
   - Touch targets must be at least 44×44px or 48×48px.

3. **Color Palette & Visuals (PariMatch Slate Theme)**:
   - Base canvas: `#171A21`
   - Card surfaces: `#212631`
   - Borders: `#2E3544`
   - Electric Yellow Accent: `#FEE500`
   - NO pitch-black backgrounds (`#000000`, `#060608`).
   - NO artificial flashing pings (`animate-ping`) or fake spam popups.

4. **Human-Computer Interaction (HCI) Laws**:
   - **Fitts's Law**: Place primary CTAs close to resting thumb/eye focus with large clickable targets.
   - **Jakob's Law**: Follow standard sportsbook conventions (Home on left, Away on right, 1X2 decimal odds).
   - **Hick's Law & Miller's Law**: Avoid overcrowding. Group markets cleanly, show primary 1X2 market prominently with `+38 >` expansion.
   - **Tabular Numerals**: Always use `tabular-nums` for odds, scores, timers, and balances.

5. **Transparency & Trust**:
   - Potential win = Stake × Odds (clear, transparent math).
   - Keep consumer-facing sportsbook 100% operational, real, and trustworthy.
   - Keep investor seed capital pitch in dedicated modals.
