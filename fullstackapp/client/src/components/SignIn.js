export default function SignInForm({ setScreen }) {
    return (
      <form className="w-80 space-y-4">
        <h2 className="text-lg font-bold text-center">Log In</h2>
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" />
        <button className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition" type="submit">Log In</button>
        <button 
          className="text-center text-sm text-blue-500 hover:underline" 
          onClick={(e) => { e.preventDefault(); setScreen("signup"); }}
        >
          Don't have an account? Sign up
        </button>
      </form>
    );
  }