// TestimonialsCarousel.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';



const TestimonialsCarousel = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const translations = {
    title: {
      en: "Success Stories",
      sw: "Hadithi za Mafanikio"
    },
    subtitle: {
      en: "Hear from women who transformed their lives through our programs",
      sw: "Sikiliza kutoka kwa wanawake walioibadilisha maisha yao kupitia programu zetu"
    },
    founder: {
      en: "Founder",
      sw: "Mwanzilishi"
    },
    entrepreneur: {
      en: "Entrepreneur",
      sw: "Mjasiriamali"
    },
    businessOwner: {
      en: "Business Owner",
      sw: "Mmiliki wa Biashara"
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Kimathi",
      role: translations.founder[language],
      business: "EcoStyle Boutique",
      quote: {
        en: "Womanhood Safaris gave me the confidence and skills to launch my sustainable fashion business. Their mentorship program was transformative – I learned everything from financial planning to marketing strategy. Now I employ 5 women from my community!",
        sw: "Womanhood Safaris walinipa ujasiri na ujuzi wa kuanzisha biashara yangu ya mitindo endelevu. Mpango wao wa ushauri ulinibadilisha kabisa - nilijifunza kila kitu kuanzia mpango wa kifedha hadi mkakati wa masoko. Sasa ninaajiri wanawake 5 kutoka jamii yangu!"
      },
      image: "/testimonials/sarah.jpg"
    },
    {
      id: 2,
      name: "Amina Osman",
      role: translations.entrepreneur[language],
      business: "Tech Solutions Tanzania",
      quote: {
        en: "Before joining the entrepreneurship workshop, I had passion but no direction. The practical business skills I gained helped me secure investors for my tech startup. The ongoing community support keeps me motivated through challenges.",
        sw: "Kabla ya kujiunga na warsha ya ujasiriamali, nilikuwa na shauku lakini sina mwelekeo. Ujuzi wa vitendo wa biashara niliopata ulinisaidia kupata wawekezaji kwa kampuni yangu chipukizi ya teknolojia. Msaada wa jamii unaoendelea unaniweka nikiwa na motisha kupitia changamoto."
      },
      image: "/testimonials/amina.jpg"
    },
    {
      id: 3,
      name: "Grace Mwangi",
      role: translations.businessOwner[language],
      business: "Fresh Harvest Market",
      quote: {
        en: "The financial literacy program changed everything for me. I went from selling vegetables by the roadside to owning a thriving market with proper accounting systems. My children now attend good schools because of the income stability.",
        sw: "Programu ya ujuzi wa fedha ilibadilisha kila kitu kwangu. Nilienda kutoka kuuza mboga kando ya barabara hadi kumiliki soko linalostawi lenye mifumo sahihi ya uhasibu. Watoto wangu sasa wanahudhuria shule nzuri kwa sababu ya uthabiti wa mapato."
      },
      image: "/testimonials/grace.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-3">
            {translations.title[language]}
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative px-4">
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg text-neutral-700 hover:text-primary-500 transition-all"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextTestimonial} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg text-neutral-700 hover:text-primary-500 transition-all"
            aria-label="Next testimonial"
          >
            <FaChevronRight size={20} />
          </button>

          {/* Testimonial Card */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="md:flex"
              >
                {/* Image section */}
                <div className="md:w-2/5 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center py-8 px-4">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white/80 overflow-hidden shadow-lg mx-auto relative bg-neutral-200">
                    {/* This would be an actual image in production */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-400 opacity-80"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                  </div>
                </div>
                
                {/* Content section */}
                <div className="md:w-3/5 p-6 md:p-10 relative">
                  <FaQuoteLeft className="text-primary-200 text-4xl absolute top-6 left-8" />
                  
                  <div className="mt-4 mb-8 text-neutral-700 text-lg leading-relaxed pl-4 md:pl-8">
                    {testimonials[currentIndex].quote[language]}
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4 mt-auto">
                    <h3 className="font-bold text-xl text-neutral-800">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-primary-600">
                      {testimonials[currentIndex].role}
                      {testimonials[currentIndex].business && (
                        <span className="text-neutral-500"> • {testimonials[currentIndex].business}</span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-primary-500' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;