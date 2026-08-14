"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

interface Style {
  id: number;
  name: string;
  category: string;
  image: string;
}

export default function StylesGallery() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    fetch("https://ibra-salon-platform.onrender.com/api/salon/styles/")
      .then((res) => res.json())
      .then((data) => {
        setStyles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ["ALL", "FADES", "TAPERS", "BEARDS", "DREADS", "AFROS"];

  const filteredStyles = activeFilter === "ALL" 
    ? styles 
    : styles.filter(style => style.category === activeFilter);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <section className="bg-black text-white py-20 md:py-32 text-center">
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4"
        >
          THE GALLERY
        </motion.h1>
        <motion.p 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto px-4"
        >
          Find your next look. Browse our premium styles and book your appointment today.
        </motion.p>
      </section>

      <main className="bg-white min-h-screen p-4 md:p-16">
        <div className="max-w-6xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-full ${
                  activeFilter === cat 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading styles...</div>
          ) : filteredStyles.length === 0 ? (
            <div className="text-center text-gray-400 py-20">No styles found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStyles.map((style, index) => (
                <motion.div 
                  key={style.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-gray-100"
                >
                  {/* Image - Using the exact full URL from backend */}
                  {style.image ? (
                    <img 
                      src={style.image} 
                      alt={style.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">
                      {style.category}
                    </span>
                    <h3 className="text-white text-xl font-bold tracking-tight">
                      {style.name}
                    </h3>
                    <Link 
                      href="/#services" 
                      className="mt-3 inline-block bg-white text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Book This Style
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
