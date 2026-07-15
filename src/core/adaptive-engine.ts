import {
  Question, Answer, AdaptiveSkill, AdaptiveSkillState, AdaptiveResult,
  Difficulty, Level, LevelCode, ConfidenceLevel, SkillResult,
  CEFR_LADDER, SKILL_ORDER
} from './types';
import { calculatePercentage, getLevel, getPerformanceBand } from './scoring';

const MIN_QUESTIONS_PER_SKILL = 3;
const TARGET_QUESTIONS_PER_SKILL = 4;
const MAX_QUESTIONS_PER_SKILL = 5;

interface AdaptiveSession {
  skillStates: Map<AdaptiveSkill, AdaptiveSkillState>;
  usedQuestionIds: Set<string>;
  usedPassageIds: Set<string>;
  usedClipIds: Set<string>;
  allQuestions: Question[];
  allAnswers: Answer[];
  currentSkillIndex: number;
  usedFallback: boolean;
}

function createInitialSkillState(skill: AdaptiveSkill, startLevel: Difficulty): AdaptiveSkillState {
  return {
    skill,
    currentLevel: startLevel,
    questionsAsked: 0,
    correctCount: 0,
    consecutiveStable: 0,
    lastTwoCorrect: []
  };
}

function getLevelIndex(level: Difficulty): number {
  return CEFR_LADDER.indexOf(level);
}

function getLevelForIndex(index: number): Difficulty {
  if (index < 0) return CEFR_LADDER[0];
  if (index >= CEFR_LADDER.length) return CEFR_LADDER[CEFR_LADDER.length - 1];
  return CEFR_LADDER[index];
}

function pickNextQuestion(
  skill: AdaptiveSkill,
  currentLevel: Difficulty,
  usedIds: Set<string>,
  allQuestions: Question[],
  usedPassageIds: Set<string>,
  usedClipIds: Set<string>
): Question | null {
  const levelIndex = getLevelIndex(currentLevel);

  // Try exact level first
  let candidates = allQuestions.filter(q =>
    q.type === skill &&
    q.difficulty === currentLevel &&
    !usedIds.has(q.id)
  );

  // For reading/listening, also check passage/clip usage
  if (skill === 'reading') {
    candidates = candidates.filter(q => q.passageId && !usedPassageIds.has(q.passageId));
  } else if (skill === 'listening') {
    candidates = candidates.filter(q => q.clipId && !usedClipIds.has(q.clipId));
  }

  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // Try nearest levels (alternating up/down)
  for (let offset = 1; offset < CEFR_LADDER.length; offset++) {
    for (const dir of [offset, -offset]) {
      const tryIndex = levelIndex + dir;
      if (tryIndex >= 0 && tryIndex < CEFR_LADDER.length) {
        let nearCandidates = allQuestions.filter(q =>
          q.type === skill &&
          q.difficulty === CEFR_LADDER[tryIndex] &&
          !usedIds.has(q.id)
        );

        if (skill === 'reading') {
          nearCandidates = nearCandidates.filter(q => q.passageId && !usedPassageIds.has(q.passageId));
        } else if (skill === 'listening') {
          nearCandidates = nearCandidates.filter(q => q.clipId && !usedClipIds.has(q.clipId));
        }

        if (nearCandidates.length > 0) {
          return nearCandidates[Math.floor(Math.random() * nearCandidates.length)];
        }
      }
    }
  }

  return null;
}

function pickReadingQuestions(
  usedIds: Set<string>,
  allQuestions: Question[],
  usedPassageIds: Set<string>
): Question[] {
  // Pick one unused passage at the current level
  const passages = [...new Set(allQuestions.filter(q => q.type === 'reading' && q.passageId && !usedPassageIds.has(q.passageId)).map(q => q.passageId!))];
  const passage = passages[Math.floor(Math.random() * passages.length)];
  if (!passage) return [];

  // Get 2 questions from this passage (not already used)
  const questions = allQuestions.filter(q =>
    q.type === 'reading' &&
    q.passageId === passage &&
    !usedIds.has(q.id)
  ).slice(0, 2);

  return questions;
}

function pickListeningQuestions(
  usedIds: Set<string>,
  allQuestions: Question[],
  usedClipIds: Set<string>
): Question[] {
  const clips = [...new Set(allQuestions.filter(q => q.type === 'listening' && q.clipId && !usedClipIds.has(q.clipId)).map(q => q.clipId!))];
  const clip = clips[Math.floor(Math.random() * clips.length)];
  if (!clip) return [];

  const questions = allQuestions.filter(q =>
    q.type === 'listening' &&
    q.clipId === clip &&
    !usedIds.has(q.id)
  ).slice(0, 2);

  return questions;
}



function shouldStopSkill(state: AdaptiveSkillState): boolean {
  if (state.questionsAsked >= MAX_QUESTIONS_PER_SKILL) return true;
  if (state.questionsAsked >= MIN_QUESTIONS_PER_SKILL && state.consecutiveStable >= 2) return true;
  return false;
}

function computeSkillResult(state: AdaptiveSkillState): SkillResult {
  const percentage = calculatePercentage(state.correctCount, state.questionsAsked);
  const { band, label } = getPerformanceBand(percentage);
  return {
    skill: state.skill.charAt(0).toUpperCase() + state.skill.slice(1),
    correct: state.correctCount,
    total: state.questionsAsked,
    percentage,
    band,
    bandLabel: label,
    estimatedLevel: state.currentLevel
  };
}

function computeOverallLevel(skillResults: SkillResult[]): { level: Level; levelCode: LevelCode } {
  const levels = skillResults.map(s => (s.estimatedLevel || 'B1') as Difficulty);
  const indices = levels.map(l => getLevelIndex(l));
  const median = indices.sort((a, b) => a - b)[Math.floor(indices.length / 2)];
  const levelCode = getLevelForIndex(median);
  const levelInfo = getLevel(calculatePercentage(median + 1, CEFR_LADDER.length));
  return { level: levelInfo.level, levelCode: levelCode as LevelCode };
}

function computeConfidence(skillResults: AdaptiveResult['skillResults'], usedFallback: boolean): { confidence: ConfidenceLevel; note: string } {
  const allFour = skillResults.length === 4;
  const mostlyFourPlus = skillResults.filter(s => s.total >= 4).length >= 3;
  const consistent = skillResults.every(s => s.percentage >= 60 || s.percentage < 40);

  if (allFour && mostlyFourPlus && consistent && !usedFallback) {
    return { confidence: 'Higher', note: 'All four skills tested with consistent response patterns.' };
  }
  if (allFour && !usedFallback) {
    return { confidence: 'Medium', note: 'All four skills tested. Some variation in response patterns.' };
  }
  return { confidence: 'Low', note: 'Short evidence or fallback item selection was used. Treat as directional.' };
}

export function runAdaptivePlacement(allQuestions: Question[]): AdaptiveResult {
  const session: AdaptiveSession = {
    skillStates: new Map(),
    usedQuestionIds: new Set(),
    usedPassageIds: new Set(),
    usedClipIds: new Set(),
    allQuestions,
    allAnswers: [],
    currentSkillIndex: 0,
    usedFallback: false
  };

  // Initialize skill states - each starts at the previous skill's final level (simple fallback)
  let previousLevel: Difficulty = 'B1';
  for (const skill of SKILL_ORDER) {
    session.skillStates.set(skill, createInitialSkillState(skill, previousLevel));
  }

  // Run through each skill
  for (let skillIdx = 0; skillIdx < SKILL_ORDER.length; skillIdx++) {
    const skill = SKILL_ORDER[skillIdx];
    const state = session.skillStates.get(skill)!;

    while (!shouldStopSkill(state)) {
      let questionsToAsk: Question[] = [];

      if (skill === 'reading') {
        questionsToAsk = pickReadingQuestions(
          session.usedQuestionIds,
          session.allQuestions,
          session.usedPassageIds
        );
      } else if (skill === 'listening') {
        questionsToAsk = pickListeningQuestions(
          session.usedQuestionIds,
          session.allQuestions,
          session.usedClipIds
        );
      } else {
        const q = pickNextQuestion(
          skill,
          state.currentLevel,
          session.usedQuestionIds,
          session.allQuestions,
          session.usedPassageIds,
          session.usedClipIds
        );
        if (q) questionsToAsk = [q];
      }

      if (questionsToAsk.length === 0) {
        session.usedFallback = true;
        break;
      }

      for (const q of questionsToAsk) {
        session.usedQuestionIds.add(q.id);
        if (q.passageId) session.usedPassageIds.add(q.passageId);
        if (q.clipId) session.usedClipIds.add(q.clipId);

        // Simulate answer (in real usage, answers come from user interaction)
        // For the engine, we just track the question selection
        session.allQuestions.push(q);
      }

      // Update level based on simulated path (actual answers come from app.ts)
      state.questionsAsked += questionsToAsk.length;
      if (state.questionsAsked >= TARGET_QUESTIONS_PER_SKILL) break;
    }

    // Set next skill's starting level
    if (skillIdx < SKILL_ORDER.length - 1) {
      const nextSkill = SKILL_ORDER[skillIdx + 1];
      const nextState = session.skillStates.get(nextSkill)!;
      nextState.currentLevel = state.currentLevel;
    }
  }

  // Build result
  const skillResults: SkillResult[] = [];
  for (const skill of SKILL_ORDER) {
    const state = session.skillStates.get(skill)!;
    if (state.questionsAsked > 0) {
      skillResults.push(computeSkillResult(state));
    }
  }

  const { level, levelCode } = computeOverallLevel(skillResults);
  const { confidence, note } = computeConfidence(skillResults, session.usedFallback);

  return {
    quizType: 'adaptive' as const,
    overallLevel: level,
    overallLevelCode: levelCode,
    confidence,
    confidenceNote: note,
    skillResults,
    totalQuestions: session.usedQuestionIds.size,
    answers: [],
    questions: [],
    usedFallback: session.usedFallback
  };
}

export function getAdaptiveQuestionsForSession(allQuestions: Question[]): {
  questions: Question[];
  skills: AdaptiveSkill[];
  skillQuestionCounts: Map<AdaptiveSkill, number>;
} {
  const session: AdaptiveSession = {
    skillStates: new Map(),
    usedQuestionIds: new Set(),
    usedPassageIds: new Set(),
    usedClipIds: new Set(),
    allQuestions,
    allAnswers: [],
    currentSkillIndex: 0,
    usedFallback: false
  };

  let previousLevel: Difficulty = 'B1';
  for (const skill of SKILL_ORDER) {
    session.skillStates.set(skill, createInitialSkillState(skill, previousLevel));
  }

  const selectedQuestions: Question[] = [];
  const skillCounts = new Map<AdaptiveSkill, number>();

  for (let skillIdx = 0; skillIdx < SKILL_ORDER.length; skillIdx++) {
    const skill = SKILL_ORDER[skillIdx];
    const state = session.skillStates.get(skill)!;
    let questionsForSkill = 0;

    while (!shouldStopSkill(state) && questionsForSkill < TARGET_QUESTIONS_PER_SKILL) {
      let newQuestions: Question[] = [];

      if (skill === 'reading') {
        newQuestions = pickReadingQuestions(
          session.usedQuestionIds,
          session.allQuestions,
          session.usedPassageIds
        );
      } else if (skill === 'listening') {
        newQuestions = pickListeningQuestions(
          session.usedQuestionIds,
          session.allQuestions,
          session.usedClipIds
        );
      } else {
        const q = pickNextQuestion(
          skill,
          state.currentLevel,
          session.usedQuestionIds,
          session.allQuestions,
          session.usedPassageIds,
          session.usedClipIds
        );
        if (q) newQuestions = [q];
      }

      if (newQuestions.length === 0) {
        session.usedFallback = true;
        break;
      }

      for (const q of newQuestions) {
        session.usedQuestionIds.add(q.id);
        if (q.passageId) session.usedPassageIds.add(q.passageId);
        if (q.clipId) session.usedClipIds.add(q.clipId);
        selectedQuestions.push(q);
        questionsForSkill++;
        state.questionsAsked++;
      }

      if (questionsForSkill >= TARGET_QUESTIONS_PER_SKILL) break;
    }

    skillCounts.set(skill, questionsForSkill);

    if (skillIdx < SKILL_ORDER.length - 1) {
      const nextSkill = SKILL_ORDER[skillIdx + 1];
      const nextState = session.skillStates.get(nextSkill)!;
      nextState.currentLevel = state.currentLevel;
    }
  }

  return {
    questions: selectedQuestions,
    skills: SKILL_ORDER.filter(s => skillCounts.get(s)! > 0),
    skillQuestionCounts: skillCounts
  };
}

export function computeAdaptiveResult(
  questions: Question[],
  answers: Answer[],
  skillQuestionCounts: Map<AdaptiveSkill, number>
): AdaptiveResult {
  const skillResults: SkillResult[] = [];
  let usedFallback = false;

  for (const skill of SKILL_ORDER) {
    const count = skillQuestionCounts.get(skill) || 0;
    if (count === 0) continue;

    const skillAnswers = answers.filter(a => {
      const q = questions.find(q => q.id === a.questionId);
      return q && q.type === skill;
    });

    const correct = skillAnswers.filter(a => a.isCorrect).length;
    const percentage = calculatePercentage(correct, count);
    const { band, label } = getPerformanceBand(percentage);

    // Estimate level based on performance
    let estimatedLevel: Difficulty = 'B1';
    if (percentage >= 80) estimatedLevel = 'C1';
    else if (percentage >= 60) estimatedLevel = 'B2';
    else if (percentage >= 40) estimatedLevel = 'B1';
    else if (percentage >= 20) estimatedLevel = 'A2';
    else estimatedLevel = 'A1';

    skillResults.push({
      skill: skill.charAt(0).toUpperCase() + skill.slice(1),
      correct,
      total: count,
      percentage,
      band,
      bandLabel: label,
      estimatedLevel
    });
  }

  const overallPercentage = skillResults.length > 0
    ? Math.round(skillResults.reduce((sum, s) => sum + s.percentage, 0) / skillResults.length)
    : 0;
  const levelInfo = getLevel(overallPercentage);

  const allFour = skillResults.length === 4;
  const mostlyFourPlus = skillResults.filter(s => s.total >= 4).length >= 3;
  const consistent = skillResults.every(s => s.percentage >= 60 || s.percentage < 40);

  let confidence: ConfidenceLevel;
  let note: string;

  if (allFour && mostlyFourPlus && consistent) {
    confidence = 'Higher';
    note = 'All four skills tested with consistent response patterns.';
  } else if (allFour) {
    confidence = 'Medium';
    note = 'All four skills tested. Some variation in response patterns.';
  } else {
    confidence = 'Low';
    note = 'Short evidence collected. Treat as directional.';
  }

  return {
    quizType: 'adaptive',
    overallLevel: levelInfo.level,
    overallLevelCode: levelInfo.code as LevelCode,
    confidence,
    confidenceNote: note,
    skillResults,
    totalQuestions: questions.length,
    answers,
    questions,
    usedFallback
  };
}
