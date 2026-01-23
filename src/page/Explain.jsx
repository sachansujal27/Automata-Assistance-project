import React, { useState, useRef } from "react";

const Explain = () => {
  const contentRef = useRef(null);
  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <div ref={contentRef}>
      {/* ===== ALEX SPEAKER ===== */}
      <div className="alex-speaker">
        <div className="alex-avatar">👦</div>

        <button
          className="alex-btn"
          onClick={() => {
            const text = contentRef.current.innerText;
            const speech = new SpeechSynthesisUtterance(text);
            speech.rate = 0.95;
            speech.pitch = 1;
            speech.volume = 5;
            speech.onstart = () => setIsSpeaking(true);
            speech.onend = () => setIsSpeaking(false);
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(speech);
          }}
        >
          I explain you About DFA
        </button>
        <button className="alex-stop-btn" onClick={stopSpeech}>
          ⛔ Stop
        </button>
      </div>
      <div className="Main auto-left-right">
        <div className="Que1  ">
          <h2 className="an1">Detail about DFA ?</h2>
          <p className="an2">
            It works by moving between a finite number of states based on input
            symbols in a deterministic manner. DFA was introduced in 1959 by
            Michael O. Rabin and Dana Scott. The work was developed in the
            United States of America. DFA is a core concept of automata theory
            in computer science. It has no connection with religion, as it is
            purely scientific. DFA is mainly used to recognize regular
            languages. It is used in compiler design, especially in lexical
            analysis. DFA is also applied in pattern matching, networking
            protocols, and digital system design.
          </p>
        </div>

        <div className="Que1  ">
          <h2 className="an1">What is DFA?</h2>
          <p className="an2">
            A DFA is a mathematical model of computation used to recognize
            regular languages. It reads an input symbol by symbol and changes
            states deterministically, meaning there is only one possible move.
            <br></br>
            👉 Deterministic means: For each state and each input symbol, there
            is exactly one next state.
          </p>
        </div>

        <div className="Que2">
          <h2 className="an1">
            Formal Definition.Explanation of Each Component?
          </h2>
          <p className="an2">
            A DFA is defined as a 5 tuple: M equals Q, Sigma, delta, q zero, F.
            Q is the finite set of states. Sigma is the input alphabet. Delta is
            the transition function. q zero is the initial state. F is the set
            of final accepting states.
          </p>
        </div>
        <div className="Que3">
          <h2 className="an1">Step to Solve DFA?</h2>
          <p className="an2">
            <table border="1" cellPadding="8" cellSpacing="2">
              <tr>
                <th>Current State</th>
                <th>Input</th>
                <th>Next State(Answer)</th>
              </tr>
              <tr>
                <td>q0</td>
                <td>0</td>
                <td>q1</td>
              </tr>
              <tr>
                <td>q0</td>
                <td>1</td>
                <td>q0</td>
              </tr>
              <tr>
                <td>q1</td>
                <td>0</td>
                <td>q1</td>
              </tr>
              <tr>
                <td>q1</td>
                <td>1</td>
                <td>q2</td>
              </tr>
              <tr>
                <td>q2</td>
                <td>0</td>
                <td>q1</td>
              </tr>
              <tr>
                <td>q2</td>
                <td>1</td>
                <td>q0</td>
              </tr>
            </table>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explain;
