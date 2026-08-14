"use client";

import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import Link from "next/link";

export default function Home() {
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  // Premium image grid for visual appeal
  const galleryImages = [
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop", // Fade
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop", // Beard
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop", // Portrait
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop", // Shop
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2070&auto=format&fit=crop" alt="African Men's Grooming" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-gray-300 mb-6 border border-gray-400 px-4 py-2 rounded-full">
            Kampala&apos;s Premier Grooming Destination
          </motion.span>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-4 leading-none">
            LOOK SHARP.<br/>FEEL CONFIDENT.
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Premium men&apos;s grooming and styling. Book your appointment in seconds.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="bg-white text-black px-10 py-4 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-gray-200 transition-colors shadow-lg">
              Book Your Appointment
            </Link>
            <Link href="/styles" className="bg-transparent border border-white text-white px-10 py-4 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors">
              View Style Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - Visual Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black flex items-center justify-center text-white text-2xl">✂️</div>
            <h3 className="text-xl font-bold text-black mb-2 tracking-tight">Expert Barbers</h3>
            <p className="text-gray-500 text-sm">Our team is trained in the latest trends to give you the perfect look.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} className="p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black flex items-center justify-center text-white text-2xl">⏱️</div>
            <h3 className="text-xl font-bold text-black mb-2 tracking-tight">Quick & Easy Booking</h3>
            <p className="text-gray-500 text-sm">Book your slot online in less than 60 seconds. No waiting in line.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black flex items-center justify-center text-white text-2xl">✨</div>
            <h3 className="text-xl font-bold text-black mb-2 tracking-tight">Premium Products</h3>
            <p className="text-gray-500 text-sm">We use only the highest quality products for your hair and skin.</p>
          </motion.div>
        </div>
      </section>

      {/* Transformations Section */}
      <section id="transformations" className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight">Real Transformations</h2>
            <p className="text-gray-500">Drag the slider to see the difference a visit to Ibra makes</p>
            <div className="w-16 h-1 bg-black mx-auto mt-6"></div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </section>

      {/* Visual Gallery Preview Grid */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight">The Ibra Experience</h2>
            <p className="text-gray-500">A glimpse into our world of premium grooming</p>
            <div className="w-16 h-1 bg-black mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <motion.div 
                key={index} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl group ${index === 0 || index === 3 ? 'md:row-span-2 md:h-full h-64' : 'h-64'}`}
              >
                <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/styles" className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready for a Fresh Look?</h2>
          <p className="text-gray-400 mb-8">Explore our services and meet the team dedicated to your style.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-gray-200 transition-colors">
              View Services
            </Link>
            <Link href="/barbers" className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors">
              Meet the Barbers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
