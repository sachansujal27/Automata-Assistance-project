import React, { useState, useRef, useEffect } from "react";

const Explain4 = () => {
  const contentRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Access global recognition
  const getRecognition = () => window.recognitionInstance;

  const handleSpeak = () => {
    const text = contentRef.current.innerText;

    // 🔴 Stop mic while speaking
    if (getRecognition()) {
      getRecognition().stop();
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
      window.isExplainSpeaking = true; // block App commands
    };

    speech.onend = () => {
      setIsSpeaking(false);
      window.isExplainSpeaking = false;

      // 🔓 Restart mic
      if (getRecognition()) {
        getRecognition().start();
      }
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    window.isExplainSpeaking = false;

    // 🔓 Restart mic
    if (getRecognition()) {
      getRecognition().start();
    }
  };

  // ✅ STOP when leaving page (VERY IMPORTANT)
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      window.isExplainSpeaking = false;

      if (getRecognition()) {
        getRecognition().start();
      }
    };
  }, []);

  return (
    <div ref={contentRef}>
      {/* ===== ALEX SPEAKER ===== */}
      <div className="alex-speaker">
        <div className="alex-avatar">👦</div>

        <button className="alex-btn" onClick={handleSpeak}>
          I explain you About How Minimization work!
        </button>

        <button className="alex-stop-btn" onClick={stopSpeech}>
          ⛔ Stop
        </button>
      </div>

      <div className="Main3 auto-left-right">
        {/* ===== SECTION 1 ===== */}
        <div className="Que1">
          <h2 className="an111">What is DFA minimization?</h2>
          <p className="an112">
            DFA minimization is the process of converting a given deterministic
            finite automaton (DFA) into an equivalent DFA that has the minimum
            number of states, while accepting the same language.
          </p>
        </div>

        {/* ===== SECTION 2 ===== */}
        <div className="Que1">
          <h2 className="an111">Steps of DFA minimization</h2>
          <p className="an112">
            Remove unreachable states. Identify distinguishable states. Merge
            equivalent states. Construct minimized DFA.
          </p>
        </div>

        {/* ===== SECTION 3 ===== */}
        <div className="Que2">
          <h2 className="an111">Reachable vs Unreachable states</h2>
          <p className="an112">
            Reachable states can be accessed from start state. Unreachable
            states cannot be accessed and should be removed.
          </p>
        </div>

        {/* ===== EXTRA CONTENT ===== */}
        <div className="Que1">
          <h2 className="an111">Why Minimization is Important?</h2>
          <p className="an112">
            Minimization reduces complexity, saves memory, and improves the
            performance of automata. It is useful in compiler design and pattern
            matching.
          </p>
        </div>

        <div className="Que2">
          <h2 className="an111">Equivalent States</h2>
          <p className="an112">
            Two states are equivalent if for every input they produce the same
            result. These states can be merged into one.
          </p>
        </div>

        <div className="Que1">
          <h2 className="an111">Applications</h2>
          <p className="an112">
            DFA minimization is used in compiler design, text processing,
            pattern recognition, and digital system design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explain4;

// import React, { useState, useRef } from "react";

// const Explain4 = () => {
//   const contentRef = useRef(null);
//   const stopSpeech = () => {
//     window.speechSynthesis.cancel();
//   };
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   return (
//     <div ref={contentRef}>
//       {/* ===== ALEX SPEAKER ===== */}
//       <div className="alex-speaker">
//         <div className="alex-avatar">👦</div>

//         <button
//           className="alex-btn"
//           onClick={() => {
//             const text = contentRef.current.innerText;
//             const speech = new SpeechSynthesisUtterance(text);
//             speech.rate = 0.95;
//             speech.pitch = 1;
//             speech.volume = 5;
//             speech.onstart = () => setIsSpeaking(true);
//             speech.onend = () => setIsSpeaking(false);
//             window.speechSynthesis.cancel();
//             window.speechSynthesis.speak(speech);
//           }}
//         >
//           I explain you About How Minimization work!
//         </button>
//         <button className="alex-stop-btn" onClick={stopSpeech}>
//           ⛔ Stop
//         </button>
//       </div>
//       <div className="Main3 auto-left-right">
//         <div className="Que1  ">
//           <h2 className="an111">What is DFA minimization? ?</h2>
//           <p className="an112">
//             DFA minimization is the process of converting a given deterministic
//             finite automaton (DFA) into an equivalent DFA that has the minimum
//             number of states, while accepting the same language. The minimized
//             DFA is unique (up to renaming of states). It reduces complexity and
//             helps in optimization of finite automata.
//           </p>
//         </div>

//         <div className="Que1  ">
//           <h2 className="an111">
//             What are the main steps of DFA minimization??
//           </h2>
//           <p className="an112">
//             The standard method (table-filling method) has these steps: Remove
//             unreachable states – states that cannot be reached from the start
//             state. Distinguish states – identify pairs of states that are
//             distinguishable (do not behave the same for all input strings).
//             Merge indistinguishable states – states that are equivalent are
//             combined into a single state. Construct minimized DFA – using merged
//             states and transitions.
//           </p>
//         </div>

//         <div className="Que2">
//           <h2 className="an111">
//             Explain the difference between reachable and unreachable states in
//             DFA minimization.?
//           </h2>
//           <p className="an112">
//             Reachable states: Can be reached from the start state using some
//             input string. Unreachable states: Cannot be reached from the start
//             state; they do not affect the language and should be removed before
//             minimization.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Explain4;
