import { useState } from "react";
import {
  ArrowRight,
  Baby,
  Calendar,
  Check,
  Copy,
  Heart,
  Loader2,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { generateBabyNames } from "../services/babyNameService";

function Chip({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-gold/20 bg-blush text-ink text-sm font-medium">
      {children}
    </span>
  );
}

function NameCard({ item, isTop }) {
  const [copied, setCopied] = useState(false);

  const copyName = async () => {
    try {
      await navigator.clipboard.writeText(item.name);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`relative rounded-[1.75rem] border p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 ${
        isTop
          ? "border-gold/40 bg-gradient-to-br from-[#fffaf0] to-white shadow-[0_20px_50px_-25px_rgba(180,130,20,0.4)]"
          : "border-gold/15 bg-white/90"
      }`}
    >
      {isTop && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-night text-gold px-3 py-1.5 text-xs font-medium">
            <Sparkles size={12} />
            Top Pick
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-brand text-[10px] tracking-[0.3em] uppercase text-gold-deep">
            #{String(item.rank).padStart(2, "0")}
          </p>

          <h3 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-ink">
            {item.name}
          </h3>

          {item.pronunciation && (
            <p className="mt-1 text-sm text-muted italic">
              {item.pronunciation}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={copyName}
          className="w-10 h-10 rounded-xl border border-gold/20 bg-white flex items-center justify-center text-gold-deep hover:bg-blush transition"
          title="Copy name"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.meaning && <Chip>{item.meaning}</Chip>}

        {item.origin && <Chip>{item.origin}</Chip>}

        {item.gender && <Chip>{item.gender}</Chip>}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-blush/60 border border-gold/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
            Name Number
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-gold-deep">
            {item.name_number || "—"}
          </p>
        </div>

        <div className="rounded-2xl bg-blush/60 border border-gold/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
            Lucky Number
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-gold-deep">
            {item.lucky_number || "—"}
          </p>
        </div>
      </div>

      {item.why_suggested && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
            Why this name?
          </p>

          <p className="mt-2 text-sm text-muted font-light leading-relaxed">
            {item.why_suggested}
          </p>
        </div>
      )}

      {item.personality_association && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
            Name energy
          </p>

          <p className="mt-2 text-sm text-muted font-light leading-relaxed">
            {item.personality_association}
          </p>
        </div>
      )}

      {item.family_name_fit && (
        <div className="mt-4 rounded-2xl bg-white border border-ink/5 p-4">
          <p className="text-xs font-semibold text-ink/70">
            Family name harmony
          </p>

          <p className="mt-1 text-sm text-muted font-light leading-relaxed">
            {item.family_name_fit}
          </p>
        </div>
      )}
    </div>
  );
}

function LuckyBabyNames() {
  const [form, setForm] = useState({
    surname: "",
    gender: "boy",
    birth_date: "",
    birth_time: "",
    birth_place: "",
    preferred_letter: "",
    preferred_syllable: "",
    style: "modern",
    meaning_preference: "",
    name_count: 10,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await generateBabyNames(form);

      if (!response?.success || !response?.data) {
        throw new Error("Invalid response from server");
      }

      setResult(response.data);

      setTimeout(() => {
        document
          .getElementById("baby-name-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);
    } catch (err) {
      console.error("Baby name generation error:", err);

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Could not generate baby names. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-[calc(100svh-4rem)] bg-atmosphere relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 star-field opacity-30 pointer-events-none" />

      <div className="absolute top-20 right-1/4 w-80 h-80 bg-gold/15 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />

      <div className="absolute bottom-20 left-1/5 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-white/70 text-gold-deep">
            <Baby size={15} />

            <span className="font-brand text-[10px] tracking-[0.3em] uppercase">
              Lucky Baby Names
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl sm:text-6xl font-semibold text-ink text-balance">
            Find a name{" "}
            <span className="italic text-gold-strong">
              written in the stars
            </span>
          </h1>

          <p className="mt-5 text-muted font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover beautiful, meaningful and traditionally auspicious names
            for your little one using Vedic naming traditions, numerology and
            your family's preferences.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleGenerate}
          className="mt-10 sm:mt-12 max-w-3xl mx-auto rounded-[2rem] border border-gold/20 bg-white/85 backdrop-blur-xl p-5 sm:p-8 shadow-[0_24px_60px_-28px_rgba(10,15,28,0.35)]"
        >
          {/* SECTION */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blush border border-gold/20 flex items-center justify-center text-gold-deep">
              <Baby size={18} />
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                Tell us about your little one
              </h2>

              <p className="text-sm text-muted">
                The more details you provide, the more personalized the names.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Baby gender
              </label>

              <select
                value={form.gender}
                onChange={(e) =>
                  updateField("gender", e.target.value)
                }
                className="input-class"
              >
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            {/* Surname */}
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Family surname
              </label>

              <input
                type="text"
                placeholder="e.g. Kumar"
                value={form.surname}
                onChange={(e) =>
                  updateField("surname", e.target.value)
                }
                className="input-class"
              />
            </div>

            {/* Birth date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Birth / expected date
                <span className="text-muted font-light ml-1">
                  (optional)
                </span>
              </label>

              <input
                type="date"
                value={form.birth_date}
                onChange={(e) =>
                  updateField("birth_date", e.target.value)
                }
                className="input-class"
              />
            </div>

            {/* Birth time */}
            <div>
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Birth / expected time
                <span className="text-muted font-light ml-1">
                  (optional)
                </span>
              </label>

              <input
                type="time"
                value={form.birth_time}
                onChange={(e) =>
                  updateField("birth_time", e.target.value)
                }
                className="input-class"
              />
            </div>

            {/* Birth place */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-ink/80">
                Birth place
                <span className="text-muted font-light ml-1">
                  (optional)
                </span>
              </label>

              <input
                type="text"
                placeholder="e.g. Delhi, India"
                value={form.birth_place}
                onChange={(e) =>
                  updateField("birth_place", e.target.value)
                }
                className="input-class"
              />
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="mt-8 pt-7 border-t border-ink/5">
            <div className="flex items-center gap-2 mb-5">
              <WandSparkles size={17} className="text-gold-deep" />

              <h3 className="font-display text-lg font-semibold text-ink">
                Name preferences
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Letter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-ink/80">
                  Preferred starting letter
                </label>

                <input
                  type="text"
                  maxLength={1}
                  placeholder="e.g. A"
                  value={form.preferred_letter}
                  onChange={(e) =>
                    updateField(
                      "preferred_letter",
                      e.target.value.toUpperCase()
                    )
                  }
                  className="input-class uppercase"
                />
              </div>

              {/* Syllable */}
              <div>
                <label className="block mb-2 text-sm font-medium text-ink/80">
                  Preferred syllable
                </label>

                <input
                  type="text"
                  placeholder="e.g. Aa, Vi, Ki"
                  value={form.preferred_syllable}
                  onChange={(e) =>
                    updateField("preferred_syllable", e.target.value)
                  }
                  className="input-class"
                />
              </div>

              {/* Style */}
              <div>
                <label className="block mb-2 text-sm font-medium text-ink/80">
                  Name style
                </label>

                <select
                  value={form.style}
                  onChange={(e) =>
                    updateField("style", e.target.value)
                  }
                  className="input-class"
                >
                  <option value="modern">Modern</option>
                  <option value="traditional">Traditional</option>
                  <option value="unique">Unique</option>
                  <option value="short">Short & Sweet</option>
                  <option value="royal">Royal</option>
                  <option value="spiritual">Spiritual</option>
                </select>
              </div>

              {/* Meaning */}
              <div>
                <label className="block mb-2 text-sm font-medium text-ink/80">
                  Meaning / theme
                </label>

                <input
                  type="text"
                  placeholder="e.g. wisdom, strength, love"
                  value={form.meaning_preference}
                  onChange={(e) =>
                    updateField(
                      "meaning_preference",
                      e.target.value
                    )
                  }
                  className="input-class"
                />
              </div>
            </div>
          </div>

          {/* Number of names */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-ink/80">
              Number of names
            </label>

            <div className="flex gap-2 flex-wrap">
              {[5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() =>
                    updateField("name_count", count)
                  }
                  className={`px-5 py-2.5 rounded-xl border text-sm transition ${
                    form.name_count === count
                      ? "bg-night text-gold border-night"
                      : "bg-white border-ink/10 text-ink hover:border-gold/30"
                  }`}
                >
                  {count} names
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full mt-7 py-4 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Finding beautiful names…
              </>
            ) : (
              <>
                Discover Lucky Names
                <Sparkles size={18} />
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-muted font-light">
            AI-powered naming insights inspired by Indian traditions
          </p>
        </form>

        {/* RESULTS */}
        {result && (
          <div
            id="baby-name-results"
            className="mt-12 sm:mt-16 space-y-6 animate-fade-up"
          >
            {/* RESULT HERO */}
            <div className="rounded-[2rem] border border-gold/20 bg-night text-white p-7 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-0 star-field opacity-50 pointer-events-none" />

              <div className="absolute -top-24 right-0 w-80 h-80 bg-gold/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative text-center max-w-3xl mx-auto">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Baby size={25} />
                </div>

                <p className="mt-5 font-brand text-[10px] tracking-[0.35em] uppercase text-gold">
                  HathDekho Baby Names
                </p>

                <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold">
                  Names for your little one ✨
                </h2>

                {result.message && (
                  <p className="mt-4 text-white/70 font-light leading-relaxed">
                    {result.message}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {result.baby_profile?.gender && (
                    <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">
                      {result.baby_profile.gender}
                    </span>
                  )}

                  {result.baby_profile?.preferred_letter && (
                    <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">
                      Letter {result.baby_profile.preferred_letter}
                    </span>
                  )}

                  {result.baby_profile?.style && (
                    <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm capitalize">
                      {result.baby_profile.style}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* TOP PICK */}
            {result.top_pick?.name && (
              <div className="rounded-[2rem] border border-gold/25 bg-gradient-to-br from-[#fff9e9] via-white to-[#fffdf8] p-6 sm:p-9">
                <div className="flex items-center gap-2 text-gold-deep">
                  <Star size={17} fill="currentColor" />

                  <span className="font-brand text-[10px] tracking-[0.3em] uppercase">
                    Featured Name
                  </span>
                </div>

                <div className="mt-5 grid md:grid-cols-[1fr_auto] gap-6 items-center">
                  <div>
                    <h3 className="font-display text-4xl sm:text-5xl font-semibold text-ink">
                      {result.top_pick.name}
                    </h3>

                    <p className="mt-2 text-lg text-gold-deep font-medium">
                      {result.top_pick.meaning}
                    </p>

                    <p className="mt-4 text-muted font-light leading-relaxed max-w-2xl">
                      {result.top_pick.reason}
                    </p>
                  </div>

                  <div className="w-24 h-24 rounded-full bg-night flex items-center justify-center mx-auto md:mx-0">
                    <Sparkles className="text-gold" size={30} />
                  </div>
                </div>
              </div>
            )}

            {/* THEMES */}
            {result.name_themes?.length > 0 && (
              <div className="rounded-[1.75rem] border border-gold/15 bg-blush/50 p-6 sm:p-8">
                <div className="text-center">
                  <p className="font-brand text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                    Name inspiration
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                    Themes chosen for your little one
                  </h3>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {result.name_themes.map((theme) => (
                    <Chip key={theme}>{theme}</Chip>
                  ))}
                </div>
              </div>
            )}

            {/* ALL NAMES */}
            <div>
              <div className="text-center mb-7">
                <p className="font-brand text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                  Your recommendations
                </p>

                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-ink">
                  Beautiful possibilities ✨
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {result.recommendations?.map((item, index) => (
                  <NameCard
                    key={`${item.name}-${index}`}
                    item={item}
                    isTop={item.rank === 1}
                  />
                ))}
              </div>
            </div>

            {/* NAMING BASIS */}
            {result.naming_basis && (
              <div className="rounded-[1.75rem] border border-gold/15 bg-white/90 p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <Sparkles size={17} className="text-gold-deep" />

                  <h3 className="font-display text-xl font-semibold text-ink">
                    How HathDekho chose these names
                  </h3>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {result.naming_basis.numerology_used && (
                    <Chip>Numerology considered</Chip>
                  )}

                  {result.naming_basis.preferred_letter_used && (
                    <Chip>Preferred letter considered</Chip>
                  )}

                  {result.naming_basis.family_name_considered && (
                    <Chip>Family name considered</Chip>
                  )}

                  {result.naming_basis.astrology_used && (
                    <Chip>Astrology considered</Chip>
                  )}
                </div>

                {result.naming_basis.explanation && (
                  <p className="mt-5 text-sm text-muted font-light leading-relaxed">
                    {result.naming_basis.explanation}
                  </p>
                )}
              </div>
            )}

            {/* PARENT NOTE */}
            {result.parent_note && (
              <div className="rounded-[1.75rem] border border-gold/20 bg-gradient-to-br from-night to-night-soft text-white p-7 sm:p-10 text-center">
                <Heart
                  size={22}
                  className="mx-auto text-gold"
                  fill="currentColor"
                />

                <p className="mt-5 font-display text-xl sm:text-2xl italic leading-relaxed max-w-3xl mx-auto">
                  “{result.parent_note}”
                </p>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="btn-gold inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl"
              >
                <Sparkles size={17} />
                Find More Names
              </button>

              <Link
                to="/compatibility"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium"
              >
                <Heart size={16} className="text-gold-deep" />
                Name Compatibility
              </Link>
            </div>

            {/* DISCLAIMER */}
            <p className="text-center text-xs text-muted max-w-2xl mx-auto leading-relaxed">
              HathDekho's naming suggestions are inspired by traditional
              astrology and numerology practices and are intended for
              cultural and entertainment purposes. Parents should make the
              final naming decision based on what feels meaningful to their
              family.
            </p>
          </div>
        )}
      </div>

      {/* Local input styling */}
      <style>{`
        .input-class {
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 1rem;
          border: 1px solid rgba(20, 20, 20, 0.1);
          background: rgba(255, 255, 255, 0.85);
          outline: none;
          transition: all 0.2s ease;
          font-weight: 300;
          color: #181818;
        }

        .input-class:focus {
          border-color: #e8a317;
          box-shadow: 0 0 0 4px rgba(232, 163, 23, 0.12);
        }

        .input-class::placeholder {
          color: rgba(20, 20, 20, 0.4);
        }
      `}</style>
    </div>
  );
}

export default LuckyBabyNames;