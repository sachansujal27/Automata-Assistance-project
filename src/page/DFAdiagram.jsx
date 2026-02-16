import React, { useState } from "react";
import ReactFlow, { Controls, Background, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

export default function DFADiagram() {
  const [input, setInput] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  /* -------- Reset -------- */
  const reset = () => {
    setInput("");
    setNodes([]);
    setEdges();
    setResult("");

    window.speechSynthesis.cancel();
  };
  const generateDFA = () => {
    try {
      const dfa = JSON.parse(input);

      /* ---------- NODES ---------- */
      const nodePositions = {
        q0: { x: 100, y: 200 },
        q1: { x: 350, y: 200 },
      };

      const newNodes = dfa.states.map((state) => ({
        id: state,
        position: nodePositions[state] || { x: 220, y: 120 },
        data: {
          label:
            state +
            (state === dfa.start ? "\n(Start)" : "") +
            (dfa.final.includes(state) ? "\n(Final)" : ""),
        },
        style: {
          width: 80,
          height: 80,
          borderRadius: "50%",
          textAlign: "center",
          paddingTop: 18,
          fontWeight: "bold",
          background: "#fff",
          border: dfa.final.includes(state)
            ? "4px double black"
            : state === dfa.start
              ? "3px solid green"
              : "2px solid black",
        },
      }));

      /* ---------- EDGES ---------- */
      const newEdges = [];
      const seen = new Set();

      Object.entries(dfa.transitions).forEach(([from, trans]) => {
        Object.entries(trans).forEach(([symbol, to]) => {
          const reverse = `${to}-${from}`;
          const isReverse = seen.has(reverse);
          seen.add(`${from}-${to}`);

          newEdges.push({
            id: `${from}-${to}-${symbol}`,
            source: from,
            target: to,
            label: symbol,
            type: "bezier",
            markerEnd: { type: MarkerType.ArrowClosed },
            pathOptions: {
              curvature: from === to ? 1.2 : isReverse ? -0.3 : 0.3,
            },
          });
        });
      });

      setNodes(newNodes);
      setEdges(newEdges);
    } catch {
      alert("❌ Invalid DFA JSON");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="bg5">
      <div className="card5">
        <h1>🧠 DFA Diagram Generator</h1>

        <textarea
          className="input"
          rows={7}
          placeholder={`Enter DFA JSON Example:
{
  "states": ["q0","q1"],
  "start": "q0",
  "final": ["q1"],
  "transitions": {
    "q0": { "0": "q1" },
    "q1": { "1": "q0" }
  }
}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="buttons">
          <button class="button" onClick={generateDFA}>
            <div class="button-top">⚙ Generate DFA</div>
            <div class="button-bottom"></div>
            <div class="button-base"></div>
          </button>
        </div>
        <button className="button" onClick={reset}>
          🔄 Reset
        </button>
        <div
          style={{
            width: "100%",
            height: "420px",
            marginTop: 20,
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #ccc",
          }}
        >
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import ReactFlow, { Controls, Background, MarkerType } from "reactflow";
// import "reactflow/dist/style.css";

// export default function DFADiagram() {
//   const [input, setInput] = useState("");
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);

//   const generateDFA = () => {
//     try {
//       const dfa = JSON.parse(input);

//       /* ---------- NODES ---------- */
//       const nodePositions = {
//         q0: { x: 100, y: 200 },
//         q1: { x: 350, y: 200 },
//       };

//       const newNodes = dfa.states.map((state) => ({
//         id: state,
//         position: nodePositions[state] || { x: 200, y: 100 },
//         data: {
//           label:
//             state +
//             (state === dfa.start ? "\n(Start)" : "") +
//             (dfa.final.includes(state) ? "\n(Final)" : ""),
//         },
//         style: {
//           width: 80,
//           height: 80,
//           borderRadius: "50%",
//           textAlign: "center",
//           paddingTop: 18,
//           fontWeight: "bold",
//           border: dfa.final.includes(state)
//             ? "4px double black"
//             : state === dfa.start
//               ? "3px solid green"
//               : "2px solid black",
//         },
//       }));

//       /* ---------- EDGES ---------- */
//       const newEdges = [];
//       const seen = new Set();

//       Object.entries(dfa.transitions).forEach(([from, trans]) => {
//         Object.entries(trans).forEach(([symbol, to]) => {
//           const reverse = `${to}-${from}`;
//           const isReverse = seen.has(reverse);
//           seen.add(`${from}-${to}`);

//           newEdges.push({
//             id: `${from}-${to}-${symbol}`,
//             source: from,
//             target: to,
//             label: symbol,
//             type: "bezier",
//             markerEnd: { type: MarkerType.ArrowClosed },
//             pathOptions: {
//               curvature: from === to ? 1.2 : isReverse ? -0.3 : 0.3,
//             },
//           });
//         });
//       });

//       setNodes(newNodes);
//       setEdges(newEdges);
//     } catch {
//       alert("❌ Invalid DFA JSON");
//     }
//   };

//   return (
//     <>
//       <div className="contain">
//         <div style={{ width: "100%", height: "600px" }}>
//           <div className="Box">
//             <textarea
//               rows={8}
//               cols={60}
//               placeholder="Enter DFA JSON EX-"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />
//             <br />
//             <button onClick={generateDFA}>Generate DFA</button>

//             <div style={{ width: "100%", height: "400px", marginTop: 20 }}>
//               <ReactFlow nodes={nodes} edges={edges} fitView>
//                 <Background />
//                 <Controls />
//               </ReactFlow>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
