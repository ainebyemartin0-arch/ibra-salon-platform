"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

interface Barber {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string | null;
}

export default function BarbersPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/salon/staff/")
      .then(res => res.json())
      .then(data => { setBarbers(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 mt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight">Meet the Barbers</h2>
            <p className="text-gray-500">Expert stylists dedicated to giving you the perfect look</p>
            <div className="w-16 h-1 bg-black mx-auto mt-6"></div>
          </div>
          
          {loading ? <div className="text-center text-gray-400">Loading...</div> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {barbers.map((barber, index) => (
                <motion.div key={barber.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.1 }} className="text-center group">
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-black transition-colors">
                    {barber.image ? <img src={barber.image} alt={barber.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" /> : <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-4xl">✂️</div>}
                  </div>
                  <h3 className="text-lg font-bold text-black tracking-tight">{barber.name}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{barber.role}</p>
                  <p className="text-sm text-gray-600 max-w-xs mx-auto">{barber.bio}</p>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/services" className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors">
              Book an Appointment
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
