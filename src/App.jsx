import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./components/index";
import ShowcasePage from "./components/exploreshowcase";
import SubmitReview from "./components/submit_review";

import AdminLogin from "./admin/Admin";
import Dashboard from "./admin/Dashboard";
import AdminContactMessages from "./admin/AdminContactMessages";
import AdminReviewList from "./admin/AdminReviewList";
import AdminPhotoGallery from "./admin/AdminPhotoGallery";

import ProtectedRoute from "./admin/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Index />} />
        <Route path="/exploreshowcase" element={<ShowcasePage />} />
        <Route path="/submit-review" element={<SubmitReview />} />

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* ================= PROTECTED ADMIN ROUTES ================= */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <AdminReviewList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute>
              <AdminContactMessages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/photos"
          element={
            <ProtectedRoute>
              <AdminPhotoGallery />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
