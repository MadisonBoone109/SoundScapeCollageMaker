// src/Login.js
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="center-container">
      <div className="card">
        <h2>Log In</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="submit-btn">Log In</button>
        <Link to="/signup">
          <button className="switch-link">Don't have an account? Sign up</button>
        </Link>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Canvas
        </button>
      </div>
    </div>
  );
}