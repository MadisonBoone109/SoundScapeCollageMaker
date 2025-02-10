import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css"; 

export default function App() {
  const [screen, setScreen] = useState("home");
  const [tab, setTab] = useState("songs"); // Active tab
  const [canvasItems, setCanvasItems] = useState([]); // Items on canvas
  const [songs, setSongs] = useState([]); // Songs state

  useEffect(() => {
    axios.get("http://localhost:5000/api/deezer?q=lofi")
      .then(response => setSongs(response.data.data))
      .catch(error => console.error("Error fetching songs:", error));
  }, []);  
  
  const mockSongs = [
    { id: "song1", name: "Song 1", cover: "https://via.placeholder.com/80", url: "#" },
    { id: "song2", name: "Song 2", cover: "https://via.placeholder.com/80", url: "#" }
  ];

  const stickers = [
    { id: "sticker1", image: "https://via.placeholder.com/50" },
    { id: "sticker2", image: "https://via.placeholder.com/50" }
  ];


  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));
    const gridX = Math.floor(e.nativeEvent.offsetX / 100);
    const gridY = Math.floor(e.nativeEvent.offsetY / 100);
    
    setCanvasItems([...canvasItems, { ...item, x: gridX, y: gridY }]);
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
        <img src="/RecordOnly192.png" alt="Logo" className="logo-image" />
        <span className="logo-text">SONISCA</span>
        </div>
        <div className="navbar-right">
          <button onClick={() => setScreen("signup")}>SIGN UP</button>
          <button onClick={() => setScreen("login")}>SIGN IN</button>
          <button>SHARE</button>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="main-content">
        {/* {screen === "home" && <h1>Welcome</h1>} */}
        {screen === "signup" && <SignUpForm setScreen={setScreen} />}
        {screen === "login" && <LoginForm setScreen={setScreen} />}
      </div>


      
<div className="main">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="tabs">
            <button onClick={() => setTab("songs")}>Songs</button>
            <button onClick={() => setTab("stickers")}>Stickers</button>
            <button onClick={() => setTab("images")}>Images</button>
          </div>

          <div className="items">
            {tab === "songs" &&
              songs.map((song) => (
                <div key={song.id} className="draggable" draggable onDragStart={(e) => handleDragStart(e, song)}>
                  <img src={song.album.cover} alt={song.title} />
                  <p>{song.title}</p>
                </div>
              )
              )}

{songs && songs.length > 0 ? (
  songs.map((song, index) => (
    <div key={index}>
      <img src={song.album?.cover || "default-cover.jpg"} alt={song.title} />
      <p>{song.title}</p>
    </div>
  ))
) : (
  <p>No songs found</p>
)}


            {tab === "stickers" &&
              stickers.map((sticker) => (
                <div key={sticker.id} className="draggable" draggable onDragStart={(e) => handleDragStart(e, sticker)}>
                  <img src={sticker.image} alt="Sticker" />
                </div>
              ))}
          </div>
        </aside>

        {/* Centered Canvas */}
        <div className="canvas" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          {canvasItems.map((item, index) => (
            <div key={index} className="grid-item" style={{ left: `${item.x * 100}px`, top: `${item.y * 100}px` }}>
              <img src={item.album.cover} alt={item.title} />
              <audio controls>
                <source src={item.preview} type="audio/mp3" />
              </audio>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <button>About</button>
        <button>API</button>
      </footer>
    </div>
  );
}

function SignUpForm({ setScreen }) {
  return (
    <div className="card">
      <h2>Create an Account</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="text" placeholder="Username" />
      <button className="submit-btn">Sign Up</button>
      <button className="submit-btn" onClick={() => setScreen("login")}>
        Already have an account? Log in
      </button>
    </div>
  );
}

function LoginForm({ setScreen }) {
  return (
    <div className="card">
      <h2>Log In</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="submit-btn">Log In</button>
      <button className="submit-btn" onClick={() => setScreen("signup")}>
        Don't have an account? Sign up
      </button>
    </div>
  );
}
