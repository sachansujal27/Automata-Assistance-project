import React, { useState, useEffect } from "react";

/* ================= NFA DEFINITION ================= */

const transitions = {
  q0: { 0: ["q0"], 1: ["q0", "q1"] },
  q1: { 0: ["q2"], 1: [] },
  q2: { 0: [], 1: [] },
};

const startState = "q0";
const finalStates = ["q2"];

/* ================= ALEX SPEECH ================= */

const speak = (text, happy = true) => {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = happy ? 1 : 0.9;
  utterance.pitch = happy ? 1.2 : 0.8;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

/* ================= APP ================= */

export default function Auto1() {
  const [input, setInput] = useState("");
  const [paths, setPaths] = useState([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState("");
  const [running, setRunning] = useState(false);

  /* -------- Start Simulation -------- */
  const startSimulation = () => {
    let currentStates = [startState];
    let tempPaths = [[startState]];

    for (let symbol of input) {
      let nextStates = [];
      let nextPaths = [];

      tempPaths.forEach((path, index) => {
        const lastState = path[path.length - 1];
        const moves = transitions[lastState]?.[symbol] || [];

        moves.forEach((state) => {
          nextStates.push(state);
          nextPaths.push([...path, state]);
        });
      });

      currentStates = nextStates;
      tempPaths = nextPaths;
    }

    setPaths(tempPaths);
    setStep(0);
    setResult("");
    setRunning(true);

    speak(
      "Simulation started. This is a Non Deterministic Finite Automaton.",
      true,
    );
  };

  /* -------- Next Step -------- */
  const nextStep = () => {
    if (step < input.length) {
      setStep(step + 1);
    } else {
      const accepted = paths.some((p) => finalStates.includes(p[p.length - 1]));

      if (accepted) {
        setResult("ACCEPTED");
        speak("Great! At least one path reached the final state.", true);
      } else {
        setResult("REJECTED ");
        speak(
          "Sorry. No path reached the final state the number of accepting paths can be 1 path More than 1 path Many paths multiple choices at different steps.",
          false,
        );
      }

      setRunning(false);
    }
  };

  /* -------- Reset -------- */
  const reset = () => {
    setInput("");
    setPaths([]);
    setStep(0);
    setResult("");
    setRunning(false);
    window.speechSynthesis.cancel();
  };

  /* ================= UI ================= */

  return (
    <div className="bg1">
      <div className="card1">
        <h1>🤖 Interactive NFA Simulator</h1>
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
        <div className="buttons">
          <button class="button" onClick={startSimulation}>
            <div class="button-top">▶ Run</div>
            <div class="button-bottom"></div>
            <div class="button-base"></div>
          </button>

          <button onClick={nextStep} class="button">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text"> ▶ Step</span>
          </button>
          <button className="button" onClick={reset}>
            🔄 Reset
          </button>
        </div>

        {paths.length > 0 && (
          <>
            <h3>All Possible Paths</h3>
            {paths.map((path, i) => (
              <div key={i} className="states">
                {path.map((state, j) => (
                  <div
                    key={j}
                    className={`state ${
                      finalStates.includes(state) ? "accept" : ""
                    }`}
                  >
                    {state}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {result && (
          <h2 className={result === "ACCEPTED" ? "ok" : "no"}>
            {result === "ACCEPTED"
              ? "ACCEPTED ✅"
              : "REJECTED ❌The number of accepting paths can be 1 path More than 1 path Many paths multiple choices at different steps."}
          </h2>
        )}
      </div>
    </div>
  );
}
