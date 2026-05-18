
import { Bell, Award } from 'lucide-react';

// Notification Card component
const NotificationCard = ({ notification }) => {
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