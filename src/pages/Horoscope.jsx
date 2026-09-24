import { useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Heart,
  Loader2,
  Moon,
  Sparkles,
  Star,
  Sun,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/backendapis";

const ZODIAC_SIGNS = [
  {
    id: "aries",
    name: "Aries",
    symbol: "♈",
    dates: "Mar 21 – Apr 19",
  },
  {
    id: "taurus",
    name: "Taurus",
    symbol: "♉",
    dates: "Apr 20 – May 20",
  },
  {
    id: "gemini",
    name: "Gemini",
    symbol: "♊",
    dates: "May 21 – Jun 20",
  },
  {
    id: "cancer",
    name: "Cancer",
    symbol: "♋",
    dates: "Jun 21 – Jul 22",
  },
  {
    id: "leo",
    name: "Leo",
    symbol: "♌",
    dates: "Jul 23 – Aug 22",
  },
  {
    id: "virgo",
    name: "Virgo",
    symbol: "♍",
    dates: "Aug 23 – Sep 22",
  },
  {
    id: "libra",
    name: "Libra",
    symbol: "♎",
    dates: "Sep 23 – Oct 22",
  },
  {
    id: "scorpio",
    name: "Scorpio",
    symbol: "♏",
    dates: "Oct 23 – Nov 21",
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    symbol: "♐",
    dates: "Nov 22 – Dec 21",
  },
  {
    id: "capricorn",
    name: "Capricorn",
    symbol: "♑",
    dates: "Dec 22 – Jan 19",
  },
  {
    id: "aquarius",
    name: "Aquarius",
    symbol: "♒",
    dates: "Jan 20 – Feb 18",
  },
  {
    id: "pisces",
    name: "Pisces",
    symbol: "♓",
    dates: "Feb 19 – Mar 20",
  },
];

function ZodiacCard({ sign, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-2xl border p-4 text-center transition-all duration-300 ${
        selected
          ? "border-gold bg-gold text-night shadow-lg scale-[1.02]"
          : "border-gold/15 bg-white/80 hover:border-gold/40 hover:bg-blush/50"
      }`}
    >
      <div
        className={`text-3xl font-display transition-transform group-hover:scale-110 ${
          selected ? "text-night" : "text-gold-deep"
        }`}
      >
        {sign.symbol}
      </div>

      <p
        className={`mt-2 text-sm font-medium ${
          selected ? "text-night" : "text-ink"
        }`}
      >
        {sign.name}
      </p>

      <p
        className={`mt-1 text-[10px] ${
          selected ? "text-night/60" : "text-muted"
        }`}
      >
        {sign.dates}
      </p>
    </button>
  );
}

function ScoreBar({ label, score, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-gold/15 bg-white/90 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={17} className="text-gold-deep" />
          <span className="font-medium text-ink">{label}</span>
        </div>

        <span className="font-display italic text-gold-deep">
          {score}%
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export const getDailyHoroscope = async (sign) => {
  const response = await api.get("/horoscope/daily", {
    params: {
      sign,
    },
  });

  return response;
};

export default function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState("aries");
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sign =
    ZODIAC_SIGNS.find((item) => item.id === selectedSign) ||
    ZODIAC_SIGNS[0];

  useEffect(() => {
    fetchHoroscope(selectedSign);
  }, [selectedSign]);

  


async function fetchHoroscope(signName) {
  setLoading(true);
  setError("");
  setHoroscope(null);

  try {
    const response = await getDailyHoroscope(signName);

    console.log("Horoscope API response:", response.data);

    const result = response.data;

    setHoroscope(
      result.data?.data || result.data || result
    );
  } catch (err) {
    console.error("Horoscope API error:", err);

    setError(
      err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Unable to fetch today's horoscope"
    );
  } finally {
    setLoading(false);
  }
}


  /*
   * Fallback/demo values.
   * Replace these with fields returned by your backend.
   */
  const overallScore = horoscope?.overallScore || 82;

  const areas = [
    {
      label: "Love",
      score: horoscope?.loveScore || 84,
      icon: Heart,
    },
    {
      label: "Career",
      score: horoscope?.careerScore || 78,
      icon: BriefcaseBusiness,
    },
    {
      label: "Finance",
      score: horoscope?.financeScore || 72,
      icon: Wallet,
    },
    {
      label: "Energy",
      score: horoscope?.energyScore || 88,
      icon: Sun,
    },
  ];

  return (
    <div className="min-h-screen bg-atmosphere relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 star-field opacity-40 pointer-events-none" />

      <div className="absolute top-20 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <p className="font-brand text-[11px] tracking-[0.4em] uppercase text-gold-deep">
            Vedic astrology
          </p>

          <h1 className="mt-4 font-display text-4xl sm:text-6xl font-semibold text-ink text-balance">
            Your{" "}
            <span className="italic text-gold-strong">
              Daily Horoscope
            </span>
          </h1>

          <p className="mt-5 text-muted font-light text-base sm:text-lg leading-relaxed">
            Discover what the stars have in store for you today —
            love, career, money, energy and your lucky moments.
          </p>
        </div>

        {/* Zodiac selector */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-display text-xl font-semibold text-ink">
                Choose your zodiac sign
              </p>

              <p className="text-sm text-muted mt-1">
                Select your sun sign to reveal today's reading.
              </p>
            </div>

            <Sparkles
              size={20}
              className="text-gold-deep hidden sm:block"
            />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {ZODIAC_SIGNS.map((item) => (
              <ZodiacCard
                key={item.id}
                sign={item}
                selected={selectedSign === item.id}
                onClick={() => setSelectedSign(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 flex justify-center">
            <div className="rounded-2xl border border-gold/15 bg-white/80 px-6 py-4 flex items-center gap-3">
              <Loader2
                size={20}
                className="animate-spin text-gold-deep"
              />

              <span className="text-sm text-muted">
                Reading the stars for {sign.name}...
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Horoscope */}
        {!loading && (
          <div className="mt-10 sm:mt-14 space-y-6 animate-fade-up">

            {/* Main reading */}
            <div className="rounded-[1.75rem] border border-gold/20 bg-night text-white p-6 sm:p-10 relative overflow-hidden">

              <div className="absolute inset-0 star-field opacity-50 pointer-events-none" />

              <div className="relative grid md:grid-cols-[auto_1fr] gap-8 items-center">

                {/* Zodiac */}
                <div className="mx-auto md:mx-0 w-32 h-32 rounded-full border-2 border-gold/40 bg-white/5 flex flex-col items-center justify-center">
                  <span className="text-5xl font-display text-gold-soft">
                    {sign.symbol}
                  </span>

                  <span className="mt-1 font-brand text-[9px] tracking-[0.2em] uppercase text-white/50">
                    {sign.name}
                  </span>
                </div>

                {/* Content */}
                <div className="text-center md:text-left">

                  <p className="font-brand text-[10px] tracking-[0.35em] uppercase text-gold">
                    Today's forecast
                  </p>

                  <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold">
                    {sign.name}{" "}
                    <span className="text-gold-soft italic">
                      · Daily Reading
                    </span>
                  </h2>

                  <p className="mt-4 text-white/65 font-light leading-relaxed max-w-2xl">
                    {horoscope?.horoscope ||
                      `Today brings a meaningful opportunity for ${sign.name}.
                      Trust your instincts, stay open to unexpected
                      possibilities, and allow the day to unfold naturally.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Overall score
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">

              <div className="rounded-2xl border border-gold/15 bg-blush/60 px-4 py-5 text-center">
                <p className="font-brand text-[9px] tracking-[0.22em] uppercase text-gold-deep">
                  Overall
                </p>

                <p className="mt-1 font-display text-3xl font-semibold text-ink">
                  {overallScore}%
                </p>

                <p className="mt-1 text-xs text-muted">
                  Cosmic energy
                </p>
              </div>

              <div className="rounded-2xl border border-gold/15 bg-blush/60 px-4 py-5 text-center">
                <p className="font-brand text-[9px] tracking-[0.22em] uppercase text-gold-deep">
                  Lucky color
                </p>

                <p className="mt-2 font-display text-lg font-semibold text-ink">
                  {horoscope?.luckyColor || "Golden"}
                </p>
              </div>

              <div className="rounded-2xl border border-gold/15 bg-blush/60 px-4 py-5 text-center">
                <p className="font-brand text-[9px] tracking-[0.22em] uppercase text-gold-deep">
                  Lucky number
                </p>

                <p className="mt-2 font-display text-lg font-semibold text-ink">
                  {horoscope?.luckyNumber || "7"}
                </p>
              </div>

              <div className="rounded-2xl border border-gold/15 bg-blush/60 px-4 py-5 text-center">
                <p className="font-brand text-[9px] tracking-[0.22em] uppercase text-gold-deep">
                  Lucky day
                </p>

                <p className="mt-2 font-display text-lg font-semibold text-ink">
                  {horoscope?.luckyDay || "Thursday"}
                </p>
              </div>

            </div> */}

            {/* Life areas */}
            {/* <div>
              <div className="mb-4">
                <h3 className="font-display text-2xl font-semibold text-ink">
                  Your cosmic energy
                </h3>

                <p className="text-sm text-muted mt-1">
                  How today's energy flows across different areas of life.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {areas.map((area) => (
                  <ScoreBar
                    key={area.label}
                    label={area.label}
                    score={area.score}
                    icon={area.icon}
                  />
                ))}
              </div>
            </div> */}

            {/* Today's guidance */}
            <div className="grid md:grid-cols-2 gap-5">

              <div className="rounded-[1.5rem] border border-gold/15 bg-white/90 p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <Star
                    size={18}
                    className="text-gold-deep"
                  />

                  <h3 className="font-display text-xl font-semibold text-ink">
                    Today's guidance
                  </h3>
                </div>

                <p className="mt-4 text-sm text-muted leading-relaxed font-light">
                  {horoscope?.guidance ||
                    "Focus on what you can control today. A calm mind and clear communication can help you turn a small opportunity into meaningful progress."}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-gold/15 bg-blush/50 p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <Moon
                    size={18}
                    className="text-gold-deep"
                  />

                  <h3 className="font-display text-xl font-semibold text-ink">
                    Cosmic tip
                  </h3>
                </div>

                <p className="mt-4 text-sm text-ink/75 leading-relaxed font-light">
                  {horoscope?.tip ||
                    "Do not rush important decisions. Give yourself space to observe, reflect and then act with intention."}
                </p>
              </div>

            </div>

            {/* Quote */}
            <div className="rounded-[1.5rem] border border-gold/20 bg-gradient-to-br from-night to-night-soft text-white p-7 sm:p-10 text-center">

              <Moon
                className="mx-auto text-gold mb-4"
                size={24}
              />

              <p className="font-display text-xl sm:text-2xl italic leading-relaxed max-w-3xl mx-auto">
                “The stars may guide your path, but your choices shape the journey.”
              </p>

              <p className="mt-4 font-brand text-[10px] tracking-[0.25em] uppercase text-gold/70">
                HathDekho
              </p>

            </div>

          </div>
        )}

        {/* Explore */}
        <div className="mt-12 rounded-[1.5rem] border border-gold/20 bg-white/70 p-6 sm:p-8 text-center">

          <h3 className="font-display text-2xl font-semibold text-ink">
            Explore more destiny tools
          </h3>

          <p className="mt-2 text-sm text-muted">
            Discover what else the stars and numbers have to say.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">

            <Link
              to="/kundali"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm"
            >
              Birth Chart
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/lucky-name"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium"
            >
              Lucky Name Score
            </Link>

            <Link
              to="/compatibility"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium"
            >
              Name Compatibility
            </Link>

          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-[11px] text-muted font-light">
          Horoscope content is provided for entertainment and
          personal reflection.
        </p>

      </div>
    </div>
  );
}