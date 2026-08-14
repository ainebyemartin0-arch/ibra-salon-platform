"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../../components/AdminNavbar";

interface Customer {
  id: number;
  name: string;
  phone_number: string;
  loyalty_points: number;
  created_at: string;
}

export default function ManageCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCustomers = async () => {
    const token = localStorage.getItem("ibra_token");
    if (!token) { router.push("/login"); return; }

    try {
      const res = await fetch("http://localhost:8000/api/salon/customers/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.status === 401) { router.push("/login"); return; }
      
      const data = await res.json();
      setCustomers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <AdminNavbar />
      
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">Customers</h1>
          <p className="text-gray-500 text-sm">View your client base and their loyalty points</p>
        </header>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          {loading ? (
            <p className="text-gray-400 text-center py-4">Loading...</p>
          ) : customers.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No customers yet.</p>
          ) : (
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between border-b pb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-black">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.phone_number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Loyalty Points</p>
                    <p className="text-xl font-bold text-black">{customer.loyalty_points}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
