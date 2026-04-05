import React, { useEffect, useState } from "react";

/* ================= MAIN APP ================= */

export default function Auto2() {
  // Inputs
  const [statesInput, setStatesInput] = useState("");
  const [alphabetInput, setAlphabetInput] = useState("");
  const [startState, setStartState] = useState("");
  const [finalStatesInput, setFinalStatesInput] = useState("");
  const [transitionsInput, setTransitionsInput] = useState("");

  // Output
  const [dfaResult, setDfaResult] = useState(null);
  const [error, setError] = useState("");

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

  useEffect(() => {
    alexSpeak("Hello! Welcome to the NFA to DFA Converter.");
  }, []);

  /* ================= RESET ================= */
  const resetAll = () => {
    setStatesInput("");
    setAlphabetInput("");
    setStartState("");
    setFinalStatesInput("");
    setTransitionsInput("");
    setDfaResult(null);
    setError("");
    alexSpeak("Reset complete.");
  };

  /* ================= PARSE NFA ================= */
  const parseNFA = () => {
    try {
      const states = statesInput.split(",").map((s) => s.trim());
      const alphabet = alphabetInput.split(",").map((s) => s.trim());
      const finalStates = finalStatesInput.split(",").map((s) => s.trim());

      const transitions = {};

      transitionsInput.split(";").forEach((t) => {
        t = t.trim();
        if (!t) return;

        const [left, right] = t.split("->").map((s) => s.trim());
        const [from, symbol] = left.split(",").map((s) => s.trim());
        const toStates = right.split(",").map((s) => s.trim());

        if (!transitions[from]) transitions[from] = {};
        transitions[from][symbol] = toStates;
      });

      return { states, alphabet, startState, finalStates, transitions };
    } catch (err) {
      setError("Invalid transition format.");
      return null;
    }
  };

  /* ================= CONVERT ================= */
  const convertNFAtoDFA = () => {
    setError("");

    const data = parseNFA();
    if (!data) return;

    const { alphabet, startState, finalStates, transitions } = data;

    if (!startState) {
      setError("Please enter start state.");
      return;
    }

    const dfaStates = [];
    const dfaTransitions = {};
    const dfaFinalStates = [];

    const queue = [[startState]];
    const visited = new Set();

    while (queue.length > 0) {
      const current = queue.shift();
      const key = current.sort().join(",");

      if (visited.has(key)) continue;
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
        const nextKey = nextArray.join(",");

        dfaTransitions[key][symbol] = nextKey || "∅";

        if (nextArray.length > 0) {
          queue.push(nextArray);
        }
      });
    }

    dfaStates.forEach((stateSet) => {
      if (stateSet.some((s) => finalStates.includes(s))) {
        dfaFinalStates.push(stateSet.join(","));
      }
    });

    setDfaResult({ dfaStates, dfaTransitions, dfaFinalStates });

    // Alex speaks result
    alexSpeak("Conversion complete. DFA result generated.");
  };

  /* ================= UI ================= */
  return (
    <div className="bg2">
      <div className="card2">
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
          <h1>🔁 User-defined NFA → DFA Converter</h1>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="input1">
            <label>States:</label>
            <input
              value={statesInput}
              onChange={(e) => setStatesInput(e.target.value)}
              placeholder="q0,q1,q2"
            />
          </div>

          <div className="input1">
            <label>Alphabet:</label>
            <input
              value={alphabetInput}
              onChange={(e) => setAlphabetInput(e.target.value)}
              placeholder="0,1"
            />
          </div>

          <div className="input1">
            <label>Start State:</label>
            <input
              value={startState}
              onChange={(e) => setStartState(e.target.value)}
              placeholder="q0"
            />
          </div>

          <div className="input1">
            <label>Final States:</label>
            <input
              value={finalStatesInput}
              onChange={(e) => setFinalStatesInput(e.target.value)}
              placeholder="q2"
            />
          </div>

          <div className="input1">
            <label>Transitions:</label>
            <input
              value={transitionsInput}
              onChange={(e) => setTransitionsInput(e.target.value)}
              placeholder="q0,0->q0,q1; q0,1->q0; q1,0->q2"
              style={{ width: "80%" }}
            />
          </div>

          <div className="buttons">
            <button className="button" onClick={convertNFAtoDFA}>
              ▶ Run
            </button>

            <button className="button" onClick={resetAll}>
              🔄 Reset
            </button>
          </div>

          {/* DFA RESULT */}
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
                    <b>{`{${state}}`}</b> →
                    {Object.entries(trans).map(([sym, dest]) => (
                      <span key={sym}>
                        {" "}
                        {sym} : {dest}
                      </span>
                    ))}
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
  );
}
