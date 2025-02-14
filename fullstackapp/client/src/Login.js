// src/Login.js
import { Link } from "react-router-dom";
import "./index.css";

export default function Login() {
  return (
    <div className="card">
      <h2>Log In</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="submit-btn">Log In</button>
      <Link to="/signup">
        <button className="switch-link">Don't have an account? Sign up</button>
      </Link>
    </div>
  );
}