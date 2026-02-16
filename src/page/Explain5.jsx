import React, { useState, useRef } from "react";

const Explain5 = () => {
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
          I explain you About How DFA Diagram Maker work!
        </button>
        <button className="alex-stop-btn" onClick={stopSpeech}>
          ⛔ Stop
        </button>
      </div>
      <div className="Main4 auto-left-right">
        <div className="Que1  ">
          <h2 className="an1111">What is a DFA Diagram Maker ?</h2>
          <p className="an1112">
            A DFA Diagram Maker is a tool or application that allows users to
            input DFA components (states, alphabet, transitions, start state,
            and accept states) and automatically generate the DFA diagram and
            simulate input strings.
          </p>
        </div>

        <div className="Que1  ">
          <h2 className="an1111">
            What inputs are required to create a DFA diagram??
          </h2>
          <p className="an1112">
            Answer: The required inputs are: Set of states Input alphabet
            Transition function Start state Accept (final) states
          </p>
        </div>

        <div className="Que2">
          <h2 className="an1111">
            How does the user provide input in the DFA diagram maker
          </h2>
          <p className="an1112">
            The user provides input through: Text fields or forms for states and
            transitions Dropdowns or buttons for start and accept states An
            input string to test the DFA
          </p>
        </div>

        <div className="Que2">
          <h2 className="an1111">
            How is the DFA diagram generated from user input
          </h2>
          <p className="an1112">
            Answer: The system: Reads the user-defined states and transitions
            Validates the transition rules Converts them into nodes (states) and
            edges (transitions) Displays the DFA diagram visually
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explain5;
