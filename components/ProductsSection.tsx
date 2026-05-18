'use client';

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight } from "lucide-react";
import ProductItem from "./ProductItem";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

/* ─── Badge config per position ────────────────────────────── */
const BADGE_VARIANTS = [
  { label: { en: "Best Seller", sw: "Kiuzwaji Zaidi" }, style: "bg-brand-gold-500 text-brand-gold-900" },
  { label: { en: "Popular",     sw: "Maarufu"         }, style: "bg-brand-green-500 text-brand-white"  },
  { label: { en: "New",         sw: "Mpya"             }, style: "border border-brand-gold-500 text-brand-gold-600 bg-transparent" },
];

const CoursesSection = () => {
  const [featuredCourses, setFeaturedCourses] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { language } = useLanguage();

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT}/api/products`);
        const data = await response.json();
        const featured = data.filter((c: Product) => c?.featured).slice(0, 3);
        if (featured.length < 3) {
          const nonFeatured = data
            .filter((c: Product) => !c.featured)
            .slice(0, 3 - featured.length);
          setFeaturedCourses([...featured, ...nonFeatured]);
        } else {
          setFeaturedCourses(featured);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const t = {
    loading:        { en: "Loading courses…",      sw: "Inapakia kozi…"          },
    eyebrow:        { en: "Featured Courses",       sw: "Kozi Zilizochaguliwa"    },
    heading1:       { en: "Learn &",               sw: "Jifunza &"               },
    heading2:       { en: "Grow",                  sw: "Kukua"                   },
    viewAllCourses: { en: "View all courses",       sw: "Angalia kozi zote"       },
  };

  /* ── shared card container animations ───────────────────── */
  const cardVariants = {
    hidden:  { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="bg-brand-gray-50 py-16 md:py-24 overflow-hidden font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="flex items-end justify-between mb-10 md:mb-14 gap-4">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-brand-gold-500 flex-shrink-0" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-green-500">
                {t.eyebrow[language]}
              </span>
            </div>

            {/* Display heading */}
            <h2 className="font-display leading-none m-0" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
              <span className="text-brand-gray-900 block">{t.heading1[language]}</span>
              <span
                className="block"
                style={{ WebkitTextStroke: "1.5px #161616", color: "transparent" }}
              >
                {t.heading2[language]}
              </span>
            </h2>
          </motion.div>

          {/* View all — desktop */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.15em] uppercase text-brand-green-600 hover:text-brand-green-700 border-b border-brand-green-500 pb-0.5 transition-colors duration-200 group"
            >
              {t.viewAllCourses[language]}
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* ── LOADING ────────────────────────────────────────── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 rounded-full border-[3px] border-brand-green-100 border-t-brand-green-500 animate-spin mb-4" />
            <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-500">
              {t.loading[language]}
            </p>
          </div>
        ) : (
          <>
            {/* ── DESKTOP GRID ───────────────────────────────── */}
            {/* Featured card (col 1, spans 2 rows) + 2 stacked small cards (col 2) */}
            <div className="hidden lg:grid grid-cols-[1fr_1fr] gap-3 items-start">

              {/* Featured card */}
              {featuredCourses[0] && (
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="row-span-2 bg-brand-gray-900 rounded border-0 overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300"
                  style={{ boxShadow: "0 0 0 0.5px #383838" }}
                >
                  {/* Image zone */}
                  <div className="relative w-full overflow-hidden" style={{ height: 260 }}>
                    <div className="absolute inset-0 bg-brand-green-800 flex items-end justify-end p-4 opacity-80">
                      {/* placeholder tint — replace with <Image> */}
                    </div>
                    {/* Badge */}
                    <span className={`absolute top-3 left-3 z-10 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-[2px] ${BADGE_VARIANTS[0].style}`}>
                      {BADGE_VARIANTS[0].label[language]}
                    </span>
                    <ProductItem product={featuredCourses[0]} variant="image-only" />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <ProductItem product={featuredCourses[0]} variant="body-dark" />

                    {/* CTA */}
                    <div className="mt-auto pt-5 border-t border-brand-gray-800 flex items-center justify-between">
                      <ProductItem product={featuredCourses[0]} variant="price-dark" />
                      <Link
                        href={`/courses/${featuredCourses[0].id}`}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase px-4 py-2 rounded-[2px] bg-brand-gold-500 text-brand-gold-900 hover:bg-brand-gold-400 transition-colors duration-200 group/btn"
                      >
                        Enroll now
                        <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Small cards stack */}
              {featuredCourses.slice(1, 3).map((course, idx) => (
                <motion.div
                  key={course.id}
                  custom={idx + 1}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-brand-white rounded overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300"
                  style={{ boxShadow: "0 0 0 0.5px #e0e0e0" }}
                >
                  {/* Image zone */}
                  <div className="relative w-full overflow-hidden" style={{ height: 140 }}>
                    <span className={`absolute top-3 left-3 z-10 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-[2px] ${BADGE_VARIANTS[idx + 1].style}`}>
                      {BADGE_VARIANTS[idx + 1].label[language]}
                    </span>
                    <ProductItem product={course} variant="image-only" />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <ProductItem product={course} variant="body-light" />

                    <div className="mt-auto pt-4 border-t border-brand-gray-200 flex items-center justify-between">
                      <ProductItem product={course} variant="price-light" />
                      <Link
                        href={`/courses/${course.id}`}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase px-4 py-2 rounded-[2px] bg-brand-green-500 text-brand-white hover:bg-brand-green-600 transition-colors duration-200 group/btn"
                      >
                        Enroll
                        <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── MOBILE / TABLET SWIPER ─────────────────────── */}
            <div className="lg:hidden">
              <Swiper
                modules={[Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                coverflowEffect={{ rotate: 4, stretch: 0, depth: 80, modifier: 2, slideShadows: false }}
                spaceBetween={12}
                slidesPerView="auto"
                centeredSlides
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                className="pb-14 pt-6"
              >
                {featuredCourses.map((course, idx) => (
                  <SwiperSlide key={course.id} style={{ width: "82%", maxWidth: 320 }}>
                    <div
                      className={`rounded overflow-hidden flex flex-col ${idx === 0 ? "bg-brand-gray-900" : "bg-brand-white"}`}
                      style={{ boxShadow: idx === 0 ? "0 0 0 0.5px #383838" : "0 0 0 0.5px #e0e0e0" }}
                    >
                      <div className="relative overflow-hidden" style={{ height: 180 }}>
                        <span className={`absolute top-3 left-3 z-10 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-[2px] ${BADGE_VARIANTS[idx]?.style ?? BADGE_VARIANTS[0].style}`}>
                          {(BADGE_VARIANTS[idx] ?? BADGE_VARIANTS[0]).label[language]}
                        </span>
                        <ProductItem product={course} variant="image-only" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <ProductItem product={course} variant={idx === 0 ? "body-dark" : "body-light"} />
                        <div className={`mt-4 pt-4 border-t flex items-center justify-between ${idx === 0 ? "border-brand-gray-800" : "border-brand-gray-200"}`}>
                          <ProductItem product={course} variant={idx === 0 ? "price-dark" : "price-light"} />
                          <Link
                            href={`/courses/${course.id}`}
                            className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-[2px] transition-colors duration-200 ${idx === 0 ? "bg-brand-gold-500 text-brand-gold-900 hover:bg-brand-gold-400" : "bg-brand-green-500 text-brand-white hover:bg-brand-green-600"}`}
                          >
                            Enroll <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}

        {/* ── VIEW ALL — mobile ──────────────────────────────── */}
        <motion.div
          className="text-center mt-10 md:hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.15em] uppercase text-brand-green-600 border-b border-brand-green-500 pb-0.5 hover:text-brand-green-700 transition-colors duration-200 group"
          >
            {t.viewAllCourses[language]}
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default CoursesSection;