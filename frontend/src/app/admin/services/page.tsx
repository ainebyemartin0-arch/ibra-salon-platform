"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../../components/AdminNavbar";

interface Service {
  id: number;
  name: string;
  description: string;
  duration_mins: number;
  price: string;
  image: string | null;
}

export default function ManageServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);

  const fetchServices = async () => {
    const token = localStorage.getItem("ibra_token");
    if (!token) { router.push("/login"); return; }

    try {
      const res = await fetch("https://ibra-salon-platform.onrender.com/api/salon/services/");
      const data = await res.json();
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const token = localStorage.getItem("ibra_token");

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('duration_mins', duration);
    formData.append('price', price);
    formData.append('is_active', 'true');
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await fetch("https://ibra-salon-platform.onrender.com/api/salon/services/", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        setName(""); setDescription(""); setDuration(""); setPrice(""); setImageFile(null);
        fetchServices();
      } else {
        alert("Failed to add service.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("ibra_token");
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`https://ibra-salon-platform.onrender.com/api/salon/services/${id}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        fetchServices();
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    }
  };

  const formatPrice = (price: string) => parseFloat(price).toLocaleString() + " UGX";

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <AdminNavbar />
      
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">Manage Services</h1>
          <p className="text-gray-500 text-sm">Add or remove salon services</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4 tracking-tight">Add New Service</h2>
            <form onSubmit={handleAddService} className="space-y-3">
              <input type="text" required placeholder="Service Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black" />
              <textarea required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black h-20"></textarea>
              <div className="flex gap-3">
                <input type="number" required placeholder="Duration (mins)" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black" />
                <input type="number" required step="0.01" placeholder="Price (UGX)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Service Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} 
                  className="w-full p-2 border border-gray-300 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                />
              </div>
              <button type="submit" disabled={adding} className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 font-bold text-sm tracking-wider uppercase disabled:bg-gray-400">
                {adding ? "Adding..." : "Add Service"}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4 tracking-tight">Current Services</h2>
            {loading ? (
              <p className="text-gray-400 text-center py-4">Loading...</p>
            ) : services.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No services yet.</p>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between border-b pb-3 gap-4">
                    <div className="flex items-center gap-3">
                      {service.image ? (
                        <img src={service.image} alt={service.name} className="w-12 h-12 rounded-md object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">✂️</div>
                      )}
                      <div>
                        <p className="font-bold text-black">{service.name}</p>
                        <p className="text-xs text-gray-500">{formatPrice(service.price)} • {service.duration_mins} mins</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
