// Domain models for the English Quiz application

export type QuizType = 'vocabulary' | 'grammar' | 'mixed' | 'reading' | 'listening' | 'adaptive' | 'speaking';
export type Difficulty = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type QuizStatus = 'idle' | 'active' | 'completed';
export type QuestionType = 'vocabulary' | 'grammar' | 'reading' | 'listening';
export type ReadingSubtype = 'main-idea' | 'detail' | 'inference' | 'vocabulary-in-context';
export type ListeningSubtype = 'gist' | 'detail' | 'inference' | 'specific-information';
export type PerformanceBand = 'needs-practice' | 'developing' | 'solid' | 'strong';
export type AdaptiveSkill = 'vocabulary' | 'grammar' | 'reading' | 'listening';
export type ConfidenceLevel = 'Low' | 'Medium' | 'Higher';
export type SpeakingStep = 'prompt' | 'prepare' | 'record' | 'playback' | 'checklist' | 'result';
export type ReflectionBand = 'emerging' | 'building' | 'comfortable';
export type ChecklistAnswer = 'not-yet' | 'sometimes' | 'mostly' | 'yes';

export const CEFR_LADDER: Difficulty[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
export const SKILL_ORDER: AdaptiveSkill[] = ['vocabulary', 'grammar', 'reading', 'listening'];

export interface ReadingPassage {
  id: string;
  difficulty: Difficulty;
  topic: string;
  title: string;
  text: string;
}

export interface ListeningClip {
  id: string;
  difficulty: Difficulty;
  topic: string;
  title: string;
  script: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  passageId?: string;
  subtype?: ReadingSubtype | ListeningSubtype;
  clipId?: string;
}

export interface Answer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizState {
  quizType: QuizType;
  questions: Question[];
  currentIndex: number;
  answers: Answer[];
  status: QuizStatus;
}

export type Level = 'Beginner' | 'Elementary' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced';
export type LevelCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface SkillResult {
  skill: string;
  correct: number;
  total: number;
  percentage: number;
  band: PerformanceBand;
  bandLabel: string;
  estimatedLevel?: string;
}

export interface QuizResult {
  quizType: QuizType;
  score: number;
  totalQuestions: number;
  percentage: number;
  level: Level;
  levelCode: LevelCode;
  answers: Answer[];
  questions: Question[];
  skillResults: SkillResult[];
  testedSkills: string[];
  untestedSkills: string[];
}

export interface AdaptiveSkillState {
  skill: AdaptiveSkill;
  currentLevel: Difficulty;
  questionsAsked: number;
  correctCount: number;
  consecutiveStable: number;
  lastTwoCorrect: boolean[];
}

export interface AdaptiveResult {
  quizType: 'adaptive';
  overallLevel: Level;
  overallLevelCode: LevelCode;
  confidence: ConfidenceLevel;
  confidenceNote: string;
  skillResults: SkillResult[];
  totalQuestions: number;
  answers: Answer[];
  questions: Question[];
  usedFallback: boolean;
}

// Speaking types
export interface SpeakingPrompt {
  id: string;
  promptText: string;
  followUpHint: string;
  estimatedLevelBand: 'A1-A2' | 'B1' | 'B2' | 'C1';
  targetSkillFocus: 'fluency' | 'vocabulary-range' | 'clarity' | 'organization';
}

export interface SpeakingChecklistItem {
  id: string;
  text: string;
}

export interface SpeakingSessionResult {
  prompt: SpeakingPrompt;
  recordingDuration: number;
  checklistAnswers: Record<string, ChecklistAnswer>;
  reflectionBand: ReflectionBand;
  reflectionSummary: string;
  focusAreas: string[];
  nextStep: string;
}
