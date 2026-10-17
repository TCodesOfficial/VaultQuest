---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [x] **1. Bootstrapped dashboard with live game cards**
  Becomes usable: Both servers run; opening the app shows the VaultQuest dashboard with a responsive grid of seeded game cards (thumbnail, title, gamertag, level, platform badges). Nothing persists yet.
  Why now: Carries all bootstrapping (NestJS + Vite scaffolds, `/api/v1` wiring, dependencies) inside a slice that already delivers the main screen — no standalone "setup" step. Proves the React → NestJS HTTP path, the first integration risk, and every later slice lands in a working structure.
  PRD ref: `prd.md > The Core Journey` (steps 1, 3), `prd.md > Screens and Layout` (Main Dashboard), `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack`, `spec.md > File Structure`, `spec.md > Components` (Navbar, GameCardGrid, GameCard), `spec.md > Where It Runs and How Someone Tries It`
  Build: Create `backend/` NestJS app (main.ts on port 3001, global prefix `/api/v1`, GamesModule with in-memory seed data shaped like the spec's Prisma models) and `frontend/` Vite React app (port 5173, fetch from the API). Implement Navbar (logo + placeholder theme toggle slot), GameCardGrid, GameCard with hover glow; dark-theme CSS custom properties per Look and Feel. `GET /api/v1/games` returns the seed.
  Verify (mechanical): Backend starts (`npm run start:dev`) and `curl http://localhost:3001/api/v1/games` returns seed JSON; frontend starts (`npm run dev`) with no console errors and renders the expected number of cards.
  Learner check: Open http://localhost:5173 — you should see the dark VaultQuest dashboard with game cards. Does it feel like the launcher aesthetic we planned?
  Commit: `Scaffold full-stack app with game card dashboard`

- [x] **2. Empty state and popular-games quick-add**
  Becomes usable: With zero games, a designed banner offers a curated "Popular Games" list to add in one click.
  Why now: The learner pulled this forward from its original slot — the empty-library arrival experience matters to them and it finishes the dashboard's promised states before the data layer lands. Reordered from slice 6 (see Revisions).
  PRD ref: `prd.md > Features and Behavior` (2. Game Library Dashboard), `prd.md > States and Boundaries` (First Use / Empty State)
  Spec ref: `spec.md > Components` (GameCardGrid)
  Build: Empty-array branch in the dashboard with the alert banner and Popular Games list wired to `POST /api/v1/games`.
  Verify (mechanical): Remove seed data → empty banner appears; add a popular game → its card appears.
  Learner check: Start from an empty library and add a game from Popular Games. Is the flow smooth?
  Commit: `Add empty state and popular-games quick-add`

- [x] **3. Games and platform progress persist across restarts**
  Becomes usable: The same dashboard data now comes from the database; restarting the backend keeps every game and its per-platform progress intact.
  Why now: Prisma + Neon + NestJS integration is the exact "nightmare" you want to master — proving it second means every later feature builds on a working data layer. This is also where the kernel's data shape (one game, many platforms) lands for real.
  PRD ref: `prd.md > The Core Journey` (step 3), `prd.md > States and Boundaries` (Normal Loaded State)
  Spec ref: `spec.md > Data Model`, `spec.md > External Services and Dependencies`, `spec.md > Important Failure Modes` (1)
  Build: Add `prisma/schema.prisma` per spec (User, Session, Game, GamePlatformProgress, GameCredential); PrismaService with a clear connection check and the spec's in-memory fallback if `DATABASE_URL` is missing/unreachable; `seed.ts` with Call of Duty, Fortnite, Apex Legends, and Genshin Impact including cross-platform progress rows; point GamesService at Prisma.
  Verify (mechanical): `npx prisma db push` (or migrate) succeeds, or the fallback logs clearly and seed data still loads; restart backend; `GET /api/v1/games` returns the same multi-platform data; seed is repeatable without duplicates.
  Learner check: Restart the backend, reload the page, and confirm your games and platform levels are all still there.
  Commit: `Persist games and platform progress with Prisma`

- [ ] **4. Cross-platform comparison — the kernel moment**
  Becomes usable: Clicking a game card opens the detail modal with hero banner, active platforms, gamertag, and a side-by-side analytics view contrasting levels and achievements per platform (e.g., COD Mobile Level 42 vs PC Level 12).
  Why now: This is the unique kernel from the scope — the unified-identity "oh, that's cool" moment. It comes early so its feel can steer the remaining build (auth, vault, polish).
  PRD ref: `prd.md > The Core Journey` (step 4), `prd.md > Features and Behavior` (3. Game Detail & Cross-Platform Analytics), `prd.md > Screens and Layout` (Game Detail View)
  Spec ref: `spec.md > Components` (GameDetailModal, CrossPlatformAnalytics), `spec.md > The Core Journey Through the System` (step 3)
  Build: `GET /api/v1/games/:id` returns the game plus platform progress; GameDetailModal and CrossPlatformAnalytics components; card click opens the modal; Escape/backdrop closes it.
  Verify (mechanical): `curl http://localhost:3001/api/v1/games/:id` returns the progress array; modal renders in the browser with both platforms compared; console clean.
  Learner check: Open Call of Duty from the grid — do the Mobile vs PC levels and achievements show side by side the way you pictured?
  Commit: `Add game detail modal with cross-platform analytics`

- [ ] **5. Session auth, onboarding slides, and guided tour**
  Becomes usable: A first visit shows the 3-slide onboarding story then the lightweight spotlight tour; the backend issues and verifies sessions (`/api/v1/auth`), and a minimal login establishes that session.
  Why now: The credentials vault (next slice) must sit behind a session per the core journey, and onboarding is the arrival step — worth trying while there is still time to adjust its feel.
  PRD ref: `prd.md > The Core Journey` (steps 1–2), `prd.md > Features and Behavior` (1. Onboarding & Tour)
  Spec ref: `spec.md > Components` (OnboardingModal, GuidedTour), `spec.md > Stack` (Authentication), `spec.md > File Structure` (auth/)
  Build: AuthModule per spec mounted under `/api/v1/auth` with 2-hour session lifecycle; if Better Auth stalls, fall back to the spec's simple token session guard. Frontend: session check on boot, minimal login screen, OnboardingModal (3 slides, pagination dots, Skip, Get Started), GuidedTour spotlight over Library → Analytics → Credentials Vault; session token stored client-side.
  Verify (mechanical): Login returns a token; `GET /api/v1/auth/session` returns the user with a valid token and rejects without one; onboarding renders 3 slides and Skip reaches the dashboard; tour highlights fire once per session.
  Learner check: Reload the app fresh — walk the onboarding and tour, then log in. Does the arrival flow feel polished, or clunky anywhere?
  Commit: `Add session auth with onboarding and guided tour`

- [ ] **6. Credentials vault**
  Becomes usable: From a game's detail view, the primary "Check Login Details" button (session required) reveals per-platform username and password with mask/unmask toggle and one-click copy.
  Why now: Completes the core journey's credential-retrieval promise on top of the session guard and detail modal that already exist.
  PRD ref: `prd.md > The Core Journey` (step 5), `prd.md > Features and Behavior` (4. Credentials Vault)
  Spec ref: `spec.md > Components` (CredentialsVault), `spec.md > The Core Journey Through the System` (step 4), `spec.md > Data Model` (GameCredential)
  Build: `GET /api/v1/games/:id/credentials` behind the session guard; seed GameCredential rows for the demo games; CredentialsVault UI inside the detail modal with masked-by-default passwords (`••••••••`) and clipboard copy; "No credentials stored for this platform yet" fallback per failure mode 3.
  Verify (mechanical): Endpoint rejects requests without a session and returns rows with one; passwords render masked in the DOM until toggled; copy action puts the value on the clipboard (toast or state change observed).
  Learner check: Reveal credentials for a game — mask, unmask, and copy each work? Does it feel secure-but-effortless like we wanted?
  Commit: `Add session-protected credentials vault`

- [ ] **7. Live progress sync over WebSockets**
  Becomes usable: A progress change on the server pushes `game:progress_updated` over Socket.IO, and the open dashboard updates the affected card/detail without a page reload. A demo trigger is included.
  Why now: Real-time patterns are a primary learning goal and this slice slots in once the REST kernel is stable — placed last so a time crunch loses the stretch goal, not the product. Graceful REST fallback is easiest to verify with a complete UI already in place.
  PRD ref: `prd.md > The Core Journey` (keeps the synchronized-progress picture current; the transport comes from the approved spec)
  Spec ref: `spec.md > The Core Journey Through the System` (step 5), `spec.md > Stack` (Real-Time Communication), `spec.md > Components` (EventsGateway), `spec.md > Important Failure Modes` (2)
  Build: NestJS EventsGateway broadcasting `game:progress_updated`; emit when progress changes; frontend socket.io-client with background reconnect; demo trigger (endpoint or seeded event); live card/detail refresh.
  Verify (mechanical): Client connects; trigger a server-side emit and observe the UI update without reload; stop the backend and confirm the UI keeps working via REST with no crash (failure mode 2).
  Learner check: Leave the app open, trigger a progress update, and watch the level change live. What do you notice?
  Commit: `Add WebSocket gateway with live progress updates`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 4 (cross-platform comparison running): grid, detail modal, analytics
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence:
Route and stops:
Edit outcome:
Reflection:
Activity mode:

## Revisions

- Frontend moved to TypeScript across the entire codebase (strict mode, `.tsx`/`.ts`) — the learner clarified that all code must be TypeScript; `spec.md > Stack` and `spec.md > File Structure` were updated from the original "typescript or javascript" / `.jsx` layout to match.
- Slice-1 visuals overhauled after the learner's first hands-on check: continuous ambient background (grid drift, floating orbs, light sweep), staggered spring card entrances, 3D tilt + glare on hover, animated achievement bars, per-platform pill colors, and richer thumbnails. `.env.example` templates added for both apps with `PORT`/`CORS_ORIGIN`/`DATABASE_URL`/`AUTH_SECRET` (backend) and `VITE_API_BASE_URL`/`VITE_WS_URL` (frontend), wired into `main.ts` and `api.ts`.
- Styling moved from Vanilla CSS to **Tailwind CSS v4** (+ `@tailwindcss/vite`) at the learner's direction; `spec.md > Stack` and `spec.md > Look and Feel` updated accordingly. MUI (Google Material) evaluated and skipped — Material's look conflicts with the custom gamer aesthetic; Tailwind + Framer Motion + react-parallax-tilt cover the visual-fidelity goal.
- App rename resolved — the learner chose **VaultQuest**; the working name (the learner's own name) was replaced across the UI, page title, and all planning docs.
- Workflow preference: during development, verify with typecheck + running dev servers only — no production `build` commands (learner instruction).
- Theme toggle pulled forward from slice 6 into the slice-1 visual pass (learner wanted it working immediately); slice 6 now covers empty state + quick-add only. Implemented as an `html.light` class + Tailwind `light:` variant, persisted in `localStorage` under `app-theme`.
- Game cards reworked to full-bleed thumbnail art behind the whole card with a blurred (`backdrop-blur`) scrimmed text panel for readability; Tilt wrapper clipped to `rounded-3xl` so glare/highlights can no longer bleed outside the card's rounded corners; card-frame background-clip corrected so the gradient ring respects the radius.
- Semantic theme tokens introduced — `@theme inline` maps `primary` / `primary-strong` / `secondary` / `tertiary` / `highlight` / `success` / `surface` / `surface-raised` / `surface-glass` / `on-surface` / `on-surface-secondary` / `on-surface-muted` / `outline` onto CSS variables that flip under `html.light`, so components use role-based utilities instead of hard-coded colors; raw palette retained only for decorative art (scene, cover fallbacks, glare).
- Game cards now render real per-game cover art from the web: the SVG placeholders under `frontend/public/covers/` were rejected and deleted; the seed's 15 games (up from 4) carry verified hotlinked thumbnail URLs — Steam CDN `library_600x900.jpg` for the 10 Steam titles and RAWG `media.rawg.io` og:image URLs (1280px resize) for Fortnite, Genshin Impact, Minecraft, Valorant, and Roblox (IGDB is Cloudflare-blocked, RAWG chosen instead). Every URL was HEAD-verified (HTTP 200, image/jpeg) before insertion; card art uses `game.thumbnail` with the gradient+initials treatment kept only as fallback.
- Cover-art visibility bug fixed: a leftover `.game-thumb { position: relative; }` rule in `index.css` was overriding Tailwind's `absolute` on the art layer (unlayered custom CSS beats Tailwind v4's layered utilities), collapsing the art div to zero height — so card art never painted, for the SVG covers or the web URLs. Rule removed; the `::before`/`::after` sheen decorations still position correctly inside the now-correctly-sized absolute parent.
- Slice plan reordered at the learner's request: the original slice 6 (empty state + popular-games quick-add) moved up to **slice 2**, right after the dashboard; persistence/auth/vault shifted down one slot (2→3, 3→4, 4→5, 5→6), WebSockets stays 7. Reason: the learner wants the first-run arrival experience early in the build.
- Slice-1 visual iterations after hands-on checks: bottom glass panel removed from cards (art now full-bleed with hover-darken reveal), desktop game name moved to a centered bottom chip with details revealing above it on hover, mobile always shows details (no hover on touch), hero section introduced and compacted (centered, full-width, staggered blur-in), navbar/loading/error states animate in.
- "My Games" section heading added above the card grid (with a "N tracked" count chip) so the learner's ownership framing is visible in the UI.
- Full-screen add-games experience: the popular-games picker went from a centered modal to a full-screen searchable catalog (search input with live filtering + clear, responsive tile grid) at the learner's direction.
- Forward expectation recorded (learner, deferred to later phases): after adding a game, the flow should eventually carry the user into that game's details / platform sign-in — maps onto slice 4 (game detail), slice 5 (auth/login), slice 6 (credentials vault); consider connecting the picker's "Added" state to opening the game's detail view when those land.
