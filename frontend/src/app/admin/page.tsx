"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../components/AdminNavbar";

interface Appointment {
  id: number;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  service_price: string;
  staff_name: string;
  start_time: string;
  status: string;
}

interface Stats {
  today_revenue: number;
  completed_today: number;
  pending_today: number;
  total_appointments_today: number;
  avg_booking_value: number;
  top_service: string;
  top_service_count: number;
  top_barber: string;
  top_barber_revenue: number;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const fetchAppointments = async () => {
    const token = localStorage.getItem("ibra_token");
    if (!token) { router.push("/login"); return; }

    try {
      const res = await fetch("http://localhost:8000/api/salon/appointments/", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.status === 401) {
        localStorage.removeItem("ibra_token");
        router.push("/login");
        return;
      }

      const data = await res.json();
      setAppointments(data);
      
      const statsRes = await fetch("http://localhost:8000/api/salon/admin/stats/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      setStats(statsData);
      
      setLoading(false);
      setAuthorized(true);
    } catch (error) {
      console.error("Failed to fetch data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    const token = localStorage.getItem("ibra_token");
    try {
      const res = await fetch(`http://localhost:8000/api/salon/appointments/${id}/update/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
        fetchAppointments(); 
      } else if (res.status === 401) {
        router.push("/login");
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    }
  };

  const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return num.toLocaleString() + " UGX";
  };
  
  const formatTime = (time: string) => new Date(time).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-700 border-green-200';
      case 'COMPLETED': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  if (!authorized) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gray-50">Checking authorization...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <AdminNavbar />
      
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-sm">Business overview & daily appointments</p>
          </div>
          <button onClick={fetchAppointments} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 border border-gray-200 shadow-sm flex items-center gap-2 uppercase tracking-wider">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Refresh
          </button>
        </header>

        {/* Main Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black text-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Revenue</p>
            <p className="text-xl font-bold">{formatPrice(stats?.today_revenue || 0)}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Appointments</p>
            <p className="text-xl font-bold text-black">{stats?.total_appointments_today || 0}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Completed</p>
            <p className="text-xl font-bold text-black">{stats?.completed_today || 0}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Pending</p>
            <p className="text-xl font-bold text-black">{stats?.pending_today || 0}</p>
          </div>
        </div>

        {/* Business Insights Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold text-black mb-6 tracking-tight">Business Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-2 border-black pl-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg. Booking Value</p>
              <p className="text-xl font-bold text-black">{formatPrice(stats?.avg_booking_value || 0)}</p>
            </div>
            <div className="border-l-2 border-black pl-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Top Service</p>
              <p className="text-xl font-bold text-black">{stats?.top_service || "N/A"}</p>
              <p className="text-xs text-gray-400 mt-1">{stats?.top_service_count || 0} completed</p>
            </div>
            <div className="border-l-2 border-black pl-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Top Barber</p>
              <p className="text-xl font-bold text-black">{stats?.top_barber || "N/A"}</p>
              <p className="text-xs text-gray-400 mt-1">{formatPrice(stats?.top_barber_revenue || 0)} revenue</p>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <h2 className="text-xl font-bold text-black mb-4 tracking-tight">All Appointments</h2>
        {appointments.length === 0 ? (
          <div className="text-center text-gray-400 py-10 bg-white rounded-xl border border-gray-100">
            No appointments booked yet.
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((app) => (
              <div key={app.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-black">{app.customer_name}</h3>
                    <p className="text-sm text-gray-500">{app.customer_phone}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Service</p>
                    <p className="text-gray-700 font-medium">{app.service_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Barber</p>
                    <p className="text-gray-700 font-medium">{app.staff_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Time</p>
                    <p className="text-gray-700 font-medium">{formatTime(app.start_time)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Price</p>
                    <p className="text-black font-bold">{formatPrice(app.service_price)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {app.status === 'PENDING' && (
                    <button onClick={() => updateStatus(app.id, 'CONFIRMED')} className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-800 uppercase tracking-wider">
                      Confirm
                    </button>
                  )}
                  {app.status === 'CONFIRMED' && (
                    <button onClick={() => updateStatus(app.id, 'COMPLETED')} className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-800 uppercase tracking-wider">
                      Complete
                    </button>
                  )}
                  {(app.status === 'PENDING' || app.status === 'CONFIRMED') && (
                    <button onClick={() => updateStatus(app.id, 'CANCELLED')} className="bg-white text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 border border-red-200 uppercase tracking-wider">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
