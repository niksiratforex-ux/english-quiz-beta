import { Answer, Level, LevelCode, QuizResult, QuizType, Question } from './types';

interface LevelThreshold {
  min: number;
  level: Level;
  code: LevelCode;
  description: string;
}

const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { min: 0, level: 'Beginner', code: 'A1', description: 'Basic vocabulary and simple sentence structures.' },
  { min: 20, level: 'Elementary', code: 'A2', description: 'Common everyday expressions and basic communication.' },
  { min: 40, level: 'Intermediate', code: 'B1', description: 'Main points of familiar topics and general descriptions.' },
  { min: 60, level: 'Upper-Intermediate', code: 'B2', description: 'Detailed text comprehension and spontaneous conversation.' },
  { min: 80, level: 'Advanced', code: 'C1', description: 'Near-native fluency with complex structures.' }
];

export function calculateScore(answers: Answer[]): number {
  return answers.filter(a => a.isCorrect).length;
}

export function calculatePercentage(score: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

export function getLevel(percentage: number): LevelThreshold {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (percentage >= LEVEL_THRESHOLDS[i].min) {
      return LEVEL_THRESHOLDS[i];
    }
  }
  return LEVEL_THRESHOLDS[0];
}

export function generateResult(
  answers: Answer[],
  questions: Question[],
  quizType: QuizType
): QuizResult {
  const score = calculateScore(answers);
  const totalQuestions = questions.length;
  const percentage = calculatePercentage(score, totalQuestions);
  const levelInfo = getLevel(percentage);

  return {
    quizType,
    score,
    totalQuestions,
    percentage,
    level: levelInfo.level,
    levelCode: levelInfo.code,
    answers,
    questions
  };
}
