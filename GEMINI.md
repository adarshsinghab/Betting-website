# Project Directives: Universal Design Ethics & Engineering Standards

Every time an AI assistant or developer operates on this project, adhere strictly to the following standards:

1. **Independent 3-Column Shell**:
   - The desktop layout must maintain a locked viewport shell (`h-screen overflow-hidden flex flex-col`).
   - The Left sports navigation directory and Right Bet Slip (with its primary "PLACE BET" CTA) must NEVER scroll away with the parent document. Only the center match feed scrolls.
2. **Mobile Web App Thumb-Zone**:
   - Bottom app navigation bar (`fixed bottom-0`).
   - Floating quick-action bet bar (`fixed bottom-[70px]`) docked in the natural thumb zone whenever selections are in the slip.
3. **PariMatch Dark Slate Palette**:
   - Background `#171A21`, cards `#212631`, borders `#2E3544`, electric yellow accent `#FEE500`. No deep pitch-black or artificial neon glows.
4. **HCI Laws**:
   - Fitts's Law (large 44-48px touch targets), Jakob's Law (industry standard 1X2 layout), Hick's Law (anti-overcrowding, chunked markets).
   - Use `tabular-nums` for all odds and numbers.
5. **Detailed Reference**:
   - Full documentation is codified in `.agents/rules/DESIGN_ETHICS.md`.
