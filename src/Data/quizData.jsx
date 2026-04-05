const QuizData = [
  {
    id: 1,
    question: "What does DFA stand for?",
    options: {
      A: "Deterministic Finite Automata",
      B: "Dynamic Flow Automata",
      C: "Data Form Automata",
      D: "Digital Finite Analysis",
    },
    correctAnswer: "A",
  },
  {
    id: 2,
    question: "Which automata can have epsilon transitions?",
    options: {
      A: "Only DFA",
      B: "Only NFA",
      C: "Both DFA and NFA",
      D: "None",
    },
    correctAnswer: "B",
  },
  {
    id: 3,
    question:
      "In DFA, for each input symbol from a state there are how many transitions?",
    options: {
      A: "Zero",
      B: "One",
      C: "Two",
      D: "Many",
    },
    correctAnswer: "B",
  },
  {
    id: 4,
    question: "NFA stands for?",
    options: {
      A: "Normal Finite Automata",
      B: "New Formal Automata",
      C: "Non-deterministic Finite Automata",
      D: "Node Finite Automata",
    },
    correctAnswer: "C",
  },
  {
    id: 5,
    question: "Which automata is easier to implement in code?",
    options: {
      A: "DFA",
      B: "NFA",
      C: "Both are impossible",
      D: "Pushdown Automata",
    },
    correctAnswer: "A",
  },
];

export default QuizData;
