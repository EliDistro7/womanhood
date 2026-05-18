"use client";
import { useState, useEffect } from "react";
import { useLanguage } from '@/context/LanguageContext';
import HeroContent from './HeroContent';
import Stats from './Stats';
import CategoriesSection from './CategoriesSection';

// Translations and other data moved to separate file or can be imported

const BilingualHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Translations object would be imported or defined here
  const translations = {
    tagline: {
      en: "Transforming Aspirations Into Achievement",
      sw: "Kubadilisha Matarajio Kuwa Mafanikio"
    },
    title: {
      en: "Elevate Your Entrepreneurial Journey",
      sw: "Inua Safari Yako ya Ujasiriamali"
    },
    description: {
      en: "Acquire the strategic knowledge, practical skills, and professional network needed to transform your vision into a thriving enterprise in today's competitive market.",
      sw: "Pata ujuzi wa kimkakati, ujuzi wa vitendo, na mtandao wa kitaaluma unaohitajika kubadilisha maono yako kuwa biashara inayofanikiwa katika soko la ushindani la sasa."
    },
    searchPlaceholder: {
      en: "What skills would you like to develop?",
      sw: "Ni ujuzi gani ungependa kukuza?"
    },
    exploreButton: {
      en: "Explore",
      sw: "Chunguza"
    },
    statsItems: {
      en: [
        { 
          icon: "Users", 
          count: "5,000+", 
          label: "Entrepreneurs Empowered"
        },
        { 
          icon: "BookOpen", 
          count: "30+", 
          label: "Premium Courses" 
        },
        { 
          icon: "Award", 
          count: "94%", 
          label: "Success Rate" 
        }
      ],
      sw: [
        { 
          icon: "Users", 
          count: "5,000+", 
          label: "Wajasiriamali Waliowekezwa" 
        },
        { 
          icon: "BookOpen", 
          count: "30+", 
          label: "Kozi Bora" 
        },
        { 
          icon: "Award", 
          count: "94%", 
          label: "Kiwango cha Mafanikio" 
        }
      ]
    },
    floatingElements: {
      en: [
        {
          icon: "FaLaptop",
          title: "Flexible Learning",
          description: "Expert-guided, self-paced programs"
        },
        {
          icon: "TrendingUp",
          title: "Market-Ready Skills",
          description: "Industry-aligned competencies"
        },
        {
          icon: "LightbulbIcon",
          title: "Innovation Hub",
          description: "Cutting-edge business concepts"
        }
      ],
      sw: [
        {
          icon: "FaLaptop",
          title: "Masomo ya Kubadilikabadilika",
          description: "Programu zinazojielekeza kwa wataalamu"
        },
        {
          icon: "TrendingUp",
          title: "Ujuzi wa Soko",
          description: "Uwezo unaofaa kwa tasnia"
        },
        {
          icon: "LightbulbIcon",
          title: "Kituo cha Uvumbuzi",
          description: "Dhana za kisasa za biashara"
        }
      ]
    },
    categoriesSection: {
      en: {
        subtitle: "SPECIALIZED LEARNING PATHS",
        title: "Explore Our Premium Categories",
        description: "Curated learning experiences designed specifically for ambitious entrepreneurs looking to make an impact in today's market."
      },
      sw: {
        subtitle: "NJIA MAALUM ZA MASOMO",
        title: "Chunguza Vikundi Vyetu Bora",
        description: "Uzoefu wa kujifunza ulioandaliwa maalum kwa wajasiriamali wenye nia ya kuleta mabadiliko katika soko la leo."
      }
    },
    categories: {
      en: [
        {
          icon: "FaGraduationCap",
          title: "Business & Entrepreneurship",
          description: "Strategic planning and market analysis for sustainable growth",
          color: "bg-primary-500",
          link: "/categories/business"
        },
        {
          icon: "FaChartLine",
          title: "Financial Literacy",
          description: "Master funding, investment and financial management skills",
          color: "bg-secondary-500",
          link: "/categories/finance"
        },
        {
          icon: "FaHandshake",
          title: "Leadership & Networking",
          description: "Build effective teams and valuable industry connections",
          color: "bg-accent-mint",
          link: "/categories/leadership"
        }
      ],
      sw: [
        {
          icon: "FaGraduationCap",
          title: "Biashara & Ujasiriamali",
          description: "Upangaji wa kimkakati na uchambuzi wa soko kwa ukuaji endelevu",
          color: "bg-primary-500",
          link: "/categories/business"
        },
        {
          icon: "FaChartLine",
          title: "Ujuzi wa Kifedha",
          description: "Jifunze ufadhili, uwekezaji na ujuzi wa usimamizi wa fedha",
          color: "bg-secondary-500",
          link: "/categories/finance"
        },
        {
          icon: "FaHandshake",
          title: "Uongozi & Mtandao",
          description: "Jenga timu zenye ufanisi na uhusiano muhimu wa kisekta",
          color: "bg-accent-mint",
          link: "/categories/leadership"
        }
      ]
    },
    viewAll: {
      en: "View all categories",
      sw: "Tazama vikundi vyote"
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-primary-100 opacity-40 blur-3xl -z-10" />
      <div className="absolute -bottom-20 left-20 w-96 h-96 rounded-full bg-accent-mint opacity-30 blur-3xl -z-10" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-secondary-100 opacity-30 blur-3xl -z-10" />
      
      {/* Subtle grid pattern overlay for texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content Component */}
          <HeroContent 
            isVisible={isVisible}
            language={language}
            translations={translations}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {/* Stats Component - could be included in HeroContent or separate */}
          <Stats 
            language={language}
            statsItems={translations.statsItems[language]}
            floatingElements={translations.floatingElements[language]}
          />
        </div>

        
        
        {/* Categories Section Component */}
        <CategoriesSection 
          language={language}
          categoriesSection={translations.categoriesSection[language]}
          categories={translations.categories[language]}
          viewAllText={translations.viewAll[language]}
        />
      </div>
    </div>
  );
};

export default BilingualHeroSection;