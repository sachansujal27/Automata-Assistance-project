import React, { useState } from "react";

/* ================= DFA DATA ================= */

const transitions = {
  q0: { 0: "q1", 1: "q0" },
  q1: { 0: "q1", 1: "q2" },
  q2: { 0: "q2", 1: "q0" }, // trap/final state handled
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

/* ================= DFA MINIMIZATION ================= */

const minimizeDFA = (states, alphabet, transitions, start, accept) => {
  // Step 1: Initialize table for distinguishable states
  const statePairs = [];
  const table = {};
  for (let i = 0; i < states.length; i++) {
    for (let j = i + 1; j < states.length; j++) {
      const s1 = states[i];
      const s2 = states[j];
      statePairs.push([s1, s2]);
      table[`${s1},${s2}`] = accept.includes(s1) !== accept.includes(s2);
    }
  }

  // Step 2: Iteratively mark distinguishable states
  let changed = true;
  while (changed) {
    changed = false;
    for (let [s1, s2] of statePairs) {
      const key = `${s1},${s2}`;
      if (table[key]) continue;

      for (let a of alphabet) {
        const t1 = transitions[s1]?.[a];
        const t2 = transitions[s2]?.[a];
        if (!t1 || !t2) continue;
        const pairKey = t1 < t2 ? `${t1},${t2}` : `${t2},${t1}`;
        if (table[pairKey]) {
          table[key] = true;
          changed = true;
          break;
        }
      }
    }
  }

  // Step 3: Merge equivalent states
  const groups = [];
  for (let s of states) {
    let found = false;
    for (let g of groups) {
      const key = s < g[0] ? `${s},${g[0]}` : `${g[0]},${s}`;
      if (!table[key]) {
        g.push(s);
        found = true;
        break;
      }
    }
    if (!found) groups.push([s]);
  }

  // Step 4: Build minimized DFA
  const newStates = groups.map((g) => g.join("+"));
  const newStart = groups.find((g) => g.includes(start)).join("+");
  const newAccept = groups
    .filter((g) => g.some((s) => accept.includes(s)))
    .map((g) => g.join("+"));
  const newTransitions = {};

  for (let g of groups) {
    const rep = g.join("+");
    newTransitions[rep] = {};
    for (let a of alphabet) {
      const target = transitions[g[0]]?.[a];
      if (!target) continue;
      const tgtGroup = groups.find((grp) => grp.includes(target));
      if (tgtGroup) newTransitions[rep][a] = tgtGroup.join("+");
    }
  }

  return {
    states: newStates,
    start: newStart,
    accept: newAccept,
    transitions: newTransitions,
  };
};

/* ================= APP ================= */

export default function Auto3() {
  const [input, setInput] = useState("");
  const [path, setPath] = useState([]);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState("");
  const [explanation, setExplanation] = useState("");

  const alphabet = ["0", "1"];
  const states = Object.keys(transitions);

  // Minimize DFA once
  const minDFA = minimizeDFA(states, alphabet, transitions, "q0", [
    acceptState,
  ]);

  /* -------- Start Simulation -------- */
  const startSimulation = () => {
    let current = minDFA.start;
    let tempPath = [current];

    for (let ch of input) {
      if (!minDFA.transitions[current][ch]) break;
      current = minDFA.transitions[current][ch];
      tempPath.push(current);
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
      const isAccepted = minDFA.accept.includes(path[path.length - 1]);
      if (isAccepted) {
        setResult("ACCEPTED");
        speak("Yes! The string is accepted. Well done.", true);
      } else {
        setResult("REJECTED");
        setExplanation(
          "The DFA never reached the accept state. Make sure the input satisfies the pattern.",
        );
        speak("No. The string is rejected. Please try again.", false);
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
    <div className="bg4">
      <div className="card">
        <h1>🤖 Interactive DFA Simulator (Minimized)</h1>
        <input
          className="input"
          placeholder="Enter binary string (0/1)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="buttons">
          <button onClick={startSimulation}>▶ Run</button>
          <button
            onClick={nextStep}
            disabled={step >= path.length - 1 && result !== ""}
          >
            ▶ Step
          </button>
          <button className="reset" onClick={reset}>
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
                    ${minDFA.accept.includes(state) ? "accept" : ""}`}
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
                  <strong>Why?</strong> {explanation}
                </p>
                <p>
                  <strong>How to fix:</strong> Make sure the input reaches the
                  accept state.
                </p>
                <p>
                  <strong>Example:</strong> Strings like <code>011</code>,{" "}
                  <code>001</code> may work.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
