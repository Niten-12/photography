import React, { useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaBehance,
} from "react-icons/fa";
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen p-12"
      style={{ backgroundColor: "#0B1120" }}
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side Content */}
        <div data-aos="fade-right">
          <h2 className="text-4xl font-bold mb-6 text-white">Get In Touch</h2>
          <p className="text-lg text-gray-300 mb-8">
            Interested in working together? Have questions about my services?
            Feel free to reach out and I'll get back to you as soon as possible.
          </p>

          <div className="space-y-4 text-gray-300">
            <a
              href="mailto:swainsatyanarayan13@gmail.com"
              class="text-blue-500 underline cursor-pointer"
            >
              📧 swainsatyanarayan13@gmail.com
            </a>

            <p>📍 INDIA</p>
          </div>

          {/* 🌐 Social Media Icons */}
          <div className="flex gap-6 mt-8 flex-wrap">
            <a
              href="https://www.instagram.com/mr._satya_7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[32px] text-white font-bold hover:text-pink-500 cursor-pointer transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/satyanarayan.swain1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[32px] text-white font-bold hover:text-blue-500 cursor-pointer transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://in.linkedin.com/in/satya-narayan-swain-687442216?trk=people-guest_people_search-card"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[32px] text-white font-bold hover:text-blue-400 cursor-pointer transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[32px] text-white font-bold hover:text-red-500 cursor-pointer transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[32px] text-white font-bold hover:text-blue-300 cursor-pointer transition"
            >
              <FaBehance />
            </a>
          </div>
        </div>

        {/* Right Side Form */}
        <div
          data-aos="fade-left"
          className="bg-gray-900 p-8 rounded-xl shadow-lg text-white"
        >
          {submitted ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-green-400 mb-4">
                ✅ Message Submitted Successfully!
              </h3>
              <p className="text-gray-400">We'll get back to you soon.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
