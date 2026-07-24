import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const BG =
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=80";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const data = await registerUser(form);

      if (data?.access_token) {
        localStorage.setItem("token", data.access_token);
      }
      if (data?.user_id != null) {
        localStorage.setItem("user_id", String(data.user_id));
      }

      const userName = (data.name || form.name || "").trim();
      if (userName) {
        localStorage.setItem("user_name", userName);
      }

      window.dispatchEvent(new Event("auth-changed"));
      setSuccess(true);

      setTimeout(() => {
        navigate(data?.user_id ? "/palmistry" : "/login", { replace: true });
      }, 1200);
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(typeof message === "string" ? message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 rounded-2xl border border-ink/10 bg-ivory/80 focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition font-light";

  return (
    <div
      className="min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-4.75rem)] relative flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="absolute inset-0 bg-night/80" />
      <div className="absolute inset-0 star-field opacity-70" />

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-night/50 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-ivory rounded-3xl px-8 py-10 max-w-sm w-full text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] border border-gold/25 animate-fade-up">
            <div className="mx-auto w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center text-gold-deep mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-ink">
              {form.name.trim()
                ? `Welcome, ${form.name.trim()}`
                : "Account created"}
            </h3>
            <p className="mt-2 text-muted font-light text-sm">
              Taking you to your palm chat…
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.55)] animate-fade-up">
        <div className="hidden lg:flex flex-col justify-center p-12 text-white">
          <p className="font-brand text-[11px] tracking-[0.35em] uppercase text-gold">
            Begin your journey
          </p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-tight text-balance">
            Create your{" "}
            <span className="italic text-gold-strong">destiny</span> profile
          </h1>
          <p className="mt-5 text-white/55 text-lg font-light leading-relaxed max-w-sm">
            Join seekers discovering clarity through AI-powered palmistry and
            astrology.
          </p>
        </div>

        <div className="bg-ivory p-8 sm:p-10 lg:p-12">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
            Create account
          </h2>
          <p className="mt-2 text-muted font-light">
            Start your AI palm reading journey today
          </p>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Full name
              </label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>
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
                autoComplete="new-password"
                placeholder="Create a password"
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
              className="btn-gold w-full py-3.5 rounded-2xl disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Begin Your Journey"}
            </button>
          </form>

          <p className="mt-8 text-center text-muted text-sm font-light">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 text-gold-deep font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
