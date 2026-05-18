// CallToAction.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const CallToAction = () => {
  const { language } = useLanguage();

  const translations = {
    title: {
      en: "Ready to Start Your Entrepreneurship Journey?",
      sw: "Uko Tayari Kuanza Safari Yako ya Ujasiriamali?"
    },
    description: {
      en: "Join our community of women entrepreneurs and access resources, mentorship, and support to turn your business vision into reality.",
      sw: "Jiunge na jumuiya yetu ya wajasiriamali wanawake na upate rasilimali, ushauri, na msaada ili kubadilisha maono yako ya biashara kuwa ukweli."
    },
    registerButton: {
      en: "Register for Programs",
      sw: "Jiandikishe kwa Programu"
    },
    contactButton: {
      en: "Contact Us",
      sw: "Wasiliana Nasi"
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient overlay using custom colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-600 z-0"></div>
      
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjxwYXRoIGQ9Ik0xNiAxNmMyLjIgMCA0IDEuOCA0IDRzLTEuOCA0LTQgNC00LTEuOC00LTQgMS44LTQgNC00em0wIDI0YzIuMiAwIDQgMS44IDQgNHMtMS44IDQtNCA0LTQtMS44LTQtNCAxLjgtNCA0LTR6Ii8+PC9nPjwvc3ZnPg==')]"></div>
      
      {/* Abstract shapes with custom colors */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-accent-sky/20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        />
        <motion.div 
          className="absolute -left-32 top-40 w-80 h-80 rounded-full bg-primary-300/20"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 6, 
            ease: "easeInOut", 
            repeat: Infinity,
            delay: 1
          }}
        />
        <motion.div 
          className="absolute right-40 bottom-20 w-64 h-64 rounded-full bg-accent-periwinkle/30"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 7, 
            ease: "easeInOut", 
            repeat: Infinity,
            delay: 2
          }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {translations.title[language]}
          </motion.h2>
          
          <motion.p 
            className="text-accent-periwinkle text-lg mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {translations.description[language]}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/register"
              className="bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 rounded-lg font-medium text-lg shadow-glow hover:shadow-glow-lg transition-all transform hover:-translate-y-1"
            >
              {translations.registerButton[language]}
            </Link>
            
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-accent-periwinkle text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium text-lg transition-all transform hover:-translate-y-1 hover:border-white"
            >
              {translations.contactButton[language]}
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom accent line with shine animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-shiny animate-shine"></div>
    </section>
  );
};

export default CallToAction;