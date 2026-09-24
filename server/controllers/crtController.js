import CRT from '../models/CRT.js';

const fallbackCRTModules = [
  {
    _id: 'crt_01',
    moduleName: 'Quantitative Aptitude',
    title: 'Advanced Numerical Aptitude & Data Interpretation',
    description: 'Master high-yield quantitative problem solving: Percentages, Profit & Loss, Time & Work, Speed Distance, Permutations & Combinations, and Probability.',
    trainer: {
      name: 'Er. Sandeep Verma',
      designation: 'Lead Quant Specialist & CAT 99.8%iler',
      experience: '12 Years Training Experience',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    },
    schedule: {
      day: 'Saturdays',
      time: '09:00 AM - 12:00 PM',
      venue: 'Auditorium Hall B & Live Stream',
      mode: 'Hybrid',
    },
    topicsCovered: [
      'Number Systems & Divisibility Shortcuts',
      'Time, Work, Pipes & Cisterns',
      'Time, Speed & Distance / Train & Boats',
      'Permutations, Combinations & Probability',
      'Data Interpretation: Bar, Pie, Radar Charts',
    ],
    mockTests: [
      {
        testTitle: 'Speed Math & Arithmetic Mastery Sprint',
        durationMinutes: 20,
        totalQuestions: 5,
        difficulty: 'Medium',
        questions: [
          {
            question: 'A and B together can complete a software module in 12 days. B alone can do it in 30 days. In how many days can A alone complete it?',
            options: ['18 days', '20 days', '24 days', '25 days'],
            correctAnswer: 1,
            explanation: 'Work rate of (A+B) = 1/12. Rate of B = 1/30. Rate of A = 1/12 - 1/30 = (5-2)/60 = 3/60 = 1/20. Thus A alone takes 20 days.',
          },
          {
            question: 'In how many different ways can the letters of the word "CAMPUS" be arranged so that the vowels always come together?',
            options: ['120', '240', '720', '360'],
            correctAnswer: 1,
            explanation: 'Vowels are A, U (2 vowels). Group them as one block: (AU), C, M, P, S. That is 5 units arranged in 5! = 120 ways. Inside the block, A and U can arrange in 2! = 2 ways. Total = 120 * 2 = 240 ways.',
          },
          {
            question: 'Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is:',
            options: ['1:3', '3:2', '3:4', '2:3'],
            correctAnswer: 1,
            explanation: 'Using alligation: (23-17) : (27-23) = 6 : 4 = 3 : 2.',
          },
          {
            question: 'A box contains 5 red balls, 4 green balls, and 3 blue balls. If two balls are drawn at random, what is the probability that both are red?',
            options: ['5/33', '10/33', '1/6', '5/66'],
            correctAnswer: 0,
            explanation: 'P = 5C2 / 12C2 = 10 / 66 = 5 / 33.',
          },
          {
            question: 'If 20% of a number is equal to two-third of another number, what is the ratio of the first number to the second number?',
            options: ['2:5', '3:7', '10:3', '7:3'],
            correctAnswer: 2,
            explanation: '0.20 * X = (2/3) * Y => (1/5) * X = (2/3) * Y => X/Y = (2/3) * 5 = 10/3.',
          },
        ],
      },
    ],
    companyPrepKits: [
      {
        company: 'TCS NQT Quant',
        pattern: '20 Questions, 40 Minutes, Negative Marking: No',
        rounds: ['Foundation Section', 'Advanced Section'],
        tips: 'Focus heavily on Statistics, Standard Deviation, and Geometry.',
      },
    ],
  },
  {
    _id: 'crt_02',
    moduleName: 'Technical & Coding',
    title: 'Data Structures, Algorithms & Leetcode Interview Sprints',
    description: 'Cracking top product company interviews: Arrays, Two Pointers, Dynamic Programming, Graphs, System Design fundamentals, and SQL optimization.',
    trainer: {
      name: 'Prof. Vikram Sen & Ex-Amazon SDE Mentor',
      designation: 'Competitive Programming Lead',
      experience: 'Codeforces 2100+ & Distributed Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    },
    schedule: {
      day: 'Sundays',
      time: '10:00 AM - 01:30 PM',
      venue: 'Turing Advanced Coding Lab & Online IDE',
      mode: 'Hybrid',
    },
    topicsCovered: [
      'Sliding Window & Two Pointer Patterns',
      'Tree Traversals, LCA, Trie & Segment Trees',
      'Graph BFS/DFS, Dijkstra, Topological Sort',
      '0/1 Knapsack, LCS, LIS Dynamic Programming',
      'System Design: Scalability, Caching & Sharding',
    ],
    mockTests: [
      {
        testTitle: 'DSA Blitz: Graphs & Dynamic Programming',
        durationMinutes: 25,
        totalQuestions: 4,
        difficulty: 'Hard',
        questions: [
          {
            question: 'What is the time complexity of finding strongly connected components using Tarjan algorithm on a directed graph with V vertices and E edges?',
            options: ['O(V^2)', 'O(V + E)', 'O(V * E)', 'O(E log V)'],
            correctAnswer: 1,
            explanation: 'Tarjan algorithm performs a single depth-first search traversal, visiting each vertex and edge once. Time complexity is O(V + E).',
          },
          {
            question: 'Which algorithmic paradigm does the Floyd-Warshall all-pairs shortest path algorithm employ?',
            options: ['Greedy Approach', 'Divide and Conquer', 'Dynamic Programming', 'Backtracking'],
            correctAnswer: 2,
            explanation: 'Floyd-Warshall computes dist[i][j] by trying all intermediate vertices k via dynamic programming with recurrence dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).',
          },
          {
            question: 'In an LRU cache implementation, which pair of data structures yields O(1) get and put operations?',
            options: ['Binary Search Tree + Array', 'Doubly Linked List + Hash Map', 'Queue + Stack', 'Min-Heap + Hash Set'],
            correctAnswer: 1,
            explanation: 'Hash map gives O(1) key-to-node lookup, and Doubly Linked List gives O(1) removal and insertion to the head/tail.',
          },
          {
            question: 'What is the worst-case space complexity of recursive Depth First Search on a general graph with V vertices?',
            options: ['O(1)', 'O(log V)', 'O(V)', 'O(V^2)'],
            correctAnswer: 2,
            explanation: 'In the worst case (a degenerate straight path graph), the call stack depth is equal to V, taking O(V) space.',
          },
        ],
      },
    ],
    companyPrepKits: [
      {
        company: 'Microsoft Online Assessment',
        pattern: '2 Coding Problems, 70 Minutes, Codility Platform',
        rounds: ['OA', 'Technical Interview 1', 'Technical Interview 2', 'As-Appropriate'],
        tips: 'Edge cases matter heavily. Write clean modular code with zero global state.',
      },
    ],
  },
  {
    _id: 'crt_03',
    moduleName: 'Logical Reasoning',
    title: 'Analytical & Critical Reasoning Masterclass',
    description: 'Sharpen your pattern recognition and logical deduction skills for recruitment aptitude rounds: Blood Relations, Syllogisms, Seating Arrangements, Coding-Decoding.',
    trainer: {
      name: 'Ms. Radhika Nair',
      designation: 'Corporate Verbal & Reasoning Coach',
      experience: '9 Years Training Experience',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    },
    schedule: {
      day: 'Wednesdays',
      time: '04:30 PM - 06:30 PM',
      venue: 'Classroom C-201',
      mode: 'Offline',
    },
    topicsCovered: [
      'Circular & Linear Seating Arrangements',
      'Coded Blood Relations & Family Trees',
      'Syllogisms (Venn Diagrams & 100-50 Rule)',
      'Direction Sense & Distance Trajectories',
      'Input-Output Machine Shuffling Logic',
    ],
    mockTests: [
      {
        testTitle: 'Reasoning Challenge: Puzzles & Syllogisms',
        durationMinutes: 15,
        totalQuestions: 3,
        difficulty: 'Medium',
        questions: [
          {
            question: 'Statements: All laptops are screens. Some screens are keyboards. Conclusions: I. Some laptops are keyboards. II. No laptop is a keyboard.',
            options: ['Only I follows', 'Only II follows', 'Either I or II follows', 'Neither I nor II follows'],
            correctAnswer: 2,
            explanation: 'Since laptop and keyboard have no direct relation, both individual conclusions are indeterminate, but they form a complementary pair (Some + No) with the same subject and predicate. Hence Either I or II follows.',
          },
          {
            question: 'Pointing to a photograph, a woman says: "His mother is the only daughter of my mother." How is the woman related to the person in the photograph?',
            options: ['Mother', 'Sister', 'Aunt', 'Daughter'],
            correctAnswer: 0,
            explanation: 'The woman says "only daughter of my mother", which is the woman herself. Therefore, his mother is the woman. She is the mother.',
          },
          {
            question: 'If "CLOUD" is coded as "ENQWF", how will "RAINY" be coded under the same cipher rule?',
            options: ['TCKPA', 'UDLPA', 'TCKPB', 'UBKPA'],
            correctAnswer: 0,
            explanation: 'C(+2)=E, L(+2)=N, O(+2)=Q, U(+2)=W, D(+2)=F. Apply +2 to RAINY: R(+2)=T, A(+2)=C, I(+2)=K, N(+2)=P, Y(+2)=A. Result: TCKPA.',
          },
        ],
      },
    ],
    companyPrepKits: [
      {
        company: 'Infosys SP / DSE Reasoning',
        pattern: '15 Questions, 25 Minutes',
        rounds: ['Logical Reasoning', 'Pseudocode Evaluation', 'Puzzle Solving'],
        tips: 'Draw matrices for seating arrangement questions to save time.',
      },
    ],
  },
  {
    _id: 'crt_04',
    moduleName: 'Soft Skills & Group Discussion',
    title: 'HR Rounds, Technical Debates & Corporate Communication',
    description: 'Polish your articulation, body language, elevator pitch, and master group discussion strategies for campus tier-1 selection.',
    trainer: {
      name: 'Dr. Anjali Sen',
      designation: 'Dean of Student Affairs & Corporate Communication',
      experience: '15 Years Corporate Leadership',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    },
    schedule: {
      day: 'Fridays',
      time: '03:30 PM - 05:30 PM',
      venue: 'Executive Boardroom 1',
      mode: 'Offline',
    },
    topicsCovered: [
      'Elevator Pitch: "Tell Me About Yourself" in 90 Seconds',
      'STAR Technique for Behavioral Interview Questions',
      'Group Discussion: Entry, Consensus Building, and Countering',
      'Salary Negotiation & Professional Email Etiquette',
    ],
    mockTests: [],
    companyPrepKits: [],
  },
];

export const getCRTModules = async (req, res) => {
  try {
    let modules = await CRT.find();
    if (!modules || modules.length === 0) {
      modules = fallbackCRTModules;
    }
    res.json({ success: true, count: modules.length, data: modules });
  } catch (error) {
    res.json({ success: true, count: fallbackCRTModules.length, data: fallbackCRTModules });
  }
};
