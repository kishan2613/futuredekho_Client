import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const BG =
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=80";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [welcomeName, setWelcomeName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const data = await loginUser(form);

      if (!data?.access_token) {
        setError("Invalid email or password");
        return;
      }

      // Response: { access_token, user_id, name }
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user_id", String(data.user_id));

      const userName = (data.name || "").trim();
      if (userName) {
        localStorage.setItem("user_name", userName);
      }
      setWelcomeName(userName);

      window.dispatchEvent(new Event("auth-changed"));
      setSuccess(true);

      setTimeout(() => {
        navigate("/palmistry", { replace: true });
      }, 1200);
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(typeof message === "string" ? message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 sm:px-5 py-3.5 rounded-2xl border border-ink/10 bg-ivory/80 focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition font-light text-base";

  return (
    <div
      className="min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-4.75rem)] relative flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="absolute inset-0 bg-night/80" />
      <div className="absolute inset-0 star-field opacity-70" />

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-night/50 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-ivory rounded-3xl px-6 sm:px-8 py-8 sm:py-10 max-w-sm w-full text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] border border-gold/25 animate-fade-up">
            <div className="mx-auto w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center text-gold-deep mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink break-words">
              {welcomeName
                ? `Welcome, ${welcomeName}`
                : "Successful login"}
            </h3>
            <p className="mt-2 text-muted font-light text-sm">
              Taking you to your palm chat…
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.55)] animate-fade-up">
        <div className="hidden lg:flex flex-col justify-center p-10 xl:p-12 text-white">
          <p className="font-brand text-[11px] tracking-[0.35em] uppercase text-gold">
            AI palmistry & astrology
          </p>
          <h1 className="mt-6 font-display text-4xl xl:text-5xl font-semibold leading-tight text-balance">
            Discover what{" "}
            <span className="italic text-gold-strong">destiny</span> holds
          </h1>
          <p className="mt-5 text-white/55 text-lg font-light leading-relaxed max-w-sm">
            Sign in to continue your palm readings and cosmic conversations.
          </p>
        </div>

        <div className="bg-ivory p-6 sm:p-8 lg:p-12">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink">
            Welcome back
          </h2>
          <p className="mt-2 text-muted font-light text-sm sm:text-base">
            Login to continue your spiritual journey
          </p>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading || success}
              className="btn-gold w-full py-3.5 rounded-2xl disabled:opacity-60 text-sm sm:text-base"
            >
              {loading ? "Signing in..." : "Enter Your Destiny"}
            </button>
          </form>

          <p className="mt-6 sm:mt-8 text-center text-muted text-sm font-light">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="ml-2 text-gold-deep font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
