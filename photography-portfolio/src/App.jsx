//App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Index from "./components/index";
import ShowcasePage from "./components/exploreshowcase";
import SubmitReview from "./components/submit_review";
import AdminLogin from "./admin/Admin";
import Dashboard from "./admin/Dashboard";
import AdminContactMessages from "./admin/AdminContactMessages";
import AdminReviewList from "./admin/AdminReviewList";
import AdminPhotoGallery from "./admin/AdminPhotoGallery";
// ✅ NEW IMPORT

import "./App.css";

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem("adminToken");
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/exploreshowcase" element={<ShowcasePage />} />
        <Route path="/submit-review" element={<SubmitReview />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/admin" />}
        />
        <Route
          path="/admin/reviews"
          element={
            isAuthenticated() ? <AdminReviewList /> : <Navigate to="/admin" />
          }
        />
        <Route
          path="/admin/contact"
          element={
            isAuthenticated() ? (
              <AdminContactMessages />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route
          path="/admin/photos"
          element={
            isAuthenticated() ? <AdminPhotoGallery /> : <Navigate to="/admin" />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
