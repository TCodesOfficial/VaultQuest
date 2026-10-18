---
doc: spec
status: approved
---

# VaultQuest — Technical Specification

## How This Works, In Plain Language

VaultQuest is split into two clean halves that talk to each other over the local network:

1. **The React Frontend**: Runs in the player's browser (powered by Vite). It renders the gamer-focused dark/light interface, displays the game card grid, runs the 3-step onboarding and lightweight guided tour, and lets players open games to compare progress and reveal platform passwords.
2. **The NestJS Backend**: A structured server running on Node.js. It organizes its code into dedicated modules (`Auth`, `Games`, `Credentials`, `Prisma`, `EventsGateway`). Every request is prefixed with `/api/v1`.
3. **The Database (Neon PostgreSQL via Prisma)**: Prisma models our game library, cross-platform progress, and player credentials. It connects to a hosted Neon PostgreSQL database.
4. **The Real-Time WebSocket Pipe**: A NestJS Gateway communicates directly with the React client over WebSockets (`ws://`) to broadcast live level-ups and progress synchronization in real time.

This shape decouples the client from the server, giving you hands-on experience with modular backend architecture and live event streaming without drowning in unnecessary distributed infrastructure.

---

## The Core Journey Through the System

Implements `prd.md > The Core Journey`.

1. **App Arrival & Session Check**:
   - The React client boots and hits `GET /api/v1/auth/session`.
   - If no active session exists, it prompts login or displays the 3-slide onboarding modal.
2. **Library Loading**:
   - React queries `GET /api/v1/games`.
   - NestJS `GamesController` forwards to `GamesService`, which queries Prisma for all games and linked platform progress.
   - If empty, the frontend renders the "Popular Games" banner; if populated, it renders the responsive game card grid.
3. **Opening Game Detail & Side-by-Side Analytics**:
   - Clicking a card loads the full platform comparison via `GET /api/v1/games/:id`.
   - React displays the cross-platform drawer comparing Mobile vs. PC vs. Console levels and achievements.
4. **Revealing Credentials**:
   - The user clicks the primary "Check Login Details" button.
   - The frontend calls `GET /api/v1/games/:id/credentials`.
   - NestJS validates the session and returns the credentials, which React displays with mask/unmask and copy toggles.
5. **Real-Time Live Sync**:
   - When game progress changes, NestJS `EventsGateway` pushes a `game:progress_updated` event over WebSockets to React, updating the UI instantly without a page reload.

---

## Stack

- **Frontend**: React 18 with Vite, TypeScript throughout (`strict` mode), Tailwind CSS v4 design system.
  - [Vite Documentation](https://vitejs.dev/) | [Tailwind CSS Docs](https://tailwindcss.com/)
  - Rationale: Ultra-fast dev server; Tailwind utilities give rapid, consistent control over the custom cyberpunk/electric-blue gamer aesthetic, with Framer Motion for choreography and react-parallax-tilt for card depth.
- **Backend**: NestJS 10.x.
  - [NestJS Documentation](https://docs.nestjs.com/)
  - Rationale: Solves the learner's goal of mastering structured enterprise/microservice-ready backend architecture with dependency injection and modules.
- **ORM & Database**: Prisma ORM with Neon PostgreSQL (`@prisma/client`, `prisma`).
  - [Prisma Docs](https://www.prisma.io/docs) | [Neon DB Docs](https://neon.tech/docs)
  - Rationale: Type-safe database queries and migrations against a cloud PostgreSQL instance.
- **Authentication**: Better Auth mounted under `/api/v1/auth` with a 2-hour JWT/session token lifecycle.
  - [Better Auth Documentation](https://better-auth.com/)
  - Tradeoff accepted: If external OAuth or complex provider redirects stall during the hackathon build, a local token session guard acts as a zero-friction fallback.
- **Real-Time Communication**: `@nestjs/websockets` and `@nestjs/platform-socket.io` (Socket.IO client in React).
  - [NestJS WebSockets Docs](https://docs.nestjs.com/websockets/gateways)
  - Rationale: Gives the learner direct hands-on experience with live streaming/event-driven communication patterns.

---

## Where It Runs and How Someone Tries It

- **Local Development Runtime**:
  - Backend runs on `http://localhost:3001`
  - Frontend runs on `http://localhost:5173`
  - Database runs on Neon Cloud PostgreSQL (requires `DATABASE_URL` in `.env`)
- **Start Commands**:
- Backend: `npm run start:dev` (inside `App/backend/`)
- Frontend: `npm run dev` (inside `App/frontend/`)
- **Submission Demo Flow**:
  - Run both servers locally, open `http://localhost:5173`, walk through the onboarding, view the Call of Duty cross-platform progression card, reveal the credentials vault, and demonstrate the dark/light mode toggle.
- **Optional Deployment**:
  - Frontend: Vercel / Netlify
  - Backend: Render / Railway
  - Database: Neon Cloud

---

## Look and Feel

Carries forward `prd.md > Look and Feel`.

- **Aesthetic**: Futuristic, gamer-focused, sleek, and rounded. Inspired by modern game launcher interfaces.
- **Color Palette**:
  - Primary: Electric Blue (`#2563EB`, `#3B82F6`)
  - Accent / Highlights: Vibrant Gold/Yellow (`#F59E0B`, `#FBBF24`)
  - Dark Theme (Default): Deep Slate Navy (`#0B0F19`, `#111827`) with glowing accents
  - Light Theme: Crisp, high-contrast modern light mode (`#F8FAFC`, `#FFFFFF`)
- **Motion & Depth**: Continuous ambient background (drifting blueprint grid, floating gradient orbs, periodic light sweep) fixed behind content; staggered spring entrances for cards (Framer Motion); 3D tilt + blue glare on hover (react-parallax-tilt); animated achievement progress fills; sheen sweep across thumbnails; flowing gradient text/brand accents. Honors `prefers-reduced-motion`.
- **Styling Method**: Tailwind CSS v4 utilities (theme tokens defined in `index.css > @theme`) for layout and components; keyframe-driven CSS classes for ambient motion that utilities can't express.

---

## Components

### 1. `OnboardingModal`
Implements `prd.md > Features and Behavior > 1. Onboarding & Tour`.
- 3-slide modal walking through Pain → Solution → How it works.
- Includes step pagination dots, "Skip", and "Get Started" buttons.

### 2. `GuidedTour`
Implements `prd.md > Features and Behavior > 1. Onboarding & Tour`.
- Lightweight spotlight overlay pointing to (1) Library, (2) Analytics, and (3) Credentials Vault.

### 3. `Navbar`
Implements `prd.md > Screens and Layout > 2. Main Dashboard`.
- Houses VaultQuest brand logo, user session avatar/status, and the Dark/Light mode theme toggle.

### 4. `GameCardGrid` & `GameCard`
Implements `prd.md > Features and Behavior > 2. Game Library Dashboard`.
- Responsive CSS grid (4–5 on desktop, 2–3 on tablet, 2 on mobile).
- Renders cover art thumbnail, title, gamertag, current level, platform icons, and hover glow.

### 5. `GameDetailPanel`
Implements `prd.md > Features and Behavior > 3. Game Detail & Cross-Platform Analytics`.
- Displays hero banner, active platforms list, and overall player rank.
- Houses the primary action button "Check Login Details" and the trigger for cross-platform analytics.

### 6. `CrossPlatformAnalytics`
Implements `prd.md > Features and Behavior > 3. Game Detail & Cross-Platform Analytics`.
- Side-by-side visual drawer contrasting level progression and unlocked achievements across platforms (e.g. Call of Duty Mobile vs. PC).

### 7. `CredentialsVault`
Implements `prd.md > Features and Behavior > 4. Credentials Vault`.
- Secure in-app credential display with mask (`••••••••`) toggle and 1-click clipboard copy for username/password.

---

## Data Model

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String    @id @default(uuid())
  email     String    @unique
  name      String
  avatar    String?
  createdAt DateTime  @default(now())
  sessions  Session[]
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model Game {
  id          String                 @id @default(uuid())
  title       String
  slug        String                 @unique
  thumbnail   String
  description String
  platforms   GamePlatformProgress[]
  credentials GameCredential[]
  createdAt   DateTime               @default(now())
}

model GamePlatformProgress {
  id                 String   @id @default(uuid())
  gameId             String
  game               Game     @relation(fields: [gameId], references: [id], onDelete: Cascade)
  platform           String   // "PLAYSTATION" | "XBOX" | "PC" | "MOBILE"
  gamertag           String
  level              Int
  achievementsCount  Int
  totalAchievements  Int
  lastPlayed         DateTime @default(now())
}

model GameCredential {
  id        String   @id @default(uuid())
  gameId    String
  game      Game     @relation(fields: [gameId], references: [id], onDelete: Cascade)
  platform  String   // "PLAYSTATION" | "XBOX" | "PC" | "MOBILE"
  username  String
  password  String
  updatedAt DateTime @updatedAt
}
```

---

## File Structure

```
VaultQuest/
├── App/
│   ├── backend/
│   │   ├── prisma/
│   │   │   ├── schema.prisma        # Database models for Neon
│   │   │   └── seed.ts              # Seed data for demo games
│   │   ├── src/
│   │   │   ├── auth/                # Session auth (login / session / logout)
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.controller.ts
│   │   │   ├── games/               # Games & Progress management
│   │   │   │   ├── games.module.ts
│   │   │   │   ├── games.service.ts
│   │   │   │   └── games.controller.ts
│   │   │   ├── credentials/         # Credentials vault service
│   │   │   │   ├── credentials.module.ts
│   │   │   │   ├── credentials.service.ts
│   │   │   │   └── credentials.controller.ts
│   │   │   ├── events/              # NestJS WebSocket Gateway
│   │   │   │   ├── events.module.ts
│   │   │   │   └── events.gateway.ts
│   │   │   ├── prisma/              # Prisma database client service
│   │   │   │   ├── prisma.module.ts
│   │   │   │   └── prisma.service.ts
│   │   │   ├── app.module.ts        # Root NestJS module
│   │   │   └── main.ts              # Server bootstrap (sets global /api/v1 prefix)
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── LoginScreen.tsx
│       │   │   ├── OnboardingModal.tsx
│       │   │   ├── GuidedTour.tsx
│       │   │   ├── Navbar.tsx
│       │   │   ├── GameCard.tsx
│       │   │   ├── GameCardGrid.tsx
│       │   │   ├── GameDetailPanel.tsx
│       │   │   ├── CrossPlatformAnalytics.tsx
│       │   │   └── CredentialsVault.tsx
│       │   ├── services/
│       │   │   └── api.ts           # Fetch wrapper for /api/v1 (+ auth calls)
│       │   ├── App.tsx
│       │   ├── index.css
│       │   └── main.tsx
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── devpost/                     # Hackathon learning workspace
└── .gitignore
```

---

## External Services and Dependencies

- **Neon Cloud PostgreSQL**:
  - Connection string format: `postgresql://user:pass@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require`
  - Free tier: 0.5 GB storage, instant serverless spin-up.
- **Dependencies (Backend)**:
  - `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/websockets`, `@nestjs/platform-socket.io`
  - `@prisma/client`, `prisma`
  - `socket.io`
- **Dependencies (Frontend)**:
  - `react`, `react-dom`
  - `socket.io-client`
  - `lucide-react` (clean modern icons for gaming platforms, keys, locks, sun/moon)

---

## Important Failure Modes

1. **Neon Database Network Timeout / Missing Credentials**:
   - *Fallback*: If `DATABASE_URL` is unreachable or missing during initial run, `PrismaService` flags a clear console notice and initializes an in-memory fallback seed so the frontend can still demo without crashing.
2. **WebSocket Disconnection**:
   - *Fallback*: The React client gracefully reconnects in the background; UI falls back to standard REST fetching without interrupting the user.
3. **Missing Credentials for a Game Platform**:
   - *Fallback*: Detail view displays "No credentials stored for this platform yet" with an "Add Credentials" button instead of an error state.

---

## What Was Simplified and Why

- **Simulated Biometric Gate**: Instead of native WebAuthn/fingerprint hardware prompts, clicking "Check Login Details" triggers a sleek in-app authentication prompt and reveals the password. Biometric integration adds complex platform constraints that don't change the user experience.
- **Mocked Cross-Platform Telemetry**: Real Sony/Microsoft/Steam APIs are gated behind developer verification. We seed realistic Call of Duty, Fortnite, and Apex Legends cross-platform progression to demonstrate the exact UX.

---

## Decisions and Open Issues

### Decisions Made:
- **Architecture**: Separated NestJS backend (`http://localhost:3001`) and React Vite frontend (`http://localhost:5173`) with `/api/v1` global prefix.
- **Database**: Prisma connecting to Neon PostgreSQL, backed by local seed data.
- **Session Lifespan**: 2-hour session expiration with active session verification.
- **Live Sync**: NestJS WebSocket Gateway for real-time progress events.

### Genuine Learner Unknown Addressed:
- **Connecting Better Auth, Prisma, Neon, and NestJS without confusion**: We structured the backend into modular units (`AuthModule`, `PrismaModule`, `GamesModule`). `PrismaService` encapsulates the database connection cleanly, and Better Auth / Session management operates through standard NestJS middleware without polluting controllers.
