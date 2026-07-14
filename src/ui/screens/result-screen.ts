import { createElement, clearElement } from '../renderer';
import { QuizResult, Question, Answer } from '../../core/types';

const FEEDBACK_FORM_URL = 'REPLACE_WITH_YOUR_GOOGLE_FORM_LINK';

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
  const levelLabel = createElement('p', 'level-label', 'Your Level');
  const levelValue = createElement('h3', 'level-value', `${result.level} (${result.levelCode})`);
  const levelDescription = createElement('p', 'level-description', getLevelDescription(result.level));
  const disclaimer = createElement('p', 'level-disclaimer', 'Estimated level based on this short practice quiz');
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

  if (FEEDBACK_FORM_URL !== 'REPLACE_WITH_YOUR_GOOGLE_FORM_LINK') {
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

  const vocabAnswers = result.answers.filter(a => {
    const q = result.questions.find(q => q.id === a.questionId);
    return q && q.type === 'vocabulary';
  });
  const grammarAnswers = result.answers.filter(a => {
    const q = result.questions.find(q => q.id === a.questionId);
    return q && q.type === 'grammar';
  });

  const vocabCorrect = vocabAnswers.filter(a => a.isCorrect).length;
  const grammarCorrect = grammarAnswers.filter(a => a.isCorrect).length;

  if (result.quizType === 'vocabulary') {
    const row = createSkillRow('Vocabulary', vocabCorrect, vocabQuestions.length);
    container.appendChild(row);
    const note = createElement('p', 'skill-note', 'Based on vocabulary questions only');
    container.appendChild(note);
  } else if (result.quizType === 'grammar') {
    const row = createSkillRow('Grammar', grammarCorrect, grammarQuestions.length);
    container.appendChild(row);
    const note = createElement('p', 'skill-note', 'Based on grammar questions only');
    container.appendChild(note);
  } else {
    const vocabRow = createSkillRow('Vocabulary', vocabCorrect, vocabQuestions.length);
    const grammarRow = createSkillRow('Grammar', grammarCorrect, grammarQuestions.length);
    container.appendChild(vocabRow);
    container.appendChild(grammarRow);
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

  questions.forEach((question, index) => {
    const answer = answers[index];
    const isCorrect = answer && answer.selectedIndex === question.correctIndex;

    const answerItem = createElement('div', `answer-item ${isCorrect ? 'correct' : 'incorrect'}`);

    const meta = createElement('div', 'review-meta');
    const typeBadge = createElement('span', `badge badge-${question.type}`, question.type);
    const topicBadge = createElement('span', 'badge badge-topic', question.topic);
    meta.appendChild(typeBadge);
    meta.appendChild(topicBadge);

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
