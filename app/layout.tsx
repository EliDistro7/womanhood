import type { Metadata } from "next";
import { Barlow_Condensed, Roboto_Mono } from "next/font/google";
// ts-ignore
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";

import { LanguageProvider } from "@/context/LanguageContext";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const barlowCondensed = Barlow_Condensed({
  subsets:  ["latin"],
  variable: "--font-barlow",
  weight:   ["300", "400", "500", "600", "700"],
  style:    ["normal", "italic"],
  display:  "swap",
});

const robotoMono = Roboto_Mono({
  subsets:  ["latin"],
  variable: "--font-mono",
  weight:   ["300", "400", "500"],
  display:  "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:       "Womanhood Safari — Inspiring young women with Wisdom",
  description: "Courses, programs and mentorship for women.",
};

// ─── Layout ───────────────────────────────────────────────────────────────────
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  return (
    <html
      lang="en"
      data-theme="light"
      className={`${barlowCondensed.variable} ${robotoMono.variable}`}
    >
      <head>
        {/*
          Bebas Neue — tall display font for brand name + headings.
          Not available in next/font/google, so loaded via <link>.
          For self-hosting: download from Google Fonts and use @font-face in globals.css instead.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans bg-white text-brand-black antialiased"
        style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
      >
        <LanguageProvider>
          <SessionProvider session={session}>
            {/* Offset fixed navbar */}
            <div className="pt-[4.5rem]">
              <Header />
              <Providers>{children}</Providers>
              <Footer />
            </div>
          </SessionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}