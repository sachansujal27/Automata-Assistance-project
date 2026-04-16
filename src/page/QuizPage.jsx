import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const QuizPage = () => {
  const quizData = [
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
        "In DFA, for each input symbol from one state there are how many transitions?",
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
      question: "Which automata is easier to implement directly?",
      options: {
        A: "DFA",
        B: "NFA",
        C: "Both same",
        D: "None",
      },
      correctAnswer: "A",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const currentQuestion = quizData[currentQuestionIndex];

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const speakQuestion = () => {
    if (!currentQuestion) return;

    const text = `Question ${currentQuestionIndex + 1}. ${
      currentQuestion.question
    }. Option A ${currentQuestion.options.A}. Option B ${
      currentQuestion.options.B
    }. Option C ${currentQuestion.options.C}. Option D ${
      currentQuestion.options.D
    }.`;
    speak(text);
  };

  const detectOption = (text) => {
    const cleaned = text.toLowerCase().trim();

    if (
      cleaned.includes("option a") ||
      cleaned === "a" ||
      cleaned === "a." ||
      cleaned.includes("answer a")
    ) {
      return "A";
    }

    if (
      cleaned.includes("option b") ||
      cleaned === "b" ||
      cleaned === "b." ||
      cleaned.includes("answer b")
    ) {
      return "B";
    }

    if (
      cleaned.includes("option c") ||
      cleaned === "c" ||
      cleaned === "c." ||
      cleaned.includes("answer c")
    ) {
      return "C";
    }

    if (
      cleaned.includes("option d") ||
      cleaned === "d" ||
      cleaned === "d." ||
      cleaned.includes("answer d")
    ) {
      return "D";
    }

    return null;
  };

  const checkAnswer = (answer) => {
    if (answered || quizFinished) return;

    setAnswered(true);
    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      setResultMessage("✅ Correct Answer");
      speak("Correct answer");
    } else {
      setResultMessage(
        `❌ Wrong Answer. Correct answer is ${currentQuestion.correctAnswer}`,
      );
      speak(
        `Wrong answer. Correct answer is option ${currentQuestion.correctAnswer}`,
      );
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer("");
      setResultMessage("");
      setAnswered(false);
    } else {
      setQuizFinished(true);
      setResultMessage(
        `🎉 Quiz Finished! Your score is ${score} / ${quizData.length}`,
      );
      speak(
        `Quiz completed. Your final score is ${score} out of ${quizData.length}`,
      );
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setResultMessage("");
    setScore(0);
    setAnswered(false);
    setQuizFinished(false);
    speak("Quiz restarted");
  };

  useEffect(() => {
    speakQuestion();
  }, [currentQuestionIndex]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      console.log("Heard:", transcript);

      const detected = detectOption(transcript);

      if (detected) {
        checkAnswer(detected);
      } else if (transcript.includes("repeat question")) {
        speakQuestion();
      } else if (transcript.includes("next")) {
        nextQuestion();
      } else if (transcript.includes("restart")) {
        restartQuiz();
      } else if (transcript.includes("stop")) {
        window.speechSynthesis.cancel();
      } else {
        speak(
          "Please say option A, option B, option C, option D, next, or repeat question",
        );
      }
    };

    recognition.onerror = (event) => {
      console.log("Speech error:", event.error);
      setListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, [currentQuestionIndex, answered, quizFinished, score, selectedAnswer]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-wrapper">
        <h1 className="quiz-main-title">🎤 Voice Quiz System</h1>
        <p className="quiz-subtitle">
          Say Option A, Option B, Option C, Option D
        </p>

        <div className="quiz-top-row">
          <Link to="/Mainpage" className="quiz-back-btn">
            ⬅ Back
          </Link>

          <div className="quiz-score-box">Score: {score}</div>
        </div>

        {!quizFinished ? (
          <>
            <div className="quiz-card">
              <h2 className="quiz-question">
                Q{currentQuestionIndex + 1}. {currentQuestion.question}
              </h2>

              <div className="quiz-options-grid">
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => checkAnswer(key)}
                    className={
                      selectedAnswer === key
                        ? "quiz-option-btn selected-option"
                        : "quiz-option-btn"
                    }
                  >
                    {key}. {value}
                  </button>
                ))}
              </div>

              {resultMessage && (
                <div className="quiz-result-message">{resultMessage}</div>
              )}
            </div>

            <div className="quiz-button-row">
              <button className="quiz-btn btn-indigo" onClick={speakQuestion}>
                🔊 Repeat Question
              </button>

              <button className="quiz-btn btn-pink" onClick={startListening}>
                {listening ? "🎙 Listening..." : "🎙 Speak Answer"}
              </button>

              <button className="quiz-btn btn-green" onClick={nextQuestion}>
                Next Question
              </button>

              <button className="quiz-btn btn-yellow" onClick={restartQuiz}>
                🔄 Restart
              </button>
            </div>

            <div className="quiz-voice-help">
              Voice commands: <b>Option A</b>, <b>Option B</b>, <b>Option C</b>,{" "}
              <b>Option D</b>, <b>Next</b>, <b>Repeat Question</b>,{" "}
              <b>Restart</b>
            </div>
          </>
        ) : (
          <div className="quiz-finish-box">
            <h2 className="quiz-finish-title">🎉 Quiz Completed</h2>
            <p className="quiz-finish-score">
              Your Score: <span>{score}</span> / {quizData.length}
            </p>

            <div className="quiz-button-row">
              <button className="quiz-btn btn-blue" onClick={restartQuiz}>
                Restart Quiz
              </button>

              <Link to="/Mainpage" className="quiz-home-btn">
                Go Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
