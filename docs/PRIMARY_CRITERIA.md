# Primary Interview Criteria - LevantoHealth Assessment

## Official Requirements

> Please prepare a React Native project for discussion during your interview. This project should showcase your practical skills in:
>
> - **React Native & TypeScript**: Must be a functional RN app built entirely with TypeScript.
> - **Code Quality**: Emphasize clean, readable, type-safe code, good component structure, and basic error handling.
> - **Redux (or similar global state library)** is a plus.
>
> During the Interview, be ready to:
> - **Demo**: Run your project live (emulator/device).
> - **Walkthrough**: Explain your code, architecture, and design choices.
> - **Discuss**: Share challenges faced, solutions, and key learnings.
>
> Please ensure all dependencies are installed. Sharing a public GitHub link in advance is appreciated.

---

## Checklist Against Requirements

### Technical Requirements

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| React Native | Expo managed workflow | ⬜ |
| TypeScript | Strict mode, all files .ts/.tsx | ⬜ |
| Functional app | Runs on emulator/device | ⬜ |
| Clean code | Consistent formatting, clear naming | ⬜ |
| Readable code | Well-structured, logical flow | ⬜ |
| Type-safe | No `any` types, proper interfaces | ⬜ |
| Good component structure | Reusable, single-responsibility | ⬜ |
| Basic error handling | Try/catch, error boundaries | ⬜ |
| Redux (bonus) | Redux Toolkit with slices | ⬜ |
| Dependencies installed | `npm install` works clean | ⬜ |
| Public GitHub link | Repo ready to share | ⬜ |

### Demo Readiness

| Item | Notes | Status |
|------|-------|--------|
| App launches without errors | Test on fresh clone | ⬜ |
| Core features work | Habits, Dailies, To-Dos | ⬜ |
| No console warnings | Clean run | ⬜ |
| Looks polished | Professional UI | ⬜ |
| Has sample data | Pre-populated for demo | ⬜ |

### Walkthrough Preparation

| Topic | Talking Points |
|-------|----------------|
| **Architecture** | Feature-based Redux slices, separation of concerns |
| **Component Design** | TaskCard base component, composition pattern |
| **TypeScript Usage** | Strong typing, discriminated unions for task types |
| **State Management** | Why Redux Toolkit, selector patterns, persistence |
| **Navigation** | Material Top Tabs for Habitica-style UX |
| **Error Handling** | Async error handling, user feedback |

### Discussion Points (Challenges & Learnings)

| Challenge | Solution | Learning |
|-----------|----------|----------|
| Task type differentiation | Separate slices, shared base types | Domain modeling matters |
| Daily reset logic | Date comparison utilities | Time-based state is tricky |
| Gamification balance | Simple XP formula, iterate | Start simple, expand later |
| Character assets | Open-source sprites | Licensing considerations |
| State persistence | Redux Persist + AsyncStorage | Hydration edge cases |

---

## Pre-Interview Checklist

- [ ] Clone repo fresh and run `npm install`
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Prepare 2-3 minute demo script
- [ ] Review all code for explanation
- [ ] Have talking points ready
- [ ] Test screen sharing setup
- [ ] Have backup plan if demo fails

---

## Key Selling Points to Emphasize

1. **Production-Ready Architecture** - Feature-based Redux, scalable structure
2. **TypeScript Expertise** - Strict types, no shortcuts
3. **UX Thinking** - Habitica-inspired, reduces cognitive load
4. **Gamification Innovation** - Shows creative problem-solving
5. **Personal Investment** - Passion project, genuine interest
6. **Healthcare Adjacent** - Wellness/habit tracking connects to health outcomes
