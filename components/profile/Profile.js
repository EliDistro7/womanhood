'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {ProgressBar} from './components';
import { CourseCard } from './components';
import { WishlistItem } from './components';
import { StatCard } from './components';
import { NotificationCard } from './components';


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

export default function ProfilePage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userData, setUserData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    // Fetch user data, courses, notifications, and wishlist
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          // In a real app, you would fetch this data from your API
          // For demo purposes, we'll use mock data based on your seed file
  
          // Mock user based on session or default to the student
          const mockUser = {
            id: session?.user?.id || "user-2",
            email: session?.user?.email || "student@example.com",
            name: session?.user?.name || "Student User",
            role: "user",
            joinedDate: "January 15, 2023",
            avatar: "/images/avatar-placeholder.jpg"
          };
          
          // Mock purchased courses with progress
          const mockCourses = [
            {
              id: "1",
              title: "Business Startup Essentials",
              price: 99,
              rating: 5,
              mainImage: "learner-3.jpg",
              slug: "business-startup-essentials",
              manufacturer: "Success Academy",
              progress: 75
            },
            {
              id: "6",
              title: "Personal Branding Masterclass",
              price: 69,
              rating: 4,
              mainImage: "personal-branding.webp",
              slug: "personal-branding-masterclass",
              manufacturer: "Brand Builder",
              progress: 100
            },
            {
              id: "10",
              title: "Social Media Marketing Strategy",
              price: 99,
              rating: 5,
              mainImage: "social-media.jpg",
              slug: "social-media-marketing-strategy",
              manufacturer: "Digital Marketing Pros",
              progress: 30
            }
          ];
          
          // Mock notifications
          const mockNotifications = [
            {
              id: "notif-1",
              userId: "user-2",
              text: "Your course access has been activated! Check your email for login details.",
              type: "info",
              read: false
            },
            {
              id: "notif-extra",
              userId: "user-2",
              text: "New entrepreneurship webinar this Friday! Register now to secure your spot.",
              type: "promo",
              read: false
            },
            {
              id: "notif-extra2",
              userId: "user-2",
              text: "You've completed Personal Branding Masterclass! Your certificate is ready.",
              type: "info",
              read: true
            }
          ];
          
          // Mock wishlist with product details
          const mockWishlist = [
            {
              id: "4",
              title: "Women in Leadership",
              price: 119,
              mainImage: "women-leadership.webp",
            },
            {
              id: "7",
              title: "Youth Entrepreneurship Bootcamp",
              price: 59,
              mainImage: "youth-bootcamp.webp",
            }
          ];
  
          setUserData(mockUser);
          setCourses(mockCourses);
          setNotifications(mockNotifications);
          setWishlist(mockWishlist);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          toast.error("Failed to load profile data");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchData();
    }, [session]);
  
    const handleRemoveWishlist = (itemId) => {
      // In a real app, you would call your API to remove the item
      setWishlist(wishlist.filter(item => item.id !== itemId));
      toast.success("Item removed from wishlist");
    };
  
    const markAllNotificationsRead = () => {
      // In a real app, you would call your API to mark all as read
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      toast.success("All notifications marked as read");
    };
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }
  
    // Calculate statistics
    const completedCourses = courses.filter(c => c.progress === 100).length;
    const inProgressCourses = courses.filter(c => c.progress < 100).length;
    const totalSpent = courses.reduce((acc, c) => acc + c.price, 0);
    
    return (
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Header */}
        <div className="bg-primary pt-8 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="mt-2">Manage your courses, wishlist, and account settings</p>
          </div>
        </div>
        
        {/* Profile content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 flex flex-col md:flex-row items-center">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 md:mb-0">
                <Image 
                  src={userData.avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left md:ml-6 flex-1">
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-sm text-gray-500 mt-1">Member since {userData.joinedDate}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition">
                  Edit Profile
                </button>
              </div>
            </div>
            
            {/* Profile navigation */}
            <div className="border-t border-gray-200">
              <nav className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'dashboard'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'courses'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Courses
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'wishlist'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap flex items-center ${
                    activeTab === 'notifications'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Notifications
                  {notifications.some(n => !n.read) && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard 
                  icon={<BookOpen size={24} className="text-primary" />}
                  title="Courses Enrolled"
                  value={courses.length}
                />
                <StatCard 
                  icon={<CheckCircle size={24} className="text-green-500" />}
                  title="Completed Courses"
                  value={completedCourses}
                />
                <StatCard 
                  icon={<Clock size={24} className="text-yellow-500" />}
                  title="In Progress"
                  value={inProgressCourses}
                />
                <StatCard 
                  icon={<Calendar size={24} className="text-purple-500" />}
                  title="Total Spent"
                  value={`$${totalSpent}`}
                />
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Recent Courses</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.slice(0, 3).map(course => (
                      <CourseCard key={course.id} course={course} progress={course.progress} />
                    ))}
                  </div>
                  {courses.length > 3 && (
                    <div className="mt-4 text-center">
                      <button 
                        onClick={() => setActiveTab('courses')}
                        className="text-primary hover:underline font-medium"
                      >
                        View all courses
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Recent Notifications</h3>
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className="text-sm text-primary hover:underline"
                  >
                    View all
                  </button>
                </div>
                <div className="p-6">
                  {notifications.slice(0, 3).map(notification => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">My Courses</h3>
              </div>
              <div className="p-6">
                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                      <CourseCard key={course.id} course={course} progress={course.progress} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-700">No courses yet</h3>
                    <p className="text-gray-500 mt-1">Browse our catalog and enroll in your first course</p>
                    <Link href="/courses">
                      <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition">
                        Browse Courses
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">My Wishlist</h3>
              </div>
              <div className="p-6">
                {wishlist.length > 0 ? (
                  <div>
                    {wishlist.map(item => (
                      <WishlistItem key={item.id} item={item} onRemove={handleRemoveWishlist} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart size={48} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-700">Your wishlist is empty</h3>
                    <p className="text-gray-500 mt-1">Save courses you're interested in for later</p>
                    <Link href="/courses">
                      <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition">
                        Browse Courses
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Notifications</h3>
                {notifications.some(n => !n.read) && (
                  <button 
                    onClick={markAllNotificationsRead}
                    className="text-sm text-primary hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="p-6">
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map(notification => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell size={48} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-700">No notifications</h3>
                    <p className="text-gray-500 mt-1">You're all caught up!</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Account Settings</h3>
              </div>
              <div className="p-6">
                <div className="max-w-2xl mx-auto">
                  <form>
                    <div className="mb-6">
                      <h4 className="font-medium mb-4">Profile Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            defaultValue="Student"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            defaultValue="User"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                          defaultValue={userData.email}
                        />
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                        <div className="flex items-center">
                          <div className="relative h-16 w-16 rounded-full overflow-hidden border border-gray-300">
                            <Image 
                              src={userData.avatar}
                              alt="Profile"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <h4 className="font-medium mb-4">Password</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <input
                            type="password"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                          />
                        </div>
                        <div></div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <input
                            type="password"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <input
                            type="password"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <h4 className="font-medium mb-4">Notification Preferences</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email_notifications"
                              name="email_notifications"
                              type="checkbox"
                              defaultChecked
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email_notifications" className="font-medium text-gray-700">Email Notifications</label>
                            <p className="text-gray-500">Receive emails about course updates, new content, and promotions</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="browser_notifications"
                              name="browser_notifications"
                              type="checkbox"
                              defaultChecked
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="browser_notifications" className="font-medium text-gray-700">Browser Notifications</label>
                            <p className="text-gray-500">Receive notifications in your browser about course updates</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="marketing_emails"
                              name="marketing_emails"
                              type="checkbox"
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="marketing_emails" className="font-medium text-gray-700">Marketing Emails</label>
                            <p className="text-gray-500">Receive promotional and marketing emails about special offers</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <h4 className="font-medium mb-4">Privacy Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="profile_visibility"
                              name="profile_visibility"
                              type="checkbox"
                              defaultChecked
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="profile_visibility" className="font-medium text-gray-700">Profile Visibility</label>
                            <p className="text-gray-500">Allow other users to see your profile and learning activity</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="data_collection"
                              name="data_collection"
                              type="checkbox"
                              defaultChecked
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="data_collection" className="font-medium text-gray-700">Learning Data Collection</label>
                            <p className="text-gray-500">Allow us to collect data on your learning progress to improve recommendations</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }