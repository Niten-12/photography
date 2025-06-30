// src/admin/AdminReviewList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminReviewList() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reviews/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          alert("Unauthorized access");
          localStorage.removeItem("adminToken");
          navigate("/admin");
          return;
        }

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };

    fetchReviews();
  }, [navigate, token]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setReviews((prev) => prev.filter((review) => review.id !== id));
      } else {
        alert("Failed to delete review");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="mb-6 px-4 py-2 border rounded border-amber-400 hover:bg-amber-500 hover:text-black"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-4">All User Feedback</h1>

      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <p className="text-gray-400">No feedback submitted yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-800 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg">{review.name}</h2>
                  <p className="text-sm text-gray-400">
                    {new Date(review.created_at).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2">{review.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
