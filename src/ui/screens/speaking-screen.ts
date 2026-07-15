import { createElement, clearElement } from '../renderer';
import { SpeakingPrompt, SpeakingStep, ChecklistAnswer, SpeakingSessionResult, ReflectionBand } from '../../core/types';
import { speakingChecklist } from '../../data/speaking';

export interface SpeakingScreenCallbacks {
  onComplete: (result: SpeakingSessionResult) => void;
  onBack: () => void;
}

const CHECKLIST_ANSWERS: { value: ChecklistAnswer; label: string }[] = [
  { value: 'not-yet', label: 'Not yet' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'mostly', label: 'Mostly' },
  { value: 'yes', label: 'Yes' }
];

export function renderSpeakingScreen(
  container: HTMLElement,
  prompt: SpeakingPrompt,
  callbacks: SpeakingScreenCallbacks
): void {
  let currentStep: SpeakingStep = 'prompt';
  let recordingState: 'idle' | 'requesting' | 'ready' | 'recording' | 'recorded' | 'playing' | 'error' = 'idle';
  let recordingDuration = 0;
  let audioUrl: string | null = null;
  let checklistAnswers: Record<string, ChecklistAnswer> = {};
  let mediaStream: MediaStream | null = null;
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];
  let durationTimer: ReturnType<typeof setTimeout> | null = null;
  let durationInterval: ReturnType<typeof setInterval> | null = null;
  let audioElement: HTMLAudioElement | null = null;
  let prepareTimer: ReturnType<typeof setInterval> | null = null;
  let prepareTimeLeft = 15;

  const MAX_DURATION = 50;

  function cleanup() {
    if (audioElement) { audioElement.pause(); audioElement = null; }
    if (durationTimer) { clearTimeout(durationTimer); durationTimer = null; }
    if (durationInterval) { clearInterval(durationInterval); durationInterval = null; }
    if (prepareTimer) { clearInterval(prepareTimer); prepareTimer = null; }
    if (mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop();
    if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
    if (audioUrl) { URL.revokeObjectURL(audioUrl); audioUrl = null; }
  }

  function render() {
    clearElement(container);
    const screen = createElement('div', 'screen speaking-screen');

    if (currentStep === 'prompt') renderPromptStep(screen);
    else if (currentStep === 'prepare') renderPrepareStep(screen);
    else if (currentStep === 'record') renderRecordStep(screen);
    else if (currentStep === 'playback') renderPlaybackStep(screen);
    else if (currentStep === 'checklist') renderChecklistStep(screen);
    else if (currentStep === 'result') renderResultStep(screen);

    container.appendChild(screen);
  }

  function renderPromptStep(screen: HTMLElement) {
    const header = createElement('div', 'speaking-header');
    header.appendChild(createElement('h2', 'speaking-title', 'Speaking Self-Assessment'));
    header.appendChild(createElement('p', 'speaking-subtitle', 'Record a short answer and reflect on your spoken English'));
    screen.appendChild(header);

    const card = createElement('div', 'speaking-prompt-card');
    card.appendChild(createElement('p', 'speaking-prompt-text', prompt.promptText));
    card.appendChild(createElement('p', 'speaking-hint', prompt.followUpHint));
    screen.appendChild(card);

    const privacy = createElement('div', 'speaking-privacy');
    privacy.appendChild(createElement('p', 'speaking-privacy-text',
      'Microphone used only in this browser. Recording is not uploaded or saved.'
    ));
    screen.appendChild(privacy);

    const actions = createElement('div', 'speaking-actions');
    const startBtn = createElement('button', 'speaking-btn speaking-btn-primary', 'Start');
    startBtn.addEventListener('click', () => {
      currentStep = 'prepare';
      prepareTimeLeft = 15;
      render();
      startPrepareTimer();
    });
    actions.appendChild(startBtn);

    const backBtn = createElement('button', 'speaking-btn speaking-btn-secondary', 'Back to Start');
    backBtn.addEventListener('click', () => { cleanup(); callbacks.onBack(); });
    actions.appendChild(backBtn);
    screen.appendChild(actions);
  }

  function renderPrepareStep(screen: HTMLElement) {
    const header = createElement('div', 'speaking-header');
    header.appendChild(createElement('h2', 'speaking-title', 'Prepare'));
    screen.appendChild(header);

    const card = createElement('div', 'speaking-prompt-card');
    card.appendChild(createElement('p', 'speaking-prompt-text', prompt.promptText));
    card.appendChild(createElement('p', 'speaking-timer', prepareTimeLeft + 's'));
    card.appendChild(createElement('p', 'speaking-hint', 'Think about what to say. Start recording when ready.'));
    screen.appendChild(card);

    const actions = createElement('div', 'speaking-actions');
    const recordBtn = createElement('button', 'speaking-btn speaking-btn-primary', 'Start Recording');
    recordBtn.addEventListener('click', () => { stopPrepareTimer(); currentStep = 'record'; render(); startRecording(); });
    actions.appendChild(recordBtn);

    const skipBtn = createElement('button', 'speaking-btn speaking-btn-secondary', 'Skip Preparation');
    skipBtn.addEventListener('click', () => { stopPrepareTimer(); currentStep = 'record'; render(); startRecording(); });
    actions.appendChild(skipBtn);
    screen.appendChild(actions);
  }

  function renderRecordStep(screen: HTMLElement) {
    const header = createElement('div', 'speaking-header');
    header.appendChild(createElement('h2', 'speaking-title', 'Recording'));
    screen.appendChild(header);

    const card = createElement('div', 'speaking-prompt-card');
    card.appendChild(createElement('p', 'speaking-prompt-text', prompt.promptText));
    screen.appendChild(card);

    const recorder = createElement('div', 'speaking-recorder');
    const status = createElement('p', 'speaking-recorder-status');

    if (recordingState === 'requesting') {
      status.textContent = 'Requesting microphone access...';
    } else if (recordingState === 'recording') {
      status.textContent = 'Recording \u2022 ' + recordingDuration + 's / ' + MAX_DURATION + 's';
      status.classList.add('speaking-recording-active');
    } else if (recordingState === 'error') {
      status.textContent = 'Could not access microphone. Check your browser settings.';
      status.classList.add('speaking-recorder-error');
    } else {
      status.textContent = 'Starting...';
    }
    recorder.appendChild(status);

    recorder.appendChild(createElement('p', 'speaking-privacy-text', 'Recording stays in this browser only.'));
    screen.appendChild(recorder);

    const actions = createElement('div', 'speaking-actions');
    if (recordingState === 'recording') {
      const stopBtn = createElement('button', 'speaking-btn speaking-btn-stop', 'Stop Recording');
      stopBtn.addEventListener('click', stopRecording);
      actions.appendChild(stopBtn);
    } else if (recordingState === 'error') {
      const backBtn = createElement('button', 'speaking-btn speaking-btn-secondary', 'Back');
      backBtn.addEventListener('click', () => { cleanup(); currentStep = 'prompt'; render(); });
      actions.appendChild(backBtn);
    }
    screen.appendChild(actions);
  }

  function renderPlaybackStep(screen: HTMLElement) {
    const header = createElement('div', 'speaking-header');
    header.appendChild(createElement('h2', 'speaking-title', 'Listen Back'));
    screen.appendChild(header);

    const card = createElement('div', 'speaking-prompt-card');
    card.appendChild(createElement('p', 'speaking-prompt-text', prompt.promptText));
    screen.appendChild(card);

    const recorder = createElement('div', 'speaking-recorder');
    recorder.appendChild(createElement('p', 'speaking-recorder-status', 'Duration: ' + recordingDuration + 's'));
    screen.appendChild(recorder);

    const actions = createElement('div', 'speaking-actions');
    const playBtn = createElement('button', 'speaking-btn speaking-btn-primary', 'Play');
    playBtn.addEventListener('click', playRecording);
    actions.appendChild(playBtn);

    const reRecordBtn = createElement('button', 'speaking-btn speaking-btn-secondary', 'Re-record');
    reRecordBtn.addEventListener('click', () => {
      cleanup(); audioUrl = null; recordingDuration = 0;
      currentStep = 'record'; render(); startRecording();
    });
    actions.appendChild(reRecordBtn);

    const continueBtn = createElement('button', 'speaking-btn speaking-btn-primary', 'Continue to Self-Assessment');
    continueBtn.addEventListener('click', () => { cleanup(); currentStep = 'checklist'; render(); });
    actions.appendChild(continueBtn);
    screen.appendChild(actions);
  }

  function renderChecklistStep(screen: HTMLElement) {
    const header = createElement('div', 'speaking-header');
    header.appendChild(createElement('h2', 'speaking-title', 'Self-Assessment'));
    screen.appendChild(header);

    screen.appendChild(createElement('p', 'speaking-checklist-intro', 'Rate yourself honestly. There are no wrong answers.'));

    const form = createElement('div', 'speaking-checklist-form');
    speakingChecklist.forEach(item => {
      const row = createElement('div', 'speaking-checklist-row');
      row.appendChild(createElement('p', 'speaking-checklist-item', item.text));

      const options = createElement('div', 'speaking-checklist-options');
      CHECKLIST_ANSWERS.forEach(answer => {
        const btn = createElement('button', 'speaking-checklist-btn');
        if (checklistAnswers[item.id] === answer.value) btn.classList.add('speaking-checklist-btn-active');
        btn.textContent = answer.label;
        btn.addEventListener('click', () => { checklistAnswers[item.id] = answer.value; render(); });
        options.appendChild(btn);
      });
      row.appendChild(options);
      form.appendChild(row);
    });
    screen.appendChild(form);

    const allAnswered = speakingChecklist.every(item => checklistAnswers[item.id]);
    const actions = createElement('div', 'speaking-actions');
    const submitBtn = createElement('button', 'speaking-btn speaking-btn-primary', 'See My Reflection');
    if (!allAnswered) (submitBtn as HTMLButtonElement).disabled = true;
    submitBtn.addEventListener('click', () => { if (allAnswered) { currentStep = 'result'; render(); } });
    actions.appendChild(submitBtn);
    screen.appendChild(actions);
  }

  function renderResultStep(screen: HTMLElement) {
    const result = computeResult();

    const header = createElement('div', 'speaking-header');
    header.appendChild(createElement('h2', 'speaking-title', 'Speaking Reflection'));
    screen.appendChild(header);

    const card = createElement('div', 'speaking-result-card');
    card.appendChild(createElement('p', 'speaking-result-band', result.reflectionBand.charAt(0).toUpperCase() + result.reflectionBand.slice(1)));
    card.appendChild(createElement('p', 'speaking-result-summary', result.reflectionSummary));
    screen.appendChild(card);

    const focusSection = createElement('div', 'speaking-section');
    focusSection.appendChild(createElement('h3', 'speaking-section-title', 'Focus Areas'));
    result.focusAreas.forEach(area => {
      focusSection.appendChild(createElement('p', 'speaking-focus-item', area));
    });
    screen.appendChild(focusSection);

    const nextSection = createElement('div', 'speaking-section');
    nextSection.appendChild(createElement('h3', 'speaking-section-title', 'Suggested Next Step'));
    nextSection.appendChild(createElement('p', 'speaking-next-step', result.nextStep));
    screen.appendChild(nextSection);

    screen.appendChild(createElement('p', 'speaking-disclaimer',
      'This is a self-reflection based on your recording and checklist. Not an official speaking score.'
    ));

    const actions = createElement('div', 'speaking-actions');
    const tryAgainBtn = createElement('button', 'speaking-btn speaking-btn-primary', 'Try Another Prompt');
    tryAgainBtn.addEventListener('click', () => { cleanup(); callbacks.onComplete(result); });
    actions.appendChild(tryAgainBtn);

    const homeBtn = createElement('button', 'speaking-btn speaking-btn-secondary', 'Back to Start');
    homeBtn.addEventListener('click', () => { cleanup(); callbacks.onBack(); });
    actions.appendChild(homeBtn);
    screen.appendChild(actions);
  }

  function startPrepareTimer() {
    stopPrepareTimer();
    prepareTimer = setInterval(() => {
      prepareTimeLeft--;
      if (prepareTimeLeft <= 0) { stopPrepareTimer(); currentStep = 'record'; render(); startRecording(); }
      else render();
    }, 1000);
  }

  function stopPrepareTimer() { if (prepareTimer) { clearInterval(prepareTimer); prepareTimer = null; } }

  async function startRecording() {
    recordingState = 'requesting';
    render();
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      recordingDuration = 0;
      mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        audioUrl = URL.createObjectURL(blob);
        recordingState = 'recorded';
        stopDurationTimer();
        currentStep = 'playback';
        render();
      };
      mediaRecorder.onerror = () => { recordingState = 'error'; render(); };
      mediaRecorder.start(100);
      recordingState = 'recording';
      render();
      startDurationTimer();
    } catch { recordingState = 'error'; render(); }
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop();
    stopDurationTimer();
  }

  function startDurationTimer() {
    stopDurationTimer();
    durationTimer = setTimeout(stopRecording, MAX_DURATION * 1000);
    durationInterval = setInterval(() => { recordingDuration++; render(); }, 1000);
  }

  function stopDurationTimer() {
    if (durationTimer) { clearTimeout(durationTimer); durationTimer = null; }
    if (durationInterval) { clearInterval(durationInterval); durationInterval = null; }
  }

  function playRecording() {
    if (!audioUrl) return;
    if (audioElement) { audioElement.pause(); audioElement = null; }
    audioElement = new Audio(audioUrl);
    audioElement.onended = () => { audioElement = null; };
    audioElement.play();
  }

  function computeResult(): SpeakingSessionResult {
    const scoreMap: Record<ChecklistAnswer, number> = { 'not-yet': 0, 'sometimes': 1, 'mostly': 2, 'yes': 3 };
    let totalScore = 0;
    speakingChecklist.forEach(item => { totalScore += scoreMap[checklistAnswers[item.id] || 'not-yet']; });
    const percentage = Math.round((totalScore / (speakingChecklist.length * 3)) * 100);

    let reflectionBand: ReflectionBand;
    let reflectionSummary: string;

    if (percentage >= 70) {
      reflectionBand = 'comfortable';
      reflectionSummary = 'You appear comfortable giving structured spoken answers with reasonable clarity.';
    } else if (percentage >= 40) {
      reflectionBand = 'building';
      reflectionSummary = 'You can express basic ideas, but more fluency and detail would help.';
    } else {
      reflectionBand = 'emerging';
      reflectionSummary = 'You are developing your speaking skills. Focus on speaking more continuously.';
    }

    const focusAreas: string[] = [];
    const fluencyAnswer = checklistAnswers['check-1'] || 'not-yet';
    const vocabAnswer = checklistAnswers['check-3'] || 'not-yet';
    const grammarAnswer = checklistAnswers['check-4'] || 'not-yet';
    const orgAnswer = checklistAnswers['check-2'] || 'not-yet';
    const detailAnswer = checklistAnswers['check-6'] || 'not-yet';

    if (scoreMap[fluencyAnswer] < 2) focusAreas.push('Fluency: Try speaking for 30 seconds without stopping');
    if (scoreMap[vocabAnswer] < 2) focusAreas.push('Vocabulary: Learn 3-5 new words on the topic before speaking');
    if (scoreMap[grammarAnswer] < 2) focusAreas.push('Grammar: Focus on one tense and use it consistently');
    if (scoreMap[orgAnswer] < 2) focusAreas.push('Organization: Plan your answer in your head before speaking');
    if (scoreMap[detailAnswer] < 2) focusAreas.push('Detail: Give at least one example in your response');

    if (focusAreas.length === 0) {
      focusAreas.push('Fluency: Try speaking more quickly with less hesitation');
      focusAreas.push('Detail: Add more examples and supporting information');
    }

    let nextStep: string;
    if (percentage >= 70) nextStep = 'Try the Listening or Adaptive mode next to test your comprehension.';
    else if (percentage >= 40) nextStep = 'Record the same topic again and add more detail.';
    else nextStep = 'Practice speaking for 15-20 seconds on simple daily topics.';

    return { prompt, recordingDuration, checklistAnswers, reflectionBand, reflectionSummary, focusAreas: focusAreas.slice(0, 3), nextStep };
  }

  render();

  return { destroy: cleanup } as any;
}
