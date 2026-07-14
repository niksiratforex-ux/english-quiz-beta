import { createElement, clearElement } from '../renderer';
import { Question } from '../../core/types';
import { createProgressBar, updateProgressBar } from '../components/progress-bar';
import { createQuestionCard } from '../components/question-card';
import { createOptionButton, setSelectedOption, disableOptions } from '../components/option-button';

export interface QuizScreenCallbacks {
  onAnswer: (selectedIndex: number) => void;
}

let progressBar: HTMLElement | null = null;
let optionsContainer: HTMLElement | null = null;
let hasAnswered: boolean = false;

export function renderQuizScreen(
  container: HTMLElement,
  question: Question,
  current: number,
  total: number,
  callbacks: QuizScreenCallbacks
): void {
  clearElement(container);
  hasAnswered = false;

  const screen = createElement('div', 'screen quiz-screen');

  progressBar = createProgressBar();
  updateProgressBar(progressBar, current, total);

  const questionCard = createQuestionCard(question);

  const optionsWrapper = createElement('div', 'options-wrapper');
  optionsContainer = createElement('div', 'options-container');

  question.options.forEach((option, index) => {
    const button = createOptionButton(option, index, (selectedIndex) => {
      if (hasAnswered) return;
      hasAnswered = true;

      setSelectedOption(optionsContainer!, selectedIndex);
      disableOptions(optionsContainer!);
      callbacks.onAnswer(selectedIndex);
    });
    optionsContainer!.appendChild(button);
  });

  optionsWrapper.appendChild(optionsContainer);

  screen.appendChild(progressBar);
  screen.appendChild(questionCard);
  screen.appendChild(optionsWrapper);

  container.appendChild(screen);
}

export function showAnswerFeedback(selectedIndex: number, correctIndex: number): void {
  if (!optionsContainer) return;

  const buttons = optionsContainer.querySelectorAll('.option-button');
  buttons.forEach((button, index) => {
    if (index === correctIndex) {
      button.classList.add('correct');
    } else if (index === selectedIndex && selectedIndex !== correctIndex) {
      button.classList.add('incorrect');
    }
  });
}

export function disableAllOptions(): void {
  if (optionsContainer) {
    disableOptions(optionsContainer);
  }
}
