import React, { useState, useRef } from "react";

const Explain1 = () => {
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
          I explain you About NFA
        </button>
        <button className="alex-stop-btn" onClick={stopSpeech}>
          ⛔ Stop
        </button>
      </div>
      <div className="Main1 auto-left-right">
        <div className="Que1  ">
          <h2 className="an11">Detail about NFA ?</h2>
          <p className="an12">
            Non-Deterministic Finite Automaton (NFA) was introduced in the year
            1959. It was proposed by Michael O. Rabin and Dana Scott. The
            concept was developed in the United States of America. NFA is an
            important model in Theoretical Computer Science and Automata Theory.
            It is used to describe and recognize regular languages. In NFA, for
            a given state and input symbol, there may be multiple possible
            transitions. NFA can also include ε (epsilon) transitions, which do
            not consume any input symbol. Because of non-determinism, NFAs are
            often easier to design than DFAs. Every NFA has an equivalent DFA
            that recognizes the same language. NFAs are widely used in lexical
            analysis, pattern matching, and compiler design.
          </p>
        </div>

        <div className="Que1  ">
          <h2 className="an11">What is NFA?</h2>
          <p className="an12">
            In an NFA, for a given state and input symbol, the machine can move
            to one, many, or no next states. It can also use ε (epsilon)
            transitions, which allow the automaton to change states without
            consuming any input. An input string is accepted by an NFA if at
            least one possible path leads to an accepting (final) state after
            reading the entire string. Although NFAs are more flexible and
            easier to design than DFAs, every NFA can be converted into an
            equivalent DFA that accepts the same language.
          </p>
        </div>

        <div className="Que2">
          <h2 className="an11">
            Formal Definition.Explanation of Each Component?
          </h2>
          <p className="an12">
            Formal Definition of NFA A Non-Deterministic Finite Automaton (NFA)
            is formally defined as a 5-tuple: 𝑀 = ( 𝑄 , Σ , 𝛿 , 𝑞 0 , 𝐹 )
            M=(Q,Σ,δ,q 0 ​ ,F).Q (Set of States) Q is a finite set of states of
            the automaton. Each state represents a condition or position of the
            machine during computation. Σ (Input Alphabet) Σ is a finite set of
            input symbols. These symbols are the characters that the automaton
            reads from the input string.δ is the transition function of the NFA.
            It defines how the automaton moves from one state to one or more
            next states.q₀ is the initial state where the automaton begins
            processing the input string. F (Final States) F is a set of
            accepting (final) states. If any one path of the NFA ends in a state
            from F after reading the input, the string is accepted.
          </p>
        </div>
        <div className="Que3">
          <h2 className="an11">Step to Solve DFA?</h2>
          <p className="an12">
            Understand the Problem Read the problem carefully and identify: The
            input alphabet (Σ) The condition for acceptance (for example:
            strings ending with 01, even number of 0s, etc.) 2️⃣ Define the
            States Create states that represent the progress of the condition.
            Each state should indicate what has been read so far. 3️⃣ Identify
            the Start State Choose the state from which the DFA will begin
            reading the input string. This is called the initial state (q₀). 4️⃣
            Define the Final (Accepting) States Mark the states where the input
            string satisfies the given condition. These are the accepting states
            (F). 5️⃣ Draw the Transition Diagram For each state and each input
            symbol, draw exactly one transition. This is important because a DFA
            is deterministic. 6️⃣ Create the Transition Table Convert the diagram
            into a table showing: Current state Input symbol Next state 7️⃣ Check
            Determinism Make sure: There is only one transition per input symbol
            from each state No ε-transitions are present 8️⃣ Test the DFA with
            Sample Strings Run sample input strings step by step: If the final
            state is accepting → Accepted Otherwise → Rejected
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explain1;
