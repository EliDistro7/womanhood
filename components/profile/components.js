'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Heart, 
  Bell, 
  Settings, 
  LogOut, 
  CheckCircle,
  Calendar,
  Clock,
  Award
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Progress indicator component
export const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-primary h-2.5 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Course Card component
export const CourseCard = ({ course, progress }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative h-40 w-full">
        <Image 
          src={`/images/${course.mainImage}`} 
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3">By {course.manufacturer}</p>
        
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">{progress}% Complete</span>
          <span className="text-xs text-gray-500">
            {progress < 100 ? 'In progress' : 'Completed'}
          </span>
        </div>
        <ProgressBar percentage={progress} />
        
        <div className="mt-4 flex justify-between items-center">
          <Link href={`/courses/${course.slug}`}>
            <span className="inline-flex items-center text-primary hover:text-primary-dark text-sm font-medium">
              <BookOpen size={16} className="mr-1" />
              Continue Learning
            </span>
          </Link>
          <div className="flex items-center">
            {Array(5).fill(0).map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < course.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Notification Card component
export const NotificationCard = ({ notification }) => {
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200',
    promo: 'bg-green-50 border-green-200',
    alert: 'bg-red-50 border-red-200'
  };
  
  const typeIcons = {
    info: <Bell size={20} className="text-blue-500" />,
    promo: <Award size={20} className="text-green-500" />,
    alert: <Bell size={20} className="text-red-500" />
  };
  
  return (
    <div className={`p-4 mb-3 rounded-lg border ${typeStyles[notification.type]} ${!notification.read ? 'border-l-4' : ''}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {typeIcons[notification.type]}
        </div>
        <div className="flex-1">
          <p className={`text-sm ${!notification.read ? 'font-semibold' : ''}`}>
            {notification.text}
          </p>
          <p className="text-xs text-gray-500 mt-1">2 days ago</p>
        </div>
        {!notification.read && (
          <div className="flex-shrink-0 ml-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// WishlistItem component
export const WishlistItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center p-3 bg-white rounded-lg shadow-sm mb-3">
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image 
          src={`/images/${item.mainImage}`} 
          alt={item.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="ml-4 flex-1">
        <h4 className="font-medium">{item.title}</h4>
        <p className="text-sm text-gray-600">${item.price}</p>
      </div>
      <div>
        <button 
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Statistics Card component
export const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

