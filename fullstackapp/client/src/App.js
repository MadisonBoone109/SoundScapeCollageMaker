import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import "./index.css";
import Main from "./Main";

export default function App() {
  // const [screen, setScreen] = useState("home");
  const [tab, setTab] = useState("songs"); // Active tab
  const [canvasItems, setCanvasItems] = useState([]); // Items on canvas
  const [songs, setSongs] = useState([]); // Songs state

  const API_BASE_URL = "/.netlify/functions/deezer"; // Calls Netlify function

  useEffect(() => {
    const genres = ["jazz", "rock", "hiphop", "pop", "blues", "rnb", ]; // Add more genres as needed
    const moods = ["chill", "party", "romantic", "focus"]; // Add moods
    const regional = ["chill", "party", "romantic", "focus"];
    const queries = [...genres, ...moods, ...regional]; // Combine genres & moods
    

    const requests = queries.map(query => axios.get(`${API_BASE_URL}?q=${query}`));

    Promise.all(requests)
      .then(responses => {
        const allSongs = responses.flatMap(response => response.data.data);
        setSongs(allSongs);
      })
      .catch(error => console.error("Error fetching songs:", error));
  }, []);


  
  // const mockSongs = [
  //   { id: "song1", name: "Song 1", cover: "https://via.placeholder.com/80", url: "#" },
  //   { id: "song2", name: "Song 2", cover: "https://via.placeholder.com/80", url: "#" }
  // ];

  const stickers = [
    { id: "sticker1", image: "https://i.pinimg.com/236x/43/33/6e/43336ef5c93653fc193a71b8de41b3cf.jpg" },
    { id: "sticker2", image: "https://i.pinimg.com/474x/6d/34/1a/6d341a0c3f324cffa041250306647554.jpg" },
    { id: "sticker3", image: "https://i.pinimg.com/736x/7a/d0/ce/7ad0ceedf8324711618221370042e6bb.jpg" },
    { id: "sticker4", image: "https://i.pinimg.com/236x/b0/da/94/b0da94af3eff110610dae2b7318659a6.jpg" },
    { id: "sticker5", image: "https://i.pinimg.com/236x/5e/f6/44/5ef644bae7fdd0df00d485796a70ad18.jpg" },
    { id: "sticker6", image: "https://i.pinimg.com/236x/3c/c4/4a/3cc44a15a9f1f6aeaf970f5588e36f5a.jpg" },
    { id: "sticker7", image: "https://i.pinimg.com/736x/59/8b/c7/598bc768b164edaac221470a3aaa0eb1.jpg" }
  ];

  const images = [
    { id: "image1", image: "https://i.pinimg.com/236x/38/44/0b/38440b7dcf5ba62424cc4a6cac3d75d5.jpg" },
    { id: "image2", image: "https://i.pinimg.com/236x/0a/c0/d5/0ac0d5e388101b12a5f1db1da19c01fc.jpg" },
    { id: "image3", image: "https://i.pinimg.com/236x/ba/68/20/ba68204ca9c4212c49d564116762678e.jpg" },
    { id: "image4", image: "https://i.pinimg.com/236x/9c/43/da/9c43dacca48a9ece41cf32dffa416de3.jpg" },
    { id: "image5", image: "https://i.pinimg.com/236x/39/83/49/398349937d7d4a667e629f5f9d1bcdb7.jpg" },
    { id: "image6", image: "https://i.pinimg.com/236x/9f/20/a6/9f20a60d1c957f5d7b0e963e91401c2c.jpg" },
    { id: "image7", image: "https://i.pinimg.com/236x/09/3e/cf/093ecf7e5e866d1d9b38a17159db7bd0.jpg" }
  ];

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));
  
    // Get grid size from CSS
    const gridSize = document.querySelector(".canvas").getBoundingClientRect();
    const itemSize = gridSize.width / 5; // Assuming 5x5 grid
  
    // Get position based on mouse drop location
    const gridX = Math.floor(e.nativeEvent.offsetX / itemSize);
    const gridY = Math.floor(e.nativeEvent.offsetY / itemSize);
  
    setCanvasItems([...canvasItems, { ...item, x: gridX, y: gridY }]);
  };

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