import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <img src="/logo.png" alt="Ibra Salon Logo" className="h-12 w-auto mb-4 invert" />
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">Premium grooming & styling in Uganda. Look sharp, feel confident. Book your appointment online today.</p>
          <div className="flex gap-4">
            <span className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Quick Links</h4>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/styles" className="hover:text-white transition-colors">Style Gallery</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/#services" className="hover:text-white transition-colors">Book Appointment</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Visit Us</h4>
          <p className="text-gray-400 text-sm mb-2">Kampala Road, Plot 123</p>
          <p className="text-gray-400 text-sm mb-2">+256 757 649 159</p>
          <p className="text-gray-400 text-sm mb-2">Mon - Fri: 8:00 AM - 8:00 PM</p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Ibra Salon. All rights reserved. Crafted with precision.
      </div>
    </footer>
  );
}
