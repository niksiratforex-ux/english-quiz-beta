import { createElement } from '../renderer';
import { ReadingPassage } from '../../core/types';

export function createPassageCard(passage: ReadingPassage): HTMLElement {
  const card = createElement('section', 'reading-passage');
  card.setAttribute('aria-label', 'Reading passage');

  const title = createElement('h3', 'passage-title', passage.title);
  const text = createElement('p', 'passage-text', passage.text);

  card.appendChild(title);
  card.appendChild(text);

  return card;
}
