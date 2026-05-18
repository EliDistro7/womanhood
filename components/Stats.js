"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLaptop } from "react-icons/fa";
import { TrendingUp, LightbulbIcon } from "lucide-react";

const Stats = ({ language, statsItems, floatingElements }) => {
  // Animation variants
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Helper function to get the right icon component
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "FaLaptop": return <FaLaptop className="w-6 h-6" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6" />;
      case "LightbulbIcon": return <LightbulbIcon className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative lg:col-span-5"
    >
      <motion.div 
        animate={floatingAnimation}
        className="relative z-10"
      >
        <div className="w-full h-full bg-white rounded-2xl shadow-xl p-3 relative overflow-hidden border border-primary-100">
          {/* Enhanced gradient overlay */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-accent-mint to-primary-300 rounded-full blur-xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 -mb-5 -ml-10 w-32 h-32 bg-gradient-to-tr from-primary-400 to-secondary-300 rounded-full blur-xl opacity-50"></div>
          
          <Image 
            src="/e-learning-1.jpg" 
            alt={language === 'en' ? "Young entrepreneurs developing innovative business strategies" : "Wajasiriamali vijana wakitengeneza mikakati ya biashara ya uvumbuzi"} 
            width={600} 
            height={500}
            className="w-full h-auto rounded-xl object-cover shadow-sm"
          />
        </div>
        
        {/* Enhanced floating elements with better shadow and positioning */}
        {floatingElements.map((element, index) => {
          const positions = [
            { classes: "absolute -left-16 bottom-16", bg: "bg-gradient-to-br from-primary-500 to-primary-600", delay: 0.9 },
            { classes: "absolute -right-10 top-16", bg: "bg-gradient-to-br from-secondary-500 to-secondary-600", delay: 1.1 },
            { classes: "absolute right-1/4 -bottom-10", bg: "bg-gradient-to-br from-accent-mint to-accent-mint-dark", delay: 1.3 }
          ];
          
          return (
            <motion.div 
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: positions[index].delay, duration: 0.7 }}
              className={`${positions[index].classes} bg-white p-5 rounded-xl shadow-xl flex items-center gap-4 z-20 border border-primary-100`}
            >
              <div className={`p-3 ${positions[index].bg} text-white rounded-lg shadow-inner`}>
                {getIconComponent(element.icon)}
              </div>
              <div>
                <div className="font-bold text-sm text-neutral-800">{element.title}</div>
                <div className="text-xs text-neutral-600">{element.description}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Enhanced background decoration */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary-200 rounded-full opacity-80 -z-10"></div>
      <div className="absolute top-1/4 -left-20 w-40 h-40 border-8 border-primary-100 rounded-full -z-10"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-secondary-200 rounded-full opacity-60 -z-10"></div>
    </motion.div>
  );
};

export default Stats;