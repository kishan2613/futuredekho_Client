import {
  ArrowRight,
  Sparkles,
  Stars,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import HeroBanner from "../assets/HeroBanner.png"

function HomePage() {

    const heroImage =
"https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?auto=format&fit=crop&w=1200&q=80";

const palmImage =
"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80";

const zodiacImage =
"https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80";

const astrologyBg =
"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80";


  return (
    <div className="bg-white overflow-hidden">
      {/* HERO */}
      <section
  className="relative min-h-screen bg-cover bg-center"
  style={{
backgroundImage: `url(${HeroBanner})`,  }}
>
  {/* Light overlay for readability */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/65 to-transparent" />

  <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
    <div className="max-w-2xl">


  <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-medium">
    <Sparkles size={18} />
    AI Powered Palmistry
  </span>

  <h1 className="mt-8 text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
    Discover What
    <span className="block text-orange-500">
      Your Palm
    </span>
    Reveals
  </h1>

  <p className="mt-6 text-lg text-gray-700 max-w-xl">
    Decode the hidden messages in your palm and
    receive personalized astrology guidance powered
    by advanced AI technology.
  </p>

  <div className="mt-10 flex gap-4">

    <Link to="/palmistry">
      <button className="px-8 py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow-lg">
        Start Free Reading
      </button>
    </Link>

    <button className="px-8 py-4 rounded-xl border border-orange-300 bg-white/70 backdrop-blur-sm hover:bg-white">
      Explore Astrology
    </button>

  </div>

</div>
```

  </div>
</section>


      {/* FEATURE SECTION */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div>
              <img
                src={palmImage}
                alt="Palm Analysis"
                className="rounded-[32px] shadow-xl"
              />
            </div>

            <div>
              <span className="text-orange-500 font-semibold">
                ADVANCED ANALYSIS
              </span>

              <h2 className="text-5xl font-bold mt-4">
                AI Palm Reading
              </h2>

              <p className="mt-6 text-gray-600 text-lg">
                Upload your palm image and receive
                detailed insights about your personality,
                destiny, career, relationships and life path.
              </p>

              <div className="mt-10 space-y-6">

                <div className="flex gap-4">
                  <ShieldCheck className="text-orange-500" />
                  <div>
                    <h4 className="font-semibold">
                      Secure Analysis
                    </h4>
                    <p className="text-gray-600">
                      Your images remain private.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Stars className="text-orange-500" />
                  <div>
                    <h4 className="font-semibold">
                      Personalized Results
                    </h4>
                    <p className="text-gray-600">
                      Tailored readings unique to your palm.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ZODIAC SHOWCASE */}
      <section className="py-28 bg-orange-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <h2 className="text-5xl font-bold">
              Explore Your Zodiac
            </h2>

            <p className="mt-4 text-gray-600">
              Discover cosmic influences shaping your future.
            </p>
          </div>

          <div className="mt-16 flex justify-center">
            <img
              src={zodiacImage}
              alt="Zodiac Wheel"
              className="w-[600px] max-w-full"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-16">
            {[
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
            ].map((sign) => (
              <div
                key={sign}
                className="bg-white p-6 rounded-2xl text-center shadow hover:-translate-y-2 transition"
              >
                {sign}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-center text-5xl font-bold">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-20">

            {[
              {
                step: "01",
                title: "Upload Palm",
              },
              {
                step: "02",
                title: "AI Analysis",
              },
              {
                step: "03",
                title: "Get Reading",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-10 shadow-xl text-center"
              >
                <div className="text-5xl font-bold text-orange-500">
                  {item.step}
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {item.title}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PARALLAX CTA */}
      <section
        className="relative py-40 bg-cover bg-center"
        style={{
          backgroundImage: `url(${astrologyBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">

          <h2 className="text-6xl font-bold">
            Your Destiny Awaits
          </h2>

          <p className="mt-6 text-xl text-gray-200">
            Unlock hidden insights from your palm and
            discover what the stars have planned for you.
          </p>

          <button className="mt-10 bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-xl font-semibold inline-flex items-center gap-3">
            Start Your Reading
            <ArrowRight size={18} />
          </button>

        </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div>
              <h3 className="text-5xl font-bold text-orange-500">
                50K+
              </h3>
              <p className="mt-3 text-gray-600">
                Palm Readings
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-orange-500">
                100K+
              </h3>
              <p className="mt-3 text-gray-600">
                Astrology Reports
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-orange-500">
                98%
              </h3>
              <p className="mt-3 text-gray-600">
                User Satisfaction
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

export default HomePage;