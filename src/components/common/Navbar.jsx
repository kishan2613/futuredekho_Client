import { Link, useNavigate } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userName, setUserName] = useState(
    () => localStorage.getItem("user_name") || ""
  );

  useEffect(() => {
    const sync = () => {
      setToken(localStorage.getItem("token"));
      setUserName(localStorage.getItem("user_name") || "");
    };
    window.addEventListener("auth-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("auth-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    window.dispatchEvent(new Event("auth-changed"));
    setOpen(false);
    navigate("/login");
  };

  const linkClass =
    "relative text-sm font-medium text-ink/70 hover:text-ink transition after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full";

  return (
    <nav className="sticky top-0 z-50 border-b border-ink/5 bg-ivory/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto h-16 sm:h-[4.75rem] px-4 sm:px-6 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center text-night shadow-[0_8px_24px_-8px_rgba(232,163,23,0.55)] group-hover:scale-105 transition shrink-0">
            <Sparkles size={17} />
          </div>
          <span className="font-brand text-base sm:text-lg tracking-[0.12em] text-ink truncate">
            HathDekho
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 xl:gap-9">
          <Link to="/" className={linkClass}>
            Home
          </Link>
          <Link to="/palmistry" className={linkClass}>
            Palm Reading
          </Link>
          <a href="/#zodiac" className={linkClass}>
            Zodiac
          </a>
          <a href="/#about" className={linkClass}>
            About
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-3 min-w-0">
          {token ? (
            <>
              {userName && (
                <span className="hidden xl:inline text-sm text-ink/70 font-medium max-w-[160px] truncate">
                  Welcome,{" "}
                  <span className="text-gold-deep font-semibold">{userName}</span>
                </span>
              )}
              <Link
                to="/palmistry"
                className="px-4 lg:px-5 py-2.5 rounded-xl border border-ink/10 text-sm font-medium hover:border-gold/40 transition whitespace-nowrap"
              >
                Workspace
              </Link>
              <button
                onClick={handleLogout}
                className="btn-gold px-4 lg:px-5 py-2.5 rounded-xl text-sm whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 lg:px-5 py-2.5 rounded-xl border border-ink/10 text-sm font-medium hover:border-gold/40 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-gold px-4 lg:px-5 py-2.5 rounded-xl text-sm whitespace-nowrap"
              >
                Start Reading
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-blush shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/5 bg-ivory px-6 py-5 space-y-1 animate-fade-in">
          {[
            { to: "/", label: "Home" },
            { to: "/palmistry", label: "Palm Reading" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-3 font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/#zodiac"
            onClick={() => setOpen(false)}
            className="block py-3 font-medium text-ink"
          >
            Zodiac
          </a>
          <div className="pt-3 flex flex-col gap-2 border-t border-ink/5">
            {token ? (
              <>
                {userName && (
                  <p className="py-2 text-sm text-muted">
                    Welcome,{" "}
                    <span className="text-gold-deep font-semibold">{userName}</span>
                  </p>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-gold w-full py-3 rounded-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full py-3 rounded-xl border border-ink/10 text-center font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="btn-gold w-full py-3 rounded-xl text-center"
                >
                  Start Reading
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
