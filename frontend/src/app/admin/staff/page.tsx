"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../../components/AdminNavbar";

interface Barber {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string | null;
}

export default function ManageStaff() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [name, setName] = useState("");
  const [role, setRole] = useState("Barber");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);

  const fetchBarbers = async () => {
    const token = localStorage.getItem("ibra_token");
    if (!token) { router.push("/login"); return; }

    try {
      const res = await fetch("https://ibra-salon-platform.onrender.com/api/salon/staff/");
      const data = await res.json();
      setBarbers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  const handleAddBarber = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const token = localStorage.getItem("ibra_token");

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('bio', bio);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await fetch("https://ibra-salon-platform.onrender.com/api/salon/staff/", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        setName(""); setRole("Barber"); setBio(""); setImageFile(null);
        fetchBarbers(); 
      } else {
        alert("Failed to add barber.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("ibra_token");
    if (!confirm("Are you sure you want to delete this barber?")) return;

    try {
      const res = await fetch(`https://ibra-salon-platform.onrender.com/api/salon/staff/${id}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        fetchBarbers();
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <AdminNavbar />
      
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">Manage Barbers</h1>
          <p className="text-gray-500 text-sm">Add or remove salon staff</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4 tracking-tight">Add New Barber</h2>
            <form onSubmit={handleAddBarber} className="space-y-3">
              <input type="text" required placeholder="Barber Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black" />
              <input type="text" required placeholder="Role (e.g., Master Barber)" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black" />
              <textarea required placeholder="Short Bio" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black h-20"></textarea>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Profile Photo</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} 
                  className="w-full p-2 border border-gray-300 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                />
              </div>
              <button type="submit" disabled={adding} className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 font-bold text-sm tracking-wider uppercase disabled:bg-gray-400">
                {adding ? "Adding..." : "Add Barber"}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4 tracking-tight">Current Team</h2>
            {loading ? (
              <p className="text-gray-400 text-center py-4">Loading...</p>
            ) : barbers.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No barbers yet.</p>
            ) : (
              <div className="space-y-4">
                {barbers.map((barber) => (
                  <div key={barber.id} className="flex items-center justify-between border-b pb-3 gap-4">
                    <div className="flex items-center gap-3">
                      {barber.image ? (
                        <img src={barber.image} alt={barber.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">✂️</div>
                      )}
                      <div>
                        <p className="font-bold text-black">{barber.name}</p>
                        <p className="text-xs text-gray-500">{barber.role}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(barber.id)} className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider">
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
