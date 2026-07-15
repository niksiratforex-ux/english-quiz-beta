import { Question, QuizType, ReadingPassage, ListeningClip } from '../core/types';
import { vocabularyQuestions } from './vocabulary';
import { grammarQuestions } from './grammar';
import { readingPassages, readingQuestions } from './reading';
import { listeningClips, listeningQuestions } from './listening';

const VALID_DIFFICULTIES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function validateQuestion(q: unknown): q is Question {
  if (typeof q !== 'object' || q === null) return false;
  const qObj = q as Record<string, unknown>;
  const isReading = qObj.type === 'reading';
  const isListening = qObj.type === 'listening';
  return (
    typeof qObj.id === 'string' &&
    qObj.id.length > 0 &&
    (qObj.type === 'vocabulary' || qObj.type === 'grammar' || qObj.type === 'reading' || qObj.type === 'listening') &&
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
    qObj.explanation.length > 0 &&
    (!isReading || (typeof qObj.passageId === 'string' && qObj.passageId.length > 0)) &&
    (!isListening || (typeof qObj.clipId === 'string' && qObj.clipId.length > 0))
  );
}

function validateReadingPassages(passages: ReadingPassage[], questions: Question[]): void {
  for (const p of passages) {
    if (!p.id || p.id.length === 0) console.warn('Reading passage: empty id found');
    if (!VALID_DIFFICULTIES.includes(p.difficulty)) console.warn('Reading passage \'' + p.id + '\': invalid difficulty');
    if (!p.text || p.text.length === 0) console.warn('Reading passage \'' + p.id + '\': empty text');
    if (!p.title || p.title.length === 0) console.warn('Reading passage \'' + p.id + '\': empty title');
  }
  for (const p of passages) {
    const pq = questions.filter(q => q.passageId === p.id);
    if (pq.length !== 3) console.warn('Reading passage \'' + p.id + '\': expected 3 questions, found ' + pq.length);
  }
  const passageIds = new Set(passages.map(p => p.id));
  for (const q of questions) {
    if (q.passageId && !passageIds.has(q.passageId)) console.warn('Reading question \'' + q.id + '\': passageId \'' + q.passageId + '\' not found');
  }
}

function validateListeningClips(clips: ListeningClip[], questions: Question[]): void {
  for (const c of clips) {
    if (!c.id || c.id.length === 0) console.warn('Listening clip: empty id found');
    if (!VALID_DIFFICULTIES.includes(c.difficulty)) console.warn('Listening clip \'' + c.id + '\': invalid difficulty');
    if (!c.script || c.script.length === 0) console.warn('Listening clip \'' + c.id + '\': empty script');
    if (!c.title || c.title.length === 0) console.warn('Listening clip \'' + c.id + '\': empty title');
  }
  for (const c of clips) {
    const cq = questions.filter(q => q.clipId === c.id);
    if (cq.length !== 3) console.warn('Listening clip \'' + c.id + '\': expected 3 questions, found ' + cq.length);
  }
  const clipIds = new Set(clips.map(c => c.id));
  for (const q of questions) {
    if (q.clipId && !clipIds.has(q.clipId)) console.warn('Listening question \'' + q.id + '\': clipId \'' + q.clipId + '\' not found');
  }
}

function checkUniqueIds(questions: Question[], sourceName: string): void {
  const ids = new Set<string>();
  for (const q of questions) {
    if (ids.has(q.id)) console.warn(sourceName + ': duplicate id \'' + q.id + '\' found');
    ids.add(q.id);
  }
}

function checkCrossFileIds(...sources: Question[][]): void {
  const allIds = new Set<string>();
  for (const source of sources) {
    for (const q of source) {
      if (allIds.has(q.id)) console.warn('Cross-file duplicate id \'' + q.id + '\' found');
      allIds.add(q.id);
    }
  }
}

function checkAnswerDistribution(questions: Question[], sourceName: string): void {
  const dist = { 0: 0, 1: 0, 2: 0, 3: 0 };
  for (const q of questions) dist[q.correctIndex as keyof typeof dist]++;
  const total = questions.length;
  const maxRatio = Math.max(...Object.values(dist)) / total;
  if (maxRatio > 0.4) {
    const skewedIndex = Object.entries(dist).find(([, v]) => v / total === maxRatio)?.[0];
    console.warn(sourceName + ': correct-answer distribution skewed — index ' + skewedIndex + ' has ' + Math.round(maxRatio * 100) + '% of answers');
  }
}

function getValidQuestions(source: Question[], sourceName: string): Question[] {
  const valid = source.filter(validateQuestion);
  if (valid.length !== source.length) console.warn(sourceName + ': ' + (source.length - valid.length) + ' invalid questions filtered out');
  checkUniqueIds(valid, sourceName);
  checkAnswerDistribution(valid, sourceName);
  return valid;
}

const validVocabulary = getValidQuestions(vocabularyQuestions, 'Vocabulary');
const validGrammar = getValidQuestions(grammarQuestions, 'Grammar');
const validReading = getValidQuestions(readingQuestions, 'Reading');
const validListening = getValidQuestions(listeningQuestions, 'Listening');

validateReadingPassages(readingPassages, validReading);
validateListeningClips(listeningClips, validListening);
checkCrossFileIds(validVocabulary, validGrammar, validReading, validListening);

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
    case 'reading':
      const selectedPassages = shuffleArray([...readingPassages]).slice(0, 3);
      questions = selectedPassages.flatMap(p =>
        validReading.filter(q => q.passageId === p.id)
      );
      break;
    case 'listening':
      const selectedClips = shuffleArray([...listeningClips]).slice(0, 3);
      questions = selectedClips.flatMap(c =>
        validListening.filter(q => q.clipId === c.id)
      );
      break;
    case 'adaptive':
      questions = [...validVocabulary, ...validGrammar, ...validReading, ...validListening];
      break;
  }

  const shuffled = (quizType === 'reading' || quizType === 'listening') ? questions : shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getAllQuestions(): Question[] {
  return [...validVocabulary, ...validGrammar, ...validReading, ...validListening];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getReadingPassages(): ReadingPassage[] {
  return [...readingPassages];
}

export function getListeningClips(): ListeningClip[] {
  return [...listeningClips];
}

export function getQuestionCount(): { vocabulary: number; grammar: number; mixed: number; reading: number; listening: number; adaptive: number } {
  return {
    vocabulary: validVocabulary.length,
    grammar: validGrammar.length,
    mixed: validVocabulary.length + validGrammar.length,
    reading: validReading.length,
    listening: validListening.length,
    adaptive: validVocabulary.length + validGrammar.length + validReading.length + validListening.length
  };
}
