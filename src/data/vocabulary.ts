import { Question } from '../core/types';

export const vocabularyQuestions: Question[] = [
  // ═══════════════════════════════════════════
  // A1 Level — 10 questions
  // correctIndex pattern: 0,1,2,3,0,2,3,1,0,2
  // ═══════════════════════════════════════════

  {
    id: 'vocab-001',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'daily-life',
    question: 'What is the opposite of "early"?',
    options: ['Late', 'Fast', 'Quick', 'Soon'],
    correctIndex: 0,
    explanation: "'Early' means before the expected time. Its opposite is 'late'."
  },
  {
    id: 'vocab-002',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'daily-life',
    question: 'Which word means "a place where you sleep at night"?',
    options: ['Kitchen', 'Bedroom', 'Garden', 'Garage'],
    correctIndex: 1,
    explanation: "'Bedroom' is the room designed for sleeping."
  },
  {
    id: 'vocab-003',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'travel',
    question: 'What do you use to carry clothes when travelling?',
    options: ['A wallet', 'A key', 'A suitcase', 'A hat'],
    correctIndex: 2,
    explanation: "'Suitcase' is a large container used for carrying clothes during travel."
  },
  {
    id: 'vocab-004',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'daily-life',
    question: 'Which word describes weather that is the opposite of "dry"?',
    options: ['Hot', 'Cold', 'Windy', 'Wet'],
    correctIndex: 3,
    explanation: "'Wet' describes weather with rain or moisture, the opposite of dry."
  },
  {
    id: 'vocab-005',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'daily-life',
    question: 'What does "hungry" mean?',
    options: ['Needing food', 'Tired', 'Thirsty', 'Angry'],
    correctIndex: 0,
    explanation: "'Hungry' means feeling the need to eat food."
  },
  {
    id: 'vocab-006',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'travel',
    question: 'Which word means "to go on a journey to different places"?',
    options: ['Stay', 'Journey', 'Rest', 'Sleep'],
    correctIndex: 1,
    explanation: "'Journey' means to travel or go from one place to another."
  },
  {
    id: 'vocab-007',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'daily-life',
    question: 'What is the meaning of "quiet"?',
    options: ['Noisy', 'Loud', 'Making very little noise', 'Booming'],
    correctIndex: 2,
    explanation: "'Quiet' means making very little or no noise."
  },
  {
    id: 'vocab-008',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'daily-life',
    question: 'Which word means "the opposite of expensive"?',
    options: ['Valuable', 'Cheap', 'Heavy', 'Bright'],
    correctIndex: 1,
    explanation: "'Cheap' means low in price or not expensive."
  },
  {
    id: 'vocab-009',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'travel',
    question: 'What do you call a person who flies an airplane?',
    options: ['A pilot', 'A sailor', 'A driver', 'A passenger'],
    correctIndex: 0,
    explanation: "A 'pilot' is a person who operates an aircraft."
  },
  {
    id: 'vocab-010',
    type: 'vocabulary',
    difficulty: 'A1',
    topic: 'daily-life',
    question: 'Which word means "to bring water to your mouth"?',
    options: ['Eat', 'Breathe', 'Drink', 'Chew'],
    correctIndex: 2,
    explanation: "'Drink' means to take liquid into your mouth and swallow it."
  },

  // ═══════════════════════════════════════════
  // A2 Level — 10 questions
  // correctIndex pattern: 3,0,2,1,3,0,2,1,3,0
  // ═══════════════════════════════════════════

  {
    id: 'vocab-011',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'daily-life',
    question: 'What does "compare" mean?',
    options: ['To copy someone', 'To compete in a race', 'To combine two things', 'To examine differences and similarities'],
    correctIndex: 3,
    explanation: "'Compare' means to look at how things are similar or different."
  },
  {
    id: 'vocab-012',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'work',
    question: 'Which word means "a person you work with"?',
    options: ['A colleague', 'A neighbor', 'A customer', 'A stranger'],
    correctIndex: 0,
    explanation: "A 'colleague' is someone you work with in a job."
  },
  {
    id: 'vocab-013',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'travel',
    question: 'What is a "passport" used for?',
    options: ['Cooking food', 'Cleaning the house', 'Proving your identity when travelling abroad', 'Exercising at a gym'],
    correctIndex: 2,
    explanation: "A 'passport' is an official document that proves your identity and nationality for international travel."
  },
  {
    id: 'vocab-014',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'daily-life',
    question: 'Which word means "to try to find something"?',
    options: ['Hide', 'Search', 'Lose', 'Forget'],
    correctIndex: 1,
    explanation: "'Search' means to look carefully for something or someone."
  },
  {
    id: 'vocab-015',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'daily-life',
    question: 'What does "arrange" mean?',
    options: ['To argue with someone', 'To arrive at a place', 'To attack someone', 'To organize things in a particular order'],
    correctIndex: 3,
    explanation: "'Arrange' means to organize or put things in order."
  },
  {
    id: 'vocab-016',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'work',
    question: 'Which word means "to give work to someone"?',
    options: ['Employ', 'Fire', 'Retire', 'Resign'],
    correctIndex: 0,
    explanation: "'Employ' means to give someone a job or work."
  },
  {
    id: 'vocab-017',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'travel',
    question: 'What is a "destination"?',
    options: ['The start of a journey', 'A type of vehicle', 'The place you are going to', 'A road sign'],
    correctIndex: 2,
    explanation: "A 'destination' is the place where you are going."
  },
  {
    id: 'vocab-018',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'daily-life',
    question: 'Which word means "to become larger in size"?',
    options: ['Shrink', 'Grow', 'Spread', 'Drop'],
    correctIndex: 1,
    explanation: "'Grow' means to increase in size or amount."
  },
  {
    id: 'vocab-019',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'daily-life',
    question: 'What does "accurate" mean?',
    options: ['Funny and entertaining', 'Large and impressive', 'Old and traditional', 'Correct and free from errors'],
    correctIndex: 3,
    explanation: "'Accurate' means correct, exact, and free from mistakes."
  },
  {
    id: 'vocab-020',
    type: 'vocabulary',
    difficulty: 'A2',
    topic: 'work',
    question: 'Which word means "to finish a piece of work"?',
    options: ['Complete', 'Begin', 'Continue', 'Cancel'],
    correctIndex: 0,
    explanation: "'Complete' means to finish making or doing something."
  },

  // ═══════════════════════════════════════════
  // B1 Level — 10 questions
  // correctIndex pattern: 1,3,0,2,1,0,3,2,0,1
  // ═══════════════════════════════════════════

  {
    id: 'vocab-021',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'academic',
    question: 'What does "analyze" mean?',
    options: ['To ignore something', 'To examine something in detail', 'To create something new', 'To delete something'],
    correctIndex: 1,
    explanation: "'Analyze' means to examine something thoroughly to understand it better."
  },
  {
    id: 'vocab-022',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'work',
    question: 'Which word means "to suggest an idea for consideration"?',
    options: ['Demand', 'Complain', 'Refuse', 'Propose'],
    correctIndex: 3,
    explanation: "'Propose' means to put forward an idea or plan for others to think about."
  },
  {
    id: 'vocab-023',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'academic',
    question: 'What is the meaning of "evidence"?',
    options: ['Information that proves something is true', 'A type of question', 'A mathematical formula', 'An ancient language'],
    correctIndex: 0,
    explanation: "'Evidence' is information or facts that help prove something is true."
  },
  {
    id: 'vocab-024',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'work',
    question: 'Which word means "to be in charge of a team or organization"?',
    options: ['Follow', 'Obey', 'Manage', 'Suggest'],
    correctIndex: 2,
    explanation: "'Manage' means to be responsible for controlling or organizing something."
  },
  {
    id: 'vocab-025',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'academic',
    question: 'What does "significant" mean in an academic context?',
    options: ['Small and unimportant', 'Large enough to be worth noting', 'Related to science only', 'Hidden from view'],
    correctIndex: 1,
    explanation: "'Significant' means important, notable, or large enough to matter."
  },
  {
    id: 'vocab-026',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'work',
    question: 'Which word means "the ability to do something well"?',
    options: ['Skill', 'Difficulty', 'Opportunity', 'Problem'],
    correctIndex: 0,
    explanation: "'Skill' means the ability to do something well, gained through training or experience."
  },
  {
    id: 'vocab-027',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'daily-life',
    question: 'What does "afford" mean?',
    options: ['To buy something cheaply', 'To sell something at a loss', 'To borrow money from someone', 'To have enough money to pay for something'],
    correctIndex: 3,
    explanation: "'Afford' means to have enough money to be able to buy or pay for something."
  },
  {
    id: 'vocab-028',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'academic',
    question: 'Which word means "to give a reason for something"?',
    options: ['Describe', 'Prescribe', 'Explain', 'Subscribe'],
    correctIndex: 2,
    explanation: "'Explain' means to make something clear by giving details or reasons."
  },
  {
    id: 'vocab-029',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'work',
    question: 'What does "deadline" mean?',
    options: ['The latest time something must be done', 'A type of measurement', 'A dead end', 'A final exam'],
    correctIndex: 0,
    explanation: "A 'deadline' is the latest time or date by which something must be completed."
  },
  {
    id: 'vocab-030',
    type: 'vocabulary',
    difficulty: 'B1',
    topic: 'daily-life',
    question: 'Which word means "to feel worried or uncertain about something"?',
    options: ['Relax', 'Worry', 'Enjoy', 'Celebrate'],
    correctIndex: 1,
    explanation: "'Worry' means to feel anxious or concerned about something."
  },

  // ═══════════════════════════════════════════
  // B2 Level — 10 questions
  // correctIndex pattern: 2,0,1,3,2,0,1,3,2,0
  // ═══════════════════════════════════════════

  {
    id: 'vocab-031',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'academic',
    question: 'What does "hypothesis" mean?',
    options: ['A proven fact', 'A type of conclusion', 'A proposed explanation to be tested', 'An experimental tool'],
    correctIndex: 2,
    explanation: "A 'hypothesis' is a proposed explanation made on the basis of limited evidence, used as a starting point for investigation."
  },
  {
    id: 'vocab-032',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'phrasal-verbs',
    question: 'What does "give up" mean?',
    options: ['To stop trying', 'To increase effort', 'To hand something over', 'To raise something upward'],
    correctIndex: 0,
    explanation: "'Give up' means to stop trying or to quit doing something."
  },
  {
    id: 'vocab-033',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'academic',
    question: 'Which word means "to make something less severe"?',
    options: ['Intensify', 'Mitigate', 'Amplify', 'Accelerate'],
    correctIndex: 1,
    explanation: "'Mitigate' means to make something less severe, serious, or painful."
  },
  {
    id: 'vocab-034',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'phrasal-verbs',
    question: 'What does "carry on" mean?',
    options: ['To put something down', 'To transport something', 'To behave badly', 'To continue doing something'],
    correctIndex: 3,
    explanation: "'Carry on' means to continue doing something despite difficulty."
  },
  {
    id: 'vocab-035',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'academic',
    question: 'What is the meaning of "substantial"?',
    options: ['Very small and insignificant', 'Related to substances', 'Of considerable importance or size', 'Underneath something'],
    correctIndex: 2,
    explanation: "'Substantial' means of considerable importance, size, or worth."
  },
  {
    id: 'vocab-036',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'work',
    question: 'Which word means "to give someone the authority to do something"?',
    options: ['Authorize', 'Prohibit', 'Deny', 'Ignore'],
    correctIndex: 0,
    explanation: "'Authorize' means to give official permission or authority for something."
  },
  {
    id: 'vocab-037',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'phrasal-verbs',
    question: 'What does "come across" mean?',
    options: ['To travel across a bridge', 'To find something by chance', 'To meet someone at a crossing', 'To overcome a problem'],
    correctIndex: 1,
    explanation: "'Come across' means to find or encounter something by chance."
  },
  {
    id: 'vocab-038',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'academic',
    question: 'Which word means "to make a theory or idea seem real or true"?',
    options: ['Disprove', 'Confuse', 'Validate', 'Simplify'],
    correctIndex: 2,
    explanation: "'Validate' means to check or prove that something is accurate or true."
  },
  {
    id: 'vocab-039',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'work',
    question: 'What does "negotiate" mean?',
    options: ['To refuse completely', 'To discuss something to reach an agreement', 'To argue angrily', 'To ignore someone'],
    correctIndex: 1,
    explanation: "'Negotiate' means to discuss something with someone to reach an agreement."
  },
  {
    id: 'vocab-040',
    type: 'vocabulary',
    difficulty: 'B2',
    topic: 'phrasal-verbs',
    question: 'What does "put off" mean?',
    options: ['To start immediately', 'To remove something', 'To turn something on', 'To postpone or delay'],
    correctIndex: 3,
    explanation: "'Put off' means to delay doing something until a later time."
  },

  // ═══════════════════════════════════════════
  // C1 Level — 10 questions
  // correctIndex pattern: 1,3,0,2,1,3,0,2,1,3
  // ═══════════════════════════════════════════

  {
    id: 'vocab-041',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'academic',
    question: 'What does "empirical" mean?',
    options: ['Based on theory only', 'Based on observation and experience', 'Related to an emperor', 'Completely imaginary'],
    correctIndex: 1,
    explanation: "'Empirical' means based on observation or experience rather than theory."
  },
  {
    id: 'vocab-042',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'collocations',
    question: 'Which word collocates with "commit" to mean doing something illegal?',
    options: ['Commit a promise', 'Commit a mistake', 'Commit a crime', 'Commit a task'],
    correctIndex: 2,
    explanation: "'Commit a crime' is the standard collocation meaning to do something against the law."
  },
  {
    id: 'vocab-043',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'academic',
    question: 'What is the meaning of "ambiguous"?',
    options: ['Open to more than one interpretation', 'Very clear and easy to understand', 'Extremely large in size', 'Related to both sides equally'],
    correctIndex: 0,
    explanation: "'Ambiguous' means open to more than one interpretation; not having one obvious meaning."
  },
  {
    id: 'vocab-044',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'collocations',
    question: 'Which phrase correctly collocates with "draw" to mean reaching a conclusion?',
    options: ['Draw a line', 'Draw a picture', 'Draw a conclusion', 'Draw a bath'],
    correctIndex: 2,
    explanation: "'Draw a conclusion' is the standard collocation meaning to reach a decision based on evidence."
  },
  {
    id: 'vocab-045',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'academic',
    question: 'What does "paradigm" mean?',
    options: ['A type of paradise', 'A typical example or pattern of something', 'A pair of dice', 'A paragraph in a book'],
    correctIndex: 1,
    explanation: "A 'paradigm' is a typical example or pattern of something; a model or framework."
  },
  {
    id: 'vocab-046',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'collocations',
    question: 'Which collocation is correct for expressing a hope or desire?',
    options: ['Have a hunch', 'Form an opinion', 'Reach a goal', 'Make a wish'],
    correctIndex: 3,
    explanation: "'Make a wish' is the standard collocation for expressing a hope or desire."
  },
  {
    id: 'vocab-047',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'academic',
    question: 'What does "pragmatic" mean?',
    options: ['Dealing with things sensibly and practically', 'Idealistic and dreamy', 'Related to grammar rules', 'Extremely emotional'],
    correctIndex: 0,
    explanation: "'Pragmatic' means dealing with things sensibly and realistically rather than ideally."
  },
  {
    id: 'vocab-048',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'collocations',
    question: 'Which word collocates with "severe" to describe very bad weather?',
    options: ['Severe pain', 'Severe weather', 'Severe taste', 'Severe sound'],
    correctIndex: 1,
    explanation: "'Severe weather' is the standard collocation for dangerous or extreme weather conditions."
  },
  {
    id: 'vocab-049',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'academic',
    question: 'What does "juxtapose" mean?',
    options: ['To join two things together permanently', 'To place two things close together for comparison', 'To throw something far away', 'To reduce something in size'],
    correctIndex: 1,
    explanation: "'Juxtapose' means to place two things close together to compare or contrast them."
  },
  {
    id: 'vocab-050',
    type: 'vocabulary',
    difficulty: 'C1',
    topic: 'collocations',
    question: 'Which phrase correctly describes making a formal complaint?',
    options: ['Submit a complaint', 'File a complaint', 'Send a complaint', 'Write a complaint'],
    correctIndex: 1,
    explanation: "'File a complaint' is the standard collocation for making an official or formal complaint."
  }
];
