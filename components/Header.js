"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBell } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader2, UserCircle2, User2, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/courses",    en: "Courses",    sw: "Kozi"        },
  { href: "/programs",   en: "Programs",   sw: "Programu"    },
  { href: "/mentorship", en: "Mentorship", sw: "Ushauri"     },
  { href: "/about",      en: "About",      sw: "Kuhusu Sisi" },
];

// ─── Avatars ──────────────────────────────────────────────────────────────────
const UserAvatar = ({ user }) =>
  user?.image ? (
    <Image
      src={user.image} alt="User avatar" width={34} height={34}
      className="rounded-full object-cover ring-1 ring-brand-gray-700"
    />
  ) : (
    <span className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-brand-gray-800 ring-1 ring-brand-gray-700 text-brand-gray-400">
      <UserCircle2 size={18} strokeWidth={1.5} />
    </span>
  );

const AdminAvatar = ({ user }) =>
  user?.image ? (
    <Image
      src={user.image} alt="Admin avatar" width={36} height={36}
      className="rounded-full object-cover ring-1 ring-brand-gold-600"
    />
  ) : (
    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-gray-900 ring-1 ring-brand-gold-600 text-brand-gold-500">
      <User2 size={20} strokeWidth={1.5} />
    </span>
  );

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { data: session } = useSession();
  const pathname           = usePathname();
  const [language,     setLanguage]     = useState("en");
  const [isMenuOpen,   setIsMenuOpen]   = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);

  const t = (en, sw) => language === "sw" ? sw : en;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise(r => setTimeout(r, 900));
    await signOut();
    toast.success(t("Signed out.", "Umetoka kikamilifu."));
    setIsLoggingOut(false);
  };

  const isActive = (href) => pathname === href;

  // ── Admin navbar ─────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    return (
      <header className="bg-brand-black border-b border-brand-gray-800">
        <div className="h-16 flex items-center justify-between px-8 xl:px-16 max-w-screen-xl mx-auto">

          {/* Brand */}
          <Link href="/admin" className="flex items-center gap-4">
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline gap-0 leading-none">
                <span className="font-display text-3xl tracking-wide text-brand-green-400">
                  WOMANHOOD
                </span>
                <span className="font-display text-3xl tracking-wide text-brand-gold-400 ml-2">
                  SAFARI
                </span>
              </div>
              <span className="font-mono text-[0.5rem] tracking-ultra uppercase text-brand-gray-500 mt-1">
                ADMIN PANEL
              </span>
            </div>
            <span className="h-6 w-px bg-brand-gray-700 mx-1" />
            <span className="font-sans text-xs tracking-widest uppercase text-brand-gray-500 font-medium">
              Dashboard
            </span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(l => l === "en" ? "sw" : "en")}
              className="h-7 px-3 rounded-sm border border-brand-gray-700 font-mono text-2xs tracking-ultra uppercase
                         text-brand-gray-400 hover:border-brand-gold-500 hover:text-brand-gold-400
                         transition-all duration-150 active:scale-95"
            >
              {language}
            </button>

            {session?.user && (
              <div className="flex items-center gap-3">
                <button className="p-1.5 rounded text-brand-gray-500 hover:text-brand-gold-400 hover:bg-brand-gray-900 transition-colors">
                  <FaBell size={15} />
                </button>
                <div className="relative group">
                  <button className="block focus:outline-none" aria-label="Account menu">
                    <AdminAvatar user={session.user} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-52 bg-brand-gray-900 rounded border border-brand-gray-800
                                  opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                                  translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50 shadow-elevated">
                    <div className="px-4 py-3 border-b border-brand-gray-800">
                      <p className="text-sm font-sans font-semibold text-white tracking-wide truncate">{session.user.name}</p>
                      <p className="text-xs font-mono text-brand-gray-500 truncate mt-0.5">{session.user.email}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-sans tracking-wider uppercase
                                   text-brand-gray-400 hover:bg-brand-gray-800 hover:text-brand-gold-400 transition-colors"
                      >
                        {isLoggingOut
                          ? <><Loader2 size={12} className="animate-spin" />{t("Signing out…", "Inatoka…")}</>
                          : t("Sign Out", "Toka")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // ── Public navbar ─────────────────────────────────────────────────────────
  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        bg-brand-gray-900
        transition-all duration-300
        ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.35)]" : ""}
      `}
    >
      {/* Gold hairline — mirrors the eyebrow line in WHero */}
      <div className="h-[2px] w-full bg-brand-gold-500" />

      {/* Subtle grid texture — same as hero left panel */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)," +
            "repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)",
        }}
      />

      <div className="relative h-[4.25rem] flex items-center justify-between px-6 md:px-12 xl:px-20 max-w-screen-xl mx-auto">

        {/* Brand */}
        <Link href="/" className="flex flex-col leading-none group shrink-0">
          <div className="flex items-baseline">
            <span className="font-display tracking-wide text-brand-green-400 text-3xl md:text-4xl transition-colors duration-200 group-hover:text-brand-green-300">
              WOMANHOOD
            </span>
            <span className="font-display tracking-wide text-brand-gold-500 text-3xl md:text-4xl ml-2 transition-colors duration-200 group-hover:text-brand-gold-400">
              SAFARI
            </span>
          </div>
          <span className="font-mono text-[0.48rem] tracking-ultra uppercase text-brand-gray-500 mt-0.5 pl-0.5">
            Inspiring young women with Wisdom
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center">
          {NAV_LINKS.map(({ href, en, sw }) => (
            <Link
              key={href}
              href={href}
              className={`
                relative px-5 py-2 font-mono text-xs tracking-[0.18em] uppercase font-semibold
                transition-colors duration-150
                ${isActive(href)
                  ? "text-brand-white"
                  : "text-brand-gray-500 hover:text-brand-gray-200"}
              `}
            >
              {t(en, sw)}
              {isActive(href) && (
                <motion.span
                  layoutId="active-underline"
                  className="absolute inset-x-4 -bottom-px h-[2px] bg-brand-gold-500"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Language pill — mirrors hero's gold accent style */}
          <button
            onClick={() => setLanguage(l => l === "en" ? "sw" : "en")}
            className="h-7 px-3 border border-brand-gray-700 rounded-sm font-mono text-2xs tracking-ultra uppercase
                       text-brand-gray-400 hover:border-brand-gold-500 hover:text-brand-gold-400
                       transition-all duration-150 active:scale-95"
            aria-label="Toggle language"
          >
            {language}
          </button>

          {/* Session controls (desktop) */}
          {session?.user ? (
            <div className="hidden md:flex items-center gap-3">
              <button className="p-1.5 rounded text-brand-gray-500 hover:text-brand-gold-400 hover:bg-brand-gray-800 transition-colors">
                <FaBell size={14} />
              </button>
              <div className="relative group">
                <button className="block focus:outline-none" aria-label="Account menu">
                  <UserAvatar user={session.user} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-52 bg-brand-gray-900 rounded-sm border border-brand-gray-800
                                opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                                translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50 shadow-elevated">
                  <div className="px-4 py-3 border-b border-brand-gray-800">
                    <p className="text-sm font-sans font-semibold text-brand-white tracking-wide truncate">{session.user.name}</p>
                    <p className="text-xs font-mono text-brand-gray-500 truncate mt-0.5">{session.user.email}</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-mono tracking-wider uppercase
                                 text-brand-gray-400 hover:bg-brand-gray-800 hover:text-brand-gold-400 transition-colors"
                    >
                      {isLoggingOut
                        ? <><Loader2 size={12} className="animate-spin" />{t("Signing out…", "Inatoka…")}</>
                        : t("Sign Out", "Toka")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="font-mono text-xs tracking-[0.15em] uppercase text-brand-gray-400 hover:text-brand-white
                           px-4 py-2 transition-colors duration-150"
              >
                {t("Sign in", "Ingia")}
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 bg-brand-green-500 hover:bg-brand-green-600
                           text-brand-white font-mono text-xs tracking-[0.15em] uppercase
                           px-4 py-2 rounded-sm transition-colors duration-200"
              >
                {t("Get started", "Anza")}
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(v => !v)}
            className="md:hidden p-1.5 rounded-sm text-brand-gray-400 hover:text-brand-white hover:bg-brand-gray-800 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — dark panel matching hero left column */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-brand-gray-900 border-t border-brand-gray-800 relative"
          >
            {/* Same subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)," +
                  "repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)",
              }}
            />

            <div className="relative px-6 py-6 flex flex-col">
              {[{ href: "/", en: "Home", sw: "Nyumbani" }, ...NAV_LINKS].map(({ href, en, sw }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.2 }}
                >
                  <Link
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center justify-between py-4 border-b border-brand-gray-800 last:border-0
                      font-display text-2xl tracking-widest uppercase transition-colors duration-150
                      ${isActive(href)
                        ? "text-brand-white"
                        : "text-brand-gray-500 hover:text-brand-white"}
                    `}
                  >
                    <span>{t(en, sw)}</span>
                    {/* Gold dot on active — mirrors hero's gold accent */}
                    {isActive(href)
                      ? <span className="w-2 h-2 rounded-full bg-brand-gold-500" />
                      : <span className="h-[1px] w-4 bg-brand-gray-700" />
                    }
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.2 }}
                className="pt-5 flex flex-col gap-2"
              >
                {session?.user ? (
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center gap-2 border border-brand-gray-700 hover:border-brand-gray-500
                               text-brand-gray-400 hover:text-brand-white font-mono text-xs tracking-[0.15em] uppercase
                               py-3 rounded-sm transition-colors duration-150"
                  >
                    {isLoggingOut
                      ? <><Loader2 size={12} className="animate-spin" />{t("Signing out…", "Inatoka…")}</>
                      : t("Sign Out", "Toka")}
                  </button>
                ) : (
                  <>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center bg-brand-green-500 hover:bg-brand-green-600
                                 text-brand-white font-mono text-xs tracking-[0.15em] uppercase
                                 py-3 rounded-sm transition-colors duration-200"
                    >
                      {t("Get started", "Anza")}
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center border border-brand-gray-700 hover:border-brand-gray-500
                                 text-brand-gray-400 hover:text-brand-white font-mono text-xs tracking-[0.15em] uppercase
                                 py-3 rounded-sm transition-colors duration-150"
                    >
                      {t("Sign in", "Ingia")}
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};


export default Navbar;