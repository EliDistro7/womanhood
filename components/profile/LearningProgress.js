'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { BookOpen, Clock, Award, Zap, Calendar, ArrowRight } from 'lucide-react';
import CountUp from 'react-countup';

const LearningProgress = ({ userId }) => {
  const [progressData, setProgressData] = useState({
    courses: [],
    totalHours: 0,
    completedCourses: 0,
    streak: 0,
    certificatesEarned: 0,
    weeklyActivity: [],
    categoryProgress: [],
    recentActivities: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // In a real app, fetch from your API
        // const response = await axios.get(`/api/users/${userId}/progress`);
        // setProgressData(response.data);
        
        // Mock data for demonstration
        const mockData = {
          courses: [
            { id: 1, title: 'JavaScript Fundamentals', progress: 85, totalModules: 12, completedModules: 10 },
            { id: 2, title: 'React Masterclass', progress: 60, totalModules: 15, completedModules: 9 },
            { id: 3, title: 'Next.js for Production', progress: 40, totalModules: 8, completedModules: 3 },
            { id: 4, title: 'UI/UX Design Principles', progress: 20, totalModules: 10, completedModules: 2 },
          ],
          totalHours: 47,
          completedCourses: 3,
          streak: 15,
          certificatesEarned: 2,
          weeklyActivity: [
            { day: 'Mon', hours: 2.5 },
            { day: 'Tue', hours: 1.8 },
            { day: 'Wed', hours: 3.2 },
            { day: 'Thu', hours: 1.5 },
            { day: 'Fri', hours: 2.0 },
            { day: 'Sat', hours: 4.5 },
            { day: 'Sun', hours: 0.5 },
          ],
          categoryProgress: [
            { name: 'Web Development', value: 45 },
            { name: 'Design', value: 20 },
            { name: 'Data Science', value: 25 },
            { name: 'Mobile Development', value: 10 },
          ],
          recentActivities: [
            { id: 1, course: 'JavaScript Fundamentals', module: 'Async Programming', timestamp: '2 hours ago' },
            { id: 2, course: 'React Masterclass', module: 'React Hooks', timestamp: 'Yesterday' },
            { id: 3, course: 'Next.js for Production', module: 'API Routes', timestamp: '3 days ago' },
          ]
        };
        
        setProgressData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching progress data:', error);
        setIsLoading(false);
      }
    };
    
    fetchProgressData();
  }, [userId]);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Learning Hours</p>
                    <h3 className="text-2xl font-bold mt-1">
                      <CountUp end={progressData.totalHours} duration={2} /> hrs
                    </h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Completed Courses</p>
                    <h3 className="text-2xl font-bold mt-1">
                      <CountUp end={progressData.completedCourses} duration={2} />
                    </h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Day Streak</p>
                    <h3 className="text-2xl font-bold mt-1">
                      <CountUp end={progressData.streak} duration={2} /> days
                    </h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Certificates</p>
                    <h3 className="text-2xl font-bold mt-1">
                      <CountUp end={progressData.certificatesEarned} duration={2} />
                    </h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Weekly Activity Chart */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={progressData.weeklyActivity}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value} hours`, 'Study Time']} />
                    <Bar dataKey="hours" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Course Progress and Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course Progress */}
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
                <div className="space-y-4">
                  {progressData.courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{course.title}</span>
                        <span className="text-sm text-gray-500">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {course.completedModules} of {course.totalModules} modules completed
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Category Breakdown */}
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Learning Categories</h3>
                <div className="flex items-center justify-center h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={progressData.categoryProgress}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {progressData.categoryProgress.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {progressData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.course} - {activity.module}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="flex items-center justify-center w-full mt-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition duration-150">
                View All Activity <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );
        
      case 'courses':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Course Progress Details</h3>
            {progressData.courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h4 className="text-md font-semibold">{course.title}</h4>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>{course.progress}% Complete</span>
                  <span>{course.completedModules}/{course.totalModules} Modules</span>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        );
        
      case 'certificates':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Your Certificates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-semibold">JavaScript Fundamentals</h4>
                    <p className="text-sm text-gray-500 mt-1">Completed on May 10, 2025</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center">
                    View Certificate
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm flex items-center">
                    Share
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-semibold">React Foundations</h4>
                    <p className="text-sm text-gray-500 mt-1">Completed on April 25, 2025</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center">
                    View Certificate
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm flex items-center">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Learning Progress</h2>
        <div className="flex items-center space-x-2">
          <select className="bg-white border border-gray-300 text-gray-700 rounded-md py-1.5 pl-3 pr-8 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>All Time</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex space-x-2 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'courses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Courses
          </button>
          <button 
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'certificates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Certificates
          </button>
        </div>
      </div>
      
      {renderTabContent()}
    </div>
  );
};

export default LearningProgress;