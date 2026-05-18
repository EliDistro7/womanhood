"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Users, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatItem {
  value: string;
  label: string;
}

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  accentText: string;
}

// ─── Ticker marquee (CSS-only, no JS scroll needed) ──────────────────────────
const TICKER_ITEMS = [
  "Financial Training",
  "Financial Inclusion",
  "Financial Empowerment",
  "Women in Business",
  "East Africa",
  "Ujuzi wa Fedha",
  "Ujumuishaji wa Fedha",
  "Uwezeshaji wa Fedha",
];

// ─── Component ───────────────────────────────────────────────────────────────
const WHero = () => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animations after mount
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // ── Translations ─────────────────────────────────────────────────────────
  const t = {
    eyebrow: {
      en: "Financial Empowerment for Women",
      sw: "Uwezeshaji wa Kifedha kwa Wanawake",
    },
    headline1: { en: "Own Your", sw: "Miliki" },
    headline2: { en: "Financial", sw: "Mustakabali" },
    headline3: { en: "Future", sw: "Wako" },
    sub: {
      en: "Training, inclusion programs, and empowerment resources built specifically for women entrepreneurs across East Africa.",
      sw: "Mafunzo, programu za ujumuishaji, na rasilimali za uwezeshaji zilizoundwa maalum kwa wajasiriamali wanawake Afrika Mashariki.",
    },
    cta1: { en: "Start your journey", sw: "Anza safari yako" },
    cta2: { en: "Our programs", sw: "Programu zetu" },
    imgLocation: { en: "Dar es Salaam · Tanzania", sw: "Dar es Salaam · Tanzania" },
    viewAll: { en: "View all programs", sw: "Tazama programu zote" },
  };

  const stats: StatItem[] = [
    { value: "5K+", label: language === "en" ? "Women trained" : "Wanawake waliofunzwa" },
    { value: "94%", label: language === "en" ? "Success rate" : "Kiwango cha mafanikio" },
    { value: "10+", label: language === "en" ? "Years active" : "Miaka ya uzoefu" },
  ];

  const infoCards = [
    {
      value: "30+",
      label: language === "en" ? "Programs" : "Programu",
      accent: "border-brand-green-500",
    },
    {
      value: "24/7",
      label: language === "en" ? "Support" : "Msaada",
      accent: "border-brand-gold-500",
    },
  ];

  const services: ServiceItem[] = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: language === "en" ? "Financial Training" : "Mafunzo ya Fedha",
      description:
        language === "en"
          ? "Practical workshops and courses that build real money management skills."
          : "Warsha za vitendo na kozi zinazojenga ujuzi wa kweli wa usimamizi wa fedha.",
      accent: "bg-brand-green-50 text-brand-green-600",
      accentText: "border-l-brand-green-500",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: language === "en" ? "Financial Inclusion" : "Ujumuishaji wa Fedha",
      description:
        language === "en"
          ? "Connecting women to banking, credit, and investment systems."
          : "Kuunganisha wanawake na mifumo ya benki, mkopo, na uwekezaji.",
      accent: "bg-brand-gold-50 text-brand-gold-600",
      accentText: "border-l-brand-gold-500",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: language === "en" ? "Financial Empowerment" : "Uwezeshaji wa Fedha",
      description:
        language === "en"
          ? "Mentorship and community to grow confident, independent leaders."
          : "Ushauri na jamii kukuza viongozi wenye ujasiri na uhuru.",
      accent: "bg-brand-green-50 text-brand-green-700",
      accentText: "border-l-brand-green-600",
    },
  ];

  return (
    <section ref={heroRef} className="w-full overflow-hidden bg-brand-gray-50 font-sans">

      {/* ── HERO GRID ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[520px]">

        {/* LEFT: Dark headline column */}
        <div
          className={[
            "relative bg-brand-gray-900 flex flex-col justify-between",
            "px-8 md:px-12 py-12 md:py-16",
            // Diagonal clip on large screens
            "lg:[clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]",
            // Entrance animation
            "transition-all duration-700 ease-out",
            mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
          ].join(" ")}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)," +
                "repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)",
            }}
          />

          <div className="relative z-10">
            {/* Eyebrow */}
            <div
              className={[
                "flex items-center gap-3 mb-7",
                "transition-all duration-500 delay-100",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              <div className="h-[2px] w-7 bg-brand-gold-500 flex-shrink-0" />
              <span className="text-brand-gold-500 text-xs font-mono font-semibold tracking-[0.2em] uppercase">
                {t.eyebrow[language]}
              </span>
            </div>

            {/* Headline */}
            <h1
              className={[
                "font-display leading-none mb-6",
                "transition-all duration-600 delay-200",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              ].join(" ")}
              style={{ fontSize: "clamp(52px, 7vw, 84px)" }}
            >
              <span className="text-brand-white block">{t.headline1[language]}</span>
              <span className="text-brand-gold-500 block">{t.headline2[language]}</span>
              {/* Outlined text */}
              <span
                className="block"
                style={{
                  WebkitTextStroke: "1.5px #ffffff",
                  color: "transparent",
                }}
              >
                {t.headline3[language]}
              </span>
            </h1>

            {/* Subtext */}
            <p
              className={[
                "text-brand-gray-500 text-base font-sans font-light leading-relaxed max-w-sm mb-8",
                "transition-all duration-500 delay-300",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              {t.sub[language]}
            </p>

            {/* CTAs */}
            <div
              className={[
                "flex flex-wrap items-center gap-4",
                "transition-all duration-500 delay-[400ms]",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-brand-green-500 hover:bg-brand-green-600 text-brand-white font-sans font-semibold text-sm tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200 group"
              >
                {t.cta1[language]}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/all-programs"
                className="inline-flex items-center gap-2 border border-brand-gray-700 hover:border-brand-gray-500 text-brand-white font-sans font-medium text-sm tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200"
              >
                {t.cta2[language]}
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div
            className={[
              "relative z-10 pt-8 mt-8 border-t border-brand-gray-800",
              "flex flex-wrap gap-8 md:gap-12",
              "transition-all duration-500 delay-500",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            {stats.map((s, i) => (
              <div key={i}>
                <div
                  className="font-display text-brand-gold-500 leading-none"
                  style={{ fontSize: "clamp(28px, 3.5vw, 38px)" }}
                >
                  {s.value}
                </div>
                <div className="text-brand-gray-600 text-xs font-mono tracking-[0.1em] uppercase mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image fills the entire column edge-to-edge, no padding/whitespace */}
        <div
          className={[
            "relative bg-brand-green-700 overflow-hidden",
            // On mobile give it a reasonable height; lg stretches to fill grid row
            "min-h-[320px] lg:min-h-0",
            "transition-all duration-700 delay-200 ease-out",
            mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6",
          ].join(" ")}
        >
          {/* Image fills the full column */}
          <Image
            src="/e-learning-1.jpg"
            alt={
              language === "en"
                ? "Women entrepreneurs learning financial skills"
                : "Wajasiriamali wanawake wakijifunza ujuzi wa fedha"
            }
            fill
            className="object-cover"
            priority
          />

          {/* Gradient overlay — darkens toward bottom for card legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-900/25 via-transparent to-brand-black/75 pointer-events-none" />

          {/* Est. badge — top-right */}
          <div className="absolute top-5 right-5 z-10 bg-brand-gold-500 text-brand-black font-display text-xs tracking-[0.14em] uppercase px-3 py-1.5 rounded-sm">
            Est. 2014
          </div>

          {/* Location + info cards — pinned to bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 pt-14 bg-gradient-to-t from-brand-black/80 to-transparent">
            <p className="text-brand-white/80 text-xs font-mono font-medium tracking-[0.1em] uppercase mb-3">
              {t.imgLocation[language]}
            </p>

            {/* Info cards — frosted glass style so image shows through */}
            <div className="grid grid-cols-2 gap-2">
              {infoCards.map((card, i) => (
                <div
                  key={i}
                  className={`bg-brand-white/10 backdrop-blur-sm rounded-sm p-3 border-l-[3px] ${card.accent}`}
                >
                  <div
                    className="font-display text-brand-white leading-none"
                    style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                  >
                    {card.value}
                  </div>
                  <div className="text-brand-white/70 text-xs font-mono tracking-[0.1em] uppercase mt-0.5">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TICKER STRIP ─────────────────────────────────────────────── */}
      <div className="bg-brand-green-500 py-2.5 overflow-hidden">
        <div
          className="flex gap-10 whitespace-nowrap"
          style={{
            animation: "ws-ticker 28s linear infinite",
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-brand-green-200 flex-shrink-0"
            >
              <span className="w-1 h-1 rounded-full bg-brand-gold-500 inline-block flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>

        <style>{`
          @keyframes ws-ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── SERVICES STRIP ───────────────────────────────────────────── */}
      <div className="bg-brand-white border-t border-brand-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-gray-200">
          {services.map((svc, i) => (
            <div
              key={i}
              className={[
                "flex items-start gap-4 px-8 py-7 group hover:bg-brand-gray-50 transition-colors duration-200",
                "border-l-[3px]",
              ].join(" ")}
              style={{
                borderLeftColor:
                  i === 1
                    ? "var(--tw-color-brand-gold-500, #c8960a)"
                    : "var(--tw-color-brand-green-500, #2d7a2d)",
              }}
            >
              {/* Icon bubble */}
              <div
                className={`w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 ${svc.accent} transition-transform duration-200 group-hover:-translate-y-0.5`}
              >
                {svc.icon}
              </div>

              <div>
                <h3 className="font-sans font-bold text-brand-gray-900 text-sm tracking-[0.06em] uppercase mb-1 group-hover:text-brand-green-600 transition-colors duration-200">
                  {svc.title}
                </h3>
                <p className="font-sans text-brand-gray-500 text-xs leading-relaxed">
                  {svc.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center py-5 border-t border-brand-gray-100">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-brand-green-600 hover:text-brand-green-700 font-sans font-semibold text-xs tracking-[0.12em] uppercase transition-colors duration-200 group"
          >
            {t.viewAll[language]}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

    </section>
  );
};

export default WHero;