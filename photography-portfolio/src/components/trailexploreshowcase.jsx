import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { mediaItems } from "../data/mediaData";

const ShowcasePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [fetchedMedia, setFetchedMedia] = useState([]);

  // Fetch from backend
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/photos`
        );
        const data = await response.json();

        // Map backend data to frontend media format
        const formatted = data.map((item) => ({
          src: item.url,
          type: item.type,
          name: item.name,
          category: item.category,
        }));

        setFetchedMedia(formatted);
      } catch (err) {
        console.error("Error fetching photos:", err);
      } finally {
        // Always stop loader after timeout or fetch
        setTimeout(() => setIsLoading(false), 4000);
      }
    };

    fetchMedia();
  }, []);

  // Merge static + dynamic media
  const allMedia = [...mediaItems, ...fetchedMedia];

  const filteredMedia =
    selectedCategory === "All"
      ? allMedia
      : selectedCategory === "Images"
      ? allMedia.filter((item) => item.type === "image")
      : selectedCategory === "Videos"
      ? allMedia.filter((item) => item.type === "video")
      : allMedia.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Solid Sticky Filters + Header */}
      <div className="sticky top-0 bg-black z-50 border-b border-gray-800 select-none">
        {/* Line 1: Back Button + Media Filter Dropdown + Logo */}
        <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate(-1)}
              className="border border-gray-500 px-3 py-1 rounded-md text-white hover:text-blue-400 hover:border-blue-400 transition cursor-pointer"
            >
              ← Back
            </button>

            <select
              className="bg-black border border-gray-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {["All", "Images", "Videos"].map((type) => (
                <option key={type} value={type} className="text-white">
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="text-white text-lg font-bold italic tracking-wider hover:text-blue-400 transition cursor-pointer">
            Satya
          </div>
        </div>

        {/* Line 2: Filter Row for All Devices */}
        <div className="px-2 md:px-4 pb-2 hidden sm:block">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
            {[
              "Car",
              "Bike",
              "Nature",
              "Wedding",
              "Sky",
              "Cinematic",
              "Events",
              "Birthday",
              "Portrait",
              "Architecture",
              "Food",
              "City",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full px-3 py-2 text-sm text-center transition duration-200 rounded-md cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Scroll */}
        <div className="px-2 md:px-4 pb-2 sm:hidden">
          <div className="flex overflow-x-auto gap-2 scrollbar-hide">
            {[
              "Car",
              "Bike",
              "Nature",
              "Wedding",
              "Sky",
              "Cinematic",
              "Events",
              "Birthday",
              "Portrait",
              "Architecture",
              "Food",
              "City",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 text-sm rounded-md cursor-pointer transition duration-200 border ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Line 3: Description */}
        <div className="px-4 md:px-6 pb-4 overflow-hidden">
          <p className="text-gray-400 text-sm md:text-base text-center select-none md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
            Explore our collection of creative Photos, Videos and innovative
            solutions that demonstrate My expertise.
          </p>
        </div>
      </div>

      {/* Media Grid or Spinner */}
      <main className="container mx-auto px-6 pt-24 pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredMedia.map((item, index) => (
              <div
                key={index}
                className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() =>
                  item.type === "image" && setLightboxImage(item.src)
                }
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                ) : (
                  <VideoPlayer src={item.src} name={item.name} />
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Custom Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Fullscreen Preview"
            className="max-w-full max-h-full rounded-lg shadow-xl"
          />
        </div>
      )}
    </div>
  );
};

export default ShowcasePage;
