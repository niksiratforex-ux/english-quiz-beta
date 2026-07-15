// Domain models for the English Quiz application

export type QuizType = 'vocabulary' | 'grammar' | 'mixed' | 'reading' | 'listening';
export type Difficulty = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type QuizStatus = 'idle' | 'active' | 'completed';
export type QuestionType = 'vocabulary' | 'grammar' | 'reading' | 'listening';
export type ReadingSubtype = 'main-idea' | 'detail' | 'inference' | 'vocabulary-in-context';
export type ListeningSubtype = 'gist' | 'detail' | 'inference' | 'specific-information';

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

export interface QuizResult {
  quizType: QuizType;
  score: number;
  totalQuestions: number;
  percentage: number;
  level: Level;
  levelCode: LevelCode;
  answers: Answer[];
  questions: Question[];
}
