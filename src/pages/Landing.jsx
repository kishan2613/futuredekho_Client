import { ArrowRight, Heart, ShieldCheck, Sparkles, Stars } from "lucide-react";
import { Link } from "react-router-dom";
import HeroBanner from "../assets/HeroBanner.png";
import {
  AnimatedChars,
  AnimatedWords,
  CountUp,
  Reveal,
  TextMarquee,
  TypeCycle,
} from "../components/TextMotion";

const palmImage =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80";
const zodiacImage =
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80";
const astrologyBg =
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=80";

const ZODIAC = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const MARQUEE_LINES = [
  "Heart line",
  "Fate line",
  "Life path",
  "Venus mount",
  "Destiny map",
  "Star-born",
  "Palm whispers",
  "Cosmic ink",
];

const CYCLE_WORDS = [
  "destiny",
  "career",
  "love",
  "purpose",
  "fortune",
  "clarity",
];

function HomePage() {
  return (
    <div className="bg-ivory overflow-hidden">
      {/* HERO — keep girl image */}
      <section
        className="relative min-h-[100svh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroBanner})` }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/30 via-transparent to-transparent pointer-events-none" />

        {/* Floating poetic fragments — fill empty air */}
        <p className="pointer-events-none hidden lg:block absolute top-[22%] right-[8%] font-display italic text-white/35 text-xl animate-drift animate-whisper">
          written in light…
        </p>
        <p className="pointer-events-none hidden lg:block absolute bottom-[28%] right-[18%] font-brand text-[10px] tracking-[0.45em] uppercase text-gold-soft/50 animate-drift-alt">
          read the lines
        </p>
        <p className="pointer-events-none hidden xl:block absolute top-[38%] right-[42%] font-display italic text-2xl text-gold/25 animate-float">
          ✦
        </p>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[100svh] flex items-center">
          <div className="max-w-xl lg:max-w-2xl py-20 sm:py-28 w-full">
            <p className="font-brand text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.42em] uppercase text-gold-deep">
              <AnimatedChars text="HathDekho" delay={0.1} />
            </p>

            <div className="ornament-line animate-draw mt-4 sm:mt-5" />

            <h1 className="mt-5 sm:mt-7 font-display text-[2.35rem] xs:text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.6rem] font-semibold leading-[1.1] text-ink">
              <AnimatedWords text="Discover what" delay={0.25} as="span" />
              <br />
              <span className="italic inline-block mt-1 animate-glow-text">
                <AnimatedWords
                  text="your palm"
                  delay={0.55}
                  wordClassName="text-gold-strong"
                />
              </span>
              <br />
              <span className="relative inline-block">
                <AnimatedWords text="reveals" delay={0.75} />
                <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-gold to-transparent animate-underline rounded-full" />
              </span>
            </h1>

            <p className="animate-fade-up delay-3 mt-5 sm:mt-8 text-base sm:text-lg md:text-xl text-muted font-light leading-relaxed max-w-lg">
              Decode the hidden lines of{" "}
              <TypeCycle
                words={CYCLE_WORDS}
                className="font-display italic text-gold-deep text-lg sm:text-xl md:text-2xl min-w-[5rem]"
              />{" "}
              — personalized palmistry & astrology, illuminated by AI.
            </p>

            <div className="animate-fade-up delay-4 mt-5 sm:mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-muted/80 font-light">
              <span className="flex items-center gap-1.5">
                <span className="text-gold">◆</span> Heart & fate lines
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gold">◆</span> Zodiac alignment
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gold">◆</span> Private & secure
              </span>
            </div>

            <div className="animate-fade-up delay-5 mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                to="/palmistry"
                className="btn-gold inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-[15px]"
              >
                Start Free Reading
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/compatibility"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-[15px] font-medium text-ink"
              >
                <Heart size={16} className="text-gold-deep" />
                Compatibility Match
              </Link>
            </div>

            <div className="animate-fade-up delay-5 mt-10 sm:mt-12 flex items-center gap-3 text-xs sm:text-sm text-muted">
              <Sparkles size={16} className="text-gold animate-pulse-soft shrink-0" />
              <span className="tracking-wide font-light">
                Trusted by seekers worldwide — your story starts here
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="border-y border-ink/5 bg-blush/50 py-5">
        <TextMarquee items={MARQUEE_LINES} />
      </div>

      {/* FEATURE */}
      <section id="about" className="relative py-28 lg:py-36">
        <div className="absolute top-20 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />
        <p className="pointer-events-none absolute left-4 top-1/3 hidden lg:block font-display text-[7rem] leading-none text-ink/[0.03] italic select-none -rotate-90 origin-left">
          destiny
        </p>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <div className="relative group">
                <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-gold/30 to-transparent opacity-60 blur-xl group-hover:opacity-90 transition duration-700" />
                <img
                  src={palmImage}
                  alt="Palm analysis"
                  className="relative w-full aspect-[4/5] object-cover rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(10,15,28,0.45)]"
                />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-night/70 backdrop-blur-md border border-white/10 px-5 py-4 text-white overflow-hidden">
                  <p className="font-brand text-[10px] tracking-[0.3em] uppercase text-gold-soft">
                    Live insight
                  </p>
                  <p className="mt-1 font-display text-lg italic">
                    <TypeCycle
                      words={[
                        "Every line tells a story",
                        "Your palm holds a map",
                        "The stars lean closer",
                      ]}
                      className="min-h-[1.5em]"
                    />
                  </p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="font-brand text-[11px] tracking-[0.35em] uppercase text-gold-deep">
                  Advanced analysis
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-ink leading-tight">
                  <AnimatedWords text="AI palm reading with" delay={0} />{" "}
                  <span className="italic text-gold-shine">soul</span>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 text-muted text-lg font-light leading-relaxed max-w-md">
                  Upload your palm and receive vivid insights on personality,
                  destiny, career, relationships, and life path — crafted to
                  feel personal, never generic.
                </p>
              </Reveal>

              <div className="mt-12 space-y-8">
                <Reveal delay={0.2}>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-blush flex items-center justify-center text-gold-deep border border-gold/20">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">
                        Secure analysis
                      </h3>
                      <p className="mt-1.5 text-muted font-light">
                        Your images stay private — used only for your reading.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.28}>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-blush flex items-center justify-center text-gold-deep border border-gold/20">
                      <Stars size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">
                        Personalized results
                      </h3>
                      <p className="mt-1.5 text-muted font-light">
                        Readings tailored to your unique palm and questions.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.36}>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-blush flex items-center justify-center text-gold-deep border border-gold/20">
                      <Heart size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">
                        Conversational guidance
                      </h3>
                      <p className="mt-1.5 text-muted font-light">
                        Ask follow-ups — love, career, timing — in real time.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reverse marquee */}
      <div className="border-y border-ink/5 bg-ivory py-4">
        <TextMarquee
          items={[
            "Moon child",
            "Rising sign",
            "Palm of fortune",
            "Saturn return",
            "Golden hour",
            "Soul map",
          ]}
          reverse
        />
      </div>

      {/* ZODIAC */}
      <section
        id="zodiac"
        className="relative py-28 lg:py-36 bg-night text-white overflow-hidden"
      >
        <div className="absolute inset-0 star-field opacity-80 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-gold/10 blur-3xl animate-pulse-soft pointer-events-none" />

        {/* Orbiting words */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
          <div className="relative w-[28rem] h-[28rem] animate-orbit">
            {["✦ fate", "✦ love", "✦ time", "✦ light"].map((t, i) => (
              <span
                key={t}
                className="absolute left-1/2 top-0 font-brand text-[10px] tracking-[0.3em] uppercase text-gold-soft"
                style={{
                  transform: `rotate(${i * 90}deg) translateY(-10rem)`,
                  transformOrigin: "0 10rem",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-brand text-[11px] tracking-[0.4em] uppercase text-gold">
                Cosmic map
              </p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold">
                Explore your{" "}
                <span className="italic text-gold-shine animate-glow-text">
                  zodiac
                </span>
              </h2>
              <p className="mt-5 text-white/55 text-lg font-light">
                Discover the celestial currents shaping your{" "}
                <TypeCycle
                  words={["path", "passion", "purpose", "future"]}
                  className="text-gold-soft italic font-display"
                />
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex justify-center">
              <div className="relative animate-float">
                <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl scale-90" />
                <img
                  src={zodiacImage}
                  alt="Zodiac atmosphere"
                  className="relative w-full max-w-md aspect-square object-cover rounded-full border border-gold/25 shadow-[0_0_80px_-20px_rgba(232,163,23,0.5)]"
                />
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ZODIAC.map((sign, i) => (
              <Reveal key={sign} delay={i * 0.04}>
                <div className="group py-5 px-3 text-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-gold/10 hover:border-gold/35 transition duration-300 cursor-default">
                  <span className="font-display text-lg italic text-white/85 group-hover:text-gold-soft transition group-hover:animate-glow-text">
                    {sign}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPATIBILITY TEASER */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-night text-white">
        <div className="absolute inset-0 star-field opacity-70 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-3xl animate-pulse-soft pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-brand text-[11px] tracking-[0.4em] uppercase text-gold">
              Love & destiny
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance">
              Check your{" "}
              <span className="italic text-gold-shine">compatibility</span>
            </h2>
            <p className="mt-5 text-white/55 text-lg font-light max-w-xl mx-auto leading-relaxed">
              Enter two names and discover love scores, chemistry, marriage
              potential, and the cosmic story of your bond.
            </p>
            <Link
              to="/compatibility"
              className="btn-gold mt-10 inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl"
            >
              <Heart size={18} />
              Try Name Match
              <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 lg:py-36 bg-blush/60 relative overflow-hidden">
        <p className="pointer-events-none absolute right-0 top-10 font-display text-[9rem] text-ink/[0.04] italic select-none leading-none">
          ritual
        </p>

        <div className="max-w-6xl mx-auto px-6 relative">
          <Reveal>
            <div className="text-center">
              <p className="font-brand text-[11px] tracking-[0.35em] uppercase text-gold-deep">
                Simple ritual
              </p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-ink">
                <AnimatedWords text="How it works" delay={0} />
              </h2>
              <p className="mt-4 text-muted font-light max-w-md mx-auto">
                Three steps from open palm to living insight.
              </p>
            </div>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-10 lg:gap-14">
            {[
              {
                step: "01",
                title: "Upload Palm",
                desc: "Capture a clear image of your open palm — soft light works best.",
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "We map lines, mounts, and luminous patterns into meaning.",
              },
              {
                step: "03",
                title: "Get Reading",
                desc: "Chat with your personal destiny guide — ask anything.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.12}>
                <div className="relative text-center md:text-left group">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-10 left-[55%] w-[90%] h-px bg-gradient-to-r from-gold/50 to-transparent" />
                  )}
                  <span className="font-display text-6xl font-semibold text-gold/25 italic group-hover:text-gold/45 transition">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-muted font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-36 lg:py-44 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${astrologyBg})` }}
      >
        <div className="absolute inset-0 bg-night/75" />
        <div className="absolute inset-0 star-field opacity-60" />

        <p className="pointer-events-none absolute left-[8%] top-[20%] font-display italic text-white/20 text-2xl animate-drift hidden md:block">
          the night is listening
        </p>
        <p className="pointer-events-none absolute right-[10%] bottom-[22%] font-brand text-[10px] tracking-[0.4em] uppercase text-gold/40 animate-drift-alt hidden md:block">
          open your palm
        </p>

        <Reveal>
          <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
            <p className="font-brand text-[11px] tracking-[0.4em] uppercase text-gold">
              Begin tonight
            </p>
            <h2 className="mt-5 font-display text-5xl sm:text-6xl font-semibold">
              Your destiny{" "}
              <span className="italic text-gold-shine animate-glow-text">
                awaits
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/60 font-light max-w-lg mx-auto leading-relaxed">
              Unlock the map written in your palm — and meet the stars halfway.
            </p>
            <Link
              to="/palmistry"
              className="btn-gold mt-10 inline-flex items-center gap-3 px-10 py-4 rounded-2xl"
            >
              Start Your Reading
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* STATS */}
      <section className="py-20 lg:py-24 bg-ivory border-t border-ink/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { end: 50, suffix: "K+", label: "Palm Readings" },
              { end: 100, suffix: "K+", label: "Astrology Reports" },
              { end: 98, suffix: "%", label: "User Satisfaction" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <h3 className="font-display text-5xl sm:text-6xl font-semibold text-gold-shine">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </h3>
                <p className="mt-3 font-brand text-[10px] tracking-[0.28em] uppercase text-muted">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 bg-night text-center overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 opacity-30">
          <TextMarquee
            items={["HathDekho", "palmistry", "astrology", "destiny"]}
            className="py-2"
            tone="dark"
          />
        </div>
        <p className="relative font-brand text-gold tracking-[0.2em] text-sm mt-8">
          HathDekho
        </p>
        <p className="relative mt-2 text-white/40 text-sm font-light">
          AI palmistry & astrology
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
