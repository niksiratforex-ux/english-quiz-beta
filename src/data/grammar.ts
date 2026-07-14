import { Question } from '../core/types';

export const grammarQuestions: Question[] = [
  // ═══════════════════════════════════════════
  // A1 Level — 10 questions
  // correctIndex pattern: 0,1,2,3,0,2,3,1,0,2
  // ═══════════════════════════════════════════

  {
    id: 'grammar-001',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'present-tenses',
    question: 'She ___ to school every day.',
    options: ['goes', 'go', 'going', 'went'],
    correctIndex: 0,
    explanation: "Third person singular present tense uses 'goes'."
  },
  {
    id: 'grammar-002',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'present-tenses',
    question: 'I ___ a book right now.',
    options: ['read', 'am reading', 'reads', 'reading'],
    correctIndex: 1,
    explanation: "Present continuous tense: am/is/are + verb-ing."
  },
  {
    id: 'grammar-003',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'articles',
    question: 'There ___ many people at the party.',
    options: ['is', 'was', 'has', 'are'],
    correctIndex: 3,
    explanation: "'People' is plural, so we use 'are'."
  },
  {
    id: 'grammar-004',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'articles',
    question: 'She ___ a doctor.',
    options: ['am', 'are', 'be', 'is'],
    correctIndex: 3,
    explanation: "Use 'is' with he/she/it."
  },
  {
    id: 'grammar-005',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'articles',
    question: 'I have ___ apple.',
    options: ['a', 'an', 'the', 'no article'],
    correctIndex: 1,
    explanation: "Use 'an' before words starting with vowel sounds."
  },
  {
    id: 'grammar-006',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'present-tenses',
    question: 'They ___ football on Saturdays.',
    options: ['play', 'plays', 'playing', 'played'],
    correctIndex: 0,
    explanation: "Plural subjects use the base form of the verb in present simple."
  },
  {
    id: 'grammar-007',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'present-tenses',
    question: 'He ___ lunch at 12 o\'clock.',
    options: ['eat', 'eating', 'ate', 'eats'],
    correctIndex: 3,
    explanation: "Third person singular present tense adds -s: 'eats'."
  },
  {
    id: 'grammar-008',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'articles',
    question: 'I want ___ orange, please.',
    options: ['a', 'the', 'an', 'one'],
    correctIndex: 2,
    explanation: "Use 'an' before words starting with a vowel sound."
  },
  {
    id: 'grammar-009',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'prepositions',
    question: 'The book is ___ the table.',
    options: ['in', 'on', 'at', 'under'],
    correctIndex: 1,
    explanation: "Use 'on' for objects resting on a surface."
  },
  {
    id: 'grammar-010',
    type: 'grammar',
    difficulty: 'A1',
    topic: 'prepositions',
    question: 'We meet ___ Mondays.',
    options: ['in', 'at', 'on', 'by'],
    correctIndex: 2,
    explanation: "Use 'on' with days of the week."
  },

  // ═══════════════════════════════════════════
  // A2 Level — 10 questions
  // correctIndex pattern: 2,3,0,1,2,3,0,1,2,3
  // ═══════════════════════════════════════════

  {
    id: 'grammar-011',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'past-tenses',
    question: 'I ___ to the cinema yesterday.',
    options: ['go', 'went', 'have gone', 'was going'],
    correctIndex: 1,
    explanation: "'Went' is the past simple of 'go'."
  },
  {
    id: 'grammar-012',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'past-tenses',
    question: 'She ___ her homework before dinner.',
    options: ['do', 'did', 'does', 'has done'],
    correctIndex: 1,
    explanation: "'Did' is the past simple of 'do'."
  },
  {
    id: 'grammar-013',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'past-tenses',
    question: 'They ___ to Paris last summer.',
    options: ['travel', 'travels', 'travelled', 'have travelled'],
    correctIndex: 2,
    explanation: "Past simple of 'travel' is 'travelled' (regular verb)."
  },
  {
    id: 'grammar-014',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'prepositions',
    question: 'I arrived ___ the airport at 6 PM.',
    options: ['in', 'on', 'at', 'to'],
    correctIndex: 2,
    explanation: "Use 'at' with specific points like airports and stations."
  },
  {
    id: 'grammar-015',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'past-tenses',
    question: 'He ___ TV when I called.',
    options: ['watch', 'watches', 'was watching', 'watched'],
    correctIndex: 2,
    explanation: "Past continuous: was/were + verb-ing for an action in progress."
  },
  {
    id: 'grammar-016',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'prepositions',
    question: 'The keys are ___ the drawer.',
    options: ['on', 'at', 'by', 'in'],
    correctIndex: 3,
    explanation: "Use 'in' for objects inside an enclosed space."
  },
  {
    id: 'grammar-017',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'past-tenses',
    question: 'We ___ never ___ to Japan.',
    options: ['has / been', 'had / been', 'were / being', 'have / been'],
    correctIndex: 3,
    explanation: "Present perfect: have/has + past participle. 'We' uses 'have'."
  },
  {
    id: 'grammar-018',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'prepositions',
    question: 'She is interested ___ learning languages.',
    options: ['in', 'on', 'at', 'for'],
    correctIndex: 0,
    explanation: "'Interested in' is the correct preposition combination."
  },
  {
    id: 'grammar-019',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'past-tenses',
    question: 'I ___ my keys yesterday morning.',
    options: ['lose', 'lost', 'have lost', 'was losing'],
    correctIndex: 1,
    explanation: "'Lost' is the past simple of 'lose' (irregular verb)."
  },
  {
    id: 'grammar-020',
    type: 'grammar',
    difficulty: 'A2',
    topic: 'prepositions',
    question: 'The meeting starts ___ 3 o\'clock.',
    options: ['in', 'on', 'at', 'for'],
    correctIndex: 2,
    explanation: "Use 'at' with specific times."
  },

  // ═══════════════════════════════════════════
  // B1 Level — 10 questions
  // correctIndex pattern: 0,1,3,2,0,1,3,2,0,1
  // ═══════════════════════════════════════════

  {
    id: 'grammar-021',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'modals',
    question: 'You ___ smoke in the hospital.',
    options: ['must not', 'must', 'can', 'should'],
    correctIndex: 0,
    explanation: "'Must not' expresses prohibition — it is not allowed."
  },
  {
    id: 'grammar-022',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'modals',
    question: 'She ___ speak three languages fluently.',
    options: ['must', 'should', 'may', 'can'],
    correctIndex: 3,
    explanation: "'Can' expresses ability."
  },
  {
    id: 'grammar-023',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'future-forms',
    question: 'I ___ you tomorrow morning.',
    options: ['will call', 'am going to call', 'call', 'calling'],
    correctIndex: 0,
    explanation: "'Will' is used for spontaneous decisions and future promises."
  },
  {
    id: 'grammar-024',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'future-forms',
    question: 'Look at those dark clouds. It ___ soon.',
    options: ['will rain', 'rains', 'is going to rain', 'rained'],
    correctIndex: 2,
    explanation: "'Be going to' is used for predictions based on present evidence."
  },
  {
    id: 'grammar-025',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'modals',
    question: 'You ___ wear a seatbelt while driving.',
    options: ['can', 'may', 'might', 'have to'],
    correctIndex: 3,
    explanation: "'Have to' expresses obligation or necessity."
  },
  {
    id: 'grammar-026',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'future-forms',
    question: 'The train ___ at 9:15 tomorrow.',
    options: ['leaves', 'will leave', 'is leaving', 'left'],
    correctIndex: 0,
    explanation: "Present simple is used for scheduled future events like timetables."
  },
  {
    id: 'grammar-027',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'modals',
    question: 'You ___ have told me about the meeting!',
    options: ['should', 'can', 'must', 'will'],
    correctIndex: 0,
    explanation: "'Should have + past participle' expresses regret about a past action."
  },
  {
    id: 'grammar-028',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'future-forms',
    question: 'I ___ a doctor next Tuesday.',
    options: ['see', 'will see', 'am seeing', 'saw'],
    correctIndex: 2,
    explanation: "Present continuous can be used for fixed future arrangements."
  },
  {
    id: 'grammar-029',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'modals',
    question: 'He ___ be at home. I just saw him at the shop.',
    options: ["can't", 'must', 'should', 'may'],
    correctIndex: 0,
    explanation: "'Can't' expresses logical impossibility based on evidence."
  },
  {
    id: 'grammar-030',
    type: 'grammar',
    difficulty: 'B1',
    topic: 'prepositions',
    question: 'She is afraid ___ flying.',
    options: ['of', 'from', 'about', 'with'],
    correctIndex: 0,
    explanation: "'Afraid of' is the correct preposition combination."
  },

  // ═══════════════════════════════════════════
  // B2 Level — 10 questions
  // correctIndex pattern: 3,0,1,2,3,0,1,2,3,0
  // ═══════════════════════════════════════════

  {
    id: 'grammar-031',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'conditionals',
    question: 'If I ___ rich, I would travel the world.',
    options: ['am', 'was', 'be', 'were'],
    correctIndex: 3,
    explanation: "Second conditional uses 'were' for all subjects (formal English)."
  },
  {
    id: 'grammar-032',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'passive-voice',
    question: 'The book ___ by J.K. Rowling.',
    options: ['was written', 'wrote', 'written', 'writing'],
    correctIndex: 0,
    explanation: "Passive voice: was/were + past participle."
  },
  {
    id: 'grammar-033',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'conditionals',
    question: 'If it ___ tomorrow, we will cancel the picnic.',
    options: ['rained', 'will rain', 'would rain', 'rains'],
    correctIndex: 3,
    explanation: "First conditional: if + present simple, will + base verb."
  },
  {
    id: 'grammar-034',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'passive-voice',
    question: 'The bridge ___ in 1995.',
    options: ['built', 'is built', 'has built', 'was built'],
    correctIndex: 3,
    explanation: "Past simple passive: was/were + past participle."
  },
  {
    id: 'grammar-035',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'conditionals',
    question: 'If I ___ you, I would accept the offer.',
    options: ['am', 'was', 'were', 'be'],
    correctIndex: 2,
    explanation: "Second conditional uses 'were' for hypothetical situations."
  },
  {
    id: 'grammar-036',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'passive-voice',
    question: 'The report ___ by the end of this week.',
    options: ['will finish', 'will be finished', 'finishes', 'is finishing'],
    correctIndex: 1,
    explanation: "Future simple passive: will be + past participle."
  },
  {
    id: 'grammar-037',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'conditionals',
    question: 'If she had studied harder, she ___ the exam.',
    options: ['passed', 'passes', 'would pass', 'would have passed'],
    correctIndex: 3,
    explanation: "Third conditional: would have + past participle."
  },
  {
    id: 'grammar-038',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'passive-voice',
    question: 'English ___ in many countries around the world.',
    options: ['speaks', 'is spoken', 'spoken', 'was speaking'],
    correctIndex: 1,
    explanation: "Present simple passive: is/are + past participle."
  },
  {
    id: 'grammar-039',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'conditionals',
    question: 'Unless you ___ harder, you won\'t pass the test.',
    options: ['study', 'studied', 'will study', 'studying'],
    correctIndex: 0,
    explanation: "'Unless' means 'if not'. The clause after unless uses present simple."
  },
  {
    id: 'grammar-040',
    type: 'grammar',
    difficulty: 'B2',
    topic: 'passive-voice',
    question: 'The car ___ while the family was on holiday.',
    options: ['stole', 'was stolen', 'steals', 'has stolen'],
    correctIndex: 1,
    explanation: "Past simple passive: was/were + past participle."
  },

  // ═══════════════════════════════════════════
  // C1 Level — 10 questions
  // correctIndex pattern: 2,0,1,3,2,0,1,3,2,0
  // ═══════════════════════════════════════════

  {
    id: 'grammar-041',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'conditionals',
    question: 'Had I known about the traffic, I ___ earlier.',
    options: ['would act', 'will act', 'would have acted', 'acted'],
    correctIndex: 2,
    explanation: "Third conditional inversion: Had + subject + past participle."
  },
  {
    id: 'grammar-042',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'relative-clauses',
    question: 'The scientist ___ research was published won an award.',
    options: ['whose', 'which', 'who', 'whom'],
    correctIndex: 0,
    explanation: "'Whose' shows possession — the research belongs to the scientist."
  },
  {
    id: 'grammar-043',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'passive-voice',
    question: 'The project ___ by the time we arrive.',
    options: ['will finish', 'finishes', 'will have been finished', 'will have finished'],
    correctIndex: 2,
    explanation: "Future perfect passive: will have been + past participle."
  },
  {
    id: 'grammar-044',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'relative-clauses',
    question: 'The house ___ roof was damaged has been repaired.',
    options: ['which', 'that', 'whom', 'whose'],
    correctIndex: 3,
    explanation: "'Whose' is used for possession — the roof belongs to the house."
  },
  {
    id: 'grammar-045',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'conditionals',
    question: 'I wish I ___ speak French fluently.',
    options: ['can', 'will', 'could', 'may'],
    correctIndex: 2,
    explanation: "After 'wish', use past tense for present wishes."
  },
  {
    id: 'grammar-046',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'passive-voice',
    question: 'The new law ___ next month by the government.',
    options: ['is implementing', 'will implement', 'is going to be implemented', 'has implemented'],
    correctIndex: 0,
    explanation: "Present continuous passive: is/are being + past participle."
  },
  {
    id: 'grammar-047',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'relative-clauses',
    question: 'She speaks English fluently, ___ she?',
    options: ["isn't", "doesn't", "wasn't", "weren't"],
    correctIndex: 1,
    explanation: "Tag questions use the auxiliary from the main clause."
  },
  {
    id: 'grammar-048',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'conditionals',
    question: 'If the team ___ harder, they would have won the championship.',
    options: ['trained', 'trains', 'had trained', 'would train'],
    correctIndex: 2,
    explanation: "Third conditional: if + past perfect, would have + past participle."
  },
  {
    id: 'grammar-049',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'passive-voice',
    question: 'It is believed that the treasure ___ somewhere on the island.',
    options: ['hides', 'is hidden', 'hidden', 'was hiding'],
    correctIndex: 1,
    explanation: "Passive construction: is/are believed to be + past participle."
  },
  {
    id: 'grammar-050',
    type: 'grammar',
    difficulty: 'C1',
    topic: 'relative-clauses',
    question: 'The reason ___ he was late is still unknown.',
    options: ['which', 'why', 'what', 'how'],
    correctIndex: 1,
    explanation: "'Why' is used as a relative adverb to refer to a reason."
  }
];
