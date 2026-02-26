# Life In Character - Gamified Habit Tracker

A Habitica-inspired React Native app that turns your daily habits, routines, and tasks into a rewarding RPG experience with full character customization.

## Features

### Task Management
- **Habits**: Track flexible behaviors with positive (+) and negative (-) actions, with notes
- **Dailies**: Scheduled repeating tasks with streak tracking and auto-reset
- **To-Dos**: One-time tasks with optional due dates

### Gamification
- **XP & Leveling**: Earn XP from tasks, level up every 100 XP
- **Gold Currency**: Earn gold from tasks, spend in the rewards shop
- **Health System**: Lose HP for missed dailies or negative habits

### Character System
- **Avatar Customization**: Skin tones, hair styles/colors, shirts, body types
- **Equipment Display**: Equipped armor, helmets, and weapons render on avatar
- **Pets**: Companion pets displayed beside your character (25 available)

### Rewards Shop
- **4 Item Categories**: Armor (🛡️), Head (👑), Weapons (⚔️), Pets (🐾)
- **56 Purchasable Items**: Class weapons, armor sets, exotic pets
- **Equip System**: Buy and equip items to customize your character

### Data Persistence
- All data saved locally with Redux Persist + AsyncStorage
- Survives app restarts

## Tech Stack

- **React Native** with Expo SDK 54 (managed workflow)
- **TypeScript** (strict mode, all .ts/.tsx)
- **Redux Toolkit** (6 feature slices)
- **Redux Persist** + AsyncStorage
- **React Navigation** (Material Top Tabs)

## Getting Started

### Prerequisites

- Node.js >= 18 (recommended >= 20)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/LeoZaiTech/Life-In-Character.git
cd Life-In-Character

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
src/
├── assets/              # Sprite assets and mapping
│   └── spriteMap.ts     # 460+ sprite keys
├── components/          # Reusable UI components
│   ├── TaskCard.tsx     # Base card with notes support
│   ├── HabitCard.tsx    # Habit card with +/- controls
│   ├── DailyCard.tsx    # Daily card with checkbox and streak
│   ├── TodoCard.tsx     # To-do card with checkbox
│   ├── StatsBar.tsx     # Player stats + avatar display
│   ├── CharacterAvatar.tsx  # Layered sprite renderer
│   └── Checkbox.tsx     # Reusable checkbox component
├── screens/             # Screen components
│   ├── HabitsScreen.tsx
│   ├── DailiesScreen.tsx
│   ├── TodosScreen.tsx
│   ├── CharacterScreen.tsx  # Avatar customization
│   └── RewardsScreen.tsx    # Shop and inventory
├── store/               # Redux store (6 slices)
│   ├── index.ts         # Store + persist config
│   ├── hooks.ts         # Typed useSelector/useDispatch
│   ├── habits/          # Habits slice
│   ├── dailies/         # Dailies slice
│   ├── todos/           # Todos slice
│   ├── player/          # XP, gold, health, level
│   ├── character/       # Avatar customization
│   └── inventory/       # Shop items, equipped gear
├── navigation/          # Tab navigation
├── constants/           # Theme colors, spacing
└── types/               # TypeScript interfaces
```

## Architecture Decisions

### Feature-Based Redux Structure
Each feature (habits, dailies, todos, player) has its own slice and selectors, promoting separation of concerns and scalability.

### Three Task Archetypes
Following Habitica's proven model:
- **Habits**: Flexible, can be positive/negative, unlimited interactions
- **Dailies**: Scheduled, reset daily, streak tracking
- **To-Dos**: Persistent until completed

### Gamification System
| Action | XP | Gold | Health |
|--------|-----|------|--------|
| Complete Daily | +10 | +5 | - |
| Positive Habit | +5 | +2 | - |
| Negative Habit | -5 | - | -5 |
| Complete To-Do | +15 | +10 | - |

**Level Formula**: Level = floor(XP / 100) + 1

## Implemented Features

- [x] Character customization with sprite assets (460+ sprites)
- [x] Rewards shop with gold purchases (56 items)
- [x] Daily reset with missed task penalties
- [x] Pets and weapons system
- [x] Equipment rendering on avatar

## Future Enhancements

- [ ] Animations and sound effects
- [ ] Cloud sync / user accounts
- [ ] Social features (parties, challenges)
- [ ] Achievement system
- [ ] Quest/challenge mode

