import { SpeakingPrompt, SpeakingChecklistItem } from '../core/types';

export const speakingPrompts: SpeakingPrompt[] = [
  // Easy (A1-A2)
  {
    id: 'speak-001',
    promptText: 'Describe your daily routine. What do you usually do in the morning?',
    followUpHint: 'Try to speak in complete sentences. Mention at least three activities.',
    estimatedLevelBand: 'A1-A2',
    targetSkillFocus: 'fluency'
  },
  {
    id: 'speak-002',
    promptText: 'Tell me about your favourite food. Why do you like it?',
    followUpHint: 'Use adjectives to describe the taste and texture.',
    estimatedLevelBand: 'A1-A2',
    targetSkillFocus: 'vocabulary-range'
  },
  {
    id: 'speak-003',
    promptText: 'Describe the place where you live. What is your neighbourhood like?',
    followUpHint: 'Mention what you can see, hear, and do nearby.',
    estimatedLevelBand: 'A1-A2',
    targetSkillFocus: 'clarity'
  },

  // Lower-intermediate (B1)
  {
    id: 'speak-004',
    promptText: 'Talk about a hobby or activity you enjoy. How did you start doing it?',
    followUpHint: 'Explain when and why you began this activity.',
    estimatedLevelBand: 'B1',
    targetSkillFocus: 'organization'
  },
  {
    id: 'speak-005',
    promptText: 'Describe a recent trip or outing. Where did you go and what did you do?',
    followUpHint: 'Try to describe the events in order.',
    estimatedLevelBand: 'B1',
    targetSkillFocus: 'fluency'
  },
  {
    id: 'speak-006',
    promptText: 'Talk about someone you admire. What qualities do they have?',
    followUpHint: 'Give specific examples of why you admire this person.',
    estimatedLevelBand: 'B1',
    targetSkillFocus: 'vocabulary-range'
  },

  // Intermediate (B2)
  {
    id: 'speak-007',
    promptText: 'Compare working from home versus working in an office. Which do you prefer and why?',
    followUpHint: 'Present advantages and disadvantages for both options.',
    estimatedLevelBand: 'B2',
    targetSkillFocus: 'organization'
  },
  {
    id: 'speak-008',
    promptText: 'Talk about a skill you would like to improve. Why is it important to you?',
    followUpHint: 'Explain the current situation and your goals.',
    estimatedLevelBand: 'B2',
    targetSkillFocus: 'fluency'
  },
  {
    id: 'speak-009',
    promptText: 'Describe a problem in your community and suggest a possible solution.',
    followUpHint: 'Be specific about the problem and explain your reasoning.',
    estimatedLevelBand: 'B2',
    targetSkillFocus: 'clarity'
  },

  // Upper-intermediate (C1)
  {
    id: 'speak-010',
    promptText: 'Discuss how technology has changed the way people communicate. Do you think this is mostly positive or negative?',
    followUpHint: 'Give examples and explain your perspective clearly.',
    estimatedLevelBand: 'C1',
    targetSkillFocus: 'organization'
  },
  {
    id: 'speak-011',
    promptText: 'Talk about a time you had to make a difficult decision. What factors did you consider?',
    followUpHint: 'Describe the situation, your thinking process, and the outcome.',
    estimatedLevelBand: 'C1',
    targetSkillFocus: 'fluency'
  },
  {
    id: 'speak-012',
    promptText: 'If you could change one thing about your country, what would it be and why?',
    followUpHint: 'Be specific and explain the reasoning behind your choice.',
    estimatedLevelBand: 'C1',
    targetSkillFocus: 'vocabulary-range'
  }
];

export const speakingChecklist: SpeakingChecklistItem[] = [
  { id: 'check-1', text: 'I could speak continuously without long pauses' },
  { id: 'check-2', text: 'I could organize my ideas clearly' },
  { id: 'check-3', text: 'I used enough vocabulary for my point' },
  { id: 'check-4', text: 'My grammar was mostly under control' },
  { id: 'check-5', text: 'My pronunciation was clear enough to understand' },
  { id: 'check-6', text: 'I could give examples or details' },
  { id: 'check-7', text: 'I could speak with confidence' }
];

export function getSpeakingPrompt(id: string): SpeakingPrompt | undefined {
  return speakingPrompts.find(p => p.id === id);
}

export function getRandomPrompt(): SpeakingPrompt {
  const index = Math.floor(Math.random() * speakingPrompts.length);
  return speakingPrompts[index];
}
