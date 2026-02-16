// ===== Signin.js =====
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="title">Sign In</h2>
        <p className="subtitle">Create your account ✨</p>

        <div className="input-group">
          <input type="text" required />
          <label>Username</label>
        </div>

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

        <button className="auth-btn" onClick={() => navigate("/")}>
          Sign up
        </button>

        <p className="footer-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}
