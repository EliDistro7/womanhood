// CoursesSection.tsx
'use client';

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Award, Sparkles, TrendingUp } from "lucide-react";
import ProductItem from "./ProductItem";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const CoursesSection = () => {
  const [featuredCourses, setFeaturedCourses] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { language } = useLanguage();

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT}/api/products`);
        const data = await response.json();
        
        // Get only the first 3 products or the ones marked as featured
        const featured = data.filter((course: Product) => course?.featured).slice(0, 3);
        
        // If there are fewer than 3 featured courses, add non-featured ones until we have 3
        if (featured.length < 3) {
          const nonFeatured = data.filter((course: Product) => !course.featured).slice(0, 3 - featured.length);
          setFeaturedCourses([...featured, ...nonFeatured]);
        } else {
          setFeaturedCourses(featured);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const translations = {
    loading: {
      en: "Loading courses...",
      sw: "Inapakia kozi..."
    },
    featuredCourses: {
      en: "Featured Courses",
      sw: "Kozi Zilizochaguliwa"
    },
    courses: {
      en: "Courses",
      sw: "Kozi"
    },
    viewAllCourses: {
      en: "View All Courses",
      sw: "Angalia Kozi Zote"
    },
    bestSeller: {
      en: "Best Seller",
      sw: "Kiuzwaji Zaidi"
    },
    popular: {
      en: "Popular",
      sw: "Maarufu"
    },
    new: {
      en: "New",
      sw: "Mpya"
    }
  };



  return (
    <div className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="max-w-lg mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 font-medium text-sm">
              <Sparkles size={16} />
              <span>{translations.courses[language]}</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {translations.featuredCourses[language]}
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin mb-4" />
            <p className="text-neutral-600 font-medium">
              {translations.loading[language]}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop view - 3 columns with enhanced styling */}
            <div className="hidden lg:grid grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <ProductItem key={course.id} product={course} />
              ))}
            </div>
            
            {/* Mobile/Tablet view - Enhanced Swiper with 3D effect */}
            <div className="lg:hidden">
              <Swiper
                modules={[Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 5,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                spaceBetween={16}
                slidesPerView="auto"
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                className="pb-16 pt-8"
                style={{ padding: "30px 0" }}
              >
                {featuredCourses.map((course) => (
                  <SwiperSlide key={course.id} style={{ width: '85%', maxWidth: '340px' }}>
                    <ProductItem product={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
        
        {/* View all courses button with enhanced styling */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all transform hover:-translate-y-1 hover:shadow-glow-lg"
          >
            <span>{translations.viewAllCourses[language]}</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesSection;