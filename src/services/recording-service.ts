// Browser-native recording service using MediaRecorder API

export type RecordingState = 'idle' | 'requesting' | 'ready' | 'recording' | 'recorded' | 'playing' | 'error';

export interface RecordingService {
  isSupported: boolean;
  getState: () => RecordingState;
  getDuration: () => number;
  getAudioUrl: () => string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  playRecording: () => void;
  stopPlayback: () => void;
  reset: () => void;
  onStateChange: (cb: (state: RecordingState) => void) => void;
  onDurationChange: (cb: (duration: number) => void) => void;
  destroy: () => void;
}

const MAX_DURATION = 50;

export function createRecordingService(): RecordingService {
  const isSupported = typeof navigator !== 'undefined' &&
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof MediaRecorder !== 'undefined';

  let mediaStream: MediaStream | null = null;
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];
  let currentUrl: string | null = null;
  let audioElement: HTMLAudioElement | null = null;
  let currentDuration = 0;
  let currentState: RecordingState = 'idle';
  let destroyed = false;
  let stateCallback: ((state: RecordingState) => void) | null = null;
  let durationCallback: ((duration: number) => void) | null = null;
  let durationTimer: ReturnType<typeof setTimeout> | null = null;
  let durationInterval: ReturnType<typeof setInterval> | null = null;

  function setState(s: RecordingState) {
    currentState = s;
    if (!destroyed && stateCallback) stateCallback(s);
  }

  function setDuration(d: number) {
    currentDuration = d;
    if (!destroyed && durationCallback) durationCallback(d);
  }

  function stopDurationTimers() {
    if (durationTimer) { clearTimeout(durationTimer); durationTimer = null; }
    if (durationInterval) { clearInterval(durationInterval); durationInterval = null; }
  }

  function cleanup() {
    if (audioElement) { audioElement.pause(); audioElement = null; }
    stopDurationTimers();
    if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
    mediaRecorder = null;
  }

  async function startRecording(): Promise<void> {
    if (!isSupported || destroyed) return;
    try {
      setState('requesting');
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      currentDuration = 0;
      setDuration(0);

      mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        currentUrl = URL.createObjectURL(blob);
        stopDurationTimers();
        setState('recorded');
      };
      mediaRecorder.onerror = () => { setState('error'); cleanup(); };
      mediaRecorder.start(100);
      setState('recording');

      durationTimer = setTimeout(() => stopRecording(), MAX_DURATION * 1000);
      durationInterval = setInterval(() => { currentDuration++; setDuration(currentDuration); }, 1000);
    } catch { setState('error'); cleanup(); }
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop();
    stopDurationTimers();
  }

  function playRecording() {
    if (!currentUrl || destroyed) return;
    stopPlayback();
    audioElement = new Audio(currentUrl);
    audioElement.onended = () => { if (!destroyed) setState('recorded'); };
    audioElement.play();
    setState('playing');
  }

  function stopPlayback() {
    if (audioElement) { audioElement.pause(); audioElement.currentTime = 0; audioElement = null; }
  }

  function reset() {
    stopPlayback();
    stopRecording();
    if (currentUrl) { URL.revokeObjectURL(currentUrl); currentUrl = null; }
    audioChunks = [];
    currentDuration = 0;
    setDuration(0);
    setState('idle');
  }

  function destroy() {
    destroyed = true;
    cleanup();
    if (currentUrl) { URL.revokeObjectURL(currentUrl); currentUrl = null; }
    stateCallback = null;
    durationCallback = null;
  }

  return {
    isSupported,
    getState: () => currentState,
    getDuration: () => currentDuration,
    getAudioUrl: () => currentUrl,
    startRecording,
    stopRecording,
    playRecording,
    stopPlayback,
    reset,
    onStateChange: (cb: (state: RecordingState) => void) => { stateCallback = cb; },
    onDurationChange: (cb: (duration: number) => void) => { durationCallback = cb; },
    destroy
  };
}
