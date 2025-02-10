export default function Navbar({ setScreen }) {
    return (
      <nav className="bg-white p-4 flex justify-between items-center shadow-md">
        <button className="border px-4 py-2 rounded font-bold">LOGO / SITENAME</button>
        <div className="space-x-4">
          <button className="border px-4 py-2 rounded hover:bg-gray-200" onClick={() => setScreen("signup")}>SIGN UP</button>
          <button className="border px-4 py-2 rounded hover:bg-gray-200" onClick={() => setScreen("login")}>SIGN IN</button>
          <button className="border px-4 py-2 rounded hover:bg-gray-200">SHARE</button>
        </div>
      </nav>
    );
  }
  