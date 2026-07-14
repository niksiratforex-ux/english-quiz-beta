import { QuizState, QuizType, Question, Answer } from './types';
import { generateResult } from './scoring';
import { QuizResult } from './types';

export class QuizEngine {
  private state: QuizState;

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): QuizState {
    return {
      quizType: 'vocabulary',
      questions: [],
      currentIndex: 0,
      answers: [],
      status: 'idle'
    };
  }

  startQuiz(quizType: QuizType, questions: Question[]): void {
    this.state = {
      quizType,
      questions: [...questions],
      currentIndex: 0,
      answers: [],
      status: 'active'
    };
  }

  getCurrentQuestion(): Question | null {
    if (this.state.status !== 'active') return null;
    return this.state.questions[this.state.currentIndex] || null;
  }

  answerQuestion(selectedIndex: number, timeSpent: number): void {
    if (this.state.status !== 'active') return;

    const question = this.getCurrentQuestion();
    if (!question) return;

    if (this.state.answers.some(a => a.questionId === question.id)) return;

    const answer: Answer = {
      questionId: question.id,
      selectedIndex,
      isCorrect: selectedIndex === question.correctIndex,
      timeSpent
    };

    this.state.answers.push(answer);
  }

  nextQuestion(): boolean {
    if (this.state.status !== 'active') return false;

    this.state.currentIndex++;

    if (this.state.currentIndex >= this.state.questions.length) {
      this.state.status = 'completed';
      return false;
    }

    return true;
  }

  getResult(): QuizResult | null {
    if (this.state.status !== 'completed') return null;
    return generateResult(this.state.answers, this.state.questions, this.state.quizType);
  }

  getState(): Readonly<QuizState> {
    return { ...this.state };
  }

  reset(): void {
    this.state = this.createInitialState();
  }

  getProgress(): { current: number; total: number } {
    return {
      current: this.state.currentIndex + 1,
      total: this.state.questions.length
    };
  }

  isCompleted(): boolean {
    return this.state.status === 'completed';
  }

  isActive(): boolean {
    return this.state.status === 'active';
  }
}
