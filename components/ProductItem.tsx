'use client';

// EnhancedProductItem.tsx
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Loader2, Users, Clock, Star, BookOpen, BadgeCheck } from "lucide-react";
import { useState } from "react";

const EnhancedProductItem = ({ product }: { product: Product }) => {
  //console.log('product image', product.mainImage);
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const translations = {
    viewProduct: {
      en: "View Course Details",
      sw: "Tazama Maelezo ya Kozi"
    },
    currency: {
      en: "TZS",
      sw: "TSh"
    },
    students: {
      en: "Enrolled",
      sw: "Watumiaji"
    },
    duration: {
      en: "Duration",
      sw: "Muda"
    },
    bestseller: {
      en: "Bestseller",
      sw: "Mauzo Bora"
    },
    new: {
      en: "New",
      sw: "Mpya"
    }
  };

  const handleViewProduct = () => {
    setIsLoading(true);
    // This would normally redirect the user, but we're simulating the loading state
    // The actual navigation is handled by the Link component
  };

  // Determine if product is bestseller or new based on some logic
  const isBestseller = product.rating >= 4.5;
  const isNew = Math.random() > 0.7; // Just for demo purposes

  return (
    <div className="col-lg-4 col-md-6 mb-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col bg-white border border-neutral-100"
      >
        <div className="relative aspect-video overflow-hidden">
          {/* Dynamic badge based on product attributes */}
          {isBestseller && (
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
              <Star className="w-3 h-3 mr-1" fill="white" stroke="none" />
              {translations.bestseller[language]}
            </div>
          )}
          
          {isNew && !isBestseller && (
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
              <BadgeCheck className="w-3 h-3 mr-1" />
              {translations.new[language]}
            </div>
          )}
          
          {/* Price badge */}
          <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center">
            <span className="text-xs font-medium mr-1">
              {translations.currency[language]}
            </span>
            {product.price.toLocaleString()}
          </div>

          <Link 
            href={`/product/${product.slug}`}
            className="block relative w-full h-full group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <Image
              src={`${product.mainImage}` || "/product_placeholder.jpg"}
              alt={product.title}
              fill
              className="object-cover transform transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center shadow-lg">
                <span className="text-primary-700 font-medium text-sm">
                  {translations.viewProduct[language]}
                </span>
              </div>
            </motion.div>
          </Link>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3 text-sm text-neutral-500">
            <div className="flex items-center">
              <Users className="text-primary-500 mr-1.5" size={14} />
              <span>{25} {translations.students[language]}</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-primary-500 mr-1.5" size={14} />
              <span>01h 30m</span>
            </div>
          </div>
          
          <Link 
            href={`/product/${product.slug}`} 
            className="text-lg font-semibold text-neutral-800 hover:text-primary-600 transition-colors mb-3 line-clamp-2"
          >
            {product.title}
          </Link>
          
          {/* Short description - added for better content display */}
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
            {product.description || "Master essential skills with this comprehensive course designed for both beginners and experienced professionals."}
          </p>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center bg-neutral-50 px-2.5 py-1 rounded-lg">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-neutral-300'}`} 
                      fill="currentColor" 
                      stroke="none"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-neutral-700">
                  {product.rating} <span className="text-neutral-400 font-normal">({Math.floor(Math.random() * 300)})</span>
                </span>
              </div>
              
              <div className="flex items-center">
                <BookOpen className="text-primary-500 mr-1.5" size={14} />
                <span className="text-sm text-neutral-500">12 lessons</span>
              </div>
            </div>
            
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              onClick={handleViewProduct}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>{translations.viewProduct[language]}</span>
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    animate={{ x: isHovered ? 3 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </>
              )}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedProductItem;