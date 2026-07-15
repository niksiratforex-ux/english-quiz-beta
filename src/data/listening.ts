import { ListeningClip, Question } from '../core/types';

// =====================================================
// Listening Clips - 10 original clips, 2 per CEFR level
// All content is original. No copyrighted material copied.
// =====================================================

export const listeningClips: ListeningClip[] = [
  // --- A1 Level - 2 clips ---
  {
    id: 'clip-a1-1',
    difficulty: 'A1',
    topic: 'appointment',
    title: 'Doctor Appointment',
    script: 'Hello, I would like to book an appointment with the doctor, please. Do you have any time this week? How about Thursday at two o\'clock? Yes, that works for me. Thank you very much.'
  },
  {
    id: 'clip-a1-2',
    difficulty: 'A1',
    topic: 'shopping',
    title: 'Buying Fruit',
    script: 'Can I have some apples, please? How many would you like? Six apples, please. And I would also like some bananas. That will be three pounds fifty, please. Here you are. Thank you.'
  },

  // --- A2 Level - 2 clips ---
  {
    id: 'clip-a2-1',
    difficulty: 'A2',
    topic: 'travel',
    title: 'Train Information',
    script: 'Excuse me, what time does the next train to Manchester leave? The next train leaves at ten fifteen from platform three. How long does the journey take? It takes about one hour and forty minutes. Thank you. You are welcome. Have a good trip.'
  },
  {
    id: 'clip-a2-2',
    difficulty: 'A2',
    topic: 'work',
    title: 'Meeting Schedule',
    script: 'Good morning everyone. I wanted to let you know that the team meeting has been moved from Monday to Wednesday. It will still start at ten o\'clock in the main conference room. Please make sure to bring your project updates. If you have any questions, send me an email.'
  },

  // --- B1 Level - 2 clips ---
  {
    id: 'clip-b1-1',
    difficulty: 'B1',
    topic: 'technology',
    title: 'New Software Update',
    script: 'The company will be rolling out a new software update next Monday. This update includes improved security features and a redesigned dashboard. All employees are required to install it by the end of the week. The IT department has prepared a step-by-step guide that will be sent to your email. If you experience any issues during installation, please contact the help desk. They are available from nine to five on weekdays.'
  },
  {
    id: 'clip-b1-2',
    difficulty: 'B1',
    topic: 'community',
    title: 'Volunteer Event',
    script: 'This Saturday, the local library is hosting a volunteer event to clean up the neighbourhood park. We will meet at the park entrance at nine in the morning. Please bring gloves and a rubbish bag. We will provide water and snacks. The event usually finishes around noon. Everyone is welcome to join, and no previous experience is needed. For more information, call the library at five five five zero one two three.'
  },

  // --- B2 Level - 2 clips ---
  {
    id: 'clip-b2-1',
    difficulty: 'B2',
    topic: 'education',
    title: 'Online Learning Benefits',
    script: 'Recent studies show that online learning has become increasingly popular among working professionals. Many people appreciate the flexibility it offers, allowing them to study at their own pace while maintaining their careers. However, researchers note that students who combine online courses with regular group discussions tend to perform significantly better than those who study entirely alone. The key finding is that social interaction remains important even in digital learning environments.'
  },
  {
    id: 'clip-b2-2',
    difficulty: 'B2',
    topic: 'environment',
    title: 'Water Conservation',
    script: 'Our city has introduced new water conservation measures following the driest summer in thirty years. Residents are now asked to limit garden watering to twice a week, and car washing at home is no longer permitted during peak hours. The council has also announced plans to install water-saving devices in all public buildings. These measures are expected to reduce water consumption by fifteen percent over the next year. Community leaders encourage everyone to take shorter showers and fix any leaking taps as soon as possible.'
  },

  // --- C1 Level - 2 clips ---
  {
    id: 'clip-c1-1',
    difficulty: 'C1',
    topic: 'psychology',
    title: 'Workplace Motivation',
    script: 'A recent survey conducted across multiple industries reveals that monetary rewards alone are insufficient to sustain long-term employee motivation. While competitive salaries remain important for attracting talent, the data suggests that meaningful work, opportunities for professional growth, and a supportive team environment are equally critical factors. Companies that invest in these areas report significantly lower turnover rates and higher employee satisfaction scores. The researchers recommend that organisations adopt a more holistic approach to motivation that goes beyond financial incentives.'
  },
  {
    id: 'clip-c1-2',
    difficulty: 'C1',
    topic: 'culture',
    title: 'Language Learning Trends',
    script: 'The popularity of language learning applications has transformed how people approach acquiring new languages. Unlike traditional classroom methods that emphasise grammar rules and memorisation, modern apps focus on conversational practice and real-world scenarios. Studies indicate that learners who use these tools for at least twenty minutes daily show measurable improvement within three months. However, experts caution that digital tools work best when combined with regular conversation practice with native speakers, as understanding cultural context remains essential for true fluency.'
  }
];

// =====================================================
// Listening Questions - 30 questions, 3 per clip
// Correct answers distributed: A:8, B:7, C:8, D:7
// =====================================================

export const listeningQuestions: Question[] = [
  // --- Clip: a1-1 Doctor Appointment ---
  {
    id: 'listen-001',
    type: 'listening',
    difficulty: 'A1',
    topic: 'appointment',
    clipId: 'clip-a1-1',
    subtype: 'detail',
    question: 'What day is the appointment booked for?',
    options: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    correctIndex: 2,
    explanation: 'The speaker says: "How about Thursday at two o\'clock?"'
  },
  {
    id: 'listen-002',
    type: 'listening',
    difficulty: 'A1',
    topic: 'appointment',
    clipId: 'clip-a1-1',
    subtype: 'detail',
    question: 'What time is the appointment?',
    options: ['Ten o\'clock', 'Eleven o\'clock', 'One o\'clock', 'Two o\'clock'],
    correctIndex: 3,
    explanation: 'The speaker says: "How about Thursday at two o\'clock?"'
  },
  {
    id: 'listen-003',
    type: 'listening',
    difficulty: 'A1',
    topic: 'appointment',
    clipId: 'clip-a1-1',
    subtype: 'gist',
    question: 'What is the conversation mainly about?',
    options: ['Booking a doctor appointment', 'Canceling an appointment', 'Asking for directions to a clinic', 'Discussing medical symptoms'],
    correctIndex: 0,
    explanation: 'The speaker says "I would like to book an appointment with the doctor" and they agree on a time.'
  },

  // --- Clip: a1-2 Buying Fruit ---
  {
    id: 'listen-004',
    type: 'listening',
    difficulty: 'A1',
    topic: 'shopping',
    clipId: 'clip-a1-2',
    subtype: 'detail',
    question: 'How many apples does the customer buy?',
    options: ['Four', 'Five', 'Six', 'Seven'],
    correctIndex: 2,
    explanation: 'The customer says: "Six apples, please."'
  },
  {
    id: 'listen-005',
    type: 'listening',
    difficulty: 'A1',
    topic: 'shopping',
    clipId: 'clip-a1-2',
    subtype: 'detail',
    question: 'How much does the customer pay?',
    options: ['Two pounds fifty', 'Three pounds', 'Three pounds fifty', 'Four pounds'],
    correctIndex: 2,
    explanation: 'The seller says: "That will be three pounds fifty, please."'
  },
  {
    id: 'listen-006',
    type: 'listening',
    difficulty: 'A1',
    topic: 'shopping',
    clipId: 'clip-a1-2',
    subtype: 'detail',
    question: 'What other fruit does the customer buy besides apples?',
    options: ['Bananas', 'Oranges', 'Grapes', 'Pears'],
    correctIndex: 0,
    explanation: 'The customer says: "And I would also like some bananas."'
  },

  // --- Clip: a2-1 Train Information ---
  {
    id: 'listen-007',
    type: 'listening',
    difficulty: 'A2',
    topic: 'travel',
    clipId: 'clip-a2-1',
    subtype: 'detail',
    question: 'What time does the train leave?',
    options: ['Ten fifteen', 'Ten o\'clock', 'Ten thirty', 'Ten forty-five'],
    correctIndex: 0,
    explanation: 'The staff member says: "The next train leaves at ten fifteen."'
  },
  {
    id: 'listen-008',
    type: 'listening',
    difficulty: 'A2',
    topic: 'travel',
    clipId: 'clip-a2-1',
    subtype: 'detail',
    question: 'Which platform does the train depart from?',
    options: ['Platform one', 'Platform two', 'Platform three', 'Platform four'],
    correctIndex: 2,
    explanation: 'The staff member says: "from platform three."'
  },
  {
    id: 'listen-009',
    type: 'listening',
    difficulty: 'A2',
    topic: 'travel',
    clipId: 'clip-a2-1',
    subtype: 'detail',
    question: 'How long does the journey take?',
    options: ['About one hour', 'About one hour and twenty minutes', 'About one hour and forty minutes', 'About two hours'],
    correctIndex: 2,
    explanation: 'The staff member says: "It takes about one hour and forty minutes."'
  },

  // --- Clip: a2-2 Meeting Schedule ---
  {
    id: 'listen-010',
    type: 'listening',
    difficulty: 'A2',
    topic: 'work',
    clipId: 'clip-a2-2',
    subtype: 'detail',
    question: 'What day is the meeting moved to?',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    correctIndex: 2,
    explanation: 'The speaker says: "the team meeting has been moved from Monday to Wednesday."'
  },
  {
    id: 'listen-011',
    type: 'listening',
    difficulty: 'A2',
    topic: 'work',
    clipId: 'clip-a2-2',
    subtype: 'detail',
    question: 'What time does the meeting start?',
    options: ['Nine o\'clock', 'Ten o\'clock', 'Eleven o\'clock', 'Two o\'clock'],
    correctIndex: 1,
    explanation: 'The speaker says: "It will still start at ten o\'clock."'
  },
  {
    id: 'listen-012',
    type: 'listening',
    difficulty: 'A2',
    topic: 'work',
    clipId: 'clip-a2-2',
    subtype: 'detail',
    question: 'What should employees bring to the meeting?',
    options: ['Project updates', 'Their laptops', 'Meeting notes', 'Lunch'],
    correctIndex: 0,
    explanation: 'The speaker says: "Please make sure to bring your project updates."'
  },

  // --- Clip: b1-1 New Software Update ---
  {
    id: 'listen-013',
    type: 'listening',
    difficulty: 'B1',
    topic: 'technology',
    clipId: 'clip-b1-1',
    subtype: 'detail',
    question: 'When will the software update be released?',
    options: ['Next Monday', 'This Friday', 'Next Wednesday', 'Next Friday'],
    correctIndex: 0,
    explanation: 'The speaker says: "The company will be rolling out a new software update next Monday."'
  },
  {
    id: 'listen-014',
    type: 'listening',
    difficulty: 'B1',
    topic: 'technology',
    clipId: 'clip-b1-1',
    subtype: 'detail',
    question: 'What should employees do if they have installation problems?',
    options: ['Contact the help desk', 'Call their manager', 'Visit the IT office', 'Restart their computer'],
    correctIndex: 0,
    explanation: 'The speaker says: "please contact the help desk."'
  },
  {
    id: 'listen-015',
    type: 'listening',
    difficulty: 'B1',
    topic: 'technology',
    clipId: 'clip-b1-1',
    subtype: 'gist',
    question: 'What is the main purpose of this announcement?',
    options: ['To introduce a new team member', 'To schedule a training session', 'To change office hours', 'To announce a software update'],
    correctIndex: 3,
    explanation: 'The entire announcement is about the upcoming software update and installation instructions.'
  },

  // --- Clip: b1-2 Volunteer Event ---
  {
    id: 'listen-016',
    type: 'listening',
    difficulty: 'B1',
    topic: 'community',
    clipId: 'clip-b1-2',
    subtype: 'detail',
    question: 'What day is the volunteer event?',
    options: ['Sunday', 'This Friday', 'Next Saturday', 'This Saturday'],
    correctIndex: 3,
    explanation: 'The speaker says: "This Saturday, the local library is hosting a volunteer event."'
  },
  {
    id: 'listen-017',
    type: 'listening',
    difficulty: 'B1',
    topic: 'community',
    clipId: 'clip-b1-2',
    subtype: 'detail',
    question: 'What should volunteers bring?',
    options: ['Food and drinks', 'Nothing is required', 'Tools and equipment', 'Gloves and a rubbish bag'],
    correctIndex: 3,
    explanation: 'The speaker says: "Please bring gloves and a rubbish bag."'
  },
  {
    id: 'listen-018',
    type: 'listening',
    difficulty: 'B1',
    topic: 'community',
    clipId: 'clip-b1-2',
    subtype: 'detail',
    question: 'What is the library\'s phone number?',
    options: ['555-0123', '555-0132', '555-0213', '555-0231'],
    correctIndex: 0,
    explanation: 'The speaker says: "call the library at five five five zero one two three."'
  },

  // --- Clip: b2-1 Online Learning Benefits ---
  {
    id: 'listen-019',
    type: 'listening',
    difficulty: 'B2',
    topic: 'education',
    clipId: 'clip-b2-1',
    subtype: 'gist',
    question: 'What is the main idea of this passage?',
    options: ['Online learning is cheaper than classroom learning', 'Online learning will replace traditional universities', 'Working professionals prefer classroom learning', 'Social interaction improves online learning outcomes'],
    correctIndex: 3,
    explanation: 'The passage emphasises that students who combine online courses with group discussions perform better.'
  },
  {
    id: 'listen-020',
    type: 'listening',
    difficulty: 'B2',
    topic: 'education',
    clipId: 'clip-b2-1',
    subtype: 'detail',
    question: 'Who is the main audience for online learning mentioned in the passage?',
    options: ['University students', 'Retired people', 'High school teachers', 'Working professionals'],
    correctIndex: 3,
    explanation: 'The speaker says: "online learning has become increasingly popular among working professionals."'
  },
  {
    id: 'listen-021',
    type: 'listening',
    difficulty: 'B2',
    topic: 'education',
    clipId: 'clip-b2-1',
    subtype: 'inference',
    question: 'What can we infer about studying alone versus in groups?',
    options: ['Studying alone is always more effective', 'Group study is unnecessary for online learners', 'Group discussions are only useful in traditional classrooms', 'Combining online study with discussion groups leads to better results'],
    correctIndex: 3,
    explanation: 'The passage states that students who combine online courses with group discussions "tend to perform significantly better."'
  },

  // --- Clip: b2-2 Water Conservation ---
  {
    id: 'listen-022',
    type: 'listening',
    difficulty: 'B2',
    topic: 'environment',
    clipId: 'clip-b2-2',
    subtype: 'gist',
    question: 'What is the main topic of this announcement?',
    options: ['A new weather forecast', 'New water conservation rules', 'A community gardening project', 'A plumbing repair schedule'],
    correctIndex: 1,
    explanation: 'The announcement details new water conservation measures introduced by the city.'
  },
  {
    id: 'listen-023',
    type: 'listening',
    difficulty: 'B2',
    topic: 'environment',
    clipId: 'clip-b2-2',
    subtype: 'detail',
    question: 'How often can residents water their gardens?',
    options: ['Every day', 'Three times a week', 'Twice a week', 'Once a week'],
    correctIndex: 2,
    explanation: 'The speaker says: "Residents are now asked to limit garden watering to twice a week."'
  },
  {
    id: 'listen-024',
    type: 'listening',
    difficulty: 'B2',
    topic: 'environment',
    clipId: 'clip-b2-2',
    subtype: 'detail',
    question: 'By how much is water consumption expected to decrease?',
    options: ['Ten percent', 'Fifteen percent', 'Twenty percent', 'Twenty-five percent'],
    correctIndex: 1,
    explanation: 'The speaker says: "expected to reduce water consumption by fifteen percent."'
  },

  // --- Clip: c1-1 Workplace Motivation ---
  {
    id: 'listen-025',
    type: 'listening',
    difficulty: 'C1',
    topic: 'psychology',
    clipId: 'clip-c1-1',
    subtype: 'gist',
    question: 'What is the main finding of the survey?',
    options: ['Money is the most important motivator', 'Financial rewards alone are not enough for long-term motivation', 'Employees prefer shorter working hours', 'Team environments reduce productivity'],
    correctIndex: 1,
    explanation: 'The passage states: "monetary rewards alone are insufficient to sustain long-term employee motivation."'
  },
  {
    id: 'listen-026',
    type: 'listening',
    difficulty: 'C1',
    topic: 'psychology',
    clipId: 'clip-c1-1',
    subtype: 'detail',
    question: 'What factor do companies with lower turnover rates invest in?',
    options: ['Higher salaries only', 'Meaningful work and professional growth', 'Fewer working hours', 'Remote working options'],
    correctIndex: 1,
    explanation: 'The passage mentions "meaningful work, opportunities for professional growth, and a supportive team environment" as critical factors.'
  },
  {
    id: 'listen-027',
    type: 'listening',
    difficulty: 'C1',
    topic: 'psychology',
    clipId: 'clip-c1-1',
    subtype: 'inference',
    question: 'What do the researchers recommend to organisations?',
    options: ['Focus only on salary increases', 'Adopt a holistic approach to motivation', 'Reduce team meetings', 'Implement strict performance reviews'],
    correctIndex: 1,
    explanation: 'The passage concludes: "organisations adopt a more holistic approach to motivation that goes beyond financial incentives."'
  },

  // --- Clip: c1-2 Language Learning Trends ---
  {
    id: 'listen-028',
    type: 'listening',
    difficulty: 'C1',
    topic: 'culture',
    clipId: 'clip-c1-2',
    subtype: 'gist',
    question: 'What is the main idea of this passage?',
    options: ['Traditional language learning is always better', 'Language apps work best when combined with real conversation', 'Language apps have completely replaced classroom learning', 'Learning a language takes at least one year'],
    correctIndex: 1,
    explanation: 'The passage states that digital tools "work best when combined with regular conversation practice with native speakers."'
  },
  {
    id: 'listen-029',
    type: 'listening',
    difficulty: 'C1',
    topic: 'culture',
    clipId: 'clip-c1-2',
    subtype: 'detail',
    question: 'How long should learners use apps daily for measurable improvement?',
    options: ['At least ten minutes', 'At least fifteen minutes', 'At least twenty minutes', 'At least thirty minutes'],
    correctIndex: 2,
    explanation: 'The passage says: "learners who use these tools for at least twenty minutes daily show measurable improvement within three months."'
  },
  {
    id: 'listen-030',
    type: 'listening',
    difficulty: 'C1',
    topic: 'culture',
    clipId: 'clip-c1-2',
    subtype: 'detail',
    question: 'What do experts say is still essential for true fluency?',
    options: ['Memorising grammar rules', 'Understanding cultural context', 'Using translation dictionaries', 'Passing written exams'],
    correctIndex: 1,
    explanation: 'The passage states: "understanding cultural context remains essential for true fluency."'
  }
];
