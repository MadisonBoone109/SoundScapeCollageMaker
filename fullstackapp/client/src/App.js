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

  const API_BASE_URL = "/.netlify/functions/deezer"; // Calls Netlify function

useEffect(() => {
  axios.get(`${API_BASE_URL}?q=lofi`)
    .then(response => setSongs(response.data.data))
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
                <img src={song.album?.cover || "https://via.placeholder.com/80"} alt={song.title} />
                <p>{song.title}</p>
              </div>
            ))
          }

            {tab === "stickers" &&
              stickers.map((sticker) => (
                <div key={sticker.id} className="draggable" draggable onDragStart={(e) => handleDragStart(e, sticker)}>
                  <img src={sticker.image} alt="Sticker" />
                </div>
              ))}

            {tab === "images" &&
              images.map((sticker) => (
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
    <img src={item.album?.cover || item.image || "https://via.placeholder.com/80"} alt={item.title || "Sticker"} />
    {item.preview && (
      <audio controls>
        <source src={item.preview} type="audio/mp3" />
      </audio>
    )}
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
