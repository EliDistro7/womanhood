"use client";
import { motion } from "framer-motion";
import { Search, ArrowRight, Users, BookOpen, Award } from "lucide-react";
import { FaLaptop, FaRegLightbulb } from "react-icons/fa";
import { TrendingUp, LightbulbIcon } from "lucide-react";
import { FaGraduationCap } from "react-icons/fa";

const HeroContent = ({ isVisible, language, translations, searchQuery, setSearchQuery }) => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 12
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Get current language content
  const statsItems = translations.statsItems[language];

  // Helper function to get the right icon component
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "Users": return <Users className="w-6 h-6" />;
      case "BookOpen": return <BookOpen className="w-6 h-6" />;
      case "Award": return <Award className="w-6 h-6" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate={isVisible ? "visible" : "hidden"}
      variants={staggerContainer}
      className="flex flex-col items-start lg:col-span-7"
    >
      <motion.div 
        variants={fadeInUp}
        className="bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 px-5 py-2 rounded-full text-sm font-medium inline-flex items-center mb-6 shadow-sm"
      >
        <FaGraduationCap className="mr-2" /> 
        <span>{translations.tagline[language]}</span>
      </motion.div>
      
      <motion.h1 
        variants={fadeInUp}
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight"
      >
        {language === 'en' ? (
          <>Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Entrepreneurial</span> Journey</>
        ) : (
          <>Inua <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Safari</span> Yako ya Ujasiriamali</>
        )}
      </motion.h1>
      
      <motion.p 
        variants={fadeInUp}
        className="text-lg md:text-xl text-neutral-700 mb-8 max-w-xl leading-relaxed"
      >
        {translations.description[language]}
      </motion.p>
      
      {/* Enhanced Search Box with cleaner design */}
      <motion.div 
        variants={fadeInUp}
        className="relative w-full max-w-xl mb-12"
      >
        <div className="flex w-full relative group">
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary-400 group-focus-within:text-primary-600 transition-colors duration-200">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={translations.searchPlaceholder[language]} 
            className="w-full pl-14 pr-36 py-5 rounded-full border-2 border-primary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none shadow-md transition-all duration-300"
          />
          <button className="absolute right-0 top-0 bottom-0 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-2 px-8 rounded-full mr-1.5 my-1.5 flex items-center transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            {translations.exploreButton[language]} <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </motion.div>
      
      {/* Enhanced Stats with more elegant design */}
      <motion.div 
        variants={fadeInUp}
        className="flex flex-wrap gap-8 md:gap-12"
      >
        {statsItems.map((item, index) => (
          <div key={index} className="flex items-center group">
            <div className="p-3.5 bg-white rounded-xl shadow-md text-primary-600 mr-4 group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 border border-primary-100">
              {getIconComponent(item.icon)}
            </div>
            <div>
              <div className="font-bold text-2xl text-black group-hover:text-primary-600 transition-colors duration-300">{item.count}</div>
              <div className="text-sm text-neutral-600">{item.label}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;