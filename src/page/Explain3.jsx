import React, { useState, useRef } from "react";

const Explain3 = () => {
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
          I explain you About How Converter work!
        </button>
        <button className="alex-stop-btn" onClick={stopSpeech}>
          ⛔ Stop
        </button>
      </div>
      <div className="Main2 auto-left-right">
        <div className="Que1  ">
          <h2 className="an21">Steps to Convert NFA → DFA ?</h2>
          <p className="an22">
            Step 1: Start with ε-closure ε-closure(state): The set of all states
            reachable from state using only ε-transitions. For an NFA with
            ε-transitions, first compute ε-closure for each state. Step 2: Start
            State of DFA Take the ε-closure of NFA's start state. This becomes
            the start state of DFA. Step 3: Process Each Input Symbol For each
            DFA state (which is a set of NFA states): For input symbol a: Find
            all NFA states reachable from any state in this set on a. Then take
            ε-closure of all those states. This gives a new DFA state. Repeat
            for all input symbols and for all new DFA states generated. Step 4:
            Accepting States Any DFA state that contains at least one NFA
            accepting state becomes an accepting state in the DFA. Step 5: Draw
            DFA List all DFA states as sets of NFA states. Draw transitions
            according to step 3.
          </p>
        </div>

        <div className="Que1  ">
          <h2 className="an21">NFA (Non-deterministic Finite Automaton)?</h2>
          <p className="an22">
            A finite automaton where: From a given state, an input symbol may
            lead to multiple states. It may also have ε-transitions (move
            without input symbol).
          </p>
        </div>

        <div className="Que2">
          <h2 className="an21">DFA (Deterministic Finite Automaton)?</h2>
          <p className="an22">
            A finite automaton where: From a given state, each input symbol
            leads to exactly one state. No ε-transitions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explain3;
