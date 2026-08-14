import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Ibra Salon Logo" className="h-10 md:h-12 w-auto" />
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/" className="text-gray-600 hover:text-black text-sm font-medium hidden md:block transition-colors">Home</Link>
          <Link href="/services" className="text-gray-600 hover:text-black text-sm font-medium hidden md:block transition-colors">Services</Link>
          <Link href="/barbers" className="text-gray-600 hover:text-black text-sm font-medium hidden md:block transition-colors">Barbers</Link>
          <Link href="/styles" className="text-gray-600 hover:text-black text-sm font-medium hidden md:block transition-colors">Styles</Link>
          <Link href="/about" className="text-gray-600 hover:text-black text-sm font-medium hidden md:block transition-colors">About</Link>
          <Link href="/contact" className="text-gray-600 hover:text-black text-sm font-medium hidden md:block transition-colors">Contact</Link>
          <Link href="/services" className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-gray-800 transition-colors">Book Now</Link>
        </div>
      </div>
    </nav>
  );
}
