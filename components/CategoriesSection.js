"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaGraduationCap, FaChartLine, FaHandshake } from "react-icons/fa";

const CategoriesSection = ({ language, categoriesSection, categories, viewAllText }) => {
  // Helper function to get the right icon component
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "FaGraduationCap": return <FaGraduationCap className="w-8 h-8" />;
      case "FaChartLine": return <FaChartLine className="w-8 h-8" />;
      case "FaHandshake": return <FaHandshake className="w-8 h-8" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      className="mt-24 md:mt-32 relative"
    >
      {/* Subtle decorative element */}
      <div className="absolute -left-40 top-0 w-80 h-80 rounded-full bg-primary-100 opacity-50 blur-3xl -z-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <span className="text-primary-600 font-medium mb-3 inline-block">{categoriesSection.subtitle}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
          {categoriesSection.title}
        </h2>
        <p className="text-neutral-700 max-w-xl mx-auto">
          {categoriesSection.description}
        </p>
        
        {/* Featured image added below the text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 relative mx-auto max-w-3xl"
        >
          {/* Decorative elements */}
          <div className="absolute -z-10 inset-0 bg-primary-50 rounded-xl transform rotate-1"></div>
          <div className="absolute -z-10 inset-0 bg-primary-100 rounded-xl transform -rotate-1"></div>
          
          {/* Image container */}
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img 
              src="/learner2.jpg" 
              alt="Featured learning paths" 
              className="w-full h-auto object-cover"
            />
            
            {/* Overlay with caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-white text-center">
                  <span className="text-2xl font-bold">200+</span>
                  <p className="text-xs opacity-90">Expert-led courses</p>
                </div>
                <div className="text-white text-center">
                  <span className="text-2xl font-bold">24/7</span>
                  <p className="text-xs opacity-90">Support available</p>
                </div>
                <div className="text-white text-center">
                  <span className="text-2xl font-bold">95%</span>
                  <p className="text-xs opacity-90">Completion rate</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index + 1.4 }}
          >
            <Link 
              href={category.link} 
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full border border-neutral-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className={`${category.color} text-white rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                {getIconComponent(category.icon)}
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-neutral-600 mb-5 text-sm">
                {category.description}
              </p>
              <div className="mt-auto flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700">
                {language === 'en' ? 'Explore courses' : 'Chunguza kozi'} <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        className="text-center mt-12"
      >
        <Link 
          href="/all-categories" 
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors duration-300"
        >
          {viewAllText} <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CategoriesSection;