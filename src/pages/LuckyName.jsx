import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  Compass,
  Copy,
  Gem,
  Heart,
  Loader2,
  Share2,
  Sparkles,
  Star,
  Type,
  Wallet,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getLuckyNameScore } from "../services/luckyNameService";

function normalizeResult(raw, fallbackName) {
  const d = raw?.data || raw || {};

  const stars = (n) => {
    const count = Math.min(5, Math.max(0, Number(n) || 0));
    return "★".repeat(count) + "☆".repeat(5 - count);
  };

  const careerRaw = d.career ?? d.career_compatibility;
  const relationshipRaw = d.relationship ?? d.relationship_energy;
  const wealthRaw = d.wealth ?? d.wealth_energy;
  const healthRaw = d.health ?? d.health_energy;

  const asList = (v) => {
    if (Array.isArray(v)) return v.filter(Boolean);
    if (typeof v === "string" && v.trim()) return [v.trim()];
    return [];
  };

  const careerRating =
    typeof careerRaw === "object"
      ? careerRaw.rating ?? careerRaw.stars ?? careerRaw.score ?? 0
      : Number(careerRaw) || 0;

  const wealthRating =
    typeof wealthRaw === "object"
      ? wealthRaw.rating ?? wealthRaw.stars ?? wealthRaw.score ?? 0
      : Number(wealthRaw) || 0;

  return {
    name: d.name || fallbackName,
    lucky_score: Number(d.lucky_score ?? d.score ?? 0),
    name_number: Number(d.name_number ?? d.number ?? 0),
    ruling_planet: d.ruling_planet || d.planet || "",
    personality: d.personality || "",
    strengths: asList(d.strengths),
    challenges: asList(d.challenges),
    career_stars: stars(
      careerRating > 5 ? Math.round(careerRating / 20) : careerRating
    ),
    best_careers: asList(
      typeof careerRaw === "object"
        ? careerRaw.best_careers || careerRaw.careers || careerRaw.list
        : d.best_careers
    ),
    relationship_score: Number(
      typeof relationshipRaw === "object"
        ? relationshipRaw.score ?? relationshipRaw.percent
        : relationshipRaw
    ),
    relationship_text:
      typeof relationshipRaw === "object"
        ? relationshipRaw.description || relationshipRaw.text || ""
        : d.relationship_text || "",
    wealth_stars: stars(
      wealthRating > 5 ? Math.round(wealthRating / 20) : wealthRating
    ),
    wealth_text:
      typeof wealthRaw === "object"
        ? wealthRaw.description || wealthRaw.text || ""
        : d.wealth_text || "",
    health_score: Number(
      typeof healthRaw === "object"
        ? healthRaw.score ?? healthRaw.percent
        : healthRaw
    ),
    health_text:
      typeof healthRaw === "object"
        ? healthRaw.description || healthRaw.text || ""
        : d.health_text || "",
    lucky_numbers: asList(d.lucky_numbers),
    lucky_colors: asList(d.lucky_colors),
    lucky_days: asList(d.lucky_days),
    lucky_direction: d.lucky_direction || "",
    lucky_gemstone: asList(d.lucky_gemstone || d.lucky_gemstones),
    lucky_alphabets: asList(d.lucky_alphabets || d.lucky_alphabet),
    affirmation: d.affirmation || d.positive_affirmation || "",
    ai_advice: d.ai_advice || d.advice || "",
  };
}

function ScoreRing({ score, label = "Lucky" }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, score) / 100) * circumference;

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
          stroke="url(#luckyGold)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="luckyGold" x1="0%" y1="0%" x2="100%" y2="0%">
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
        <span className="font-brand text-[9px] tracking-[0.2em] uppercase text-muted">
          {label}/100
        </span>
      </div>
    </div>
  );
}

function Chip({ children, tone = "gold" }) {
  const tones = {
    gold: "bg-blush border-gold/25 text-ink",
    night: "bg-night text-gold-soft border-white/10",
    soft: "bg-white border-ink/10 text-ink",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function SectionCard({ title, icon: Icon, children, className = "" }) {
  return (
    <div
      className={`rounded-[1.5rem] border border-gold/15 bg-white/90 backdrop-blur-xl p-5 sm:p-7 ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-blush border border-gold/20 flex items-center justify-center text-gold-deep">
            <Icon size={16} />
          </div>
        )}
        <h3 className="font-display text-lg sm:text-xl font-semibold text-ink">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function buildShareText(r) {
  return `✨ Lucky Name Score ✨

Name
${r.name}

Lucky Score
${r.lucky_score}/100

Name Number
${r.name_number}

Lucky Number
${r.lucky_numbers[0] ?? "—"}

Lucky Color
${r.lucky_colors[0] ?? "—"}

Lucky Day
${r.lucky_days[0] ?? "—"}

Relationship
${r.relationship_score ? `${r.relationship_score}%` : "—"}

Career
${r.career_stars || "—"}

━━━━━━━━━━━━━━━━━━━━━━
Discover yours at HathDekho`;
}

function LuckyName() {
  const savedName = localStorage.getItem("user_name") || "";
  const [name, setName] = useState(savedName);
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);

  const canSubmit = name.trim().length > 1 && !loading;

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await getLuckyNameScore(name, dob);
      const normalized = normalizeResult(res, name.trim());
      if (!normalized.lucky_score && !normalized.name_number) {
        throw new Error("Invalid response");
      }
      setResult(normalized);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Could not analyze this name. Please try again.";
      setError(typeof message === "string" ? message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    const text = buildShareText(result);

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Lucky Name Score — HathDekho",
          text,
        });
        return;
      }
    } catch {
      /* fall through to copy */
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full px-4 sm:px-5 py-3.5 rounded-2xl border border-ink/10 bg-white/85 focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition font-light text-base";

  const adviceLines = useMemo(() => {
    if (!result?.ai_advice) return [];
    return result.ai_advice
      .split(/\n|(?<=\.)\s+/)
      .map((l) => l.trim())
      .filter(Boolean);
  }, [result]);

  return (
    <div className="min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-4.75rem)] bg-atmosphere relative overflow-hidden">
      <div className="absolute inset-0 star-field opacity-35 pointer-events-none" />
      <div className="absolute top-16 right-1/4 w-72 h-72 bg-gold/15 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-20 left-1/5 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto animate-fade-up">
          <p className="font-brand text-[11px] tracking-[0.4em] uppercase text-gold-deep">
            ✨ Lucky Name Score
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-semibold text-ink text-balance">
            Discover the{" "}
            <span className="italic text-gold-strong">hidden energy</span> in
            your name
          </h1>
          <p className="mt-4 text-muted font-light text-base sm:text-lg leading-relaxed">
            Unlock fortune, personality, career fit, and lucky charms — crafted
            uniquely for your name.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleAnalyze}
          className="mt-10 sm:mt-12 max-w-xl mx-auto rounded-[1.75rem] border border-gold/20 bg-white/85 backdrop-blur-xl p-5 sm:p-8 shadow-[0_24px_60px_-28px_rgba(10,15,28,0.35)] animate-fade-up delay-1"
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Full name <span className="text-gold-deep">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kishan Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Date of birth{" "}
                <span className="text-muted font-light">(optional)</span>
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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
                Reading your name energy…
              </>
            ) : (
              <>
                Reveal Lucky Score
                <Sparkles size={17} />
              </>
            )}
          </button>
          <p className="mt-4 text-center text-xs text-muted font-light">
            Personalized AI report · Same name number, fresh insight every time
          </p>
        </form>

        {/* Results */}
        {result && (
          <div ref={resultRef} className="mt-10 sm:mt-14 space-y-5 sm:space-y-6 animate-fade-up">
            {/* Top score banner */}
            <div className="rounded-[1.75rem] border border-gold/20 bg-night text-white p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-0 star-field opacity-50 pointer-events-none" />
              <div className="absolute -top-20 right-0 w-72 h-72 bg-gold/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 items-center">
                <ScoreRing score={result.lucky_score} />
                <div className="text-center lg:text-left">
                  <p className="font-brand text-[10px] tracking-[0.35em] uppercase text-gold">
                    Lucky Name Score
                  </p>
                  <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold break-words">
                    {result.name}
                  </h2>
                  <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
                    {result.name_number > 0 && (
                      <Chip tone="night">
                        Name Number {result.name_number}
                      </Chip>
                    )}
                    {result.ruling_planet && (
                      <Chip tone="night">
                        Ruled by {result.ruling_planet}
                      </Chip>
                    )}
                  </div>
                  {result.personality && (
                    <p className="mt-5 text-white/70 font-light leading-relaxed max-w-xl">
                      {result.personality}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Strengths & Challenges */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              <SectionCard title="Strengths" icon={Check}>
                <ul className="space-y-2.5">
                  {result.strengths.map((s) => (
                    <li
                      key={s}
                      className="flex gap-2.5 text-sm text-ink/80 font-light"
                    >
                      <span className="text-emerald-600 font-semibold shrink-0">
                        ✓
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard title="Challenges" icon={Star}>
                <ul className="space-y-2.5">
                  {result.challenges.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2.5 text-sm text-ink/80 font-light"
                    >
                      <span className="text-amber-600 shrink-0">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>

            {/* Career / Relationship / Wealth / Health */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <SectionCard title="Career Compatibility" icon={Briefcase}>
                <p className="font-display text-2xl text-gold-deep tracking-widest">
                  {result.career_stars}
                </p>
                {result.best_careers.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.best_careers.map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </div>
                )}
              </SectionCard>

              <SectionCard title="Relationship Energy" icon={Heart}>
                {result.relationship_score > 0 && (
                  <p className="font-display text-3xl font-semibold text-gold-strong">
                    {result.relationship_score}%
                  </p>
                )}
                {result.relationship_text && (
                  <p className="mt-3 text-sm text-muted font-light leading-relaxed">
                    {result.relationship_text}
                  </p>
                )}
              </SectionCard>

              <SectionCard title="Wealth Energy" icon={Wallet}>
                <p className="font-display text-2xl text-gold-deep tracking-widest">
                  {result.wealth_stars}
                </p>
                {result.wealth_text && (
                  <p className="mt-3 text-sm text-muted font-light leading-relaxed">
                    {result.wealth_text}
                  </p>
                )}
              </SectionCard>

              <SectionCard title="Health Energy" icon={Activity}>
                {result.health_score > 0 && (
                  <p className="font-display text-3xl font-semibold text-gold-strong">
                    {result.health_score}%
                  </p>
                )}
                {result.health_text && (
                  <p className="mt-3 text-sm text-muted font-light leading-relaxed">
                    {result.health_text}
                  </p>
                )}
              </SectionCard>
            </div>

            {/* Lucky charms grid */}
            <div className="rounded-[1.75rem] border border-gold/15 bg-blush/50 p-5 sm:p-8">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink text-center">
                Your lucky charms
              </h3>
              <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <CharmBlock
                  icon={Sparkles}
                  label="Lucky Numbers"
                  values={result.lucky_numbers}
                />
                <CharmBlock
                  icon={Star}
                  label="Lucky Colors"
                  values={result.lucky_colors}
                />
                <CharmBlock
                  icon={Calendar}
                  label="Lucky Days"
                  values={result.lucky_days}
                />
                <CharmBlock
                  icon={Compass}
                  label="Lucky Direction"
                  values={result.lucky_direction ? [result.lucky_direction] : []}
                />
                <CharmBlock
                  icon={Gem}
                  label="Lucky Gemstone"
                  values={result.lucky_gemstone}
                />
                <CharmBlock
                  icon={Type}
                  label="Lucky Alphabet"
                  values={result.lucky_alphabets}
                />
              </div>
            </div>

            {/* Affirmation */}
            {result.affirmation && (
              <div className="rounded-[1.75rem] border border-gold/20 bg-gradient-to-br from-night to-night-soft text-white p-6 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 star-field opacity-40 pointer-events-none" />
                <p className="relative font-brand text-[10px] tracking-[0.35em] uppercase text-gold">
                  Positive affirmation
                </p>
                <p className="relative mt-4 font-display text-xl sm:text-2xl italic leading-relaxed text-balance">
                  “{result.affirmation.replace(/^["']|["']$/g, "")}”
                </p>
              </div>
            )}

            {/* AI Advice */}
            {adviceLines.length > 0 && (
              <SectionCard title="AI Advice" icon={Sparkles}>
                <ul className="space-y-3">
                  {adviceLines.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 text-sm sm:text-base text-ink/80 font-light leading-relaxed"
                    >
                      <span className="text-gold-deep shrink-0 mt-0.5">✦</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* Share card */}
            <div className="rounded-[1.75rem] border border-dashed border-gold/35 bg-white/70 p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    Share your Lucky Score
                  </h3>
                  <p className="mt-1 text-sm text-muted font-light">
                    Send a beautiful summary to friends or save it for later.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleShare}
                  className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl shrink-0"
                >
                  {copied ? (
                    <>
                      <Check size={17} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Share2 size={17} />
                      Share Card
                    </>
                  )}
                </button>
              </div>

              <pre className="mt-5 rounded-2xl bg-night text-gold-soft/90 p-4 sm:p-5 text-xs sm:text-sm font-light whitespace-pre-wrap overflow-x-auto leading-relaxed">
                {buildShareText(result)}
              </pre>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(buildShareText(result));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="mt-3 inline-flex items-center gap-2 text-sm text-gold-deep font-medium hover:underline"
              >
                <Copy size={14} />
                Copy share text
              </button>
            </div>

            {/* Cross CTA */}
            <div className="rounded-[1.5rem] border border-gold/20 bg-blush/60 p-6 sm:p-8 text-center">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                Go deeper with palmistry
              </h3>
              <p className="mt-2 text-muted font-light max-w-md mx-auto">
                Pair your lucky name energy with an AI palm reading for a full
                destiny map.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/palmistry"
                  className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl"
                >
                  Try Palm Reading
                  <ArrowRight size={17} />
                </Link>
                <Link
                  to="/compatibility"
                  className="btn-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-medium"
                >
                  <Heart size={16} className="text-gold-deep" />
                  Name Compatibility
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CharmBlock({ icon: Icon, label, values }) {
  if (!values?.length) return null;
  return (
    <div className="rounded-2xl bg-white/80 border border-gold/15 p-4 text-center">
      <div className="mx-auto w-8 h-8 rounded-lg bg-blush flex items-center justify-center text-gold-deep mb-2">
        <Icon size={15} />
      </div>
      <p className="font-brand text-[9px] tracking-[0.22em] uppercase text-gold-deep">
        {label}
      </p>
      <p className="mt-2 font-display text-base sm:text-lg font-semibold text-ink leading-snug">
        {values.join(" · ")}
      </p>
    </div>
  );
}

export default LuckyName;
