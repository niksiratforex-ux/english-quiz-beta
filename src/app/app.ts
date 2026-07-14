import { QuizEngine } from '../core/quiz-engine';
import { getQuestions } from '../data';
import { QuizType, QuizResult } from '../core/types';
import { renderStartScreen } from '../ui/screens/start-screen';
import { renderQuizScreen, showAnswerFeedback } from '../ui/screens/quiz-screen';
import { renderResultScreen, renderReviewScreen } from '../ui/screens/result-screen';
import { renderErrorScreen } from '../ui/screens/error-screen';

export class App {
  private container: HTMLElement;
  private engine: QuizEngine;
  private startTime: number = 0;
  private autoAdvanceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container element with id "${containerId}" not found`);
    }
    this.container = container;
    this.engine = new QuizEngine();
    this.showStartScreen();
  }

  private clearAutoAdvanceTimer(): void {
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }

  private showStartScreen(): void {
    this.clearAutoAdvanceTimer();
    renderStartScreen(this.container, {
      onStart: (quizType: QuizType) => this.startQuiz(quizType)
    });
  }

  private startQuiz(quizType: QuizType): void {
    this.clearAutoAdvanceTimer();
    const questions = getQuestions(quizType, 15);

    if (questions.length === 0) {
      renderErrorScreen(this.container, {
        message: 'No questions available for this quiz type. Please try again later.',
        onBack: () => this.showStartScreen()
      });
      return;
    }

    this.engine.startQuiz(quizType, questions);
    this.showQuizScreen();
  }

  private showQuizScreen(): void {
    const question = this.engine.getCurrentQuestion();
    if (!question) return;

    const progress = this.engine.getProgress();
    this.startTime = Date.now();

    renderQuizScreen(
      this.container,
      question,
      progress.current,
      progress.total,
      {
        onAnswer: (selectedIndex: number) => {
          const timeSpent = Date.now() - this.startTime;
          this.engine.answerQuestion(selectedIndex, timeSpent);

          showAnswerFeedback(selectedIndex, question.correctIndex);

          this.autoAdvanceTimer = setTimeout(() => {
            this.autoAdvanceTimer = null;
            if (this.engine.nextQuestion()) {
              this.showQuizScreen();
            } else {
              this.showResultScreen();
            }
          }, 800);
        }
      }
    );
  }

  private showResultScreen(): void {
    this.clearAutoAdvanceTimer();
    const result = this.engine.getResult();
    if (!result) return;

    renderResultScreen(this.container, result, {
      onRestart: () => {
        this.engine.reset();
        this.showStartScreen();
      },
      onReview: () => {
        this.showReviewScreen(result);
      }
    });
  }

  private showReviewScreen(result: QuizResult): void {
    renderReviewScreen(
      this.container,
      result.questions,
      result.answers,
      {
        onBack: () => {
          this.showResultScreen();
        }
      }
    );
  }
}
