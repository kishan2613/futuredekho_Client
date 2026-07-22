import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Menu } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-orange-100">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>

          <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            HathDekho
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-orange-500 transition"
          >
            Home
          </Link>

          <Link
            to="/history"
            className="hover:text-orange-500 transition"
          >
            Palm History
          </Link>

          <Link
            to="/pricing"
            className="hover:text-orange-500 transition"
          >
            Pricing
          </Link>

          <a
            href="#zodiac"
            className="hover:text-orange-500 transition"
          >
            Zodiac
          </a>

          <a
            href="#about"
            className="hover:text-orange-500 transition"
          >
            About
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <button className="px-5 py-2.5 rounded-xl border border-orange-200 hover:bg-orange-50 transition">
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-white font-medium hover:shadow-lg hover:shadow-orange-300/40 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl border border-orange-200 hover:bg-orange-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-white font-medium hover:shadow-lg hover:shadow-orange-300/40 transition"
              >
                Start Reading
              </Link>
            </>
          )}

          {/* Mobile Menu Icon */}
          <button className="md:hidden">
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;