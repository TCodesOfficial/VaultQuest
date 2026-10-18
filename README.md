# VaultQuest

**One launcher for your entire gaming identity — every game, every platform, one dashboard.**

![VaultQuest dashboard](docs/dashboard.png)

VaultQuest is a cross-platform gaming identity and progression tracker. It pulls your levels, achievements, and gamertags out of the walled gardens (Steam, PlayStation, Xbox, mobile) and lands them in one launcher-style dashboard where you can see exactly where you stand on every screen.

Built as the proof-of-concept for the [Build With AI: Basics](https://learn-ai-basics.devpost.com/) hackathon.

---

## The problem

A few months ago I put dozens of hours into *Call of Duty Mobile* — custom camos, levels, achievements. Then I got a gaming PC, logged into the desktop version, and got a fresh account. Level 1. Zero unlocks. The grind started over.

Almost every multi-platform gamer has lived this. Progress stays locked inside Steam, PlayStation Network, Xbox Live, and the app stores. Platform holders like Epic and Activision spend millions on proprietary cross-progression backends; indie and mid-tier studios can't afford to, so they skip cross-save entirely — and players end up with fragmented accounts, or quit when they switch devices.

**VaultQuest is the missing layer:** one place where the player's whole gaming identity lives, and (long-term) a lightweight SDK studios can drop in instead of building cross-platform sync infrastructure themselves.

## Who it's for

- **Multi-platform gamers** — anyone who plays on phone, PC, and console and is tired of five launcher apps just to remember where they left off.
- **Indie/mid-tier studios** (roadmap) — teams that want cross-progression tracking without maintaining per-platform sync backends.

## What it does today (proof of concept)

**Arrival flow**
- Email/password **sign-up and sign-in** (Better Auth, httpOnly cookie sessions), with an explicit sign-in/sign-up toggle.
- First-run **onboarding** (3 slides) and a **guided spotlight tour** over library → analytics → vault — each shown exactly once.

**Library dashboard**
- **34 real games** with store-accurate metadata: short descriptions, genres, achievement totals, and 2–5 real screenshots per game (Steam CDN, App Store, Wikipedia), crossfading as a slideshow on each card.
- **Scroll-driven depth band**: cards animate in at the bottom of the viewport, hold full size through the active band, then counter-tilt and shrink as they exit the top — with a 0.5 opacity floor so nothing ever fully disappears. One rAF scroll engine drives all 34 cards through compositor-only transforms.
- **Library search** (title/genre/gamertag), **5 sort orders** with animated reordering, live "N of 34 tracked" counts.
- **Add Games**: full-screen searchable catalog of popular titles to track.
- **Dark/light theme** with one click, persisted across sessions.

**Game detail drawer**
- Slide-in drawer per game with hero art, description, platform pills, and gamertag identities.
- **Cross-platform analytics**: level-comparison bar chart, achievement-share donut, per-platform stat cards (level, unlocked %, achievement counts, last played), and a "PC leads XBOX by 65 levels" callout.

**Feel and performance**
- Per-card motion personalities (seeded-random entrances, tilt angles, sheen phases) so the grid never feels mechanical.
- Images decode once per session at display size, persist across reloads in IndexedDB, and never re-download from the network.
- Idle frame time was profiled down from ~71 ms to ~26 ms and worst scroll frame from ~3.9 s to ~0.3 s in headless measurement (blend-mode, filter, layer-promotion, and lazy-decode fixes).

![Sign-in](docs/login.png)

![Detail analytics](docs/detail.png)

## Demo

A 1–3 minute walkthrough video is attached to our Devpost submission. Reviewers won't clone the code — the video shows the full flow: sign-up → onboarding → tour → library scroll → search/sort → detail analytics → theme switch.

## Tech stack

| Layer | Choices |
| --- | --- |
| Frontend | React + TypeScript (strict), Vite, Tailwind CSS v4, Framer Motion, react-parallax-tilt |
| Backend | NestJS, versioned REST endpoints (`/api/v1`), modular services (Games, Auth) |
| Auth | Better Auth (Prisma adapter, httpOnly cookie sessions, trusted-origins CORS) |
| Database | Neon serverless PostgreSQL via Prisma ORM, seeded with 34 titles |
| Tooling | npm, tsx, ESLint/tsc typecheck gates |

Architecture is deliberately split: `App/backend` (API + auth + seed) and `App/frontend` (SPA), sharing nothing but the HTTP contract.

## Run it locally

Prerequisites: Node.js 20+, Git, a PostgreSQL database (a free [Neon](https://neon.tech) project works).

```bash
git clone https://github.com/TCodesOfficial/VaultQuest.git
cd VaultQuest
```

**Backend**

```bash
cd App/backend
npm install
cp .env.example .env      # then fill DATABASE_URL, AUTH_SECRET, CORS_ORIGIN
npx prisma db push        # create the schema
npm run db:seed           # seed the 34-game catalog
npm run start:dev         # http://localhost:3001
```

**Frontend** (second terminal)

```bash
cd App/frontend
npm install
cp .env.example .env      # optional — defaults to http://localhost:3001
npm run dev               # http://localhost:5173
```

Open http://localhost:5173 and create an account with any email and an 8+ character password. The sign-in screen pre-fills demo credentials for convenience.

## Planning docs (required by the challenge)

The skill-driven plan that built this repo lives in [`devpost/`):

- [`devpost/scope.md`](devpost/scope.md) — the idea, cut down to a coherent proof of concept
- [`devpost/prd.md`](devpost/prd.md) — the full product definition: journey, behaviors, states, boundaries
- [`devpost/spec.md`](devpost/spec.md) — the technical blueprint: stack, data, components, file structure
- [`devpost/checklist.md`](devpost/checklist.md) — the build checklist and every revision made along the way
- [`devpost/learner-profile.md`](devpost/learner-profile.md) — background and learning goals for this build

## How it was built (plan-first, with AI)

This project was built inside a coding agent using the **Devpost Learn Skill Pack** — a set of reusable skills that interview the idea out of my head before any code exists, then plan, build, and ship it in order:

1. `1-start` — learner profile and working style
2. `2-scope` — the idea sharpened into a bounded proof of concept
3. `3-prd` — product definition with every behavior and edge case (no code talk)
4. `4-spec` — technical blueprint sized to the learner and the deadline
5. `5-build` — ordered build steps, each typechecked, browser-verified, and committed
6. `6-ship` — demo video, public repo, Devpost submission

Every deviation from the original plan is recorded in [`devpost/checklist.md`](devpost/checklist.md) under **Revisions** — the honest changelog of what changed and why after hands-on checks (band tuning, the Better Auth swap, the lag-hunting pass, and more).

## What's next

- **Slice 6 — credentials vault**: per-game login-details storage behind the drawer's "Check Login Details" button.
- **Slice 7 — live progress sync**: WebSocket gateway so level/achievement events update the dashboard without a refresh.
- **Studio SDK** (`@vaultquest/unity`, `@vaultquest/unreal`): telemetry calls that push level/XP/achievement events into the normalization layer.
- **Cross-platform achievement bridge**: map trophies/achievements/gamerscore onto one mastery score.
- **OAuth "Sign in with VaultQuest"** and a mobile companion app.

## What we learned

- **Plan before you build.** The scope → PRD → spec chain meant the agent never had to guess what "done" meant, and rework during the build was rare — every major course-correction (auth rewrite, band re-spec, performance pass) was a documented revision, not a rewrite.
- **Measure, don't guess.** The lag hunt taught us to profile first: CPU self-time and a style-injection bisect found the real culprits (full-viewport blend modes and a 90 px blur on animated orbs) in an afternoon — fixes chosen by feel would have missed them.
- **Persistent caches are cheap wins.** Moving thumbnail decode/resize off the paint path and storing the results in IndexedDB turned every reload into a zero-network start.

## License

[MIT](LICENSE)
