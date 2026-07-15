import { createElement, clearElement } from '../renderer';
import { QuizResult, Question, Answer } from '../../core/types';
import { getReadingPassages, getListeningClips } from '../../data';

const FEEDBACK_FORM_PLACEHOLDER = "REPLACE_WITH_YOUR_GOOGLE_FORM_LINK";

const FEEDBACK_FORM_URL: string =
  "https://docs.google.com/forms/d/e/1FAIpQLSdJ_Ja0cMQL7pt1U6HMXLqvhzPKHwUL2iWLJeqN2nFEYL2-3g/viewform";

const hasFeedbackForm = FEEDBACK_FORM_URL !== FEEDBACK_FORM_PLACEHOLDER;
export interface ResultScreenCallbacks {
  onRestart: () => void;
  onReview: () => void;
}

export function renderResultScreen(
  container: HTMLElement,
  result: QuizResult,
  callbacks: ResultScreenCallbacks
): void {
  clearElement(container);

  const screen = createElement('div', 'screen result-screen');

  const header = createElement('div', 'result-header');
  const scoreTitle = createElement('h2', 'score-title', 'Quiz Complete!');
  const scoreValue = createElement('div', 'score-value');
  scoreValue.innerHTML = `
    <span class="score-number">${result.score}</span>
    <span class="score-separator">/</span>
    <span class="score-total">${result.totalQuestions}</span>
  `;
  const percentage = createElement('p', 'score-percentage', `${result.percentage}%`);
  header.appendChild(scoreTitle);
  header.appendChild(scoreValue);
  header.appendChild(percentage);

  const levelCard = createElement('div', 'level-card');
  const isReading = result.quizType === 'reading';
  const isListening = result.quizType === 'listening';
  let levelLabelText = 'Your Level';
  if (isReading) levelLabelText = 'Estimated Reading Level';
  else if (isListening) levelLabelText = 'Estimated Listening Level';
  const levelLabel = createElement('p', 'level-label', levelLabelText);
  const levelValue = createElement('h3', 'level-value', `${result.level} (${result.levelCode})`);
  const levelDescription = createElement('p', 'level-description', getLevelDescription(result.level));
  let disclaimerText = 'Estimated level based on this short practice quiz';
  if (isReading) disclaimerText = 'Estimated reading level based on this short practice quiz';
  else if (isListening) disclaimerText = 'Estimated listening level based on this short practice quiz';
  const disclaimer = createElement('p', 'level-disclaimer', disclaimerText);
  levelCard.appendChild(levelLabel);
  levelCard.appendChild(levelValue);
  levelCard.appendChild(levelDescription);
  levelCard.appendChild(disclaimer);

  const skillBreakdown = createSkillBreakdown(result);

  const actions = createElement('div', 'result-actions');

  const restartButton = createElement('button', 'restart-button', 'Try Again');
  restartButton.addEventListener('click', callbacks.onRestart);

  const reviewButton = createElement('button', 'review-button', 'Review Answers');
  reviewButton.addEventListener('click', callbacks.onReview);

  actions.appendChild(restartButton);
  actions.appendChild(reviewButton);

  screen.appendChild(header);
  screen.appendChild(levelCard);
  screen.appendChild(skillBreakdown);
  screen.appendChild(actions);

  if (hasFeedbackForm)  {
    const feedbackSection = createElement('div', 'feedback-section');
    const feedbackText = createElement('p', 'feedback-text',
      'Found an unclear question or a bug? Your feedback helps improve the quiz.'
    );
    const feedbackLink = createElement('a', 'feedback-link', 'Report a question or share feedback');
    feedbackLink.setAttribute('href', FEEDBACK_FORM_URL);
    feedbackLink.setAttribute('target', '_blank');
    feedbackLink.setAttribute('rel', 'noopener noreferrer');
    feedbackSection.appendChild(feedbackText);
    feedbackSection.appendChild(feedbackLink);
    screen.appendChild(feedbackSection);
  }

  container.appendChild(screen);
}

function createSkillBreakdown(result: QuizResult): HTMLElement {
  const container = createElement('div', 'skill-breakdown');

  const vocabQuestions = result.questions.filter(q => q.type === 'vocabulary');
  const grammarQuestions = result.questions.filter(q => q.type === 'grammar');
  const readingQuestions = result.questions.filter(q => q.type === 'reading');
  const listeningQuestions = result.questions.filter(q => q.type === 'listening');

  const vocabAnswers = result.answers.filter(a => {
    const q = result.questions.find(q => q.id === a.questionId);
    return q && q.type === 'vocabulary';
  });
  const grammarAnswers = result.answers.filter(a => {
    const q = result.questions.find(q => q.id === a.questionId);
    return q && q.type === 'grammar';
  });
  const readingAnswers = result.answers.filter(a => {
    const q = result.questions.find(q => q.id === a.questionId);
    return q && q.type === 'reading';
  });
  const listeningAnswers = result.answers.filter(a => {
    const q = result.questions.find(q => q.id === a.questionId);
    return q && q.type === 'listening';
  });

  const vocabCorrect = vocabAnswers.filter(a => a.isCorrect).length;
  const grammarCorrect = grammarAnswers.filter(a => a.isCorrect).length;
  const readingCorrect = readingAnswers.filter(a => a.isCorrect).length;
  const listeningCorrect = listeningAnswers.filter(a => a.isCorrect).length;

  if (result.quizType === 'vocabulary') {
    container.appendChild(createSkillRow('Vocabulary', vocabCorrect, vocabQuestions.length));
    container.appendChild(createElement('p', 'skill-note', 'Based on vocabulary questions only'));
  } else if (result.quizType === 'grammar') {
    container.appendChild(createSkillRow('Grammar', grammarCorrect, grammarQuestions.length));
    container.appendChild(createElement('p', 'skill-note', 'Based on grammar questions only'));
  } else if (result.quizType === 'reading') {
    container.appendChild(createSkillRow('Reading', readingCorrect, readingQuestions.length));
    container.appendChild(createElement('p', 'skill-note', 'Based on reading comprehension questions'));
  } else if (result.quizType === 'listening') {
    container.appendChild(createSkillRow('Listening', listeningCorrect, listeningQuestions.length));
    container.appendChild(createElement('p', 'skill-note', 'Based on listening comprehension questions'));
  } else {
    container.appendChild(createSkillRow('Vocabulary', vocabCorrect, vocabQuestions.length));
    container.appendChild(createSkillRow('Grammar', grammarCorrect, grammarQuestions.length));
  }

  return container;
}

function createSkillRow(label: string, correct: number, total: number): HTMLElement {
  const row = createElement('div', 'skill-row');
  const labelEl = createElement('span', 'skill-label', label);
  const scoreEl = createElement('span', 'skill-score', `${correct} / ${total}`);
  row.appendChild(labelEl);
  row.appendChild(scoreEl);
  return row;
}

function getLevelDescription(level: string): string {
  const descriptions: Record<string, string> = {
    'Beginner': 'You have basic vocabulary and simple sentence structures.',
    'Elementary': 'You can understand common everyday expressions and basic communication.',
    'Intermediate': 'You can handle main points of familiar topics and general descriptions.',
    'Upper-Intermediate': 'You can understand detailed text and engage in spontaneous conversation.',
    'Advanced': 'You have near-native fluency with complex structures.'
  };
  return descriptions[level] || '';
}

export function renderReviewScreen(
  container: HTMLElement,
  questions: Question[],
  answers: Answer[],
  callbacks: { onBack: () => void }
): void {
  clearElement(container);

  const screen = createElement('div', 'screen review-screen');

  const header = createElement('div', 'review-header');
  const title = createElement('h2', 'review-title', 'Answer Review');
  const backButton = createElement('button', 'back-button', 'Back to Results');
  backButton.addEventListener('click', callbacks.onBack);
  header.appendChild(title);
  header.appendChild(backButton);

  const answersList = createElement('div', 'answers-list');

  const passages = getReadingPassages();
  const clips = getListeningClips();
  let lastPassageId: string | null = null;
  let lastClipId: string | null = null;

  questions.forEach((question, index) => {
    const answer = answers[index];
    const isCorrect = answer && answer.selectedIndex === question.correctIndex;

    // Show passage header for reading questions when passage changes
    if (question.type === 'reading' && question.passageId && question.passageId !== lastPassageId) {
      lastPassageId = question.passageId;
      const passage = passages.find(p => p.id === question.passageId);
      if (passage) {
        const passageHeader = createElement('div', 'review-passage-header');
        const passageTitle = createElement('h3', 'review-passage-title', 'Passage: ' + passage.title);
        const passageText = createElement('p', 'review-passage-text', passage.text);
        passageHeader.appendChild(passageTitle);
        passageHeader.appendChild(passageText);
        answersList.appendChild(passageHeader);
      }
    }

    // Show clip header for listening questions when clip changes
    if (question.type === 'listening' && question.clipId && question.clipId !== lastClipId) {
      lastClipId = question.clipId;
      const clip = clips.find(c => c.id === question.clipId);
      if (clip) {
        const clipHeader = createElement('div', 'review-clip-header');
        const clipTitle = createElement('h3', 'review-clip-title', 'Clip: ' + clip.title);
        const clipScript = createElement('p', 'review-clip-script', clip.script);
        clipHeader.appendChild(clipTitle);
        clipHeader.appendChild(clipScript);
        answersList.appendChild(clipHeader);
      }
    }

    const answerItem = createElement('div', `answer-item ${isCorrect ? 'correct' : 'incorrect'}`);

    const meta = createElement('div', 'review-meta');
    const typeBadge = createElement('span', `badge badge-${question.type}`, question.type);
    const topicBadge = createElement('span', 'badge badge-topic', question.topic);
    meta.appendChild(typeBadge);
    meta.appendChild(topicBadge);
    if (question.subtype) {
      const subtypeBadge = createElement('span', 'badge badge-subtype', String(question.subtype));
      meta.appendChild(subtypeBadge);
    }

    const questionNumber = createElement('span', 'question-number', `Q${index + 1}`);
    const questionText = createElement('p', 'question-text', question.question);

    const selectedAnswer = createElement('p', 'selected-answer');
    const correctAnswer = createElement('p', 'correct-answer');

    if (answer) {
      selectedAnswer.innerHTML = `Your answer: <strong>${question.options[answer.selectedIndex]}</strong>`;
      correctAnswer.innerHTML = `Correct answer: <strong>${question.options[question.correctIndex]}</strong>`;
    }

    const explanation = createElement('p', 'explanation', question.explanation);

    answerItem.appendChild(meta);
    answerItem.appendChild(questionNumber);
    answerItem.appendChild(questionText);
    answerItem.appendChild(selectedAnswer);
    answerItem.appendChild(correctAnswer);
    answerItem.appendChild(explanation);

    answersList.appendChild(answerItem);
  });

  screen.appendChild(header);
  screen.appendChild(answersList);

  container.appendChild(screen);
}
