"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

interface AppointmentData {
  id: number;
  customer_name: string;
  service_name: string;
  staff_name: string;
  start_time: string;
  status: string;
}

export default function TrackAppointment({ params }: { params: { id: string } }) {
  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Ask for browser notification permission immediately
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    let prevStatus: string | null = null;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/salon/appointments/${params.id}/track/`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        
        setAppointment(data);
        setLoading(false);

        // Trigger notification if status changed
        if (prevStatus && prevStatus !== data.status) {
          if (data.status === "CONFIRMED") {
            new Notification("Booking Confirmed! ✅", { 
              body: `Ibra Salon confirmed your appointment for ${data.service_name}.` 
            });
          } else if (data.status === "CANCELLED") {
            new Notification("Booking Cancelled ❌", { 
              body: `Your appointment was cancelled. Please contact Ibra Salon.` 
            });
          }
        }
        prevStatus = data.status;

      } catch (error) {
        setLoading(false);
      }
    };

    // Fetch immediately, then every 3 seconds for real-time updates
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);

    return () => clearInterval(interval);
  }, [params.id]);

  const getStatusUI = (status: string) => {
    switch(status) {
      case 'CONFIRMED': 
        return { color: 'text-green-600', bg: 'bg-green-100', icon: '✅', text: 'Booking Confirmed!', message: 'Get ready to look sharp. We can\'t wait to see you!' };
      case 'CANCELLED': 
        return { color: 'text-red-600', bg: 'bg-red-100', icon: '❌', text: 'Booking Cancelled', message: 'Your appointment was cancelled. Please contact us if this is a mistake.' };
      case 'COMPLETED': 
        return { color: 'text-blue-600', bg: 'bg-blue-100', icon: '✨', text: 'Appointment Completed', message: 'Thank you for visiting Ibra Salon!' };
      default: 
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: '⏳', text: 'Waiting for Confirmation', message: 'Ibra Salon has received your request. We are checking the schedule.' };
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">Loading tracker...</div>;
  if (!appointment) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">Booking not found.</div>;

  const ui = getStatusUI(appointment.status);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
        >
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-6 ${ui.bg}`}>
            {ui.icon}
          </div>
          
          <h1 className={`text-2xl font-bold tracking-tight mb-2 ${ui.color}`}>{ui.text}</h1>
          <p className="text-gray-500 mb-8 text-sm">{ui.message}</p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-left space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Customer</span>
              <span className="font-bold text-black">{appointment.customer_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Service</span>
              <span className="font-bold text-black">{appointment.service_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Barber</span>
              <span className="font-bold text-black">{appointment.staff_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Time</span>
              <span className="font-bold text-black">
                {new Date(appointment.start_time).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {appointment.status === 'PENDING' && (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Checking for updates...
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
