// src/Signup.js
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

export default function Signup() {
  const navigate = useNavigate();
  return (
    <div className="center-container">
      <div className="card">
        <h2>Create an Account</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="text" placeholder="Username" />
        <button className="submit-btn">Sign Up</button>
        <Link to="/login">
          <button className="switch-link">Already have an account? Log in</button>
        </Link>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Canvas
        </button>
      </div>
    </div>
  );
}
