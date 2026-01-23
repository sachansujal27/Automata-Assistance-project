import React from "react";
import { useNavigate } from "react-router-dom";

const Mainpage = () => {
  const navigate = useNavigate();

  // // Alex speech
  // const speak = (text, happy = true) => {
  //   if (!window.speechSynthesis) return;
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.rate = happy ? 1 : 0.9;
  //   utterance.pitch = happy ? 1.2 : 0.8;
  //   utterance.volume = 1;
  //   window.speechSynthesis.cancel();
  //   window.speechSynthesis.speak(utterance);
  // };

  // // Helper for navigation + speech
  // const goTo = (path, message) => {
  //   navigate(path);
  //   speak(message);
  // };

  // useEffect(() => {
  //   const SpeechRecognition =
  //     window.SpeechRecognition || window.webkitSpeechRecognition;
  //   if (!SpeechRecognition) return;

  //   const recognition = new SpeechRecognition();
  //   recognition.continuous = true;
  //   recognition.interimResults = false;
  //   recognition.lang = "en-US";

  //   recognition.onresult = (event) => {
  //     const transcript = event.results[event.results.length - 1][0].transcript
  //       .toLowerCase()
  //       .trim();
  //     console.log("Heard:", transcript);

  //     if (transcript.includes("open dfa"))
  //       goTo("/Home", "Yes, I opened DFA now");
  //     else if (transcript.includes("open nfa"))
  //       goTo("/Home1", "Yes, I opened NFA now");
  //     else if (transcript.includes("converter"))
  //       goTo("/Home3", "Yes, I opened NFA to DFA converter now");
  //     else if (transcript.includes("minimization"))
  //       goTo("/Home4", "Yes, I opened DFA Minimization now");
  //     else if (
  //       transcript.includes("go back") ||
  //       transcript.includes("original page")
  //     )
  //       goTo("/", "Yes, I opened the original page now");
  //   };

  //   recognition.onerror = (err) =>
  //     console.error("Speech recognition error:", err);

  //   recognition.start();
  //   return () => recognition.stop();
  // }, [navigate]);

  return (
    <div className="container">
      <div className="menu">
        <div
          className="menu-item dfa"
          onClick={() => goTo("/Home", "Yes, I opened DFA now")}
        >
          DFA <span>⚙️</span>
        </div>
        <div
          className="menu-item nfa"
          onClick={() => goTo("/Home1", "Yes, I opened NFA now")}
        >
          NFA <span>⚙️</span>
        </div>
        <div
          className="menu-item tm"
          onClick={() =>
            goTo("/Home3", "Yes, I opened NFA to DFA converter now")
          }
        >
          Converter NFA to DFA <span>🔀</span>
        </div>
        <div
          className="menu-item compare"
          onClick={() => goTo("/Home4", "Yes, I opened DFA Minimization now")}
        >
          DFA Minimization <span>📊</span>
        </div>
        <div className="menu-item min">
          DFA Minimization Tool <span>✂️</span>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Mainpage = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className="container">
//         <div className="menu">
//           <div
//             className="menu-item dfa"
//             onClick={() => navigate("/Home")}
//             style={{ cursor: "pointer" }}
//           >
//             DFA <span>⚙️</span>
//           </div>
//           <div
//             className="menu-item nfa"
//             onClick={() => navigate("/Home1")}
//             style={{ cursor: "pointer" }}
//           >
//             NFA <span>⚙️</span>
//           </div>
//           <div
//             className="menu-item tm"
//             onClick={() => navigate("/Home3")}
//             style={{ cursor: "pointer" }}
//           >
//             Converter NFA to DFA <span>🔀</span>
//           </div>
//           <div
//             className="menu-item compare"
//             onClick={() => navigate("/Home4")}
//             style={{ cursor: "pointer" }}
//           >
//             DFA MInimization <span>📊</span>
//           </div>

//           <div className="menu-item min">
//             DFA Minimization Tool <span>✂️</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Mainpage;
