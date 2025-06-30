//Dashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Please log in to access the dashboard");
      navigate("/admin");
      return;
    }

    const fetchProtectedData = async () => {
      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        alert("Session expired or unauthorized");
        localStorage.removeItem("adminToken");
        navigate("/admin");
      } else {
        console.log("Protected Data:", data);
      }
    };

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };
  const sectionButtons = [
    // { label: "About Me", path: "/admin/about" },
    { label: "Upload / Manage Photos 📸", path: "/admin/photos" }, // ✅ NEW BUTTON
    { label: "Feedback", path: "/admin/reviews" },
    { label: "Contact Section", path: "/admin/contact" },
  ];
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ✅ Navbar */}
      <div className="bg-gray-800 p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-semibold">Satya Narayan Swain</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* ✅ Main Dashboard Content */}
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h2>
        {/* You can add more admin features below */}
      </div>
      {/* Section Buttons */}
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sectionButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => navigate(btn.path)}
            className="bg-gray-800 hover:bg-gray-700 text-white py-6 rounded-lg shadow text-xl font-semibold transition cursor-pointer"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
