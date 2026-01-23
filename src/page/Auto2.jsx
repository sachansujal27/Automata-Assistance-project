import React, { useEffect, useState } from "react";

/* ================= MAIN APP ================= */

export default function Auto2() {
  useEffect(() => {
    alexSpeak("Hello! Welcome to the NFA to DFA Converter.");
  }, []);

  // 1️⃣ States for user input
  const [statesInput, setStatesInput] = useState(""); // Example: q0,q1,q2
  const [alphabetInput, setAlphabetInput] = useState(""); // Example: 0,1
  const [startState, setStartState] = useState(""); // Example: q0
  const [finalStatesInput, setFinalStatesInput] = useState(""); // Example: q2
  const [transitionsInput, setTransitionsInput] = useState("");
  /* Example: q0,0->q0,q1; q0,1->q0; q1,0->q2 */
  // reset
  const resetAll = () => {
    setStatesInput("");
    setAlphabetInput("");
    setStartState("");
    setFinalStatesInput("");
    setTransitionsInput("");

    // Clear DFA and simulation results
    setDfaResult(null);
    setInputString("");
    setSimulationResult("");

    // Clear errors
    setError("");
  };
  // 2️⃣ DFA result
  const [dfaResult, setDfaResult] = useState(null);

  /* ================= ALEX SPEECH ================= */

  const alexSpeak = (text) => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1.2;
    utterance.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /* ================= PARSE USER INPUT ================= */
  const parseNFA = () => {
    // Split states and alphabet
    const states = statesInput.split(",").map((s) => s.trim());
    const alphabet = alphabetInput.split(",").map((s) => s.trim());
    const finalStates = finalStatesInput.split(",").map((s) => s.trim());

    // Parse transitions
    const transitions = {};
    transitionsInput.split(";").forEach((t) => {
      t = t.trim();
      if (!t) return;
      // Format: q0,0->q0,q1
      const [left, right] = t.split("->").map((s) => s.trim());
      const [from, symbol] = left.split(",").map((s) => s.trim());
      const toStates = right.split(",").map((s) => s.trim());

      if (!transitions[from]) transitions[from] = {};
      transitions[from][symbol] = toStates;
    });

    return { states, alphabet, startState, finalStates, transitions };
  };

  /* ================= NFA → DFA CONVERTER ================= */
  const convertNFAtoDFA = () => {
    const { alphabet, startState, finalStates, transitions } = parseNFA();

    const dfaStates = [];
    const dfaTransitions = {};
    const dfaFinalStates = [];

    const queue = [[startState]]; // Start DFA state = set containing start state
    const visited = new Set();

    while (queue.length > 0) {
      const current = queue.shift();
      const key = current.sort().join(","); // Unique key for set

      if (visited.has(key)) continue; // Already processed
      visited.add(key);
      dfaStates.push(current);

      dfaTransitions[key] = {};

      alphabet.forEach((symbol) => {
        const nextSet = new Set();

        current.forEach((state) => {
          const moves = transitions[state]?.[symbol] || [];
          moves.forEach((s) => nextSet.add(s));
        });

        const nextArray = [...nextSet];
        dfaTransitions[key][symbol] = nextArray.join(",");
        if (nextArray.length > 0) queue.push(nextArray);
      });
    }

    // DFA final states
    dfaStates.forEach((stateSet) => {
      if (stateSet.some((s) => finalStates.includes(s))) {
        dfaFinalStates.push(stateSet.join(","));
      }
    });

    setDfaResult({ dfaStates, dfaTransitions, dfaFinalStates });
  };

  /* ================= UI ================= */
  return (
    <>
      <div className="bg2">
        <div className="card2">
          <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>🔁 User-defined NFA → DFA Converter</h1>

            {/* User Input */}
            <div className="input1">
              <label>States (comma-separated): </label>
              <input
                value={statesInput}
                onChange={(e) => setStatesInput(e.target.value)}
                placeholder="q0,q1,q2"
              />
            </div>

            <div className="input1">
              <label>Alphabet (comma-separated): </label>
              <input
                value={alphabetInput}
                onChange={(e) => setAlphabetInput(e.target.value)}
                placeholder="0,1"
              />
            </div>

            <div className="input1">
              <label>Start State: </label>
              <input
                value={startState}
                onChange={(e) => setStartState(e.target.value)}
                placeholder="q0"
              />
            </div>

            <div className="input1">
              <label>Final States (comma-separated): </label>
              <input
                value={finalStatesInput}
                onChange={(e) => setFinalStatesInput(e.target.value)}
                placeholder="q2"
              />
            </div>
            <div className="input1">
              <label>
                Transitions (format: q0,0-&gt;q0,q1; q0,1-&gt;q0; q1,0-&gt;q2):
              </label>
              <input
                value={transitionsInput}
                onChange={(e) => setTransitionsInput(e.target.value)}
                style={{ width: "80%" }}
              />
            </div>
            <div className="buttons">
              <button onClick={convertNFAtoDFA} style={{ marginTop: "10px" }}>
                Convert NFA → DFA
              </button>
            </div>
            <button
              onClick={resetAll}
              style={{
                margin: "20px",
                marginLeft: "10px",
                backgroundColor: "#d64339",
                color: "white",
              }}
            >
              🔄 Reset
            </button>

            <div className="buttons"></div>
            {/* DFA Output */}
            {dfaResult && (
              <div style={{ marginTop: "20px" }}>
                <h2>DFA States:</h2>
                {dfaResult.dfaStates.map((s, i) => (
                  <div key={i}>{`{ ${s.join(", ")} }`}</div>
                ))}

                <h2>DFA Transitions:</h2>
                {Object.entries(dfaResult.dfaTransitions).map(
                  ([state, trans], i) => (
                    <div key={i}>
                      <b>{`{${state}}`}</b> → 0 : {trans["0"] || "∅"} , 1 :{" "}
                      {trans["1"] || "∅"}
                    </div>
                  ),
                )}

                <h2>DFA Final States:</h2>
                {dfaResult.dfaFinalStates.map((f, i) => (
                  <div key={i}>{`{ ${f} }`}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
