// FeaturedPrograms.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FaGraduationCap, FaHandshake, FaLaptop, FaPiggyBank } from 'react-icons/fa';

const FeaturedPrograms = () => {
  const { language } = useLanguage();

  const translations = {
    title: {
      en: "Our Featured Programs",
      sw: "Programu Zetu Maarufu"
    },
    subtitle: {
      en: "Comprehensive entrepreneurship education designed for women at every stage",
      sw: "Elimu kamili ya ujasiriamali iliyoundwa kwa wanawake katika kila hatua"
    },
    viewDetails: {
      en: "View Details",
      sw: "Angalia Maelezo"
    },
    businessBootcamp: {
      en: "Business Bootcamp",
      sw: "Kambi ya Biashara"
    },
    businessDesc: {
      en: "Intensive 4-week program covering business fundamentals, market research, and development of a viable business plan.",
      sw: "Programu ya wiki 4 inayojumuisha misingi ya biashara, utafiti wa soko, na maendeleo ya mpango wa biashara unaotekelezeka."
    },
    digitalSkills: {
      en: "Digital Skills Workshop",
      sw: "Warsha ya Ujuzi wa Kidijitali"
    },
    digitalDesc: {
      en: "Hands-on training in essential digital tools for business: social media marketing, e-commerce, and basic web presence.",
      sw: "Mafunzo ya vitendo katika zana muhimu za kidijitali kwa biashara: masoko ya mitandao ya kijamii, biashara ya elektroniki, na uwepo wa msingi wa wavuti."
    },
    mentorship: {
      en: "Mentorship Program",
      sw: "Programu ya Ushauri"
    },
    mentorshipDesc: {
      en: "Six-month guided mentorship matching entrepreneurs with experienced business leaders for personalized coaching.",
      sw: "Ushauri wa miezi sita unaounganisha wajasiriamali na viongozi wa biashara wenye uzoefu kwa mafunzo ya kibinafsi."
    },
    financial: {
      en: "Financial Literacy",
      sw: "Ujuzi wa Kifedha"
    },
    financialDesc: {
      en: "Learn essential money management skills, investment basics, and how to access funding for your business venture.",
      sw: "Jifunze ujuzi muhimu wa usimamizi wa fedha, misingi ya uwekezaji, na jinsi ya kupata ufadhili kwa mradi wako wa biashara."
    }
  };

  const programs = [
    {
      id: 1,
      title: translations.businessBootcamp[language],
      description: translations.businessDesc[language],
      icon: <FaGraduationCap size={32} />,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-500',
      link: '/programs/business-bootcamp'
    },
    {
      id: 2,
      title: translations.digitalSkills[language],
      description: translations.digitalDesc[language],
      icon: <FaLaptop size={32} />,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
      link: '/programs/digital-skills'
    },
    {
      id: 3,
      title: translations.mentorship[language],
      description: translations.mentorshipDesc[language],
      icon: <FaHandshake size={32} />,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      link: '/programs/mentorship'
    },
    {
      id: 4,
      title: translations.financial[language],
      description: translations.financialDesc[language],
      icon: <FaPiggyBank size={32} />,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      link: '/programs/financial-literacy'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-3">
            {translations.title[language]}
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${program.bgColor}`}
            >
              <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
              <div className="p-6">
                <div className={`${program.iconColor} mb-4`}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-800">
                  {program.title}
                </h3>
                <p className="text-neutral-600 mb-5">
                  {program.description}
                </p>
                <Link 
                  href={program.link}
                  className={`inline-flex items-center text-sm font-medium ${program.iconColor} hover:underline`}
                >
                  {translations.viewDetails[language]}
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;