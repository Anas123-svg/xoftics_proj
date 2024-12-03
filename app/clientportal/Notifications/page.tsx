import React from "react";

interface NotificationsProps {
  notifications: string[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  return (
    <div className="mb-6 rounded-lg m-10"><br></br>
      <h2 className="text-2xl font-bold text-gray-300 mb-4 m-2">Notifications</h2>
      <div className="p-4 w-full rounded-md shadow-lg">
        {notifications.map((notification, index) => (
          <div key={index} className="mb-2 h-10 bg-teal-900 rounded-md p-2">{notification}</div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
