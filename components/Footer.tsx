"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  FaFacebook, FaInstagram, FaTwitter,
  FaLinkedin, FaYoutube,
} from "react-icons/fa";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

// ─── Nav columns ──────────────────────────────────────────────────────────────
const QUICK_LINKS = [
  { href: "/courses",         en: "Courses",         sw: "Kozi"                },
  { href: "/programs",        en: "Programs",        sw: "Programu"            },
  { href: "/workshops",       en: "Workshops",       sw: "Warsha"              },
  { href: "/mentorship",      en: "Mentorship",      sw: "Ushauri"             },
  { href: "/success-stories", en: "Success Stories", sw: "Hadithi za Mafanikio"},
  { href: "/about",           en: "About Us",        sw: "Kuhusu Sisi"         },
];

const RESOURCE_LINKS = [
  { href: "/blog",    en: "Blog",           sw: "Blogu"              },
  { href: "/privacy", en: "Privacy Policy", sw: "Sera ya Faragha"    },
  { href: "/terms",   en: "Terms of Service", sw: "Sheria za Matumizi"},
];

const SOCIALS = [
  { href: "#", Icon: FaFacebook,  label: "Facebook"  },
  { href: "#", Icon: FaInstagram, label: "Instagram" },
  { href: "#", Icon: FaTwitter,   label: "Twitter"   },
  { href: "#", Icon: FaLinkedin,  label: "LinkedIn"  },
  { href: "#", Icon: FaYoutube,   label: "YouTube"   },
];

// ─── Tiny reusable column heading ────────────────────────────────────────────
const ColHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-5">
    <span className="w-4 h-[2px] bg-brand-gold-500 flex-shrink-0" />
    <h4 className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold-500">
      {children}
    </h4>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────
const Footer = () => {
  const { language } = useLanguage();
  const t = (en: string, sw: string) => language === "sw" ? sw : en;

  return (
    <footer className="bg-brand-gray-900 font-sans relative overflow-hidden">

      {/* Subtle grid texture — mirrors Navbar / WHero left column */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)," +
            "repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)",
        }}
      />

      {/* Gold top hairline — mirrors Navbar */}
      <div className="h-[2px] w-full bg-brand-gold-500" />

      {/* ── MAIN GRID ──────────────────────────────────────────────────── */}
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-8">

          {/* ── Brand column ─────────────────────────────────────────── */}
          <div>
            {/* Wordmark — identical markup to Navbar */}
            <Link href="/" className="inline-flex flex-col leading-none group mb-5 block">
              <div className="flex items-baseline">
                <span className="font-display tracking-wide text-brand-green-400 text-3xl md:text-4xl transition-colors duration-200 group-hover:text-brand-green-300">
                  WOMANHOOD
                </span>
                <span className="font-display tracking-wide text-brand-gold-500 text-3xl md:text-4xl ml-2 transition-colors duration-200 group-hover:text-brand-gold-400">
                  SAFARI
                </span>
              </div>
              <span className="font-mono text-[0.48rem] tracking-[0.3em] uppercase text-brand-gray-500 mt-0.5 pl-0.5">
                Inspiring young women with Wisdom
              </span>
            </Link>

            <p className="font-sans font-light text-sm leading-relaxed text-brand-gray-500 max-w-xs mb-7">
              {t(
                "Empowering women and young people through entrepreneurship education and practical business skills training across East Africa.",
                "Kuwezesha wanawake na vijana kupitia elimu ya ujasiriamali na mafunzo ya ujuzi wa biashara Afrika Mashariki.",
              )}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-sm border border-brand-gray-700
                             text-brand-gray-500 hover:border-brand-gold-500 hover:text-brand-gold-400
                             transition-all duration-150"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ──────────────────────────────────────────── */}
          <div>
            <ColHeading>{t("Quick Links", "Viungo Vya Haraka")}</ColHeading>
            <nav className="space-y-2.5">
              {QUICK_LINKS.map(({ href, en, sw }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-brand-gray-500
                             hover:text-brand-white transition-colors duration-150 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-gray-700 group-hover:bg-brand-gold-500 transition-colors duration-150 flex-shrink-0" />
                  {t(en, sw)}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Resources ────────────────────────────────────────────── */}
          <div>
            <ColHeading>{t("Resources", "Rasilimali")}</ColHeading>
            <nav className="space-y-2.5">
              {RESOURCE_LINKS.map(({ href, en, sw }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-brand-gray-500
                             hover:text-brand-white transition-colors duration-150 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-gray-700 group-hover:bg-brand-gold-500 transition-colors duration-150 flex-shrink-0" />
                  {t(en, sw)}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Contact ──────────────────────────────────────────────── */}
          <div>
            <ColHeading>{t("Contact Us", "Wasiliana Nasi")}</ColHeading>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Dar+es+Salaam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-brand-gray-500 hover:text-brand-white transition-colors duration-150 group"
                >
                  <FaMapMarkerAlt
                    size={13}
                    className="mt-0.5 flex-shrink-0 text-brand-gold-500 group-hover:text-brand-gold-400"
                  />
                  <span className="font-mono text-xs tracking-[0.06em] leading-relaxed">
                    Dar es Salaam,<br />Tanzania
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+255123456789"
                  className="flex items-center gap-3 text-brand-gray-500 hover:text-brand-white transition-colors duration-150 group"
                >
                  <FaPhone
                    size={12}
                    className="flex-shrink-0 text-brand-gold-500 group-hover:text-brand-gold-400"
                  />
                  <span className="font-mono text-xs tracking-[0.06em]">+255 123 456 789</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@womanhoodsafaris.com"
                  className="flex items-center gap-3 text-brand-gray-500 hover:text-brand-white transition-colors duration-150 group"
                >
                  <FaEnvelope
                    size={12}
                    className="flex-shrink-0 text-brand-gold-500 group-hover:text-brand-gold-400"
                  />
                  <span className="font-mono text-[11px] tracking-[0.04em]">
                    info@womanhoodsafaris.com
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── BOTTOM BAR ───────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-brand-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-brand-gray-600">
            © {new Date().getFullYear()} Womanhood Safaris.{" "}
            {t("All rights reserved.", "Haki zote zimehifadhiwa.")}
          </p>
          {/* Est. badge — mirrors hero image badge */}
          <span className="font-display text-[11px] tracking-[0.14em] uppercase px-3 py-1 rounded-[2px] bg-brand-gold-500 text-brand-black">
            Est. 2014
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;