import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Unauthorized access. Please log in.");
      navigate("/admin");
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/contact/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          alert("Session expired. Please log in again.");
          navigate("/admin");
        } else {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        alert("Something went wrong while fetching messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/contact/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete");

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      alert("Message deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete message.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navbar */}
      <div className="bg-gray-800 p-4 flex justify-between items-center shadow">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-xl font-semibold">Contact Messages</h1>
        <div></div>
      </div>

      {/* Table Section */}
      <div className="p-4 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">User Submitted Messages</h2>

        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400">No messages submitted yet.</p>
        ) : (
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="p-3 border border-gray-600">No.</th>
                <th className="p-3 border border-gray-600">Name</th>
                <th className="p-3 border border-gray-600">Email</th>
                <th className="p-3 border border-gray-600">Message</th>
                <th className="p-3 border border-gray-600">Submitted On</th>
                <th className="p-3 border border-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr
                  key={msg.id}
                  className="hover:bg-gray-700 transition duration-200"
                >
                  <td className="p-3 border border-gray-700">{index + 1}</td>
                  <td className="p-3 border border-gray-700">{msg.name}</td>
                  <td className="p-3 border border-gray-700 text-blue-300 break-all">
                    {msg.email}
                  </td>
                  <td className="p-3 border border-gray-700 truncate max-w-xs hover:whitespace-normal hover:text-white transition duration-200">
                    {msg.message}
                  </td>
                  <td className="p-3 border border-gray-700 text-gray-400 hover:text-white transition duration-200">
                    {msg.submitted_at
                      ? new Date(msg.submitted_at).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })
                      : "Unknown Date"}
                  </td>

                  <td className="p-3 border border-gray-700">
                    <span
                      onClick={() => handleDelete(msg.id)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-150"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
