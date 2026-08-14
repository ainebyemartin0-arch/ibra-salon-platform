"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import NotificationBell from "./NotificationBell";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("ibra_token");
    router.push("/login");
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/admin" className="text-xl font-bold tracking-tight text-white">
          IBRA<span className="text-gray-500">ADMIN</span>
        </Link>
        
        <div className="flex gap-4 md:gap-6 items-center">
          <Link href="/admin" className="text-gray-300 hover:text-white text-sm md:text-base hidden sm:block">
            Dashboard
          </Link>
          <Link href="/admin/services" className="text-gray-300 hover:text-white text-sm md:text-base hidden sm:block">
            Services
          </Link>
          <Link href="/admin/staff" className="text-gray-300 hover:text-white text-sm md:text-base hidden sm:block">
            Staff
          </Link>
          {/* NEW Customers Link */}
          <Link href="/admin/customers" className="text-gray-300 hover:text-white text-sm md:text-base hidden sm:block">
            Customers
          </Link>
          
          <NotificationBell />

          <button onClick={handleLogout} className="bg-white text-black px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors uppercase tracking-wider">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
