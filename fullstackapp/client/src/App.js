import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import "./index.css";
import Main from "./Main";

export default function App() {
  // const [screen, setScreen] = useState("home");

  return (
      <Router>
      <div className="container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-left">
            <img src="/RecordOnly192.png" alt="Logo" className="logo-image" />
            <span className="logo-text">SONISCA</span>
          </div>
          <div className="navbar-right">
            <Link to="/signup"><button>SIGN UP</button></Link>
            <Link to="/login"><button>SIGN IN</button></Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <>
              <Main />
              {/* Footer moved here */}
              <footer className="footer">
                <button>About</button>
                <button>API</button>
              </footer>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}