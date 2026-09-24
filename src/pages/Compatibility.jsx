import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  Loader2,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { checkNameCompatibility } from "../services/compatibilityService";

const SCORE_METRICS = [
  { key: "love", label: "Love", icon: Heart },
  { key: "friendship", label: "Friendship", icon: Users },
  { key: "communication", label: "Communication", icon: MessageCircle },
  { key: "trust", label: "Trust", icon: Shield },
  { key: "chemistry", label: "Chemistry", icon: Zap },
  { key: "marriage", label: "Marriage", icon: Star },
];

function ScoreRing({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(232,163,23,0.15)"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c4840a" />
            <stop offset="50%" stopColor="#f0c14b" />
            <stop offset="100%" stopColor="#e8a317" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl sm:text-5xl font-semibold text-gold-strong">
          {score}
        </span>
        <span className="font-brand text-[9px] tracking-[0.25em] uppercase text-muted">
          Match
        </span>
      </div>
    </div>
  );
}

function MetricBar({ label, value, Icon, delay = 0 }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 80 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          <Icon size={15} className="text-gold-deep shrink-0" />
          {label}
        </span>
        <span className="font-display text-sm italic text-gold-deep">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-ink/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function Compatibility() {
  const savedName = localStorage.getItem("user_name") || "";
  const [name1, setName1] = useState(savedName);
  const [name2, setName2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const canSubmit = name1.trim().length > 0 && name2.trim().length > 0 && !loading;

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await checkNameCompatibility(name1, name2);
      console.log(res);
      if (!res?.success || !res?.data) {
        throw new Error("Could not calculate compatibility");
      }
      setResult(res.data);
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(typeof message === "string" ? message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 sm:px-5 py-3.5 rounded-2xl border border-ink/10 bg-white/80 focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition font-light text-base";

  const luckItems = useMemo(() => {
    if (!result) return [];
    return [
      { label: "Lucky color", value: result.lucky_color },
      { label: "Lucky number", value: result.lucky_number },
      { label: "Best day", value: result.best_day },
      { label: "Bond type", value: result.relationship_type },
    ];
  }, [result]);

  return (
    <div className="min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-4.75rem)] bg-atmosphere relative overflow-hidden">
      <div className="absolute inset-0 star-field opacity-40 pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-10 right-1/5 w-80 h-80 bg-rose-300/10 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto animate-fade-up">
          <p className="font-brand text-[11px] tracking-[0.4em] uppercase text-gold-deep">
            Name destiny match
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-semibold text-ink text-balance">
            Are you{" "}
            <span className="italic text-gold-strong">meant to be</span>?
          </h1>
          <p className="mt-4 text-muted font-light text-base sm:text-lg leading-relaxed">
            Enter two names and reveal your cosmic compatibility — love,
            trust, chemistry, and the future written in the stars.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleCheck}
          className="mt-10 sm:mt-12 max-w-xl mx-auto rounded-[1.75rem] border border-gold/20 bg-white/80 backdrop-blur-xl p-5 sm:p-8 shadow-[0_24px_60px_-28px_rgba(10,15,28,0.35)] animate-fade-up delay-1"
        >
          <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Your name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Prachi"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="hidden sm:flex items-center justify-center pb-3">
              <div className="w-11 h-11 rounded-full bg-blush border border-gold/25 flex items-center justify-center text-gold-deep animate-pulse-soft">
                <Heart size={18} fill="currentColor" className="opacity-80" />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Their name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kishan"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-gold w-full mt-6 py-3.5 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Reading the stars…
              </>
            ) : (
              <>
                Check Compatibility
                <Sparkles size={17} />
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-muted font-light">
            Free name match · Instant cosmic insight
          </p>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-10 sm:mt-14 space-y-6 sm:space-y-8 animate-fade-up">
            {/* Score hero */}
            <div className="rounded-[1.75rem] border border-gold/20 bg-night text-white p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-0 star-field opacity-50 pointer-events-none" />
              <div className="absolute -top-16 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 items-center">
                <ScoreRing score={result.overall_score} />

                <div className="text-center lg:text-left">
                  <p className="font-brand text-[10px] tracking-[0.35em] uppercase text-gold">
                    {result.person1} ✦ {result.person2}
                  </p>
                  <h2 className="mt-3 font-display text-2xl sm:text-4xl font-semibold text-balance">
                    {result.title?.replace(/🌟/g, "").trim()}{" "}
                    <span className="text-gold-soft">✦</span>
                  </h2>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-sm text-gold-soft">
                    <Heart size={14} />
                    {result.relationship_type}
                  </p>
                  <p className="mt-5 text-white/65 font-light leading-relaxed max-w-xl">
                    {result.summary?.replace(/🌟/g, "").trim()}
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="rounded-[1.75rem] border border-gold/15 bg-white/85 backdrop-blur-xl p-5 sm:p-8">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink">
                Compatibility breakdown
              </h3>
              <div className="mt-6 grid sm:grid-cols-2 gap-5 sm:gap-6">
                {SCORE_METRICS.map((m, i) => (
                  <MetricBar
                    key={m.key}
                    label={m.label}
                    value={result[m.key] ?? 0}
                    Icon={m.icon}
                    delay={i * 80}
                  />
                ))}
              </div>
            </div>

            {/* Luck chips */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {luckItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-gold/15 bg-blush/70 p-4 text-center"
                >
                  <p className="font-brand text-[9px] tracking-[0.25em] uppercase text-gold-deep">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-lg sm:text-xl font-semibold text-ink">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Strengths & Challenges */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-[1.5rem] border border-emerald-200/60 bg-emerald-50/50 p-5 sm:p-7">
                <h3 className="font-display text-xl font-semibold text-ink">
                  Strengths
                </h3>
                <ul className="mt-4 space-y-3">
                  {(result.strengths || []).map((s) => (
                    <li
                      key={s}
                      className="flex gap-3 text-sm text-ink/80 font-light leading-relaxed"
                    >
                      <span className="text-emerald-600 mt-0.5 shrink-0">✦</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-amber-200/70 bg-amber-50/40 p-5 sm:p-7">
                <h3 className="font-display text-xl font-semibold text-ink">
                  Challenges
                </h3>
                <ul className="mt-4 space-y-3">
                  {(result.challenges || []).map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 text-sm text-ink/80 font-light leading-relaxed"
                    >
                      <span className="text-amber-600 mt-0.5 shrink-0">◇</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Advice & Future */}
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-[1.5rem] border border-gold/15 bg-white/90 p-5 sm:p-7">
                <p className="font-brand text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                  Sacred advice
                </p>
                <p className="mt-3 font-display text-lg sm:text-xl italic text-ink leading-relaxed">
                  “{result.advice}”
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-gold/15 bg-gradient-to-br from-night to-night-soft text-white p-5 sm:p-7">
                <p className="font-brand text-[10px] tracking-[0.3em] uppercase text-gold">
                  Your future together
                </p>
                <p className="mt-3 text-white/75 font-light leading-relaxed">
                  {result.future}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-[1.5rem] border border-gold/20 bg-blush/60 p-6 sm:p-8 text-center">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                Want a deeper reading?
              </h3>
              <p className="mt-2 text-muted font-light max-w-md mx-auto">
                Upload your palm and chat with HathDekho for personalized
                destiny insights.
              </p>
              <Link
                to="/palmistry"
                className="btn-gold mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl"
              >
                Try AI Palm Reading
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Compatibility;
