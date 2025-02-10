export default function Register({ setScreen }) {
    return (
      <form className="w-80 space-y-4">
        <h2 className="text-lg font-bold text-center">Create an Account</h2>
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" />
        <input className="w-full p-2 border rounded" type="text" placeholder="Username" />
        <button className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition" type="submit">Sign Up</button>
        <button 
          className="text-center text-sm text-blue-500 hover:underline" 
          onClick={(e) => { e.preventDefault(); setScreen("login"); }}
        >
          Already have an account? Log in
        </button>
      </form>
    );
  }