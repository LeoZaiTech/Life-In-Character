# React Native App Brainstorming - LevantoHealth Interview

## CHOSEN APP: Habitica Clone - Gamified Habit Tracker

**Decision**: Building a Habitica-inspired gamified habit tracking app
**Rationale**: 
- Personal passion project (building on/off for years)
- Demonstrates complex state management (Redux)
- Gamification shows creativity and engagement thinking
- Wellness-adjacent (relevant to healthcare context)
- Rich UI/UX opportunities for impressive demo

---

## Part 1 — Core Task Architecture (Habitica Model)

Habitica uses 3 distinct task archetypes - this is the KEY architectural insight:

| Type | Purpose | Behavior Pattern | Completion Logic |
|------|---------|------------------|------------------|
| **Habits** | Flexible behaviors | + or - anytime | Incremental scoring |
| **Dailies** | Repeating commitments | Scheduled | Reset daily |
| **To-Dos** | One-time tasks | Persistent | Completed once |

This separation reduces cognitive load and enables different reward mechanics.

---

## Part 2 — Data Models (TypeScript)

### Habit
```typescript
export type Habit = {
  id: string;
  title: string;
  notes?: string;
  positive: boolean;  // allows + action
  negative: boolean;  // allows - action
  score: number;      // gamification metric
  createdAt: string;
};
```

### Daily
```typescript
export type Daily = {
  id: string;
  title: string;
  notes?: string;
  isCompletedToday: boolean;
  streak: number;
  schedule: {
    repeatDays: number[]; // 0-6 (Sun-Sat)
  };
  lastCompletedDate?: string;
};
```

### To-Do
```typescript
export type Todo = {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
};
```

### Player Stats (Gamification)
```typescript
export type PlayerStats = {
  xp: number;
  level: number;
  gold: number;
  health: number;
  maxHealth: number;
};
```

---

## Part 3 — Redux Architecture (Interview Gold)

```
store/
 ├── habits/
 │    ├── habitsSlice.ts
 │    ├── habitsSelectors.ts
 ├── dailies/
 │    ├── dailiesSlice.ts
 │    ├── dailiesSelectors.ts
 ├── todos/
 │    ├── todosSlice.ts
 │    ├── todosSelectors.ts
 ├── player/
 │    ├── playerSlice.ts (XP, Level, Gold, Health)
 │    ├── playerSelectors.ts
 ├── character/
 │    ├── characterSlice.ts (avatar customization)
```

**Why this impresses:**
- Separation of concerns
- Scalable architecture
- Mirrors real production apps
- Easy to explain in walkthrough

---

## Part 4 — UI Component Structure

### Reusable Components
1. **TaskCard** - Base primitive for all task types
2. **HabitCard** - With +/- controls
3. **DailyCard** - Checkbox + streak indicator
4. **TodoCard** - Simple checkbox
5. **CharacterAvatar** - Displays customized character
6. **StatsBar** - Health, XP, Level display
7. **RewardCard** - Gold-purchasable rewards

### Navigation Structure
```
Tab Navigator (Material Top Tabs)
├── Habits Tab
├── Dailies Tab
├── To-Dos Tab
└── (Optional) Rewards Tab

Stack Navigator
├── Main Tabs
├── Add/Edit Task Modal
├── Character Customization Screen
└── Settings
```

---

## Part 5 — Gamification System (MVP)

| Action | XP | Gold | Health |
|--------|-----|------|--------|
| Complete Daily | +10 | +5 | - |
| Positive Habit | +5 | +2 | - |
| Negative Habit | -5 | - | -5 |
| Complete To-Do | +15 | +10 | - |
| Miss Daily | - | - | -10 |

**Level System**: Level = floor(XP / 100)

---

## Part 6 — Character Customization (Research Complete)

### Recommended Asset Source: LPC (Liberated Pixel Cup)

**Primary Resource**: [Universal LPC Spritesheet Character Generator](https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/)
- GitHub: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator
- Includes ALL LPC character art created by the community
- Layered sprite system (body, hair, clothes, accessories)
- Multiple licenses (CC0, CC-BY, CC-BY-SA, OGA-BY, GPL)
- **Must include credits for non-CC0 assets**

### Additional Asset Sources:
- **OpenGameArt.org** - CC0 licensed game assets
- **itch.io/game-assets/assets-cc0** - 2,445+ CC0 assets
- **Kenney.nl** - High-quality free game assets
- **Habitica repo** (github.com/HabitRPG/habitica-images) - Reference only, check licensing

### Implementation Strategy for MVP:
1. **Simple Approach**: Use pre-generated LPC sprites (3-5 character options)
2. **Medium Approach**: Layer PNG sprites (body + hair + clothes)
3. **Advanced Approach**: Full customization UI with sprite composition

### Customization Options (MVP):
- Body/skin color (3-5 options)
- Hair style + color (5-6 styles, 4-5 colors)
- Basic outfit (3-4 outfits)
- Gender/body type selection

### Licensing Note:
For interview demo, using CC0 assets is cleanest. If using CC-BY or similar, include CREDITS.csv in app.

---

## Part 7 — MVP Feature Scope

### Must Have (Core)
- [ ] Create/edit/delete Habits with +/- controls
- [ ] Create/edit/delete Dailies with scheduling
- [ ] Create/edit/delete To-Dos
- [ ] Complete/uncomplete tasks
- [ ] XP and Level system
- [ ] Basic character display
- [ ] Persistent storage (AsyncStorage)

### Should Have (Polish)
- [ ] Streak tracking for Dailies
- [ ] Daily reset logic
- [ ] Gold system
- [ ] Color-coded task difficulty
- [ ] Satisfying completion animations

### Nice to Have (Stretch)
- [ ] Character customization
- [ ] Rewards shop
- [ ] Health/damage system
- [ ] Sound effects
- [ ] Onboarding flow

---

## Technical Stack

- **Framework**: React Native (Expo managed workflow)
- **Language**: TypeScript (strict mode)
- **State**: Redux Toolkit
- **Navigation**: React Navigation (Material Top Tabs + Stack)
- **Storage**: AsyncStorage + Redux Persist
- **UI**: React Native Paper or custom components
- **Icons**: Lucide React Native or Expo Vector Icons
- **Animations**: React Native Reanimated (optional)
