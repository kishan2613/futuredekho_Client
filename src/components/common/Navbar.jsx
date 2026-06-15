import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    navigate("/login");
  };

  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-8">

      <Link
        to="/"
        className="text-2xl font-bold text-purple-600"
      >
        HathDekho
      </Link>

      <div className="flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/pricing">Pricing</Link>
      </div>

      <div className="flex items-center gap-3">
        {token ? (
          <>
            <button className="px-4 py-2 rounded-lg border border-gray-300">
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;