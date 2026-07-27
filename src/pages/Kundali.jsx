import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Compass,
  Loader2,
  MapPin,
  Moon,
  Sparkles,
  Star,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  generateKundli,
  getDailyHoroscope,
  searchPlace,
} from "../services/astrologyService";

const TABS = [
  { id: "kundali", label: "Birth Chart", icon: Star },
  { id: "horoscope", label: "Daily Horoscope", icon: Sun },
];

const POPULAR_CITIES = [
  { label: "New Delhi, India", lat: 28.6139, lon: 77.209, name: "New Delhi" },
  { label: "Mumbai, India", lat: 19.076, lon: 72.8777, name: "Mumbai" },
  { label: "Bengaluru, India", lat: 12.9716, lon: 77.5946, name: "Bengaluru" },
  { label: "Kolkata, India", lat: 22.5726, lon: 88.3639, name: "Kolkata" },
  { label: "Chennai, India", lat: 13.0827, lon: 80.2707, name: "Chennai" },
  { label: "Hyderabad, India", lat: 17.385, lon: 78.4867, name: "Hyderabad" },
];

function ChartSvg({ svg }) {
  if (!svg) return null;
  return (
    <div
      className="w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-gold/20 bg-white shadow-sm [&_svg]:w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function StatPill({ label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-2xl border border-gold/15 bg-blush/60 px-4 py-3 text-center">
      <p className="font-brand text-[9px] tracking-[0.22em] uppercase text-gold-deep">
        {label}
      </p>
      <p className="mt-1 font-display text-base sm:text-lg font-semibold text-ink">
        {value}
      </p>
    </div>
  );
}

function ScoreBar({ label, score, sentiment }) {
  const tone =
    sentiment === "positive"
      ? "from-emerald-500 to-emerald-400"
      : sentiment === "challenging"
        ? "from-amber-600 to-amber-400"
        : "from-gold-deep to-gold";

  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-ink capitalize">{label}</span>
        <span className="font-display italic text-gold-deep">{score}%</span>
      </div>
      <div className="h-2 rounded-full bg-ink/5 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tone} transition-all duration-700`}
          style={{ width: `${Math.min(100, score || 0)}%` }}
        />
      </div>
    </div>
  );
}

function Kundali() {
  const savedName = localStorage.getItem("user_name") || "";
  const [tab, setTab] = useState("kundali");
  const [form, setForm] = useState({
    name: savedName,
    date: "1995-01-15",
    time: "10:30",
    placeQuery: "New Delhi",
    place: POPULAR_CITIES[0],
    timezone: "+05:30",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [kundli, setKundli] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [chartStyle, setChartStyle] = useState("north");
  const resultRef = useRef(null);
  const searchTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(searchTimer.current);
  }, []);

  const onPlaceType = (value) => {
    setForm((f) => ({ ...f, placeQuery: value }));
    clearTimeout(searchTimer.current);
    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    searchTimer.current = setTimeout(async () => {
      try {
        setSearching(true);
        const places = await searchPlace(value.trim());
        setSuggestions(places.length ? places : POPULAR_CITIES);
      } catch {
        setSuggestions(POPULAR_CITIES);
      } finally {
        setSearching(false);
      }
    }, 350);
  };

  const pickPlace = (place) => {
    setForm((f) => ({
      ...f,
      place,
      placeQuery: place.name || place.label,
    }));
    setSuggestions([]);
  };

  const birthPayload = () => ({
    date: form.date,
    time: form.time,
    latitude: form.place.lat,
    longitude: form.place.lon,
    timezone: form.timezone,
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!form.place?.lat) {
      setError("Please select a birth place from suggestions.");
      return;
    }

    setError("");
    setLoading(true);
    setKundli(null);
    setHoroscope(null);

    try {
      const birth = birthPayload();

      if (tab === "kundali") {
        const res = await generateKundli(birth);
        if (!res?.success && !res?.data) {
          throw new Error("Could not generate kundali");
        }
        setKundli(res.data || res);
      } else {
        const res = await getDailyHoroscope(birth);
        if (!res?.success && !res?.data) {
          throw new Error("Could not fetch horoscope");
        }
        setHoroscope(res.data || res);
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setError(typeof message === "string" ? message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-2xl border border-ink/10 bg-white/85 focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition font-light text-base";

  const chartSvg =
    chartStyle === "south"
      ? kundli?.chart?.southIndian || kundli?.svg?.southIndian
      : kundli?.chart?.northIndian ||
        kundli?.chart?.primary ||
        kundli?.svg?.northIndian ||
        kundli?.svg?.primary;

  const planets = kundli?.planets || [];
  const asc = kundli?.ascendant;
  const nak =
    kundli?.nakshatra?.name ||
    kundli?.ascendant?.nakshatra?.name ||
    planets.find((p) => p.name === "Moon")?.nakshatra?.name;

  return (
    <div className="min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-4.75rem)] bg-atmosphere relative overflow-hidden">
      <div className="absolute inset-0 star-field opacity-40 pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-gold/12 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center max-w-2xl mx-auto animate-fade-up">
          <p className="font-brand text-[11px] tracking-[0.4em] uppercase text-gold-deep">
            Vedic astrology
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-semibold text-ink text-balance">
            Your{" "}
            <span className="italic text-gold-strong">Kundali</span> & daily
            stars
          </h1>
          <p className="mt-4 text-muted font-light text-base sm:text-lg leading-relaxed">
            Generate a North/South Indian birth chart, planetary positions, and
            today&apos;s Vedic horoscope — powered by free astrology APIs.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex p-1 rounded-2xl bg-white/80 border border-gold/15 gap-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-sm font-medium transition ${
                  tab === id
                    ? "bg-gold text-night shadow-sm"
                    : "text-ink/60 hover:bg-blush/60"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleGenerate}
          className="mt-8 max-w-2xl mx-auto rounded-[1.75rem] border border-gold/20 bg-white/85 backdrop-blur-xl p-5 sm:p-8 shadow-[0_24px_60px_-28px_rgba(10,15,28,0.3)] animate-fade-up delay-1"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Full name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Date of birth
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Time of birth
              </label>
              <input
                type="time"
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2 relative">
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Place of birth
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-deep"
                />
                <input
                  type="text"
                  required
                  placeholder="Search city…"
                  value={form.placeQuery}
                  onChange={(e) => onPlaceType(e.target.value)}
                  onFocus={() => {
                    if (!suggestions.length) setSuggestions(POPULAR_CITIES);
                  }}
                  className={`${inputClass} pl-10`}
                  autoComplete="off"
                />
                {searching && (
                  <Loader2
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gold-deep"
                  />
                )}
              </div>

              {suggestions.length > 0 && (
                <ul className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto rounded-2xl border border-ink/10 bg-white shadow-lg">
                  {suggestions.map((p) => (
                    <li key={`${p.lat}-${p.lon}-${p.label}`}>
                      <button
                        type="button"
                        onClick={() => pickPlace(p)}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-blush transition"
                      >
                        {p.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {form.place && (
                <p className="mt-2 text-xs text-muted font-light">
                  Selected: {form.place.name || form.place.label} (
                  {form.place.lat.toFixed(2)}, {form.place.lon.toFixed(2)})
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full mt-6 py-3.5 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {tab === "kundali"
                  ? "Casting your kundali…"
                  : "Reading today’s stars…"}
              </>
            ) : (
              <>
                {tab === "kundali" ? "Generate Kundali" : "Get Daily Horoscope"}
                <Sparkles size={17} />
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[11px] text-muted font-light">
            Free Vedic calculations via Vedika Astrology API · Place lookup via
            OpenStreetMap
          </p>
        </form>

        {/* Kundali results */}
        {kundli && tab === "kundali" && (
          <div ref={resultRef} className="mt-10 sm:mt-14 space-y-6 animate-fade-up">
            <div className="rounded-[1.75rem] border border-gold/20 bg-night text-white p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-0 star-field opacity-50 pointer-events-none" />
              <div className="relative">
                <p className="font-brand text-[10px] tracking-[0.35em] uppercase text-gold">
                  Birth chart · {form.name || "Native"}
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-4xl font-semibold">
                  {asc?.sign ? (
                    <>
                      Lagna in{" "}
                      <span className="italic text-gold-soft">{asc.sign}</span>
                    </>
                  ) : (
                    "Your Vedic Kundali"
                  )}
                </h2>
                <p className="mt-3 text-white/60 font-light max-w-2xl">
                  {typeof kundli.summary === "string"
                    ? kundli.summary
                    : asc?.interpretation?.traits
                      ? `Ascendant traits: ${asc.interpretation.traits.join(", ")}.`
                      : "Explore planetary placements and nakshatras below."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatPill label="Ascendant" value={asc?.sign} />
              <StatPill
                label="Moon sign"
                value={kundli.moonSign?.sign || kundli.moonSign}
              />
              <StatPill
                label="Sun sign"
                value={kundli.sunSign?.sign || kundli.sunSign}
              />
              <StatPill label="Nakshatra" value={nak} />
            </div>

            <div className="rounded-[1.75rem] border border-gold/15 bg-white/90 p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3 className="font-display text-xl font-semibold text-ink">
                  Rasi chart
                </h3>
                <div className="flex gap-1 p-1 rounded-xl bg-blush/80 border border-gold/15">
                  {[
                    { id: "north", label: "North Indian" },
                    { id: "south", label: "South Indian" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setChartStyle(s.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        chartStyle === s.id
                          ? "bg-gold text-night"
                          : "text-ink/60"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <ChartSvg svg={chartSvg} />
              {kundli.tithi && (
                <p className="mt-4 text-center text-sm text-muted font-light">
                  Tithi: <span className="text-ink font-medium">{kundli.tithi}</span>
                  {kundli.ayanamsa?.name && (
                    <> · Ayanamsa: {kundli.ayanamsa.name}</>
                  )}
                </p>
              )}
            </div>

            {/* Planets */}
            <div className="rounded-[1.75rem] border border-gold/15 bg-white/90 p-5 sm:p-8 overflow-x-auto">
              <h3 className="font-display text-xl font-semibold text-ink mb-5">
                Planetary positions
              </h3>
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="text-left text-muted border-b border-ink/10">
                    <th className="pb-3 font-medium">Planet</th>
                    <th className="pb-3 font-medium">Sign</th>
                    <th className="pb-3 font-medium">House</th>
                    <th className="pb-3 font-medium">Nakshatra</th>
                    <th className="pb-3 font-medium">Degree</th>
                  </tr>
                </thead>
                <tbody>
                  {planets.map((p) => (
                    <tr
                      key={p.id ?? p.name}
                      className="border-b border-ink/5 last:border-0"
                    >
                      <td className="py-3 font-medium text-ink">
                        {p.vedic_name || p.name}
                        {p.isRetrograde || p.retrograde ? (
                          <span className="ml-1 text-xs text-amber-600">R</span>
                        ) : null}
                      </td>
                      <td className="py-3 text-ink/80">{p.sign}</td>
                      <td className="py-3 text-ink/80">{p.house}</td>
                      <td className="py-3 text-ink/80">
                        {p.nakshatra?.name}
                        {p.nakshatra?.pada ? ` · P${p.nakshatra.pada}` : ""}
                      </td>
                      <td className="py-3 text-ink/80">
                        {Number(p.degree ?? p.normDegree)?.toFixed?.(2) ?? "—"}°
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ascendant interpretation */}
            {asc?.interpretation && (
              <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                <div className="rounded-[1.5rem] border border-gold/15 bg-white/90 p-5 sm:p-7">
                  <h3 className="font-display text-lg font-semibold text-ink mb-3">
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {(asc.interpretation.strengths || []).map((s) => (
                      <li key={s} className="flex gap-2 text-sm text-ink/80 font-light">
                        <span className="text-emerald-600">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[1.5rem] border border-gold/15 bg-white/90 p-5 sm:p-7">
                  <h3 className="font-display text-lg font-semibold text-ink mb-3">
                    Career leanings
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(asc.interpretation.career || []).map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1.5 rounded-full bg-blush border border-gold/20 text-sm"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  {asc.interpretation.compatibility?.length > 0 && (
                    <p className="mt-4 text-sm text-muted font-light">
                      Compatible signs:{" "}
                      <span className="text-ink">
                        {asc.interpretation.compatibility.join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Horoscope results */}
        {horoscope && tab === "horoscope" && (
          <div ref={resultRef} className="mt-10 sm:mt-14 space-y-6 animate-fade-up">
            <div className="rounded-[1.75rem] border border-gold/20 bg-night text-white p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-0 star-field opacity-50 pointer-events-none" />
              <div className="relative grid sm:grid-cols-[auto_1fr] gap-6 items-center">
                <div className="mx-auto sm:mx-0 w-28 h-28 rounded-full border-2 border-gold/40 flex flex-col items-center justify-center bg-white/5">
                  <span className="font-display text-3xl font-semibold text-gold-soft">
                    {horoscope.overallScore ?? "—"}
                  </span>
                  <span className="font-brand text-[8px] tracking-[0.2em] uppercase text-white/50">
                    Today
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-brand text-[10px] tracking-[0.35em] uppercase text-gold">
                    Daily Vedic forecast
                  </p>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
                    {horoscope.rashi || "Your day"}{" "}
                    {horoscope.rashiLord && (
                      <span className="text-gold-soft text-lg italic font-normal">
                        · ruled by {horoscope.rashiLord}
                      </span>
                    )}
                  </h2>
                  <p className="mt-3 text-white/65 font-light leading-relaxed">
                    {horoscope.summary}
                  </p>
                </div>
              </div>
            </div>

            {horoscope.areas?.length > 0 && (
              <div className="rounded-[1.5rem] border border-gold/15 bg-white/90 p-5 sm:p-8 space-y-4">
                <h3 className="font-display text-xl font-semibold text-ink">
                  Life areas
                </h3>
                {horoscope.areas.map((a) => (
                  <ScoreBar
                    key={a.area}
                    label={a.area}
                    score={a.score}
                    sentiment={a.sentiment}
                  />
                ))}
              </div>
            )}

            {horoscope.predictions && (
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(horoscope.predictions).map(([key, val]) => (
                  <div
                    key={key}
                    className="rounded-[1.5rem] border border-gold/15 bg-white/90 p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-lg font-semibold text-ink capitalize">
                        {key}
                      </h4>
                      <span className="text-sm font-display italic text-gold-deep">
                        {val.score}%
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted font-light leading-relaxed">
                      {val.text}
                    </p>
                    {val.tip && (
                      <p className="mt-3 text-xs text-gold-deep font-medium">
                        Tip: {val.tip}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {horoscope.luckyElements && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                <StatPill
                  label="Lucky color"
                  value={horoscope.luckyElements.luckyColor}
                />
                <StatPill
                  label="Lucky number"
                  value={horoscope.luckyElements.luckyNumber}
                />
                <StatPill
                  label="Lucky day"
                  value={horoscope.luckyElements.luckyDay}
                />
                <StatPill
                  label="Direction"
                  value={horoscope.luckyElements.luckyDirection}
                />
                <StatPill
                  label="Lucky time"
                  value={horoscope.luckyElements.luckyTime}
                />
                {horoscope.dasha && (
                  <StatPill
                    label="Maha dasha"
                    value={horoscope.dasha.mahaDashaLord}
                  />
                )}
              </div>
            )}

            {horoscope.remedies?.length > 0 && (
              <div className="rounded-[1.5rem] border border-gold/15 bg-blush/50 p-5 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-ink mb-4 flex items-center gap-2">
                  <Compass size={18} className="text-gold-deep" />
                  Remedies & guidance
                </h3>
                <ul className="space-y-2.5">
                  {horoscope.remedies.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2.5 text-sm text-ink/80 font-light"
                    >
                      <span className="text-gold-deep shrink-0">✦</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {horoscope.quote?.text && (
              <div className="rounded-[1.5rem] border border-gold/20 bg-gradient-to-br from-night to-night-soft text-white p-6 sm:p-8 text-center">
                <Moon className="mx-auto text-gold mb-3" size={22} />
                <p className="font-display text-xl sm:text-2xl italic leading-relaxed">
                  “{horoscope.quote.text}”
                </p>
                {horoscope.quote.source && (
                  <p className="mt-3 font-brand text-[10px] tracking-[0.25em] uppercase text-gold/70">
                    {horoscope.quote.source}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Cross links */}
        <div className="mt-12 rounded-[1.5rem] border border-gold/20 bg-white/70 p-6 sm:p-8 text-center">
          <h3 className="font-display text-2xl font-semibold text-ink">
            Explore more destiny tools
          </h3>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/lucky-name"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm"
            >
              Lucky Name Score
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/compatibility"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium"
            >
              Name Compatibility
            </Link>
            <Link
              to="/palmistry"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium"
            >
              <Calendar size={16} className="text-gold-deep" />
              Palm Reading
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kundali;
