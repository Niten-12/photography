import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showCredit, setShowCredit] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => setShowCredit(!showCredit);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCredit(false);
      }
    };

    if (showCredit) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCredit]);

  return (
    <footer
      className="bg-black/90 backdrop-blur-sm text-gray-500 text-center py-6 border-t border-gray-700 relative"
      data-scroll-section
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm relative">
          <p>
            © {new Date().getFullYear()} Satya Photography. All rights reserved.
            Developed with ❤️ by{" "}
            <a
              href="https://github.com/Niten-12"
              className="text-amber-400 hover:underline"
            >
              Niten Swain
            </a>
            <span className="relative inline-block">
              <button
                onClick={toggleModal}
                aria-label="Project Info"
                className="ml-2 inline-block text-amber-400 hover:text-white transition"
              >
                ℹ️
              </button>

              {/* ✅ Tooltip Modal */}
              {showCredit && (
                <div
                  ref={modalRef}
                  className="absolute z-50 bottom-8 right-0 w-[300px] bg-white text-black p-4 rounded-xl shadow-xl border border-gray-200 transform transition-all duration-300 ease-out animate-fadeIn"
                >
                  <button
                    onClick={toggleModal}
                    className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <h3 className="text-lg font-semibold mb-2">Project Info</h3>
                  <ul className="text-xs space-y-1 text-left">
                    <li>
                      <strong>Project:</strong> Satya Photography Portfolio
                    </li>
                    <li>
                      <strong>Tech Stack:</strong> React, Vite, Tailwind CSS,
                      Supabase
                    </li>
                    <li>
                      <strong>Backend:</strong> Node.js, Express, Supabase DB &
                      Storage
                    </li>
                    <li>
                      <strong>Developer:</strong> Niten Swain
                    </li>
                    <li>
                      <strong>Duration:</strong> May–June 2025
                    </li>
                    <li>
                      <strong>GitHub:</strong>{" "}
                      <a
                        href="https://github.com/Niten-12"
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        github.com/Niten-12
                      </a>
                    </li>
                    <li>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:swainniten2020@email.com"
                        className="text-blue-600 hover:underline"
                      >
                        swainniten2020@email.com
                      </a>
                    </li>
                    <li>
                      <strong>LinkedIn:</strong>{" "}
                      <a
                        href="https://linkedin.com/in/Niten-12"
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        linkedin.com/in/Niten-12
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </span>
          </p>
        </div>

        <p className="mt-2 text-xs sm:text-sm">
          Crafted with passion and attention to detail.
        </p>

        <Link
          to="/admin"
          className="mt-4 inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
