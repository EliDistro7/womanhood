// ImpactStats.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';
import CountUp from 'react-countup';

const ImpactStats = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const translations = {
    impactTitle: {
      en: "Our Impact",
      sw: "Athari Yetu"
    },
    impactSubtitle: {
      en: "Transforming lives through entrepreneurship education",
      sw: "Kubadilisha maisha kupitia elimu ya ujasiriamali"
    },
    womenTrained: {
      en: "Women Trained",
      sw: "Wanawake Waliofunzwa"
    },
    businessesLaunched: {
      en: "Businesses Launched",
      sw: "Biashara Zilizoanzishwa"
    },
    communitiesReached: {
      en: "Communities Reached",
      sw: "Jamii Zilizofikiwa"
    },
    successRate: {
      en: "Success Rate",
      sw: "Kiwango cha Mafanikio"
    }
  };

  const stats = [
    { 
      id: 1, 
      value: 1250, 
      label: translations.womenTrained[language], 
      icon: "👩‍💼", 
      color: "from-rose-400 to-pink-600"
    },
    { 
      id: 2, 
      value: 450, 
      label: translations.businessesLaunched[language], 
      icon: "🚀", 
      color: "from-amber-400 to-orange-600"
    },
    { 
      id: 3, 
      value: 35, 
      label: translations.communitiesReached[language], 
      icon: "🌍", 
      color: "from-emerald-400 to-teal-600"
    },
    { 
      id: 4, 
      value: 87, 
      suffix: "%", 
      label: translations.successRate[language], 
      icon: "📈", 
      color: "from-blue-400 to-indigo-600"
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-3">
            {translations.impactTitle[language]}
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            {translations.impactSubtitle[language]}
          </p>
        </div>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: stat.id * 0.1 }}
            >
              <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2 text-neutral-800">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix || ''}
                      separator=","
                    />
                  )}
                </div>
                <div className="text-neutral-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;