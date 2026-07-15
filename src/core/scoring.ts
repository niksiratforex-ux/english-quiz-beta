import { Answer, Level, LevelCode, QuizResult, QuizType, Question, SkillResult, PerformanceBand } from './types';

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

const ALL_SKILLS = ['Vocabulary', 'Grammar', 'Reading', 'Listening'];

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

export function getPerformanceBand(percentage: number): { band: PerformanceBand; label: string } {
  if (percentage >= 80) return { band: 'strong', label: 'Strong' };
  if (percentage >= 60) return { band: 'solid', label: 'Solid' };
  if (percentage >= 40) return { band: 'developing', label: 'Developing' };
  return { band: 'needs-practice', label: 'Needs practice' };
}

function getSkillQuestions(questions: Question[], skill: string): Question[] {
  return questions.filter(q => q.type === skill.toLowerCase());
}

function getSkillAnswers(answers: Answer[], questions: Question[], skill: string): Answer[] {
  const skillQuestions = new Set(getSkillQuestions(questions, skill).map(q => q.id));
  return answers.filter(a => skillQuestions.has(a.questionId));
}

function getTestedSkills(questions: Question[]): string[] {
  const types = new Set(questions.map(q => q.type));
  return ALL_SKILLS.filter(s => types.has(s.toLowerCase() as any));
}

function getUntestedSkills(questions: Question[]): string[] {
  const tested = new Set(questions.map(q => q.type));
  return ALL_SKILLS.filter(s => !tested.has(s.toLowerCase() as any));
}

function buildSkillResults(questions: Question[], answers: Answer[]): SkillResult[] {
  const tested = getTestedSkills(questions);
  return tested.map(skill => {
    const skillQuestions = getSkillQuestions(questions, skill);
    const skillAnswers = getSkillAnswers(answers, questions, skill);
    const correct = skillAnswers.filter(a => a.isCorrect).length;
    const total = skillQuestions.length;
    const percentage = calculatePercentage(correct, total);
    const { band, label } = getPerformanceBand(percentage);
    return { skill, correct, total, percentage, band, bandLabel: label };
  });
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
  const skillResults = buildSkillResults(questions, answers);
  const testedSkills = getTestedSkills(questions);
  const untestedSkills = getUntestedSkills(questions);

  return {
    quizType,
    score,
    totalQuestions,
    percentage,
    level: levelInfo.level,
    levelCode: levelInfo.code,
    answers,
    questions,
    skillResults,
    testedSkills,
    untestedSkills
  };
}
