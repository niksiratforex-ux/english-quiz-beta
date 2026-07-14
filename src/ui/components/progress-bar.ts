import { createElement } from '../renderer';

export function createProgressBar(): HTMLElement {
  const container = createElement('div', 'progress-container');
  
  const progressBar = createElement('div', 'progress-bar');
  const progressFill = createElement('div', 'progress-fill');
  progressBar.appendChild(progressFill);
  
  const progressText = createElement('span', 'progress-text', '0 / 0');
  
  container.appendChild(progressBar);
  container.appendChild(progressText);
  
  return container;
}

export function updateProgressBar(container: HTMLElement, current: number, total: number): void {
  const fill = container.querySelector('.progress-fill') as HTMLElement;
  const text = container.querySelector('.progress-text') as HTMLElement;
  
  if (fill && text) {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    fill.style.width = `${percentage}%`;
    text.textContent = `${current} / ${total}`;
  }
}
