// src/Signup.js
import { Link } from "react-router-dom";
import "./index.css";

export default function Signup() {
  return (
    <div className="card">
      <h2>Create an Account</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="text" placeholder="Username" />
      <button className="submit-btn">Sign Up</button>
      <Link to="/login">
        <button className="switch-link">Already have an account? Log in</button>
      </Link>
    </div>
  );
}
