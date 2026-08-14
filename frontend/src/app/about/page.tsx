import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Hero Header */}
        <section className="bg-black text-white py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">ABOUT IBRA</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto px-4">Redefining grooming standards in Uganda.</p>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-20 text-gray-700 leading-relaxed">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6 text-center tracking-tight">Our Story</h2>
            <p className="text-center mb-4 text-lg">
              Ibra Salon started with a simple idea: to provide a premium, relaxing, and professional grooming experience for the people of Kampala. What began as a small barbershop has grown into a full-service salon known for its expert stylists and exceptional customer service.
            </p>
            <p className="text-center text-lg">
              We blend classic techniques with modern trends to ensure every client leaves feeling confident and looking their absolute best. Your style is our passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12">
            <div className="p-8 border border-gray-100 rounded-xl hover:border-black transition-colors">
              <h3 className="text-xl font-bold text-black mb-3 tracking-tight">Our Mission</h3>
              <p className="text-sm text-gray-500">To deliver top-tier styling and grooming services in a clean, welcoming environment.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-xl hover:border-black transition-colors">
              <h3 className="text-xl font-bold text-black mb-3 tracking-tight">Our Vision</h3>
              <p className="text-sm text-gray-500">To be the leading and most trusted salon brand in East Africa.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-xl hover:border-black transition-colors">
              <h3 className="text-xl font-bold text-black mb-3 tracking-tight">Our Values</h3>
              <p className="text-sm text-gray-500">Quality, Professionalism, Hygiene, and Customer Satisfaction above all.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
