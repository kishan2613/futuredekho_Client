import { useEffect, useRef, useState } from "react";

/** Stagger each word into view */
export function AnimatedWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  as: Tag = "span",
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden mr-[0.28em] align-bottom"
        >
          <span
            className={`inline-block animate-word-up ${wordClassName}`}
            style={{ animationDelay: `${delay + i * 0.08}s` }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Split characters with cascade */
export function AnimatedChars({ text, className = "", delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block animate-char-pop"
          style={{
            animationDelay: `${delay + i * 0.045}s`,
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/** Rotating keyword (typewriter feel) */
export function TypeCycle({ words, className = "" }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const show = setTimeout(() => setPhase("out"), 2200);
    const next = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      setPhase("in");
    }, 2600);
    return () => {
      clearTimeout(show);
      clearTimeout(next);
    };
  }, [index, words.length]);

  return (
    <span className={`inline-block relative ${className}`}>
      <span
        key={`${index}-${phase}`}
        className={`inline-block ${
          phase === "in" ? "animate-type-in" : "animate-type-out"
        }`}
      >
        {words[index]}
      </span>
      <span className="animate-caret ml-0.5 inline-block w-[2px] h-[0.85em] bg-gold align-middle" />
    </span>
  );
}

/** Infinite marquee strip */
export function TextMarquee({
  items,
  reverse = false,
  className = "",
  tone = "light",
}) {
  const row = [...items, ...items];
  const textClass =
    tone === "dark"
      ? "text-white/70"
      : "text-ink/75";
  const starClass = tone === "dark" ? "text-gold" : "text-gold-deep";

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex gap-10 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`font-display italic text-2xl sm:text-3xl ${textClass} shrink-0`}
          >
            {item}
            <span className={`mx-6 ${starClass} not-italic`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Reveal when scrolled into view */
export function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "animate-reveal-up" : "opacity-0 translate-y-8"}`}
      style={{ animationDelay: visible ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
}

/** Count-up number */
export function CountUp({ end, suffix = "", duration = 1800, className = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  const numeric = parseFloat(String(end).replace(/[^\d.]/g, "")) || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(numeric * eased));
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, numeric, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
