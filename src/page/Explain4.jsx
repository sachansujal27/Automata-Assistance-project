import React, { useState, useRef } from "react";

const Explain4 = () => {
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
          I explain you About How Minimization work!
        </button>
        <button className="alex-stop-btn" onClick={stopSpeech}>
          ⛔ Stop
        </button>
      </div>
      <div className="Main3 auto-left-right">
        <div className="Que1  ">
          <h2 className="an111">What is DFA minimization? ?</h2>
          <p className="an112">
            DFA minimization is the process of converting a given deterministic
            finite automaton (DFA) into an equivalent DFA that has the minimum
            number of states, while accepting the same language. The minimized
            DFA is unique (up to renaming of states). It reduces complexity and
            helps in optimization of finite automata.
          </p>
        </div>

        <div className="Que1  ">
          <h2 className="an111">
            What are the main steps of DFA minimization??
          </h2>
          <p className="an112">
            The standard method (table-filling method) has these steps: Remove
            unreachable states – states that cannot be reached from the start
            state. Distinguish states – identify pairs of states that are
            distinguishable (do not behave the same for all input strings).
            Merge indistinguishable states – states that are equivalent are
            combined into a single state. Construct minimized DFA – using merged
            states and transitions.
          </p>
        </div>

        <div className="Que2">
          <h2 className="an111">
            Explain the difference between reachable and unreachable states in
            DFA minimization.?
          </h2>
          <p className="an112">
            Reachable states: Can be reached from the start state using some
            input string. Unreachable states: Cannot be reached from the start
            state; they do not affect the language and should be removed before
            minimization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explain4;
