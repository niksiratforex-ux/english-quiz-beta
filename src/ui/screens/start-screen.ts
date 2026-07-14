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
  const title = createElement('h1', 'title', 'English Quiz');
  const subtitle = createElement('p', 'subtitle', 'Test your vocabulary and grammar skills');
  header.appendChild(title);
  header.appendChild(subtitle);

  const info = createElement('div', 'start-info');
  const infoText = createElement('p', 'start-info-text',
    'This is a short practice quiz for an estimated English level. It is not an official CEFR exam.'
  );
  const infoDetails = createElement('p', 'start-info-details',
    'Vocabulary and Grammar each contain 15 randomly selected questions. Mixed combines both. The quiz takes only a few minutes.'
  );
  info.appendChild(infoText);
  info.appendChild(infoDetails);

  const content = createElement('div', 'screen-content');

  const quizTypeLabel = createElement('p', 'label', 'Select quiz type:');
  const quizTypeButtons = createElement('div', 'quiz-type-buttons');

  const types: { type: QuizType; label: string; description: string }[] = [
    { type: 'vocabulary', label: 'Vocabulary', description: '15 questions' },
    { type: 'grammar', label: 'Grammar', description: '15 questions' },
    { type: 'mixed', label: 'Mixed', description: '15 questions from both' }
  ];

  types.forEach(({ type, label, description }) => {
    const button = createElement('button', 'quiz-type-button');
    button.setAttribute('data-type', type);

    const buttonLabel = createElement('span', 'button-label', label);
    const buttonDesc = createElement('span', 'button-description', description);

    button.appendChild(buttonLabel);
    button.appendChild(buttonDesc);

    button.addEventListener('click', () => callbacks.onStart(type));

    quizTypeButtons.appendChild(button);
  });

  content.appendChild(quizTypeLabel);
  content.appendChild(quizTypeButtons);

  const footer = createElement('div', 'screen-footer');
  const footerText = createElement('p', 'footer-text', 'Free • No signup required');
  footer.appendChild(footerText);

  screen.appendChild(header);
  screen.appendChild(info);
  screen.appendChild(content);
  screen.appendChild(footer);

  container.appendChild(screen);
}
