"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  message: string;
  link: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const fetchNotifications = async () => {
    const token = localStorage.getItem("ibra_token");
    if (!token) return;

    try {
      const res = await fetch("https://ibra-salon-platform.onrender.com/api/salon/notifications/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  // Poll for new notifications every 15 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllRead = async () => {
    const token = localStorage.getItem("ibra_token");
    try {
      // Mark all unread notifications as read
      for (const n of notifications.filter(n => !n.is_read)) {
        await fetch(`https://ibra-salon-platform.onrender.com/api/salon/notifications/${n.id}/read/`, {
          method: "PATCH",
          headers: { "Authorization": `Bearer ${token}` }
        });
      }
      fetchNotifications(); // Refresh count
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative p-1 rounded-full hover:bg-gray-800 transition-colors"
      >
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-gray-900">
            {unreadCount}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-xs text-purple-600 font-medium hover:text-purple-700">
                Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-gray-400 text-sm">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className={`p-3 border-b border-gray-50 text-sm ${!n.is_read ? 'bg-purple-50' : 'bg-white'}`}>
                  <p className={`text-gray-700 ${!n.is_read ? 'font-semibold' : ''}`}>{n.message}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(n.created_at).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
