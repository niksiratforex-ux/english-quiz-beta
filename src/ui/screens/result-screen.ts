import { createElement, clearElement } from '../renderer';
import { QuizResult, Question, Answer, SkillResult } from '../../core/types';
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

  // A. Main result card
  screen.appendChild(createMainResultCard(result));

  // B. Skill breakdown
  screen.appendChild(createSkillBreakdown(result));

  // C. Strengths and needs practice
  screen.appendChild(createStrengthsSection(result));

  // D. Recommended next step
  screen.appendChild(createNextStepSection(result));

  // Sample size note
  screen.appendChild(createSampleNote());

  // Actions
  const actions = createElement('div', 'result-actions');
  const restartButton = createElement('button', 'restart-button', 'Try Again');
  restartButton.addEventListener('click', callbacks.onRestart);
  const reviewButton = createElement('button', 'review-button', 'Review Answers');
  reviewButton.addEventListener('click', callbacks.onReview);
  actions.appendChild(restartButton);
  actions.appendChild(reviewButton);
  screen.appendChild(actions);

  // F. Feedback form
  if (hasFeedbackForm) {
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

function createMainResultCard(result: QuizResult): HTMLElement {
  const card = createElement('div', 'result-card-main');

  const isReading = result.quizType === 'reading';
  const isListening = result.quizType === 'listening';
  const isSingleSkill = isReading || isListening || result.quizType === 'vocabulary' || result.quizType === 'grammar';

  let levelLabelText = 'Estimated Level';
  if (isReading) levelLabelText = 'Estimated Reading Level';
  else if (isListening) levelLabelText = 'Estimated Listening Level';
  else if (result.quizType === 'vocabulary') levelLabelText = 'Estimated Vocabulary Level';
  else if (result.quizType === 'grammar') levelLabelText = 'Estimated Grammar Level';

  const levelLabel = createElement('p', 'result-level-label', levelLabelText);
  const levelValue = createElement('h2', 'result-level-value', result.level + ' (' + result.levelCode + ')');
  const levelDescription = createElement('p', 'result-level-desc', getLevelDescription(result.level));

  const scoreRow = createElement('div', 'result-score-row');
  const scoreBig = createElement('span', 'result-score-big', String(result.score));
  const scoreSep = createElement('span', 'result-score-sep', ' / ');
  const scoreTotal = createElement('span', 'result-score-total', String(result.totalQuestions));
  const scorePct = createElement('span', 'result-score-pct', result.percentage + '%');
  scoreRow.appendChild(scoreBig);
  scoreRow.appendChild(scoreSep);
  scoreRow.appendChild(scoreTotal);
  scoreRow.appendChild(scorePct);

  let disclaimerText = 'This is a short practice quiz for an estimated English level. It is not an official CEFR exam.';
  if (isSingleSkill) {
    disclaimerText = 'This result is based on a short practice set, so treat it as a directional estimate.';
  }
  const disclaimer = createElement('p', 'result-disclaimer', disclaimerText);

  card.appendChild(levelLabel);
  card.appendChild(levelValue);
  card.appendChild(levelDescription);
  card.appendChild(scoreRow);
  card.appendChild(disclaimer);
  return card;
}

function createSkillBreakdown(result: QuizResult): HTMLElement {
  const section = createElement('div', 'result-section');
  const title = createElement('h3', 'result-section-title', 'Skill Breakdown');
  section.appendChild(title);

  if (result.skillResults.length === 0) {
    section.appendChild(createElement('p', 'result-empty-note', 'No skills to display.'));
    return section;
  }

  const grid = createElement('div', 'skill-grid');
  result.skillResults.forEach(skill => {
    grid.appendChild(createSkillCard(skill));
  });
  section.appendChild(grid);

  if (result.untestedSkills.length > 0) {
    const untestedNote = createElement('p', 'result-untested-note',
      result.untestedSkills.join(' and ') + (result.untestedSkills.length === 1 ? ' was' : ' were') + ' not part of this session.'
    );
    section.appendChild(untestedNote);
  }

  return section;
}

function createSkillCard(skill: SkillResult): HTMLElement {
  const card = createElement('div', 'skill-card skill-card-' + skill.band);

  const header = createElement('div', 'skill-card-header');
  const name = createElement('span', 'skill-card-name', skill.skill);
  const band = createElement('span', 'skill-card-band skill-band-' + skill.band, skill.bandLabel);
  header.appendChild(name);
  header.appendChild(band);

  const score = createElement('div', 'skill-card-score');
  score.innerHTML = '<strong>' + skill.correct + '</strong> / ' + skill.total + '  (' + skill.percentage + '%)';

  const bar = createElement('div', 'skill-card-bar');
  const fill = createElement('div', 'skill-card-bar-fill skill-bar-' + skill.band);
  fill.style.width = skill.percentage + '%';
  bar.appendChild(fill);

  card.appendChild(header);
  card.appendChild(score);
  card.appendChild(bar);
  return card;
}

function createStrengthsSection(result: QuizResult): HTMLElement {
  const section = createElement('div', 'result-section');
  const title = createElement('h3', 'result-section-title', 'Strengths and Needs Practice');
  section.appendChild(title);

  const strengths = result.skillResults.filter(s => s.band === 'strong' || s.band === 'solid');
  const needs = result.skillResults.filter(s => s.band === 'needs-practice' || s.band === 'developing');

  const grid = createElement('div', 'strengths-grid');

  const strengthsCol = createElement('div', 'strengths-col');
  const strengthsHead = createElement('h4', 'strengths-heading strengths-heading-good', 'Strengths');
  strengthsCol.appendChild(strengthsHead);
  if (strengths.length > 0) {
    strengths.forEach(s => {
      strengthsCol.appendChild(createElement('p', 'strengths-item', s.skill + ': ' + s.bandLabel + ' (' + s.percentage + '%)'));
    });
  } else {
    strengthsCol.appendChild(createElement('p', 'strengths-item strengths-empty', 'Keep practicing to build your strengths.'));
  }

  const needsCol = createElement('div', 'needs-col');
  const needsHead = createElement('h4', 'strengths-heading strengths-heading-need', 'Needs Practice');
  needsCol.appendChild(needsHead);
  if (needs.length > 0) {
    needs.forEach(s => {
      needsCol.appendChild(createElement('p', 'needs-item', s.skill + ': ' + s.bandLabel + ' (' + s.percentage + '%)'));
    });
  } else {
    needsCol.appendChild(createElement('p', 'needs-item needs-empty', 'Great work! No areas need immediate attention.'));
  }

  grid.appendChild(strengthsCol);
  grid.appendChild(needsCol);
  section.appendChild(grid);
  return section;
}

function createNextStepSection(result: QuizResult): HTMLElement {
  const section = createElement('div', 'result-section');
  const title = createElement('h3', 'result-section-title', 'Recommended Next Step');
  section.appendChild(title);

  const suggestion = getPersonalizedSuggestion(result);
  const card = createElement('div', 'next-step-card');
  const text = createElement('p', 'next-step-text', suggestion);
  card.appendChild(text);
  section.appendChild(card);
  return section;
}

function createSampleNote(): HTMLElement {
  return createElement('p', 'result-sample-note',
    'This result is based on a short practice set, so treat it as a directional estimate.'
  );
}

function getPersonalizedSuggestion(result: QuizResult): string {
  const weakest = result.skillResults.reduce((min, s) => s.percentage < min.percentage ? s : min, result.skillResults[0]);

  if (result.percentage >= 80) {
    if (result.untestedSkills.length > 0) {
      return 'Next: try ' + result.untestedSkills[0].toLowerCase() + ' to confirm your placement across more skills.';
    }
    return 'Next: challenge yourself with questions at the next CEFR level.';
  }

  if (result.percentage >= 60) {
    if (weakest) {
      return 'Next: practice ' + weakest.skill.toLowerCase() + ' to strengthen your weakest area.';
    }
    return 'Next: review ' + result.levelCode + ' material to solidify your foundation.';
  }

  if (result.percentage >= 40) {
    if (weakest) {
      return 'Next: focus on ' + weakest.skill.toLowerCase() + ' at the ' + result.levelCode + ' level to build a stronger base.';
    }
    return 'Next: review ' + result.levelCode + ' vocabulary and grammar fundamentals.';
  }

  return 'Next: start with ' + result.levelCode + ' basics to build a solid foundation.';
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

    if (question.type === 'reading' && question.passageId && question.passageId !== lastPassageId) {
      lastPassageId = question.passageId;
      const passage = passages.find(p => p.id === question.passageId);
      if (passage) {
        const passageHeader = createElement('div', 'review-passage-header');
        passageHeader.appendChild(createElement('h3', 'review-passage-title', 'Passage: ' + passage.title));
        passageHeader.appendChild(createElement('p', 'review-passage-text', passage.text));
        answersList.appendChild(passageHeader);
      }
    }

    if (question.type === 'listening' && question.clipId && question.clipId !== lastClipId) {
      lastClipId = question.clipId;
      const clip = clips.find(c => c.id === question.clipId);
      if (clip) {
        const clipHeader = createElement('div', 'review-clip-header');
        clipHeader.appendChild(createElement('h3', 'review-clip-title', 'Clip: ' + clip.title));
        clipHeader.appendChild(createElement('p', 'review-clip-script', clip.script));
        answersList.appendChild(clipHeader);
      }
    }

    const answerItem = createElement('div', 'answer-item ' + (isCorrect ? 'correct' : 'incorrect'));

    const meta = createElement('div', 'review-meta');
    meta.appendChild(createElement('span', 'badge badge-' + question.type, question.type));
    meta.appendChild(createElement('span', 'badge badge-topic', question.topic));
    if (question.subtype) {
      meta.appendChild(createElement('span', 'badge badge-subtype', String(question.subtype)));
    }

    answerItem.appendChild(meta);
    answerItem.appendChild(createElement('span', 'question-number', 'Q' + (index + 1)));
    answerItem.appendChild(createElement('p', 'question-text', question.question));

    if (answer) {
      const selectedAnswer = createElement('p', 'selected-answer');
      selectedAnswer.innerHTML = 'Your answer: <strong>' + question.options[answer.selectedIndex] + '</strong>';
      answerItem.appendChild(selectedAnswer);

      const correctAnswer = createElement('p', 'correct-answer');
      correctAnswer.innerHTML = 'Correct answer: <strong>' + question.options[question.correctIndex] + '</strong>';
      answerItem.appendChild(correctAnswer);
    }

    answerItem.appendChild(createElement('p', 'explanation', question.explanation));
    answersList.appendChild(answerItem);
  });

  screen.appendChild(header);
  screen.appendChild(answersList);
  container.appendChild(screen);
}
