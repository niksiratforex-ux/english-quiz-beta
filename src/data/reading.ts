import { ReadingPassage, Question } from '../core/types';

export const readingPassages: ReadingPassage[] = [
  {
    id: 'passage-a1-1',
    difficulty: 'A1',
    topic: 'daily-routine',
    title: 'My Morning',
    text: 'I wake up at seven o\'clock every day. First, I brush my teeth and wash my face. Then I put on my clothes. I go to the kitchen and eat breakfast. I usually have bread and milk. After breakfast, I walk to school. School starts at eight thirty.'
  },
  {
    id: 'passage-a1-2',
    difficulty: 'A1',
    topic: 'shopping',
    title: 'At the Shop',
    text: 'Maria goes to the supermarket on Saturday. She buys fruit, vegetables, and bread. She also buys some juice for her children. The supermarket is near her house. It takes about five minutes to walk there. Maria likes this shop because it is not expensive.'
  },
  {
    id: 'passage-a2-1',
    difficulty: 'A2',
    topic: 'travel',
    title: 'A Trip to the Beach',
    text: 'Last summer, Tom and his family drove to the beach. The drive took about two hours. When they arrived, the sun was shining and the water was warm. Tom and his sister played in the waves while their parents sat under an umbrella. They ate sandwiches for lunch and swam until four o\'clock. On the way home, they stopped at a small restaurant for dinner. Tom said it was the best day of the summer.'
  },
  {
    id: 'passage-a2-2',
    difficulty: 'A2',
    topic: 'work',
    title: 'Annas New Job',
    text: 'Anna started a new job last month. She works at a small office in the city centre. Her boss is very friendly and helpful. Annas main job is to answer emails and organise meetings. She works from nine in the morning until five in the afternoon. She takes a one-hour lunch break at noon. Anna is happy because her colleagues are nice and the office is close to the bus stop.'
  },
  {
    id: 'passage-b1-1',
    difficulty: 'B1',
    topic: 'technology',
    title: 'Learning to Code',
    text: 'Many people believe that learning to code is only for young people, but this is not true. Adults of all ages can learn programming with practice and patience. There are free websites and videos that teach basic coding skills. Start with simple projects, like building a small website or a basic game. As you improve, you can try more complex tasks. Coding helps you think logically and solve problems step by step. It is also a useful skill in many jobs today, not just in technology companies.'
  },
  {
    id: 'passage-b1-2',
    difficulty: 'B1',
    topic: 'community',
    title: 'The Neighbourhood Garden',
    text: 'Our neighbourhood started a community garden last spring. People signed up to take care of small plots of land. Some grew tomatoes, peppers, and herbs. Others planted flowers to make the area more beautiful. Every Saturday, volunteers met to share advice and help each other. The garden brought people together who had never spoken before. Children enjoyed picking fresh vegetables, and older residents shared their gardening knowledge. By autumn, the garden had won a local award for making the community stronger.'
  },
  {
    id: 'passage-b2-1',
    difficulty: 'B2',
    topic: 'environment',
    title: 'The Problem with Fast Fashion',
    text: 'The clothing industry produces billions of garments every year, and many of them end up in landfills within months. This trend, known as fast fashion, encourages people to buy cheap clothes and throw them away quickly. The environmental cost is enormous: factories use large amounts of water and chemicals, and shipping clothes around the world creates pollution. Some companies are now trying to change this by using recycled materials and offering repair services. However, experts say the biggest change must come from consumers, who need to buy fewer clothes and keep them for longer. Small actions, like donating old clothes or shopping at second-hand stores, can make a real difference over time.'
  },
  {
    id: 'passage-b2-2',
    difficulty: 'B2',
    topic: 'education',
    title: 'Homework: Help or Hindrance',
    text: 'For decades, teachers have given homework to students, believing it improves learning. However, recent research suggests that the relationship between homework and academic success is more complicated than previously thought. For primary school children, studies show little or no benefit from regular homework. Older students may benefit, but only up to a certain point - after about two hours per night, additional homework does not improve test scores. Some educators now argue that homework creates unnecessary stress and reduces family time. Others maintain that it teaches discipline and time management. The debate continues, but most researchers agree that the quality of homework matters far more than the quantity.'
  },
  {
    id: 'passage-c1-1',
    difficulty: 'C1',
    topic: 'psychology',
    title: 'The Science of Habits',
    text: 'Habits shape much of our daily behaviour, often without our awareness. Neuroscientists have discovered that habits form through a three-step process known as the habit loop: a cue triggers the behaviour, the routine follows, and a reward reinforces the pattern. Over time, the brain begins to automate this sequence, requiring less conscious effort. This is why breaking a bad habit is so difficult - the neural pathways become deeply established. However, research shows that habits can be changed by identifying the cue and deliberately replacing the routine while keeping the same reward. For example, someone who eats snacks when stressed could replace the snack with a short walk, since both activities reduce stress. Understanding this mechanism gives people a practical tool for reshaping their behaviour without relying solely on willpower.'
  },
  {
    id: 'passage-c1-2',
    difficulty: 'C1',
    topic: 'culture',
    title: 'The Rise of Digital Nomads',
    text: 'A growing number of professionals are leaving traditional offices to work remotely from different cities around the world. These digital nomads use laptops and internet connections to do their jobs from cafes, co-working spaces, and apartments in countries like Portugal, Thailand, and Mexico. The lifestyle appeals to people who value flexibility, travel, and cultural experiences. However, it also presents challenges that are often overlooked. Constantly moving makes it difficult to maintain deep friendships and professional networks. Time zone differences can complicate communication with teams back home. Tax and visa regulations vary between countries and can create legal difficulties. Despite these obstacles, the number of remote workers continues to grow, and some cities are now actively competing to attract them by offering special visas and discounts on accommodation.'
  }
];

export const readingQuestions: Question[] = [
  {
    id: 'read-001',
    type: 'reading',
    difficulty: 'A1',
    topic: 'daily-routine',
    passageId: 'passage-a1-1',
    subtype: 'detail',
    question: 'What does the narrator eat for breakfast?',
    options: ['Eggs and toast', 'Cereal and fruit', 'Bread and milk', 'Rice and soup'],
    correctIndex: 2,
    explanation: 'The passage states: "I usually have bread and milk."'
  },
  {
    id: 'read-002',
    type: 'reading',
    difficulty: 'A1',
    topic: 'daily-routine',
    passageId: 'passage-a1-1',
    subtype: 'detail',
    question: 'What time does school start?',
    options: ['Seven o\'clock', 'Seven thirty', 'Eight o\'clock', 'Eight thirty'],
    correctIndex: 3,
    explanation: 'The passage states: "School starts at eight thirty."'
  },
  {
    id: 'read-003',
    type: 'reading',
    difficulty: 'A1',
    topic: 'daily-routine',
    passageId: 'passage-a1-1',
    subtype: 'main-idea',
    question: 'What is this passage mainly about?',
    options: ['A morning routine', 'A school day', 'A family breakfast', 'A walk to school'],
    correctIndex: 0,
    explanation: 'The passage describes the narrators morning from waking up to walking to school.'
  },
  {
    id: 'read-004',
    type: 'reading',
    difficulty: 'A1',
    topic: 'shopping',
    passageId: 'passage-a1-2',
    subtype: 'detail',
    question: 'What day does Maria go to the supermarket?',
    options: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    correctIndex: 3,
    explanation: 'The passage states: "Maria goes to the supermarket on Saturday."'
  },
  {
    id: 'read-005',
    type: 'reading',
    difficulty: 'A1',
    topic: 'shopping',
    passageId: 'passage-a1-2',
    subtype: 'inference',
    question: 'Why does Maria like the shop?',
    options: ['It is near her house', 'It is very big', 'It sells clothes', 'It has a playground'],
    correctIndex: 0,
    explanation: 'The passage states: "Maria likes this shop because it is not expensive" and also mentions it is near her house. The proximity makes it convenient.'
  },
  {
    id: 'read-006',
    type: 'reading',
    difficulty: 'A1',
    topic: 'shopping',
    passageId: 'passage-a1-2',
    subtype: 'detail',
    question: 'What does Maria buy for her children?',
    options: ['Bread', 'Vegetables', 'Juice', 'Milk'],
    correctIndex: 2,
    explanation: 'The passage states: "She also buys some juice for her children."'
  },
  {
    id: 'read-007',
    type: 'reading',
    difficulty: 'A2',
    topic: 'travel',
    passageId: 'passage-a2-1',
    subtype: 'detail',
    question: 'How long did the drive to the beach take?',
    options: ['One hour', 'One and a half hours', 'Two hours', 'Three hours'],
    correctIndex: 2,
    explanation: 'The passage states: "The drive took about two hours."'
  },
  {
    id: 'read-008',
    type: 'reading',
    difficulty: 'A2',
    topic: 'travel',
    passageId: 'passage-a2-1',
    subtype: 'vocabulary-in-context',
    question: 'What does "arrived" mean in the passage?',
    options: ['Reached the destination', 'Left home', 'Started driving', 'Went swimming'],
    correctIndex: 0,
    explanation: '"Arrived" means reaching a destination after travelling.'
  },
  {
    id: 'read-009',
    type: 'reading',
    difficulty: 'A2',
    topic: 'travel',
    passageId: 'passage-a2-1',
    subtype: 'detail',
    question: 'What did they eat for lunch?',
    options: ['Pizza', 'Fish and chips', 'Sandwiches', 'Pasta'],
    correctIndex: 2,
    explanation: 'The passage states: "They ate sandwiches for lunch."'
  },
  {
    id: 'read-010',
    type: 'reading',
    difficulty: 'A2',
    topic: 'work',
    passageId: 'passage-a2-2',
    subtype: 'detail',
    question: 'When did Anna start her new job?',
    options: ['Last month', 'Last week', 'Last year', 'This morning'],
    correctIndex: 0,
    explanation: 'The passage states: "Anna started a new job last month."'
  },
  {
    id: 'read-011',
    type: 'reading',
    difficulty: 'A2',
    topic: 'work',
    passageId: 'passage-a2-2',
    subtype: 'detail',
    question: 'What is Annas main job?',
    options: ['Answering emails and organising meetings', 'Making tea', 'Cleaning the office', 'Serving customers'],
    correctIndex: 0,
    explanation: 'The passage states: "Annas main job is to answer emails and organise meetings."'
  },
  {
    id: 'read-012',
    type: 'reading',
    difficulty: 'A2',
    topic: 'work',
    passageId: 'passage-a2-2',
    subtype: 'inference',
    question: 'Why is Anna happy at her new job?',
    options: ['She earns a lot of money', 'She works from home', 'Her colleagues are nice and the office is convenient', 'She has her own office'],
    correctIndex: 2,
    explanation: 'The passage says Anna is happy "because her colleagues are nice and the office is close to the bus stop."'
  },
  {
    id: 'read-013',
    type: 'reading',
    difficulty: 'B1',
    topic: 'technology',
    passageId: 'passage-b1-1',
    subtype: 'main-idea',
    question: 'What is the main idea of this passage?',
    options: ['Anyone can learn to code with practice', 'Coding is only for young people', 'Coding is too difficult for most people', 'You need a degree to learn coding'],
    correctIndex: 0,
    explanation: 'The passage argues that people of all ages can learn coding and explains how to start.'
  },
  {
    id: 'read-014',
    type: 'reading',
    difficulty: 'B1',
    topic: 'technology',
    passageId: 'passage-b1-1',
    subtype: 'detail',
    question: 'What does the passage suggest as a first step in learning to code?',
    options: ['Buy an expensive computer', 'Take a university course', 'Start with simple projects like a website or game', 'Learn five programming languages'],
    correctIndex: 2,
    explanation: 'The passage says: "Start with simple projects, like building a small website or a basic game."'
  },
  {
    id: 'read-015',
    type: 'reading',
    difficulty: 'B1',
    topic: 'technology',
    passageId: 'passage-b1-1',
    subtype: 'detail',
    question: 'According to the passage, coding helps you think logically and solve problems step by step. In what other area is coding useful?',
    options: ['Only in technology companies', 'In many jobs today', 'Only in schools', 'Only in scientific research'],
    correctIndex: 1,
    explanation: 'The passage states: "It is also a useful skill in many jobs today, not just in technology companies."'
  },
  {
    id: 'read-016',
    type: 'reading',
    difficulty: 'B1',
    topic: 'community',
    passageId: 'passage-b1-2',
    subtype: 'detail',
    question: 'When did the neighbourhood start the community garden?',
    options: ['Last spring', 'Last winter', 'Last summer', 'Last autumn'],
    correctIndex: 0,
    explanation: 'The passage states: "Our neighbourhood started a community garden last spring."'
  },
  {
    id: 'read-017',
    type: 'reading',
    difficulty: 'B1',
    topic: 'community',
    passageId: 'passage-b1-2',
    subtype: 'inference',
    question: 'What can we infer about the gardens effect on the neighbourhood?',
    options: ['It made people more competitive', 'It only attracted young people', 'It caused disagreements about land use', 'It helped neighbours connect and build relationships'],
    correctIndex: 3,
    explanation: 'The passage says the garden "brought people together who had never spoken before" and won an award for "making the community stronger."'
  },
  {
    id: 'read-018',
    type: 'reading',
    difficulty: 'B1',
    topic: 'community',
    passageId: 'passage-b1-2',
    subtype: 'detail',
    question: 'What recognition did the garden receive?',
    options: ['A national television feature', 'A newspaper front page', 'A government grant', 'A local award'],
    correctIndex: 3,
    explanation: 'The passage states: "the garden had won a local award for making the community stronger."'
  },
  {
    id: 'read-019',
    type: 'reading',
    difficulty: 'B2',
    topic: 'environment',
    passageId: 'passage-b2-1',
    subtype: 'main-idea',
    question: 'What is the main problem described in this passage?',
    options: ['Clothes are too expensive', 'Clothing factories pay workers too little', 'People do not buy enough clothes', 'Fast fashion harms the environment and creates waste'],
    correctIndex: 3,
    explanation: 'The passage focuses on the environmental impact of fast fashion, including waste, pollution, and resource use.'
  },
  {
    id: 'read-020',
    type: 'reading',
    difficulty: 'B2',
    topic: 'environment',
    passageId: 'passage-b2-1',
    subtype: 'detail',
    question: 'What do experts say is the most important change needed?',
    options: ['Governments should ban fast fashion', 'Consumers should buy fewer clothes and keep them longer', 'Factories should stop using water', 'People should only wear second-hand clothes'],
    correctIndex: 1,
    explanation: 'The passage states: "the biggest change must come from consumers, who need to buy fewer clothes and keep them for longer."'
  },
  {
    id: 'read-021',
    type: 'reading',
    difficulty: 'B2',
    topic: 'environment',
    passageId: 'passage-b2-1',
    subtype: 'vocabulary-in-context',
    question: 'What does the word "enormous" mean in the phrase "the environmental cost is enormous"?',
    options: ['Small', 'Average', 'Unknown', 'Very large'],
    correctIndex: 3,
    explanation: '"Enormous" means extremely large in size, amount, or degree.'
  },
  {
    id: 'read-022',
    type: 'reading',
    difficulty: 'B2',
    topic: 'education',
    passageId: 'passage-b2-2',
    subtype: 'main-idea',
    question: 'What does the passage argue about homework?',
    options: ['Homework is always beneficial', 'Homework should be banned completely', 'Homework is only useful for university students', 'The benefits of homework are more complicated than commonly believed'],
    correctIndex: 3,
    explanation: 'The passage presents evidence that the relationship between homework and success is "more complicated than previously thought."'
  },
  {
    id: 'read-023',
    type: 'reading',
    difficulty: 'B2',
    topic: 'education',
    passageId: 'passage-b2-2',
    subtype: 'detail',
    question: 'According to the passage, how much homework per night is beneficial for older students?',
    options: ['Less than thirty minutes', 'About one hour', 'Up to about two hours', 'Three to four hours'],
    correctIndex: 2,
    explanation: 'The passage states: "after about two hours per night, additional homework does not improve test scores."'
  },
  {
    id: 'read-024',
    type: 'reading',
    difficulty: 'B2',
    topic: 'education',
    passageId: 'passage-b2-2',
    subtype: 'inference',
    question: 'What do most researchers agree on regarding homework?',
    options: ['Students should never have homework', 'Longer homework assignments are better', 'The quality of homework matters more than the quantity', 'Parents should do homework with their children'],
    correctIndex: 2,
    explanation: 'The passage concludes: "most researchers agree that the quality of homework matters far more than the quantity."'
  },
  {
    id: 'read-025',
    type: 'reading',
    difficulty: 'C1',
    topic: 'psychology',
    passageId: 'passage-c1-1',
    subtype: 'detail',
    question: 'What are the three components of the habit loop?',
    options: ['Trigger, action, punishment', 'Cue, routine, reward', 'Thought, behaviour, result', 'Stimulus, response, reinforcement'],
    correctIndex: 1,
    explanation: 'The passage states the habit loop consists of "a cue triggers the behaviour, the routine follows, and a reward reinforces the pattern."'
  },
  {
    id: 'read-026',
    type: 'reading',
    difficulty: 'C1',
    topic: 'psychology',
    passageId: 'passage-c1-1',
    subtype: 'inference',
    question: 'Why does the passage mention replacing snacks with a short walk?',
    options: ['To show that exercise is always better than eating', 'To illustrate how habits can be changed by keeping the reward while replacing the routine', 'To recommend walking as the best form of exercise', 'To explain why people gain weight'],
    correctIndex: 1,
    explanation: 'The example demonstrates the principle of "identifying the cue and deliberately replacing the routine while keeping the same reward."'
  },
  {
    id: 'read-027',
    type: 'reading',
    difficulty: 'C1',
    topic: 'psychology',
    passageId: 'passage-c1-1',
    subtype: 'vocabulary-in-context',
    question: 'What does "automate" mean in the phrase "the brain begins to automate this sequence"?',
    options: ['Forget', 'Make automatic or operate without conscious thought', 'Speed up', 'Reverse'],
    correctIndex: 1,
    explanation: '"Automate" means to make a process operate automatically, without requiring conscious effort.'
  },
  {
    id: 'read-028',
    type: 'reading',
    difficulty: 'C1',
    topic: 'culture',
    passageId: 'passage-c1-2',
    subtype: 'main-idea',
    question: 'What is the passage mainly about?',
    options: ['The best cities for remote workers', 'The growing trend of digital nomads and its challenges', 'How to become a digital nomad', 'Why companies should allow remote work'],
    correctIndex: 1,
    explanation: 'The passage describes the digital nomad lifestyle, its appeal, and the challenges that come with it.'
  },
  {
    id: 'read-029',
    type: 'reading',
    difficulty: 'C1',
    topic: 'culture',
    passageId: 'passage-c1-2',
    subtype: 'detail',
    question: 'What challenges do digital nomads face according to the passage?',
    options: ['Poor internet connections everywhere', 'Difficulty maintaining relationships and navigating legal requirements', 'They cannot earn enough money', 'They are not allowed in most countries'],
    correctIndex: 1,
    explanation: 'The passage mentions challenges including maintaining friendships, time zone differences, and "tax and visa regulations" that "can create legal difficulties."'
  },
  {
    id: 'read-030',
    type: 'reading',
    difficulty: 'C1',
    topic: 'culture',
    passageId: 'passage-c1-2',
    subtype: 'detail',
    question: 'How are some cities responding to the growth of digital nomads?',
    options: ['By banning remote workers', 'By offering special visas and accommodation discounts', 'By increasing taxes on foreigners', 'By building more office buildings'],
    correctIndex: 1,
    explanation: 'The passage states: "some cities are now actively competing to attract them by offering special visas and discounts on accommodation."'
  }
];
