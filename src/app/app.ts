import { QuizEngine } from '../core/quiz-engine';
import { getQuestions, getReadingPassages, getListeningClips, getAllQuestions } from '../data';
import { QuizType, QuizResult, AdaptiveSkill } from '../core/types';
import { renderStartScreen } from '../ui/screens/start-screen';
import { renderQuizScreen, showAnswerFeedback, ReadingContext, ListeningContext, enableListeningOptions, updateListeningPlayerPlayCount, destroyListeningPlayer } from '../ui/screens/quiz-screen';
import { renderResultScreen, renderReviewScreen, renderAdaptiveResultScreen } from '../ui/screens/result-screen';
import { renderErrorScreen } from '../ui/screens/error-screen';
import { createSpeechService, SpeechService } from '../services/speech-service';
import { getAdaptiveQuestionsForSession, computeAdaptiveResult } from '../core/adaptive-engine';
import { getRandomPrompt } from '../data/speaking';
import { renderSpeakingScreen } from '../ui/screens/speaking-screen';

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

  // Adaptive state
  private adaptiveMode: boolean = false;
  private adaptiveSkills: AdaptiveSkill[] = [];
  private adaptiveSkillCounts: Map<AdaptiveSkill, number> = new Map();

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
    this.adaptiveMode = false;
    renderStartScreen(this.container, {
      onStart: (quizType: QuizType) => this.startQuiz(quizType)
    });
  }

  private startQuiz(quizType: QuizType): void {
    this.clearAutoAdvanceTimer();
    this.stopSpeech();

    if (quizType === 'speaking') {
      this.startSpeakingMode();
      return;
    }

    if (quizType === 'listening' || quizType === 'adaptive') {
      this.initSpeechService();
      if (!this.speechService!.isSupported) {
        renderErrorScreen(this.container, {
          message: 'Your browser does not support text-to-speech. Please try a different browser or device.',
          onBack: () => this.showStartScreen()
        });
        return;
      }
    }

    if (quizType === 'adaptive') {
      this.adaptiveMode = true;
      const allQuestions = getAllQuestions();
      const { questions, skills, skillQuestionCounts } = getAdaptiveQuestionsForSession(allQuestions);
      this.adaptiveSkills = skills;
      this.adaptiveSkillCounts = skillQuestionCounts;

      if (questions.length === 0) {
        renderErrorScreen(this.container, {
          message: 'No questions available for adaptive placement. Please try again later.',
          onBack: () => this.showStartScreen()
        });
        return;
      }

      this.playCount = 0;
      this.currentClipId = null;
      this.hasPlayedCurrentClip = false;
      this.engine.startQuiz('adaptive' as QuizType, questions);
      this.showQuizScreen();
      return;
    }

    this.adaptiveMode = false;
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

  private startSpeakingMode(): void {
    if (typeof MediaRecorder === 'undefined' || !navigator.mediaDevices) {
      renderErrorScreen(this.container, {
        message: 'Your browser does not support microphone recording. Please try a different browser or device.',
        onBack: () => this.showStartScreen()
      });
      return;
    }

    const prompt = getRandomPrompt();
    renderSpeakingScreen(this.container, prompt, {
      onComplete: () => {
        this.showStartScreen();
      },
      onBack: () => {
        this.showStartScreen();
      }
    });
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

    let adaptiveProgress = undefined;
    if (this.adaptiveMode) {
      const currentSkill = question.type as AdaptiveSkill;
      const skillIndex = this.adaptiveSkills.indexOf(currentSkill);
      const questionsInSkill = this.adaptiveSkillCounts.get(currentSkill) || 0;
      const questionsAnsweredInSkill = this.engine.getState().answers.filter(a => {
        const q = this.engine.getState().questions.find(q => q.id === a.questionId);
        return q && q.type === currentSkill;
      }).length;

      adaptiveProgress = {
        currentSkill: currentSkill.charAt(0).toUpperCase() + currentSkill.slice(1),
        skillIndex: skillIndex + 1,
        totalSkills: this.adaptiveSkills.length,
        questionInSkill: questionsAnsweredInSkill + 1,
        questionsInSkill
      };
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

          if (question.type === 'listening') {
            this.stopSpeech();
          }

          showAnswerFeedback(selectedIndex, question.correctIndex);

          this.autoAdvanceTimer = setTimeout(() => {
            this.autoAdvanceTimer = null;
            if (this.engine.nextQuestion()) {
              this.showQuizScreen();
            } else {
              if (this.adaptiveMode) {
                this.showAdaptiveResultScreen();
              } else {
                this.showResultScreen();
              }
            }
          }, 800);
        }
      },
      readingContext,
      listeningContext,
      adaptiveProgress
    );
  }

  private showAdaptiveResultScreen(): void {
    this.clearAutoAdvanceTimer();
    this.stopSpeech();
    destroyListeningPlayer();

    const state = this.engine.getState();
    const adaptiveResult = computeAdaptiveResult(
      state.questions,
      state.answers,
      this.adaptiveSkillCounts
    );

    renderAdaptiveResultScreen(this.container, adaptiveResult, {
      onRestart: () => {
        this.engine.reset();
        this.showStartScreen();
      },
      onReview: () => {
        renderReviewScreen(
          this.container,
          adaptiveResult.questions,
          adaptiveResult.answers,
          {
            onBack: () => {
              this.showAdaptiveResultScreen();
            }
          }
        );
      }
    });
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
