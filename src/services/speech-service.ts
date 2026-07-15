// Browser-native text-to-speech service using Web Speech API

export type SpeechState = 'idle' | 'playing' | 'paused';

export interface SpeechService {
  isSupported: boolean;
  play(text: string): void;
  stop(): void;
  onStateChange: (state: SpeechState) => void;
  destroy(): void;
}

export function createSpeechService(): SpeechService {
  const synth = window.speechSynthesis;
  const isSupported = 'speechSynthesis' in window;
  let selectedVoice: SpeechSynthesisVoice | null = null;
  let stateCallback: ((state: SpeechState) => void) | null = null;
  let destroyed = false;

  function notifyState(state: SpeechState) {
    if (stateCallback) stateCallback(state);
  }

  function selectVoice(): SpeechSynthesisVoice | null {
    if (!isSupported) return null;
    const voices = synth.getVoices();
    
    // Preference order: en-GB, en-US, any English, any voice
    const enGB = voices.find(v => v.lang === 'en-GB');
    if (enGB) return enGB;
    
    const enUS = voices.find(v => v.lang === 'en-US');
    if (enUS) return enUS;
    
    const anyEn = voices.find(v => v.lang.startsWith('en'));
    if (anyEn) return anyEn;
    
    return voices.length > 0 ? voices[0] : null;
  }

  function initVoice() {
    if (!isSupported) return;
    
    selectedVoice = selectVoice();
    
    // If no voices loaded yet, wait for voiceschanged
    if (!selectedVoice && synth.getVoices().length === 0) {
      synth.addEventListener('voiceschanged', () => {
        selectedVoice = selectVoice();
      }, { once: true });
    }
  }

  function play(text: string) {
    if (!isSupported || destroyed) return;
    
    // Stop any current speech first
    stop();
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => notifyState('playing');
    utterance.onend = () => {
      if (!destroyed) notifyState('idle');
    };
    utterance.onerror = (e) => {
      if (!destroyed && e.error !== 'canceled') {
        notifyState('idle');
      }
    };
    utterance.onpause = () => notifyState('paused');
    utterance.onresume = () => notifyState('playing');
    
    synth.speak(utterance);
  }

  function stop() {
    if (!isSupported) return;
    if (synth.speaking || synth.paused) {
      synth.cancel();
    }
    notifyState('idle');
  }

  function destroy() {
    destroyed = true;
    stop();
    stateCallback = null;
  }

  // Initialize voice selection
  initVoice();

  return {
    isSupported,
    play,
    stop,
    onStateChange: (state: SpeechState) => { stateCallback?.(state); },
    destroy
  };
}
