import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Mainpage = () => {
  const navigate = useNavigate();

  const speak = (text, happy = true) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = happy ? 1 : 0.9;
    utterance.pitch = happy ? 1.2 : 0.8;
    utterance.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const goTo = (path, message) => {
    navigate(path);
    speak(message);
  };

  return (
    <div className="main-container">
      <div className="overlay">
        <h1 className="main-title">Automata Model & Simulator</h1>
        <p className="main-subtitle">
          Learn, Explore, Convert and Visualize Automata in a simple way
        </p>

        <div className="menu-row first-row">
          <div
            className="menu-card dfa"
            onClick={() => goTo("/Home", "Yes, I opened DFA now")}
          >
            <div className="icon">⚙️</div>
            <h2>DFA</h2>
            <p>Learn Deterministic Finite Automata with examples.</p>
          </div>

          <div
            className="menu-card nfa"
            onClick={() => goTo("/Home1", "Yes, I opened NFA now")}
          >
            <div className="icon">🧠</div>
            <h2>NFA</h2>
            <p>Understand Non-Deterministic Finite Automata easily.</p>
          </div>

          <div
            className="menu-card converter"
            onClick={() => goTo("/Home3", "Yes, I opened converter now")}
          >
            <div className="icon">🔀</div>
            <h2>NFA to DFA</h2>
            <p>Convert NFA to DFA step by step.</p>
          </div>
        </div>

        <div className="menu-row second-row">
          <div
            className="menu-card minimization"
            onClick={() => goTo("/Home4", "Yes, I opened minimization now")}
          >
            <div className="icon">📊</div>
            <h2>Minimization</h2>
            <p>Reduce DFA states and simplify automata.</p>
          </div>

          <div
            className="menu-card diagram"
            onClick={() => goTo("/Home5", "Yes, I opened DFA diagram now")}
          >
            <div className="icon">✂️</div>
            <h2>Diagram</h2>
            <p>Create and understand DFA diagrams visually.</p>
          </div>
        </div>

        <div className="bottom-btn-row">
          <Link to="/quiz" className="bottom-link">
            <button className="quiz-btn-style">Quiz 🎯</button>
          </Link>

          <Link to="/VideoPages" className="bottom-link">
            <button className="video-btn-style">Video 🎥</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
