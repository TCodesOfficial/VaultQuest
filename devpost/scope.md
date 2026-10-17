---
doc: scope
status: approved
---

# VaultQuest — Your Gaming Identity, Everywhere

One universal gaming profile that unifies your progress, achievements, and account credentials across every platform you play on.

## The Unique Kernel
Your gaming life is scattered across consoles, PC, and mobile — progress lost, passwords forgotten, achievements stranded. VaultQuest brings it all into one dashboard where your entire gaming identity lives, so switching platforms never means starting over or getting locked out.

## Who It's For
A gamer who plays the same titles across multiple platforms — say, Call of Duty on mobile and PC — and is tired of losing progress, forgetting login credentials, and re-grinding achievements every time they switch. Today they manage it all in their head, in browser password managers that don't understand "games," or they just accept the loss.

## The Core Loop
Open VaultQuest → see all your games in one dashboard with your gamertag, level, and achievements per platform → tap a game to see your cross-platform progress side by side → need a password? It's right there. Come back whenever you switch platforms, add a new game, or just want to see your unified gaming life.

## Inspiration & Identity
Polished and seamless like Netflix/Spotify — fast, visual, card-based. Game cards should feature real cover art and feel premium, not like a spreadsheet. The experience of seeing all your games unified should feel like ownership: "this is MY gaming identity." Think of it as a gaming passport.

## Why This Matters to the Learner
"I was playing Call of Duty Mobile and then I have multiple achievements, skins, and everything. And then I download the game on my PC, but then I have to start from the beginning." The frustration of scattered accounts is personal and real — and building a solution that touches cross-platform data, real-time dashboards, and credential management connects directly to their interest in learning NestJS and microservice patterns.

## What "Working" Looks Like
A new user opens the app, gets a brief polished onboarding explaining the concept, then lands on a dashboard showing their games as beautiful cards — each with cover art, gamertag, current level, platform icons, and achievement count. They tap a game card and see their cross-platform progress side by side (mobile vs. PC), plus their stored login credentials for each platform. The "oh, that's cool" moment: seeing your Call of Duty progress from mobile AND PC unified on one screen, with your gamertag and credentials right there. Data is simulated but the experience is real.

## The POC Boundary
- Brief onboarding flow (2–3 screens explaining the platform)
- Dashboard showing game cards: cover art, gamertag/player name, current level, platform icons, achievement count
- Game detail view: cross-platform progress side by side, achievements per platform
- Credentials vault: stored username and password per game per platform, viewable in the game detail
- Responsive design — looks great on both mobile and desktop screens
- Simulated data (no real game API integrations)

## Tech Stack Preferences (for spec)
- Frontend: React (familiar) or Flutter
- Backend: NestJS (learning goal)
- Database: TBD in spec
- Hosting: learner wants to deploy the app

## Later
- Detailed play metrics (hours played, peak days, platform usage breakdown)
- Search, filter, and sort games
- Cross-platform achievement mapping logic (mobile achievement → PC equivalent)
- Identity verification / biometric auth before showing passwords
- "Login with VaultQuest" — an OAuth-style integration for gaming platforms to adopt
- Real notifications when progress syncs

## Explicitly Cut
- **Real game API integrations** — locked-down ecosystems, each would be its own project
- **Actual cross-platform data syncing** — requires game developer partnerships, not buildable in a PoC
- **Encryption / secure credential storage** — essential for production, not needed to prove the concept
- **Social features** (friends, leaderboards) — cool but not the kernel
