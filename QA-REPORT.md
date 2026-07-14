# English Quiz MVP — Release Candidate QA Report

## 1. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `src/ui/screens/quiz-screen.ts` | Rewritten | **Critical fix:** Option click now registers answer, shows feedback, disables buttons, and auto-advances. Removed Next button. |
| `src/app/app.ts` | Rewritten | **Critical fix:** Auto-advance flow restructured. onAnswer → show feedback → 800ms timer → advance. Timer cleanup extracted to helper. |
| `src/core/quiz-engine.ts` | Modified | **Hardening:** Added double-answer guard in `answerQuestion()`. Removed redundant `shuffleQuestions()` method and second shuffle. |
| `src/data/index.ts` | Modified | **Validation:** Added `difficulty` field validation against `VALID_DIFFICULTIES` array. |
| `src/ui/screens/result-screen.ts` | Modified | **CEFR disclaimer:** Added "Estimated level based on this short practice quiz" text. |
| `src/styles/main.css` | Modified | **Accessibility:** Added `:focus-visible` keyboard focus styles, `prefers-reduced-motion` support, `.level-disclaimer` style. Removed dead `.next-button` styles. |

Architecture unchanged. No new files created. No new dependencies added.

---

## 2. Build Verification

**Commands executed:**
```
npm run build
```
Which runs: `tsc && vite build`

**Final result:**
```
✓ 18 modules transformed.
dist/index.html                 0.47 kB │ gzip: 0.32 kB
dist/assets/index-BziqL3TJ.css  8.42 kB │ gzip: 1.92 kB
dist/assets/index-BH0BCZSJ.js  17.51 kB │ gzip: 5.78 kB
✓ built in 695ms
```

**TypeScript:** Zero errors.
**Vite build:** Zero warnings.
**Production preview:** Server starts correctly on port 4173. HTML loads with correct asset references.

---

## 3. Test Results

**Automated tests:** No test framework present. Manual QA only (per p.txt instruction: "do not add a large testing stack only for this task").

### Manual Test Scenarios

| # | Scenario | Result |
|---|----------|--------|
| 1 | Start screen loads with title and 3 quiz type buttons | PASS |
| 2 | Vocabulary quiz: click option → feedback shown → options disabled → auto-advance after ~800ms | PASS |
| 3 | Grammar quiz: same flow as #2 | PASS |
| 4 | Mixed quiz: questions from both vocabulary and grammar datasets | PASS |
| 5 | Progress indicator shows correct "N / 15" at each step | PASS |
| 6 | Rapid click on same option: only one answer registered (hasAnswered guard) | PASS |
| 7 | Quiz ends → result screen shows score, percentage, CEFR level, disclaimer | PASS |
| 8 | Review screen shows selected + correct answers + explanations | PASS |
| 9 | Restart from result: fresh quiz, no stale state | PASS |
| 10 | 0% score (all wrong) → Beginner/A1 | PASS |
| 11 | 100% score (all correct) → Advanced/C1 | PASS |
| 12 | Empty question bank → error screen with "Back to Start" button | PASS |
| 13 | Browser refresh → returns to start screen (Option B) | PASS |
| 14 | Mobile 375px: no overflow, buttons 44px+ | PASS |
| 15 | Desktop layout: centered, clean | PASS |
| 16 | Keyboard: Tab through options, focus ring visible | PASS (after CSS fix) |
| 17 | Restart during auto-advance delay: timer cleared, no ghost advance | PASS |
| 18 | Multiple quizzes in a row: clean state each time | PASS |

---

## 4. Fixes Made

### Fix 1: Answer registration was broken (CRITICAL)
- **Root cause:** In `quiz-screen.ts`, the option click handler did NOT call `callbacks.onAnswer()`. The `onAnswer` call was only in the Next button handler, bundled with `onNext` which immediately cleared the auto-advance timer.
- **Behavior fixed:** Option click now immediately calls `callbacks.onAnswer(selectedIndex)`, which registers the answer, shows feedback, and starts the 800ms auto-advance timer.

### Fix 2: Answer feedback was invisible (CRITICAL)
- **Root cause:** `showAnswerFeedback()` applied CSS classes, but `onNext()` called `showQuizScreen()` → `clearElement()` on the next line, destroying the DOM before the user could see the feedback.
- **Behavior fixed:** Feedback is now applied BEFORE the timer starts. The 800ms delay gives the user time to see correct/incorrect styling before the next question loads.

### Fix 3: Auto-advance timer was dead code (CRITICAL)
- **Root cause:** Timer was set in `onAnswer` and immediately cleared in `onNext` (called synchronously after).
- **Behavior fixed:** Timer is now set after feedback is shown, and only cleared on restart or when the timer callback fires. The `clearAutoAdvanceTimer()` helper ensures clean cleanup.

### Fix 4: Next button removed
- **Root cause:** The Next button was redundant with auto-advance, and its handler contained the broken answer registration logic.
- **Behavior fixed:** Removed entirely. Quiz auto-advances after 800ms. This matches the p.txt spec: "Move to the next question automatically after a short readable delay."

### Fix 5: Double-answer guard added to engine
- **Root cause:** `answerQuestion()` had no per-question guard. If called twice for the same question, two answers would be pushed to the array.
- **Behavior fixed:** Added `if (this.state.answers.some(a => a.questionId === question.id)) return;` check.

### Fix 6: Redundant shuffle removed
- **Root cause:** Questions were shuffled in `getQuestions()` (data layer) AND again in `startQuiz()` (engine). Double shuffle is wasteful and makes order unpredictable.
- **Behavior fixed:** Engine no longer shuffles. Data layer is the single shuffle authority.

### Fix 7: Difficulty validation added
- **Root cause:** `validateQuestion()` checked all fields except `difficulty`. A question with invalid difficulty would pass validation.
- **Behavior fixed:** Added `VALID_DIFFICULTIES.includes(qObj.difficulty as string)` check.

### Fix 8: CEFR disclaimer added
- **Root cause:** No disclaimer existed. Users could interpret CEFR codes as official certification.
- **Behavior fixed:** Added "Estimated level based on this short practice quiz" to the level card.

### Fix 9: Keyboard focus styles added
- **Root cause:** No `:focus-visible` rules. Keyboard users had no visible focus indicator.
- **Behavior fixed:** Added focus-visible outline for all interactive elements.

### Fix 10: Reduced motion support added
- **Root cause:** `fadeIn` animation ran for all users, including those with vestibular disorders.
- **Behavior fixed:** Added `@media (prefers-reduced-motion: reduce)` to disable animations.

---

## 5. Known Limitations

1. **No automated test framework.** All QA was manual. No Jest, Vitest, or other test runner is configured.
2. **Vocabulary correctIndex pattern.** All 15 vocabulary questions have `correctIndex: 1` (always option B). This is predictable. Grammar questions have better distribution but still skew toward index 1 (60%).
3. **No dark mode.** All colors are hardcoded light palette.
4. **No persistence.** Browser refresh resets to start screen (by design — Option B). No localStorage usage.
5. **innerHTML usage in result-screen.ts.** Score display and review answers use `innerHTML` with hardcoded data. Safe now, but would be an XSS risk if questions came from an external API.
6. **CEFR ceiling is C1.** Questions can be tagged C2 difficulty, but the result level maxes out at C1 Advanced.
7. **Shallow getState().** The `QuizEngine.getState()` method returns a shallow copy; internal arrays are shared by reference. No practical impact in current usage.

---

## 6. Final Release Verdict

**Ready for free static deployment.**

All 3 critical bugs have been fixed. Build passes with zero errors. All 18 manual test scenarios pass. The app handles edge cases gracefully. No blocking issues remain.

---

## 7. Recommended Next Phase

Expand and curate the question bank, with more CEFR-tagged Vocabulary and Grammar questions. Specifically:
- Vary the `correctIndex` distribution (currently all vocabulary questions have index 1)
- Add questions for A2, B2 difficulty levels (currently only A1, B1, C1 are covered)
- Target 50+ questions per category for better quiz variety
- Consider adding question metadata like topic tags for future filtering
