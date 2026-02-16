import React, { useState } from "react";

const transitions = {
  q0: { 0: "q1", 1: "q0" },
  q1: { 0: "q1", 1: "q2" },
  q2: { 0: "q3", 1: "q0" },
};

const acceptState = "q2";

/* ================= ALEX SPEECH ================= */

const speak = (text, happy = true) => {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = happy ? 1 : 0.9;
  utterance.pitch = happy ? 1.2 : 0.8;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

/* ================= APP ================= */

export default function Auto() {
  const [input, setInput] = useState("");
  const [path, setPath] = useState([]);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState("");
  const [explanation, setExplanation] = useState("");

  /* -------- Start Simulation -------- */
  const startSimulation = () => {
    let current = "q0";
    let tempPath = ["q0"];

    for (let ch of input) {
      if (!transitions[current][ch]) break;
      current = transitions[current][ch];
      tempPath.push(current); // ✅ PUSH ONLY ONCE
    }

    setPath(tempPath);
    setStep(0);
    setResult("");
    setRunning(true);
    speak("Simulation started. Let's analyze your string.", true);
  };

  /* -------- Next Step -------- */

  const nextStep = () => {
    if (step < path.length - 1) {
      setStep(step + 1);
    } else {
      const isAccepted = path[path.length - 1] === acceptState;

      if (isAccepted) {
        setResult("ACCEPTED");
        speak("Yes! The string is accepted well Done.", true);
      } else {
        setResult("REJECTED");
        setExplanation(
          "The DFA never reached the accept state. To be accepted, the string must contain 001.",
        );
        speak("No. The string is rejected.  please try again .", false);
      }

      setRunning(false);
    }
  };

  /* -------- Reset -------- */
  const reset = () => {
    setInput("");
    setPath([]);
    setStep(0);
    setResult("");
    setExplanation("");
    setRunning(false);
    window.speechSynthesis.cancel();
  };

  /* ================= UI ================= */

  return (
    <div className="bg">
      <div className="card">
        <h1>🤖 Interactive DFA Simulator</h1>
        {/* <!-- From Uiverse.io by eslam-hany -->  */}
        <div class="input-container">
          <input
            className="input"
            id="input"
            name="text"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <label class="label" for="input">
            Enter binary string (0/1)
          </label>
          <div class="topline"></div>
          <div class="underline"></div>
        </div>

        {/* <!-- From Uiverse.io by adamgiebl -->  */}
        <div className="buttons">
          <button class="button" onClick={startSimulation}>
            <div class="button-top">▶ Run</div>
            <div class="button-bottom"></div>
            <div class="button-base"></div>
          </button>

          {/* <!-- From Uiverse.io by njesenberger -->  */}
          {/* <!-- From Uiverse.io by cssbuttons-io -->  */}
          <button
            onClick={nextStep}
            disabled={step >= path.length - 1 && result !== ""}
            class="button"
          >
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text"> ▶ Step</span>
          </button>

          {/* <!-- From Uiverse.io by dhanushrs1 -->  */}
          <button className="button" onClick={reset}>
            🔄 Reset
          </button>
        </div>

        {path.length > 0 && (
          <>
            <h3>Simulation Path</h3>
            <div className="states">
              {path.map((state, index) => (
                <div
                  key={index}
                  className={`state 
                    ${index === step ? "active" : ""} 
                    ${state === acceptState ? "accept" : ""}`}
                >
                  {state}
                </div>
              ))}
            </div>
          </>
        )}

        {result && (
          <div className="alex-box">
            <div className={`alex ${result === "ACCEPTED" ? "happy" : "sad"}`}>
              🤖
            </div>

            <h2 className={result === "ACCEPTED" ? "ok" : "no"}>
              {result === "ACCEPTED" ? "PERFECT 🎉" : "REJECTED ❌"}
            </h2>

            {result === "REJECTED" && (
              <div className="correction">
                <p>
                  <strong>Why?</strong> The DFA never reached the accept state.
                </p>
                <p>
                  <strong>How to fix:</strong> Add <code>001</code> anywhere in
                  your string.
                </p>
                <p>
                  <strong>Example:</strong> <code>11001</code>, <code>001</code>
                  , <code>10010</code>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
