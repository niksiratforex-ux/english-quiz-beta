import { createElement, clearElement } from '../renderer';

export interface ErrorScreenCallbacks {
  onBack: () => void;
}

export function renderErrorScreen(
  container: HTMLElement,
  options: { message: string; onBack: () => void }
): void {
  clearElement(container);

  const screen = createElement('div', 'screen error-screen');

  const icon = createElement('div', 'error-icon', '\u26A0');
  const title = createElement('h2', 'error-title', 'Something went wrong');
  const message = createElement('p', 'error-message', options.message);
  const backButton = createElement('button', 'back-button', 'Back to Start');
  backButton.addEventListener('click', options.onBack);

  screen.appendChild(icon);
  screen.appendChild(title);
  screen.appendChild(message);
  screen.appendChild(backButton);

  container.appendChild(screen);
}
