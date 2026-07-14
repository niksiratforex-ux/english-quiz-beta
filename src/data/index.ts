import { Question, QuizType } from '../core/types';
import { vocabularyQuestions } from './vocabulary';
import { grammarQuestions } from './grammar';

const VALID_DIFFICULTIES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function validateQuestion(q: unknown): q is Question {
  if (typeof q !== 'object' || q === null) return false;
  const qObj = q as Record<string, unknown>;
  return (
    typeof qObj.id === 'string' &&
    qObj.id.length > 0 &&
    (qObj.type === 'vocabulary' || qObj.type === 'grammar') &&
    VALID_DIFFICULTIES.includes(qObj.difficulty as string) &&
    typeof qObj.topic === 'string' &&
    qObj.topic.length > 0 &&
    typeof qObj.question === 'string' &&
    qObj.question.length > 0 &&
    Array.isArray(qObj.options) &&
    qObj.options.length === 4 &&
    qObj.options.every((o: unknown) => typeof o === 'string' && (o as string).length > 0) &&
    new Set(qObj.options as string[]).size === (qObj.options as string[]).length &&
    typeof qObj.correctIndex === 'number' &&
    qObj.correctIndex >= 0 &&
    qObj.correctIndex < qObj.options.length &&
    typeof qObj.explanation === 'string' &&
    qObj.explanation.length > 0
  );
}

function checkUniqueIds(questions: Question[], sourceName: string): void {
  const ids = new Set<string>();
  for (const q of questions) {
    if (ids.has(q.id)) {
      console.warn(`${sourceName}: duplicate id '${q.id}' found`);
    }
    ids.add(q.id);
  }
}

function checkCrossFileIds(vocab: Question[], grammar: Question[]): void {
  const allIds = new Set<string>();
  for (const q of [...vocab, ...grammar]) {
    if (allIds.has(q.id)) {
      console.warn(`Cross-file duplicate id '${q.id}' found`);
    }
    allIds.add(q.id);
  }
}

function checkAnswerDistribution(questions: Question[], sourceName: string): void {
  const dist = { 0: 0, 1: 0, 2: 0, 3: 0 };
  for (const q of questions) {
    dist[q.correctIndex as keyof typeof dist]++;
  }
  const total = questions.length;
  const maxRatio = Math.max(...Object.values(dist)) / total;
  if (maxRatio > 0.4) {
    const skewedIndex = Object.entries(dist).find(([, v]) => v / total === maxRatio)?.[0];
    console.warn(`${sourceName}: correct-answer distribution skewed — index ${skewedIndex} has ${Math.round(maxRatio * 100)}% of answers`);
  }
}

function getValidQuestions(source: Question[], sourceName: string): Question[] {
  const valid = source.filter(validateQuestion);
  if (valid.length !== source.length) {
    console.warn(`${sourceName}: ${source.length - valid.length} invalid questions filtered out`);
  }
  checkUniqueIds(valid, sourceName);
  checkAnswerDistribution(valid, sourceName);
  return valid;
}

const validVocabulary = getValidQuestions(vocabularyQuestions, 'Vocabulary');
const validGrammar = getValidQuestions(grammarQuestions, 'Grammar');

checkCrossFileIds(validVocabulary, validGrammar);

export function getQuestions(quizType: QuizType, count: number = 15): Question[] {
  let questions: Question[] = [];

  switch (quizType) {
    case 'vocabulary':
      questions = [...validVocabulary];
      break;
    case 'grammar':
      questions = [...validGrammar];
      break;
    case 'mixed':
      questions = [...validVocabulary, ...validGrammar];
      break;
  }

  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getQuestionCount(): { vocabulary: number; grammar: number; mixed: number } {
  return {
    vocabulary: validVocabulary.length,
    grammar: validGrammar.length,
    mixed: validVocabulary.length + validGrammar.length
  };
}
