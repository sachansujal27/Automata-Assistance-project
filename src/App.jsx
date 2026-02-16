import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Auto2 from "./page/Auto2";
import Explain from "./page/Explain";
import Auto from "./page/Auto";
import Home from "./page/Home";
import Home1 from "./page/Home1";
import Explain1 from "./page/Explain1";
import Auto1 from "./page/Auto1";
import Mainpage from "./page/Mainpage";
import Home3 from "./page/Home3";
import Explain3 from "./page/Explain3";
import Home4 from "./page/Home4";
import Explain4 from "./page/Explain4";
import Auto3 from "./page/Auto3";
import Home5 from "./page/Home5";
import DFAdiagram from "./page/DFAdiagram";
import Explain5 from "./page/Explain5";
import Signup from "./page/Signup";
import { Login } from "./page/Login";
import VideoPage from "./page/VideoPage";

function App() {
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  const navigate = useNavigate();

  // Alex speech
  const speak = (text, happy = true) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = happy ? 1 : 0.9;
    utterance.pitch = happy ? 1.2 : 0.8;
    utterance.volume = 1;
    window.speechSynthesis.cancel(); // cancel any current speech before speaking
    window.speechSynthesis.speak(utterance);
  };

  // Helper for navigation + speech
  const goTo = (path, message) => {
    navigate(path);
    speak(message);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-GB";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();
      console.log("Heard:", transcript);

      if (transcript.includes("stop")) {
        // STOP speaking immediately
        window.speechSynthesis.cancel();
        console.log("Speech stopped");
      } else if (transcript.includes("open dfa"))
        goTo("/Home", "Yes, I opened DFA now");
      else if (transcript.includes("open nfa"))
        goTo("/Home1", "Yes, I opened NFA now");
      else if (transcript.includes("converter"))
        goTo("/Home3", "Yes, I opened NFA to DFA converter now");
      else if (transcript.includes("diagram"))
        goTo("/Home5", "Yes, I opened DFA diagram now");
      else if (transcript.includes("minimization"))
        goTo("/Home4", "Yes, I opened DFA Minimization now");
      else if (
        transcript.includes("go back") ||
        transcript.includes("original page")
      )
        goTo("/Mainpage", "Yes, I opened the original page now");
    };

    recognition.onerror = (err) =>
      console.error("Speech recognition error:", err);

    recognition.start();
    return () => recognition.stop();
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/video" element={<VideoPage />} />

        <Route path="/Mainpage" element={<Mainpage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/explain" element={<Explain />} />
        <Route path="/Auto" element={<Auto />} />
        <Route path="/Home1" element={<Home1 />} />
        <Route path="/Explain1" element={<Explain1 />} />
        <Route path="/Auto1" element={<Auto1 />} />
        <Route path="/Home3" element={<Home3 />} />
        <Route path="/Explain3" element={<Explain3 />} />
        <Route path="/Auto2" element={<Auto2 />} />
        <Route path="/Home4" element={<Home4 />} />
        <Route path="/Explain4" element={<Explain4 />} />
        <Route path="/Auto3" element={<Auto3 />} />
        <Route path="/Home5" element={<Home5 />} />
        <Route path="/Explain5" element={<Explain5 />} />
        <Route path="/DFAdiagram" element={<DFAdiagram />} />
      </Routes>
    </>
  );
}

export default App;
