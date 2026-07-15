import { createElement, clearElement } from '../renderer';
import { Question, ReadingPassage, ListeningClip } from '../../core/types';
import { createProgressBar, updateProgressBar } from '../components/progress-bar';
import { createQuestionCard } from '../components/question-card';
import { createOptionButton, setSelectedOption, disableOptions } from '../components/option-button';
import { createPassageCard } from '../components/passage-card';
import { createListeningPlayer, ListeningPlayer, ListeningPlayerCallbacks } from '../components/listening-player';

export interface QuizScreenCallbacks {
  onAnswer: (selectedIndex: number) => void;
}

export interface ReadingContext {
  passage: ReadingPassage;
  passageIndex: number;
  passageTotal: number;
  questionInPassage: number;
  questionsPerPassage: number;
}

export interface ListeningContext {
  clip: ListeningClip;
  clipIndex: number;
  clipTotal: number;
  questionInClip: number;
  questionsPerClip: number;
  playerCallbacks: ListeningPlayerCallbacks;
  hasPlayed: boolean;
}

let progressBar: HTMLElement | null = null;
let optionsContainer: HTMLElement | null = null;
let hasAnswered: boolean = false;
let listeningPlayer: ListeningPlayer | null = null;

export function renderQuizScreen(
  container: HTMLElement,
  question: Question,
  current: number,
  total: number,
  callbacks: QuizScreenCallbacks,
  readingContext?: ReadingContext,
  listeningContext?: ListeningContext
): void {
  clearElement(container);
  hasAnswered = false;

  // Clean up previous listening player
  if (listeningPlayer) {
    listeningPlayer.destroy();
    listeningPlayer = null;
  }

  const screen = createElement('div', 'screen quiz-screen');

  progressBar = createProgressBar();
  if (readingContext) {
    const passageLabel = createElement('p', 'reading-progress-label',
      'Passage ' + (readingContext.passageIndex + 1) + ' of ' + readingContext.passageTotal + ' \u00B7 Question ' + readingContext.questionInPassage + ' of ' + readingContext.questionsPerPassage
    );
    screen.appendChild(passageLabel);
    updateProgressBar(progressBar, readingContext.questionInPassage, readingContext.questionsPerPassage);
  } else if (listeningContext) {
    const clipLabel = createElement('p', 'listening-progress-label',
      'Clip ' + (listeningContext.clipIndex + 1) + ' of ' + listeningContext.clipTotal + ' \u2014 Question ' + listeningContext.questionInClip + ' of ' + (listeningContext.questionInClip + listeningContext.questionsPerClip - 1)
    );
    screen.appendChild(clipLabel);
    updateProgressBar(progressBar, current, total);
  } else {
    updateProgressBar(progressBar, current, total);
  }

  if (readingContext) {
    const passageCard = createPassageCard(readingContext.passage);
    screen.appendChild(passageCard);
  }

  if (listeningContext) {
    listeningPlayer = createListeningPlayer(listeningContext.playerCallbacks);
    screen.appendChild(listeningPlayer.element);
    // Update player UI to reflect current play count
    if (listeningContext.hasPlayed) {
      listeningPlayer.updatePlayCount(1, 2);
    }
  }

  const questionCard = createQuestionCard(question);

  const optionsWrapper = createElement('div', 'options-wrapper');
  optionsContainer = createElement('div', 'options-container');

  const isListening = question.type === 'listening';
  const shouldDisableOptions = isListening && !(listeningContext && listeningContext.hasPlayed);

  question.options.forEach((option, index) => {
    const button = createOptionButton(option, index, (selectedIndex) => {
      if (hasAnswered) return;
      hasAnswered = true;

      setSelectedOption(optionsContainer!, selectedIndex);
      disableOptions(optionsContainer!);
      callbacks.onAnswer(selectedIndex);
    });
    if (shouldDisableOptions) {
      (button as HTMLButtonElement).disabled = true;
    }
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

export function enableListeningOptions(): void {
  if (optionsContainer) {
    const buttons = optionsContainer.querySelectorAll('.option-button');
    buttons.forEach(button => {
      (button as HTMLButtonElement).disabled = false;
    });
  }
}

export function updateListeningPlayerPlayCount(count: number, maxPlays: number): void {
  if (listeningPlayer) {
    listeningPlayer.updatePlayCount(count, maxPlays);
  }
}

export function disableAllOptions(): void {
  if (optionsContainer) {
    disableOptions(optionsContainer);
  }
}

export function destroyListeningPlayer(): void {
  if (listeningPlayer) {
    listeningPlayer.destroy();
    listeningPlayer = null;
  }
}
