import { createElement, clearElement } from '../renderer';
import { QuizType } from '../../core/types';

export interface StartScreenCallbacks {
  onStart: (quizType: QuizType) => void;
}

export function renderStartScreen(
  container: HTMLElement,
  callbacks: StartScreenCallbacks
): void {
  clearElement(container);

  const screen = createElement('div', 'screen start-screen');

  const header = createElement('div', 'screen-header');
  const title = createElement('h1', 'title', 'English Practice');
  const subtitle = createElement('p', 'subtitle', 'Estimate your level across vocabulary, grammar, reading, listening, and speaking');
  header.appendChild(title);
  header.appendChild(subtitle);

  const info = createElement('div', 'start-info');
  const infoText = createElement('p', 'start-info-text',
    'A free practice assessment \u2014 not an official CEFR exam.'
  );
  info.appendChild(infoText);

  const content = createElement('div', 'screen-content');

  // Quick skill checks
  const quickLabel = createElement('p', 'category-label', 'Quick Skill Checks');
  const quickButtons = createElement('div', 'quiz-type-buttons');

  const quickTypes: { type: QuizType; label: string; description: string }[] = [
    { type: 'vocabulary', label: 'Vocabulary', description: '15 questions' },
    { type: 'grammar', label: 'Grammar', description: '15 questions' },
    { type: 'reading', label: 'Reading', description: '3 passages, 9 questions' },
    { type: 'listening', label: 'Listening', description: '3 clips, 9 questions' }
  ];

  quickTypes.forEach(({ type, label, description }) => {
    quickButtons.appendChild(createQuizButton(type, label, description, callbacks.onStart));
  });
  content.appendChild(quickLabel);
  content.appendChild(quickButtons);

  // Combined modes
  const combinedLabel = createElement('p', 'category-label', 'Combined Modes');
  const combinedButtons = createElement('div', 'quiz-type-buttons');

  const combinedTypes: { type: QuizType; label: string; description: string }[] = [
    { type: 'mixed', label: 'Mixed', description: 'Vocabulary + Grammar together' },
    { type: 'adaptive', label: 'Adaptive Placement', description: 'Shorter test across all four skills' }
  ];

  combinedTypes.forEach(({ type, label, description }) => {
    combinedButtons.appendChild(createQuizButton(type, label, description, callbacks.onStart));
  });
  content.appendChild(combinedLabel);
  content.appendChild(combinedButtons);

  // Reflection
  const reflectionLabel = createElement('p', 'category-label', 'Reflection');
  const reflectionButtons = createElement('div', 'quiz-type-buttons');

  const reflectionTypes: { type: QuizType; label: string; description: string }[] = [
    { type: 'speaking', label: 'Speaking Self-Assessment', description: 'Record, playback, and reflect on your spoken English' }
  ];

  reflectionTypes.forEach(({ type, label, description }) => {
    reflectionButtons.appendChild(createQuizButton(type, label, description, callbacks.onStart));
  });
  content.appendChild(reflectionLabel);
  content.appendChild(reflectionButtons);

  const footer = createElement('div', 'screen-footer');
  const footerText = createElement('p', 'footer-text', 'Free \u2022 No signup \u2022 Runs in your browser');
  footer.appendChild(footerText);

  screen.appendChild(header);
  screen.appendChild(info);
  screen.appendChild(content);
  screen.appendChild(footer);

  container.appendChild(screen);
}

function createQuizButton(
  type: QuizType,
  label: string,
  description: string,
  onStart: (quizType: QuizType) => void
): HTMLElement {
  const button = createElement('button', 'quiz-type-button');
  button.setAttribute('data-type', type);

  const buttonLabel = createElement('span', 'button-label', label);
  const buttonDesc = createElement('span', 'button-description', description);

  button.appendChild(buttonLabel);
  button.appendChild(buttonDesc);

  button.addEventListener('click', () => onStart(type));

  return button;
}
