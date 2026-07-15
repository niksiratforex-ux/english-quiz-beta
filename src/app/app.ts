import { QuizEngine } from '../core/quiz-engine';
import { getQuestions, getReadingPassages, getListeningClips } from '../data';
import { QuizType, QuizResult } from '../core/types';
import { renderStartScreen } from '../ui/screens/start-screen';
import { renderQuizScreen, showAnswerFeedback, ReadingContext, ListeningContext, enableListeningOptions, updateListeningPlayerPlayCount, destroyListeningPlayer } from '../ui/screens/quiz-screen';
import { renderResultScreen, renderReviewScreen } from '../ui/screens/result-screen';
import { renderErrorScreen } from '../ui/screens/error-screen';
import { createSpeechService, SpeechService } from '../services/speech-service';

export class App {
  private container: HTMLElement;
  private engine: QuizEngine;
  private startTime: number = 0;
  private autoAdvanceTimer: ReturnType<typeof setTimeout> | null = null;
  private speechService: SpeechService | null = null;
  private playCount: number = 0;
  private maxPlays: number = 2;
  private currentClipId: string | null = null;
  private hasPlayedCurrentClip: boolean = false;

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

  private stopSpeech(): void {
    if (this.speechService) {
      this.speechService.stop();
    }
  }

  private initSpeechService(): void {
    if (!this.speechService) {
      this.speechService = createSpeechService();
    }
  }

  private showStartScreen(): void {
    this.clearAutoAdvanceTimer();
    this.stopSpeech();
    destroyListeningPlayer();
    this.playCount = 0;
    this.currentClipId = null;
    this.hasPlayedCurrentClip = false;
    renderStartScreen(this.container, {
      onStart: (quizType: QuizType) => this.startQuiz(quizType)
    });
  }

  private startQuiz(quizType: QuizType): void {
    this.clearAutoAdvanceTimer();
    this.stopSpeech();

    if (quizType === 'listening') {
      this.initSpeechService();
      if (!this.speechService!.isSupported) {
        renderErrorScreen(this.container, {
          message: 'Your browser does not support text-to-speech. Please try a different browser or device.',
          onBack: () => this.showStartScreen()
        });
        return;
      }
    }

    const count = (quizType === 'reading' || quizType === 'listening') ? 9 : 15;
    const questions = getQuestions(quizType, count);

    if (questions.length === 0) {
      renderErrorScreen(this.container, {
        message: 'No questions available for this quiz type. Please try again later.',
        onBack: () => this.showStartScreen()
      });
      return;
    }

    this.playCount = 0;
    this.currentClipId = null;
    this.hasPlayedCurrentClip = false;
    this.engine.startQuiz(quizType, questions);
    this.showQuizScreen();
  }

  private showQuizScreen(): void {
    const question = this.engine.getCurrentQuestion();
    if (!question) return;

    const progress = this.engine.getProgress();
    this.startTime = Date.now();

    let readingContext: ReadingContext | undefined;
    if (question.type === 'reading' && question.passageId) {
      const passages = getReadingPassages();
      const passage = passages.find(p => p.id === question.passageId);
      if (passage) {
        const state = this.engine.getState();
        const allQuestions = state.questions;
        const passageIds = [...new Set(allQuestions.filter(q => q.type === 'reading').map(q => q.passageId))];
        const passageIndex = passageIds.indexOf(question.passageId);
        const questionsInThisPassage = allQuestions.filter(q => q.passageId === question.passageId);
        const questionInPassage = questionsInThisPassage.indexOf(question) + 1;

        readingContext = {
          passage,
          passageIndex,
          passageTotal: passageIds.length,
          questionInPassage,
          questionsPerPassage: questionsInThisPassage.length
        };
      }
    }

    let listeningContext: ListeningContext | undefined;
    if (question.type === 'listening' && question.clipId) {
      const clips = getListeningClips();
      const clip = clips.find(c => c.id === question.clipId);
      if (clip) {
        const state = this.engine.getState();
        const allQuestions = state.questions;
        const clipIds = [...new Set(allQuestions.filter(q => q.type === 'listening').map(q => q.clipId))];
        const clipIndex = clipIds.indexOf(question.clipId);
        const questionsInThisClip = allQuestions.filter(q => q.clipId === question.clipId);
        const questionInClip = questionsInThisClip.indexOf(question) + 1;

        // Reset play state when moving to a new clip
        if (this.currentClipId !== question.clipId) {
          this.currentClipId = question.clipId;
          this.playCount = 0;
          this.hasPlayedCurrentClip = false;
        }

        listeningContext = {
          clip,
          clipIndex,
          clipTotal: clipIds.length,
          questionInClip,
          questionsPerClip: questionsInThisClip.length,
          hasPlayed: this.hasPlayedCurrentClip,
          playerCallbacks: {
            onPlay: () => {
              if (this.playCount === 0) {
                this.speechService!.play(clip.script);
                this.playCount++;
                this.hasPlayedCurrentClip = true;
                enableListeningOptions();
                updateListeningPlayerPlayCount(this.playCount, this.maxPlays);
              }
            },
            onReplay: () => {
              if (this.playCount < this.maxPlays) {
                this.speechService!.play(clip.script);
                this.playCount++;
                updateListeningPlayerPlayCount(this.playCount, this.maxPlays);
              }
            },
            onStop: () => {
              this.stopSpeech();
            }
          }
        };
      }
    }

    renderQuizScreen(
      this.container,
      question,
      progress.current,
      progress.total,
      {
        onAnswer: (selectedIndex: number) => {
          const timeSpent = Date.now() - this.startTime;
          this.engine.answerQuestion(selectedIndex, timeSpent);

          // Stop audio on answer selection
          if (question.type === 'listening') {
            this.stopSpeech();
          }

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
      },
      readingContext,
      listeningContext
    );
  }

  private showResultScreen(): void {
    this.clearAutoAdvanceTimer();
    this.stopSpeech();
    destroyListeningPlayer();
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
