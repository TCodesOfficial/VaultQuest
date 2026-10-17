---
doc: prd
status: approved
---

# VaultQuest — Product Requirements

A universal gaming identity platform where players unify their cross-platform game progress, achievements, and login credentials across mobile, console, and PC in one sleek dashboard.
Source: `scope.md > The Unique Kernel` and `scope.md > The Core Loop`.

## The Core Journey

1. **Arrival & Onboarding**: The user lands on VaultQuest and sees a 3-step introductory story slide deck:
   - *Slide 1 (The Pain)*: Fragmented gaming lives—forgotten passwords, stranded achievements, and losing progress when switching between console, PC, and mobile.
   - *Slide 2 (The Solution)*: Introducing VaultQuest—one identity to hold your gaming accounts, cross-platform progress, and credentials in one hub.
   - *Slide 3 (How it Works)*: Link games, view synchronized progress side-by-side, and retrieve login details whenever needed.
2. **Interactive Tour (Lightweight)**: Upon entering the app, an interactive highlight tour calls out 2–3 key areas (Game Library, Cross-Platform Analytics, and Credentials Vault).
3. **Dashboard Discovery**:
   - *First-time state*: If no games are added, a top banner alerts them and presents a curated "Popular Games" list to add games directly.
   - *Loaded state*: A responsive, scrollable grid of game cards displays registered games with game thumbnails, player gamertags, current levels, and platform badges.
4. **Game Detail & Cross-Platform Comparison**:
   - Tapping any game card opens the Game Detail view displaying the hero game banner, active platforms, and overall player level.
   - Opening the **Cross-Platform Analytics panel** displays side-by-side progress comparisons (e.g., Mobile Level 42 vs. PC Level 12, achievement divergence).
5. **Credentials Vault Access**:
   - In the Game Detail view, clicking the prominent primary **"Check Login Details"** button reveals the stored username and password for each connected platform.
6. **Appearance Customization**:
   - The user can toggle between a sleek Dark Mode and a crisp Light Mode at any time from the navigation bar or profile section.

## Screens and Layout

1. **Onboarding Carousel & Guided Tour Overlay**:
   - Fullscreen modal / carousel with clear navigation controls (Next, Skip, Finish).
   - Lightweight overlay highlighting key dashboard regions with brief callout tips.
2. **Main Dashboard**:
   - **Header / Top Bar**: VaultQuest logo, search placeholder, Dark/Light mode toggle switch, and User Profile badge.
   - **Hero / Notification Bar**: First-use empty-state banner or quick stats counter (total games connected, total achievements, platforms linked).
   - **Game Card Grid**:
     - Desktop: 4–5 cards per row.
     - Tablet: 2–3 cards per row.
     - Mobile: 2 cards per row.
     - Smooth vertical scrolling.
3. **Game Detail View (Modal / View)**:
   - **Hero Header**: High-resolution game cover/thumbnail, title, active platforms (PlayStation, Xbox, PC, Mobile), and player gamertag.
   - **Action Bar**: Primary action button "Check Login Details", plus a toggle for "Cross-Platform Analytics".
   - **Side-by-Side Analytics Drawer / Panel**: Clear visual comparison showing level, achievements unlocked, and play status per platform (e.g., Call of Duty: Mobile vs. PC).
   - **Credentials Reveal Section**: Shows the platform-specific gamertag/username and password with a copy button and mask/reveal toggle.

## Look and Feel

- **Aesthetic**: Futuristic, tech-driven, gamer-focused. Inspired by the sleekness of modern launcher hubs (like Epic Games Launcher) but with soft rounded corners, high aesthetic polish, and neon accents.
- **Color Palette**:
  - *Primary*: Electric/Cyber Blue (`#2563EB` / `#3B82F6`)
  - *Accents*: Vibrant Gold/Yellow (`#F59E0B` / `#FBBF24`)
  - *Dark Theme*: Deep rich dark slate/navy background (`#0B0F19`, `#111827`, `#1F2937`) with glowing borders and subtle glassmorphism.
  - *Light Theme*: Crisp, clean modern light mode (`#F8FAFC`, `#FFFFFF`) with sharp contrast and blue/gold highlights.
- **Geometry & Typography**: Generous rounded corners (`rounded-2xl`, `rounded-xl`), modern clean sans-serif typography (Outfit or Inter style), pill badges for platforms, and micro-interactions on card hover.
- **Motion & Depth**: Living interface — continuous animated background (grid drift, floating glow orbs, light sweep), staggered card entrances, 3D hover tilt with glare, animated progress bars, sheen across thumbnails, and flowing gradient accents. Never static or stale.

## Features and Behavior

### 1. Onboarding & Tour
- As a new player, I want an engaging introduction so that I understand why VaultQuest makes cross-platform gaming effortless.
  - [ ] Three slides illustrate the pain points, solution, and mechanism.
  - [ ] A 2–3 step tour highlights the game grid, detail panel, and credentials button.
  - [ ] "Skip Tour" button allows immediately entering the dashboard.

### 2. Game Library Dashboard
- As a player, I want to see all my games in an attractive card grid so that I get an immediate snapshot of my gaming identity.
  - [ ] Each game card displays cover art thumbnail, title, gamertag, current level, and linked platform icons.
  - [ ] Card layout dynamically scales between 4–5 cards on desktop down to 2 cards on mobile.
  - [ ] Hovering a card gives a subtle lift and neon glow effect.

### 3. Game Detail & Cross-Platform Analytics
- As a cross-platform player, I want to see my progress across each console and PC side by side so that I know what progress exists on each platform.
  - [ ] Clicking a game card opens the detail view with full game stats.
  - [ ] Analytics view clearly contrasts platforms (e.g., Level, achievements unlocked, skins/progress notes).
  - [ ] Demonstrates the classic dilemma (e.g., Call of Duty Mobile vs. PC progression).

### 4. Credentials Vault
- As a player switching devices, I want to view my stored login details so that I never get locked out of my game account.
  - [ ] Clicking "Check Login Details" reveals the saved username and password for that specific game and platform.
  - [ ] Passwords can be toggled between masked (`••••••••`) and visible, with a one-click copy button.

### 5. Theme Switching
- As a user, I want to switch between Dark Mode and Light Mode so that the interface matches my environment.
  - [ ] Top bar provides a toggle switch between Dark and Light mode.
  - [ ] Theme persists during user interaction and re-renders smoothly.

## States and Boundaries

- **First Use / Empty State**: If no games are tracked, a friendly banner informs the user and presents a "Popular Games" section allowing them to add sample titles with one click.
- **Normal Loaded State**: Displays pre-seeded popular titles (e.g., Call of Duty, Fortnite, Apex Legends, Genshin Impact) demonstrating cross-platform variance.
- **Credentials Masked State**: Credentials default to hidden (`••••••••`) until the user clicks "Check Login Details" / unmasks them.
- **Cross-Platform Analytics Active State**: Drawer or comparison view shows side-by-side platform stats.

## Product Decisions

- **Two-phase onboarding**: 3 introductory story slides followed by a concise 2–3 step interactive UI highlight tour, balancing orientation with immediate access.
- **Visual-first game cards**: Rich thumbnails, player gamertags, and platform badges take center stage over dense spreadsheets.
- **Simulated credentials verification**: For the PoC, tapping "Check Login Details" directly unmasks credentials with smooth UX rather than requiring real OS biometric APIs.
- **Dual themes**: Both Dark Mode (gamer aesthetic) and Light Mode supported from the start.

## What We're Building

- Onboarding slide deck (3 slides) + 3-step high-level guided tour.
- Responsive dashboard card grid (desktop to mobile breakpoint handling).
- Game cards featuring thumbnails, gamertags, levels, and platform badges.
- Game detail modal with cross-platform analytics comparison (side-by-side platform breakdown).
- In-app Credentials Vault with reveal/hide and copy functionality.
- First-use empty state with quick-add popular game shortcuts.
- Dark and Light theme toggle.

## Deferred From the POC

- Real biometric or OS keychain verification for password access.
- Automatic live game API synchronization (requires developer studio API partnerships).
- In-depth playtime heatmaps and daily hour telemetry.
- Friend lists, activity feeds, and social leaderboards.

## Possible Later Enhancements

- OAuth-style "Login with VaultQuest" SDK for indie and studio games.
- Cross-platform achievement unification engine (translating PS Trophies to Xbox Gamerscore to Steam Achievements).
- Mobile native companion app via Flutter.

## Non-Goals

- Real password hashing / cryptographic vault service (requires certified auditing beyond PoC scope).
- Automated live game save-file transfers across closed ecosystems (Sony/Microsoft network constraints).

## Open Questions

- None blocking specification. All core journeys, screens, and interactions have been resolved.
