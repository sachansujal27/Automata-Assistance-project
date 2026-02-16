// ===== Login.js =====
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="title">Login</h2>
        <p className="subtitle">Welcome back 👋</p>

        <div className="input-group">
          <input type="email" required />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input type={show ? "text" : "password"} required />
          <label>Password</label>
          <span className="toggle" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </span>
        </div>

        <button className="auth-btn" onClick={() => navigate("/video")}>
          Login
        </button>

        <p className="footer-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [show, setShow] = useState(false);
//   const navigate = useNavigate(); // ✅ FIXED

//   const handleLogin = () => {
//     // later you can add auth logic here
//     navigate("/Mainpage"); // ✅ route matches App.js
//   };
//   const handleLogin1 = () => {
//     // later you can add auth logic here
//     navigate("/Signup"); // ✅ route matches App.js
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="title">Login</h2>
//         <p className="subtitle">Welcome back 👋</p>

//         <div className="input-group">
//           <input type="email" required />
//           <label>Email</label>
//         </div>

//         <div className="input-group">
//           <input type={show ? "text" : "password"} required />
//           <label>Password</label>
//           <span className="toggle" onClick={() => setShow(!show)}>
//             {show ? "Hide" : "Show"}
//           </span>
//         </div>

//         <button className="login-btn" onClick={handleLogin}>
//           Login
//         </button>

//         <p className="footer-text" on click={handleLogin1}>
//           Don’t have an account? <span>Sign up</span>
//         </p>
//       </div>
//     </div>
//   );
// }
