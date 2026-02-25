# 🎤 Presentation Script: Life In Character

---

## Opening (30 seconds)

> "Hi, I'm here to present **Life In Character** — a Habitica-inspired task management app built with React Native and TypeScript. It combines productivity with gamification, letting users track habits, dailies, and to-dos while earning XP, leveling up, and customizing their character avatar.
>
> Let me show you both the functionality and the architecture."

---

## Part 1: Live Demo (~3 minutes)

### Show the App Running

> "First, you can see the app is running on [iOS Simulator/device]. We have four tabs: Habits, Dailies, To-Dos, and Character."

### Habits Tab
> "Here are **Habits** — tasks you track multiple times. Each habit can be positive, negative, or both."
>
> *[Tap the + button on "Drink Water"]*
>
> "When I tap positive, notice two things happen:
> 1. The streak counter increases
> 2. Up in the **StatsBar**, my XP and gold go up
>
> That's Redux dispatching two actions — `incrementHabit` and `completePositiveHabit`."

### Dailies Tab
> *[Switch to Dailies tab]*
>
> "**Dailies** are scheduled tasks. I can set which days they repeat."
>
> *[Toggle a daily complete]*
>
> "Completing this updates my streak 🔥 and awards XP. If I miss a daily, I'd lose health — that's the gamification loop."

### To-Dos Tab
> *[Switch to To-Dos tab]*
>
> "**To-Dos** are one-time tasks with optional due dates. Notice the filter tabs — All, Active, Completed."
>
> *[Complete a todo, switch to Completed filter]*
>
> "The filtering happens client-side from the Redux store."

### Character Tab
> *[Switch to Character tab]*
>
> "Finally, **Character customization**. I integrated 462 LPC sprites with a layered rendering system."
>
> *[Change skin color, hair style, shirt]*
>
> "Every selection dispatches a Redux action. The avatar preview updates in real-time and persists across sessions."

### Persistence Demo
> "Speaking of persistence — let me close and reopen the app..."
>
> *[Close simulator, reopen]*
>
> "Everything's still here. That's **Redux Persist** with AsyncStorage — offline-first by default."

---

## Part 2: Technical Walkthrough (~4 minutes)

### Folder Structure
> "Let me show you the code architecture."
>
> ```
> src/
> ├── components/    # Reusable UI components
> ├── screens/       # Screen-level components  
> ├── store/         # Redux (feature-based slices)
> ├── types/         # TypeScript interfaces
> └── navigation/    # React Navigation
> ```
>
> "Everything is **feature-based** — easy to navigate, easy to scale."

### Redux Architecture
> "For state management, I used **Redux Toolkit** — the modern, recommended approach."
>
> *[Show `src/store/index.ts`]*
>
> "Here's the store configuration. I combine five feature slices — habits, dailies, todos, player, and character. Each slice owns its state and actions."

### Type Safety
> *[Show `src/store/habits/habitsSlice.ts`]*
>
> "Every action uses `PayloadAction<T>` for type-safe payloads. No `any` types anywhere."
>
> ```typescript
> addHabit: (state, action: PayloadAction<CreateHabitPayload>) => {
>   // TypeScript validates the payload shape at compile time
> }
> ```

### Typed Hooks
> *[Show `src/store/hooks.ts`]*
>
> "I created typed hooks — `useAppDispatch` and `useAppSelector` — so components get full autocomplete and type checking."
>
> ```typescript
> const habits = useAppSelector((state) => state.habits.items);
> // TypeScript knows the entire state shape
> ```

### Component Reusability
> *[Show `src/components/TaskCard.tsx`]*
>
> "For components, I used composition. `TaskCard` is the base — it accepts `leftContent` and `rightContent` as props. Then `HabitCard`, `DailyCard`, and `TodoCard` extend it with their specific UI."
>
> "I also extracted a reusable `Checkbox` component used by both DailyCard and TodoCard — **DRY principle** in action."

### Error Handling
> *[Show `src/components/ErrorBoundary.tsx`]*
>
> "The entire app is wrapped in an `ErrorBoundary`. If anything crashes, users see a friendly error screen with a retry button instead of a white screen."

---

## Part 3: Criteria Summary (~1 minute)

> "So to summarize how this meets the requirements:"

| Requirement | Evidence |
|-------------|----------|
| **React Native** | Expo managed workflow, runs on iOS/Android |
| **TypeScript** | All files `.ts/.tsx`, strict mode enabled |
| **Functional App** | Full CRUD for all task types |
| **Clean Code** | Feature-based structure, consistent naming |
| **Readable Code** | Single-responsibility components |
| **Type-Safe** | Typed hooks, `PayloadAction<T>`, no `any` |
| **Component Structure** | Base `TaskCard` + composition pattern |
| **Error Handling** | `ErrorBoundary` wraps entire app |
| **Redux (Bonus)** | Redux Toolkit + Persist with 5 slices |

---

## Closing (15 seconds)

> "The code is on GitHub at **github.com/LeoZaiTech/Life-In-Character**. Happy to answer any questions about the implementation or dive deeper into any specific area."

---

## Pro Tips for Delivery

1. **Start with the demo** — seeing it work builds credibility before showing code
2. **Narrate your clicks** — explain what's happening as you interact
3. **Connect actions to code** — "When I tap this, Redux dispatches..."
4. **Keep code snippets small** — highlight 3-5 lines max at a time
5. **Anticipate questions** — have the slice files ready to pull up
