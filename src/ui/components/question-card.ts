import { createElement } from '../renderer';
import { Question } from '../../core/types';

export function createQuestionCard(question: Question): HTMLElement {
  const card = createElement('div', 'question-card');
  
  const header = createElement('div', 'question-header');
  const typeBadge = createElement('span', `badge badge-${question.type}`, question.type);
  const difficultyBadge = createElement('span', 'badge badge-difficulty', question.difficulty);
  header.appendChild(typeBadge);
  header.appendChild(difficultyBadge);
  
  const questionText = createElement('p', 'question-text', question.question);
  
  card.appendChild(header);
  card.appendChild(questionText);
  
  return card;
}
