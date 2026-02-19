# QuestLife - Gamified Habit Tracker

A Habitica-inspired React Native app that turns your daily habits, routines, and tasks into a rewarding RPG experience.

## Features

- **Habits**: Track flexible behaviors with positive (+) and negative (-) actions
- **Dailies**: Scheduled repeating tasks with streak tracking
- **To-Dos**: One-time tasks that persist until completed
- **Gamification**: XP, levels, gold, and health system
- **Persistent Storage**: All data saved locally with Redux Persist

## Tech Stack

- **React Native** (Expo managed workflow)
- **TypeScript** (strict mode)
- **Redux Toolkit** (state management)
- **React Navigation** (Material Top Tabs)
- **AsyncStorage** + Redux Persist (data persistence)

## Getting Started

### Prerequisites

- Node.js >= 18 (recommended >= 20)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd windsurf-project-5

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
├── components/          # Reusable UI components
│   ├── TaskCard.tsx     # Base card component
│   ├── HabitCard.tsx    # Habit-specific card with +/- controls
│   ├── DailyCard.tsx    # Daily card with checkbox and streak
│   ├── TodoCard.tsx     # To-do card with checkbox
│   ├── StatsBar.tsx     # Player stats display (HP, XP, Gold)
│   └── AddButton.tsx    # Add new task button
├── screens/             # Screen components
│   ├── HabitsScreen.tsx
│   ├── DailiesScreen.tsx
│   └── TodosScreen.tsx
├── store/               # Redux store and slices
│   ├── index.ts         # Store configuration
│   ├── hooks.ts         # Typed Redux hooks
│   ├── habits/          # Habits slice and selectors
│   ├── dailies/         # Dailies slice and selectors
│   ├── todos/           # Todos slice and selectors
│   └── player/          # Player stats slice and selectors
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx
├── constants/           # Theme and constants
│   └── theme.ts
└── types/               # TypeScript types
    └── index.ts
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

## Future Enhancements

- [ ] Character customization with sprite assets
- [ ] Rewards shop with gold purchases
- [ ] Daily reset with missed task penalties
- [ ] Animations and sound effects
- [ ] Cloud sync / user accounts
- [ ] Social features (parties, challenges)

## License

MIT
