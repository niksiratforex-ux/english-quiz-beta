import { createElement, clearElement } from '../renderer';
import { QuizResult, Question, Answer, SkillResult, AdaptiveResult } from '../../core/types';
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

  screen.appendChild(createMainResultCard(result));
  screen.appendChild(createSkillBreakdown(result));
  screen.appendChild(createStrengthsSection(result));
  screen.appendChild(createNextStepSection(result));

  const actions = createElement('div', 'result-actions');
  const restartButton = createElement('button', 'restart-button', 'Try Again');
  restartButton.addEventListener('click', callbacks.onRestart);
  const reviewButton = createElement('button', 'review-button', 'Review Answers');
  reviewButton.addEventListener('click', callbacks.onReview);
  actions.appendChild(restartButton);
  actions.appendChild(reviewButton);
  screen.appendChild(actions);

  if (hasFeedbackForm) {
    const feedbackSection = createElement('div', 'feedback-section');
    const feedbackLink = createElement('a', 'feedback-link', 'Share feedback or report an issue');
    feedbackLink.setAttribute('href', FEEDBACK_FORM_URL);
    feedbackLink.setAttribute('target', '_blank');
    feedbackLink.setAttribute('rel', 'noopener noreferrer');
    feedbackSection.appendChild(feedbackLink);
    screen.appendChild(feedbackSection);
  }

  container.appendChild(screen);
}

export function renderAdaptiveResultScreen(
  container: HTMLElement,
  result: AdaptiveResult,
  callbacks: ResultScreenCallbacks
): void {
  clearElement(container);

  const screen = createElement('div', 'screen result-screen');

  const mainCard = createElement('div', 'result-card-main');

  const levelLabel = createElement('p', 'result-level-label', 'Estimated Placement Level');
  const levelValue = createElement('h2', 'result-level-value', result.overallLevel + ' (' + result.overallLevelCode + ')');
  const levelDescription = createElement('p', 'result-level-desc',
    'Based on adaptive questions across vocabulary, grammar, reading, and listening.'
  );

  const confidenceRow = createElement('div', 'adaptive-confidence-row');
  const confidenceLabel = createElement('span', 'adaptive-confidence-label', 'Confidence: ');
  const confidenceValue = createElement('span', 'adaptive-confidence-value adaptive-confidence-' + result.confidence.toLowerCase(), result.confidence);
  confidenceRow.appendChild(confidenceLabel);
  confidenceRow.appendChild(confidenceValue);

  const confidenceNote = createElement('p', 'adaptive-confidence-note', result.confidenceNote);

  const disclaimer = createElement('p', 'result-disclaimer',
    'This is a practice placement, not an official CEFR exam.'
  );

  mainCard.appendChild(levelLabel);
  mainCard.appendChild(levelValue);
  mainCard.appendChild(levelDescription);
  mainCard.appendChild(confidenceRow);
  mainCard.appendChild(confidenceNote);
  mainCard.appendChild(disclaimer);
  screen.appendChild(mainCard);

  const skillSection = createElement('div', 'result-section');
  skillSection.appendChild(createElement('h3', 'result-section-title', 'Skill Breakdown'));

  const skillGrid = createElement('div', 'skill-grid');
  result.skillResults.forEach(skill => {
    const card = createElement('div', 'skill-card skill-card-' + skill.band);

    const header = createElement('div', 'skill-card-header');
    header.appendChild(createElement('span', 'skill-card-name', skill.skill));
    if (skill.estimatedLevel) {
      header.appendChild(createElement('span', 'skill-card-level', skill.estimatedLevel));
    }
    header.appendChild(createElement('span', 'skill-card-band skill-band-' + skill.band, skill.bandLabel));
    card.appendChild(header);

    const score = createElement('div', 'skill-card-score');
    score.innerHTML = '<strong>' + skill.correct + '</strong> / ' + skill.total + '  (' + skill.percentage + '%)';
    card.appendChild(score);

    const bar = createElement('div', 'skill-card-bar');
    const fill = createElement('div', 'skill-card-bar-fill skill-bar-' + skill.band);
    fill.style.width = skill.percentage + '%';
    bar.appendChild(fill);
    card.appendChild(bar);

    skillGrid.appendChild(card);
  });
  skillSection.appendChild(skillGrid);
  screen.appendChild(skillSection);

  const summarySection = createElement('div', 'result-section');
  summarySection.appendChild(createElement('h3', 'result-section-title', 'Test Summary'));

  const summaryCard = createElement('div', 'next-step-card');
  const summaryText = createElement('p', 'next-step-text',
    result.totalQuestions + ' questions across ' + result.skillResults.map(s => s.skill).join(', ') + '.'
  );
  summaryCard.appendChild(summaryText);
  if (result.usedFallback) {
    summaryCard.appendChild(createElement('p', 'adaptive-fallback-note',
      'Some items were selected from the nearest available level.'
    ));
  }
  summarySection.appendChild(summaryCard);
  screen.appendChild(summarySection);

  const recSection = createElement('div', 'result-section');
  recSection.appendChild(createElement('h3', 'result-section-title', 'Suggested Next Step'));

  const recCard = createElement('div', 'next-step-card');
  recCard.appendChild(createElement('p', 'next-step-text', getAdaptiveRecommendation(result)));
  recSection.appendChild(recCard);
  screen.appendChild(recSection);

  const actions = createElement('div', 'result-actions');
  const restartButton = createElement('button', 'restart-button', 'Try Again');
  restartButton.addEventListener('click', callbacks.onRestart);
  const reviewButton = createElement('button', 'review-button', 'Review Answers');
  reviewButton.addEventListener('click', callbacks.onReview);
  actions.appendChild(restartButton);
  actions.appendChild(reviewButton);
  screen.appendChild(actions);

  if (hasFeedbackForm) {
    const feedbackSection = createElement('div', 'feedback-section');
    const feedbackLink = createElement('a', 'feedback-link', 'Share feedback or report an issue');
    feedbackLink.setAttribute('href', FEEDBACK_FORM_URL);
    feedbackLink.setAttribute('target', '_blank');
    feedbackLink.setAttribute('rel', 'noopener noreferrer');
    feedbackSection.appendChild(feedbackLink);
    screen.appendChild(feedbackSection);
  }

  container.appendChild(screen);
}

function getAdaptiveRecommendation(result: AdaptiveResult): string {
  const strongest = result.skillResults.reduce((max, s) => s.percentage > max.percentage ? s : max, result.skillResults[0]);
  const weakest = result.skillResults.reduce((min, s) => s.percentage < min.percentage ? s : min, result.skillResults[0]);

  if (strongest && weakest && strongest.skill !== weakest.skill) {
    return 'You appear strongest in ' + strongest.skill.toLowerCase() + '. Next, work on ' + weakest.skill.toLowerCase() + '.';
  }

  return 'Try a single-skill quiz to get a more detailed estimate.';
}

function createMainResultCard(result: QuizResult): HTMLElement {
  const card = createElement('div', 'result-card-main');

  const isReading = result.quizType === 'reading';
  const isListening = result.quizType === 'listening';

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

  const disclaimer = createElement('p', 'result-disclaimer',
    'This is a practice estimate, not an official CEFR certification.'
  );

  card.appendChild(levelLabel);
  card.appendChild(levelValue);
  card.appendChild(levelDescription);
  card.appendChild(scoreRow);
  card.appendChild(disclaimer);
  return card;
}

function createSkillBreakdown(result: QuizResult): HTMLElement {
  const section = createElement('div', 'result-section');
  section.appendChild(createElement('h3', 'result-section-title', 'Skill Breakdown'));

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
    section.appendChild(createElement('p', 'result-untested-note',
      result.untestedSkills.join(' and ') + ' ' + (result.untestedSkills.length === 1 ? 'was' : 'were') + ' not tested in this session.'
    ));
  }

  return section;
}

function createSkillCard(skill: SkillResult): HTMLElement {
  const card = createElement('div', 'skill-card skill-card-' + skill.band);

  const header = createElement('div', 'skill-card-header');
  header.appendChild(createElement('span', 'skill-card-name', skill.skill));
  header.appendChild(createElement('span', 'skill-card-band skill-band-' + skill.band, skill.bandLabel));

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
  section.appendChild(createElement('h3', 'result-section-title', 'Strengths & Areas to Improve'));

  const strengths = result.skillResults.filter(s => s.band === 'strong' || s.band === 'solid');
  const needs = result.skillResults.filter(s => s.band === 'needs-practice' || s.band === 'developing');

  const grid = createElement('div', 'strengths-grid');

  const strengthsCol = createElement('div', 'strengths-col');
  strengthsCol.appendChild(createElement('h4', 'strengths-heading strengths-heading-good', 'Strengths'));
  if (strengths.length > 0) {
    strengths.forEach(s => {
      strengthsCol.appendChild(createElement('p', 'strengths-item', s.skill + ': ' + s.bandLabel + ' (' + s.percentage + '%)'));
    });
  } else {
    strengthsCol.appendChild(createElement('p', 'strengths-item strengths-empty', 'Keep practicing to build your strengths.'));
  }

  const needsCol = createElement('div', 'needs-col');
  needsCol.appendChild(createElement('h4', 'strengths-heading strengths-heading-need', 'Areas to Improve'));
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
  section.appendChild(createElement('h3', 'result-section-title', 'Suggested Next Step'));

  const suggestion = getPersonalizedSuggestion(result);
  const card = createElement('div', 'next-step-card');
  card.appendChild(createElement('p', 'next-step-text', suggestion));
  section.appendChild(card);
  return section;
}

function getPersonalizedSuggestion(result: QuizResult): string {
  const weakest = result.skillResults.reduce((min, s) => s.percentage < min.percentage ? s : min, result.skillResults[0]);

  if (result.percentage >= 80) {
    if (result.untestedSkills.length > 0) {
      return 'Try ' + result.untestedSkills[0].toLowerCase() + ' to confirm your level across more skills.';
    }
    return 'Challenge yourself with questions at a higher level.';
  }

  if (result.percentage >= 60) {
    if (weakest) {
      return 'Practice ' + weakest.skill.toLowerCase() + ' to strengthen your weakest area.';
    }
    return 'Review ' + result.levelCode + ' material to solidify your foundation.';
  }

  if (result.percentage >= 40) {
    if (weakest) {
      return 'Focus on ' + weakest.skill.toLowerCase() + ' at the ' + result.levelCode + ' level.';
    }
    return 'Review ' + result.levelCode + ' vocabulary and grammar fundamentals.';
  }

  return 'Start with ' + result.levelCode + ' basics to build a solid foundation.';
}

function getLevelDescription(level: string): string {
  const descriptions: Record<string, string> = {
    'Beginner': 'Basic vocabulary and simple sentence structures.',
    'Elementary': 'Common everyday expressions and basic communication.',
    'Intermediate': 'Main points of familiar topics and general descriptions.',
    'Upper-Intermediate': 'Detailed text comprehension and spontaneous conversation.',
    'Advanced': 'Near-native fluency with complex structures.'
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
  header.appendChild(createElement('h2', 'review-title', 'Answer Review'));
  const backButton = createElement('button', 'back-button', 'Back to Results');
  backButton.addEventListener('click', callbacks.onBack);
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
        passageHeader.appendChild(createElement('h3', 'review-passage-title', passage.title));
        passageHeader.appendChild(createElement('p', 'review-passage-text', passage.text));
        answersList.appendChild(passageHeader);
      }
    }

    if (question.type === 'listening' && question.clipId && question.clipId !== lastClipId) {
      lastClipId = question.clipId;
      const clip = clips.find(c => c.id === question.clipId);
      if (clip) {
        const clipHeader = createElement('div', 'review-clip-header');
        clipHeader.appendChild(createElement('h3', 'review-clip-title', clip.title));
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
