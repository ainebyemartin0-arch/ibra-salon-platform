"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  description: string;
  duration_mins: number;
  price: string;
  image: string | null;
}

interface Barber {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string | null;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<number | "">("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [bookingStep, setBookingStep] = useState("form");
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("https://ibra-salon-platform.onrender.com/api/salon/services/").then(res => res.json()).then(data => setServices(data)).catch(err => console.error(err));
    fetch("https://ibra-salon-platform.onrender.com/api/salon/staff/").then(res => res.json()).then(data => { setBarbers(data); setLoading(false); }).catch(err => { console.error(err); setLoading(false); });
  }, []);

  const formatPrice = (price: string) => parseFloat(price).toLocaleString() + " UGX";
  const handleBookClick = (service: Service) => { setSelectedService(service); setIsModalOpen(true); setBookingStep("form"); };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true);
    try {
      const response = await fetch("https://ibra-salon-platform.onrender.com/api/salon/appointments/create/", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: selectedService?.id, staff: selectedBarber || null, start_time: new Date(dateTime).toISOString(), customer_name: customerName, customer_phone: customerPhone }),
      });
      if (response.ok) {
        const data = await response.json();
        setAppointmentId(data.id); // Save the ID for tracking
        setBookingStep("success");
      } else { alert("Failed to book."); }
    } catch (error) { alert("Error connecting to server."); } finally { setSubmitting(false); }
  };

  const generateWhatsAppLink = () => {
    const barberName = barbers.find(b => b.id === selectedBarber)?.name || "Any Available Barber";
    const message = `Hello Ibra Salon! I just booked an appointment online.%0A%0A*Service:* ${selectedService?.name}%0A*Barber:* ${barberName}%0A*Time:* ${dateTime}%0A*Name:* ${customerName}%0A*Phone:* ${customerPhone}%0A%0APlease confirm. Thank you!`;
    return `https://wa.me/256757649159?text=${message}`;
  };

  const closeModal = () => { setIsModalOpen(false); setCustomerName(""); setCustomerPhone(""); setDateTime(""); setSelectedBarber(""); setBookingStep("form"); setAppointmentId(null); };
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pt-12 pb-24 font-sans">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16 mt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight">Our Services & Pricing</h2>
            <p className="text-gray-500">Select a service below to book your slot</p>
            <div className="w-16 h-1 bg-black mx-auto mt-6"></div>
          </div>
          
          {loading ? <div className="text-center text-gray-400">Loading...</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div key={service.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl border border-gray-200 hover:border-black transition-all duration-300 flex flex-col group overflow-hidden">
                  {service.image && (<div className="w-full h-48 overflow-hidden"><img src={service.image} alt={service.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" /></div>)}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-black mb-2 tracking-tight">{service.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 flex-grow">{service.description || "Professional service tailored to you."}</p>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{service.duration_mins} mins</span>
                      <span className="text-xl font-bold text-black">{formatPrice(service.price)}</span>
                    </div>
                    <button onClick={() => handleBookClick(service)} className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-bold text-sm tracking-wider uppercase group-hover:bg-gray-900">Book Now</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative border border-gray-200">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl">&times;</button>
            {bookingStep === "form" ? (
              <>
                <h2 className="text-2xl font-bold text-black mb-2 tracking-tight">Book: {selectedService.name}</h2>
                <p className="text-gray-500 mb-6 text-sm">{formatPrice(selectedService.price)} • {selectedService.duration_mins} mins</p>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Choose Barber</label>
                    <select value={selectedBarber} onChange={(e) => setSelectedBarber(e.target.value ? Number(e.target.value) : "")} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white">
                      <option value="">Any Available Barber</option>
                      {barbers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Your Name</label><input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all" placeholder="John Doe" /></div>
                  <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Phone Number</label><input type="tel" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all" placeholder="0771234567" /></div>
                  <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Date & Time</label><input type="datetime-local" required value={dateTime} onChange={(e) => setDateTime(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all" /></div>
                  <button type="submit" disabled={submitting} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 font-bold text-sm tracking-wider uppercase disabled:bg-gray-400 mt-4">{submitting ? "Saving..." : "Confirm Booking"}</button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                <h2 className="text-2xl font-bold text-black mb-2 tracking-tight">Booking Request Sent!</h2>
                <p className="text-gray-500 mb-6 text-sm">Keep this page open to get notified when Ibra confirms your slot.</p>
                
                {/* NEW: Live Tracking Button */}
                {appointmentId && (
                  <Link href={`/track/${appointmentId}`} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 font-bold text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    Track Booking Live
                  </Link>
                )}
                
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-full bg-gray-100 text-black py-3 rounded-lg hover:bg-gray-200 font-bold text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2 mb-4"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>Notify Ibra on WhatsApp</a>
                <button onClick={closeModal} className="text-gray-500 hover:text-black text-sm">Close</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
