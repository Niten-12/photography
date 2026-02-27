// // src\components\exploreshowcase.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import VideoPlayer from "./VideoPlayer";
// import { mediaItems } from "../data/mediaData";

// const ShowcasePage = () => {
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isLoading, setIsLoading] = useState(true);
//   const [lightboxImage, setLightboxImage] = useState(null);
//   const [fetchedMedia, setFetchedMedia] = useState([]);

//   // Fetch from backend
//   useEffect(() => {
//     const fetchMedia = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_BASE}/api/photos`,
//         );
//         const data = await response.json();

//         const formatted = data.map((item) => ({
//           src: item.url,
//           type: item.type,
//           name: item.name,
//           category: item.category,
//         }));

//         setFetchedMedia(formatted);

//         // ✅ Force Locomotive Scroll to update if used
//         setTimeout(() => {
//           window.dispatchEvent(new Event("resize"));
//         }, 200);
//       } catch (err) {
//         console.error("Error fetching photos:", err);
//       } finally {
//         setTimeout(() => setIsLoading(false), 2000); // ✅ Slightly faster UX
//       }
//     };

//     fetchMedia();
//   }, []);

//   const allMedia = [...mediaItems, ...fetchedMedia];

//   const filteredMedia =
//     selectedCategory === "All"
//       ? allMedia
//       : selectedCategory === "Images"
//         ? allMedia.filter((item) => item.type === "image")
//         : selectedCategory === "Videos"
//           ? allMedia.filter((item) => item.type === "video")
//           : allMedia.filter((item) => item.category === selectedCategory);

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Sticky Header */}
//       <div className="sticky top-0 bg-black z-50 border-b border-gray-800 select-none">
//         {/* Top Row */}
//         <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-3">
//           <div className="flex items-center gap-3 flex-wrap">
//             <button
//               onClick={() => navigate(-1)}
//               className="border border-gray-500 px-3 py-1 rounded-md text-white hover:text-blue-400 hover:border-blue-400 transition cursor-pointer"
//             >
//               ← Back
//             </button>

//             <select
//               className="bg-black border border-gray-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               {["All", "Images", "Videos"].map((type) => (
//                 <option key={type} value={type} className="text-white">
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="text-white text-lg font-bold italic tracking-wider hover:text-blue-400 transition cursor-pointer">
//             Satya
//           </div>
//         </div>

//         {/* Filter Row for Desktop */}
//         <div className="px-2 md:px-4 pb-2 hidden sm:block">
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
//             {[
//               "Car",
//               "Bike",
//               "Nature",
//               "Wedding",
//               "Sky",
//               "Cinematic",
//               "Events",
//               "Birthday",
//               "Portrait",
//               "Architecture",
//               "Food",
//               "City",
//             ].map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`w-full px-3 py-2 text-sm text-center transition duration-200 rounded-md cursor-pointer border ${
//                   selectedCategory === cat
//                     ? "bg-blue-500 text-white border-blue-500"
//                     : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-500"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Filter Row for Mobile */}
//         <div className="px-2 md:px-4 pb-2 sm:hidden">
//           <div className="flex overflow-x-auto gap-2 scrollbar-hide">
//             {[
//               "Car",
//               "Bike",
//               "Nature",
//               "Wedding",
//               "Sky",
//               "Cinematic",
//               "Events",
//               "Birthday",
//               "Portrait",
//               "Architecture",
//               "Food",
//               "City",
//             ].map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`flex-shrink-0 px-4 py-2 text-sm rounded-md cursor-pointer transition duration-200 border ${
//                   selectedCategory === cat
//                     ? "bg-blue-500 text-white border-blue-500"
//                     : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-500"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="px-4 md:px-6 pb-4 overflow-hidden">
//           <p className="text-gray-400 text-sm md:text-base text-center select-none md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
//             Explore our collection of creative Photos, Videos and innovative
//             solutions that demonstrate My expertise.
//           </p>
//         </div>
//       </div>

//       {/* Media Grid Section */}
//       <main className="container mx-auto px-6 pt-24 pb-12" data-scroll-section>
//         {isLoading ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 space-y-4">
//             {filteredMedia.map((item, index) => (
//               <div
//                 key={index}
//                 className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
//                 onClick={() =>
//                   item.type === "image" && setLightboxImage(item.src)
//                 }
//               >
//                 {item.type === "image" ? (
//                   <img
//                     src={item.src}
//                     alt={item.name}
//                     className="w-full h-auto object-cover"
//                     loading="lazy"
//                     decoding="async"
//                   />
//                 ) : (
//                   <VideoPlayer src={item.src} name={item.name} />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Lightbox */}
//       {lightboxImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer"
//           onClick={() => setLightboxImage(null)}
//           data-scroll-lock
//         >
//           <img
//             src={lightboxImage}
//             alt="Fullscreen Preview"
//             className="max-w-full max-h-full rounded-lg shadow-xl"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowcasePage;


// src/components/exploreshowcase.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { mediaItems } from "../data/mediaData";

// Custom hooks
const useInView = (ref) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [ref]);

  return isInView;
};

// Skeleton Loader Component
const MediaSkeleton = () => (
  <div className="break-inside-avoid rounded-xl overflow-hidden bg-gray-800 animate-pulse">
    <div className="w-full h-64 bg-gray-700"></div>
    <div className="p-3">
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Media Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8 bg-red-900/20 rounded-lg">
          <p className="text-red-400">Something went wrong loading this content.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Progressive Image Component
const ProgressiveImage = ({ src, alt, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef();
  const isInView = useInView(imgRef);

  useEffect(() => {
    if (isInView && !isLoaded && !error) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [isInView, src, isLoaded, error]);

  // Generate blur-up placeholder (tiny base64 version)
  const getPlaceholder = () => {
    // This would be better with actual tiny versions, but using a colored gradient for demo
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23333333'/%3E%3C/svg%3E";
  };

  if (error) {
    return (
      <div className="w-full h-48 bg-gray-800 flex items-center justify-center rounded-xl">
        <p className="text-gray-400">Failed to load image</p>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      onClick={onClick}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse">
          <img 
            src={getPlaceholder()} 
            alt=""
            className="w-full h-full object-cover blur-sm scale-105"
          />
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
        />
      )}
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
        <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Click to enlarge
        </span>
      </div>
    </div>
  );
};

// Lightbox Component
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          onNext();
        } else {
          onPrev();
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
      onTouchStart={handleTouchStart}
    >
      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        ←
      </button>
      
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        →
      </button>

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main Image */}
      <img
        src={images[currentIndex]?.src}
        alt={images[currentIndex]?.name}
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Download Button */}
      <a
        href={images[currentIndex]?.src}
        download
        className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all z-10"
        onClick={(e) => e.stopPropagation()}
        aria-label="Download image"
      >
        Download
      </a>
    </div>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, selectedCategory, onSelect, counts }) => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:block px-2 md:px-4 pb-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`w-full px-3 py-2 text-sm text-center transition duration-200 rounded-md cursor-pointer border relative group ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-500"
              }`}
              aria-label={`Filter by ${cat} category${counts[cat] ? ` (${counts[cat]} items)` : ''}`}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
              {counts[cat] > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {counts[cat]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="px-2 md:px-4 pb-2 sm:hidden">
        <div className="flex overflow-x-auto gap-2 scrollbar-hide pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`flex-shrink-0 px-4 py-2 text-sm rounded-md cursor-pointer transition duration-200 border ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-500"
              }`}
              aria-label={`Filter by ${cat} category`}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
              {counts[cat] > 0 && (
                <span className="ml-2 text-xs opacity-75">
                  ({counts[cat]})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

// Search Component
const SearchBar = ({ onSearch, searchTerm }) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSearch = useCallback((value) => {
    setLocalSearch(value);
    const timeoutId = setTimeout(() => {
      onSearch(value);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        value={localSearch}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search media..."
        className="w-full md:w-64 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md pl-10 focus:outline-none focus:border-blue-500 transition"
        aria-label="Search media items"
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        🔍
      </span>
    </div>
  );
};

// Sort Component
const SortOptions = ({ onSort, currentSort }) => {
  return (
    <select
      value={currentSort}
      onChange={(e) => onSort(e.target.value)}
      className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md text-sm cursor-pointer focus:outline-none focus:border-blue-500"
      aria-label="Sort options"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="name">Name A-Z</option>
      <option value="nameDesc">Name Z-A</option>
    </select>
  );
};

// Main Component
const ShowcasePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [fetchedMedia, setFetchedMedia] = useState([]);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const loaderRef = useRef();
  const isInView = useInView(loaderRef);

  // Categories list (stable reference for useMemo deps)
  const categories = useMemo(() => [
    "All", "Images", "Videos", "Car", "Bike", "Nature", "Wedding",
    "Sky", "Cinematic", "Events", "Birthday", "Portrait",
    "Architecture", "Food", "City"
  ], []);

  // Fetch from backend with retry logic
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setError(null);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/photos?page=${page}&limit=20`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        const formatted = data.items.map((item) => ({
          id: item.id,
          src: item.url,
          type: item.type,
          name: item.name,
          category: item.category,
          date: item.createdAt || new Date().toISOString(),
        }));

        setFetchedMedia(prev => page === 1 ? formatted : [...prev, ...formatted]);
        setHasMore(data.hasMore);
        
        // Force Locomotive Scroll to update
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 200);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError(err.message);
        
        // Retry logic
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000 * (retryCount + 1)); // Exponential backoff
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [page, retryCount]);

  // Infinite scroll
  useEffect(() => {
    if (isInView && hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [isInView, hasMore, isLoading]);

  // Combine and process media
  const allMedia = useMemo(() => {
    let combined = [...mediaItems, ...fetchedMedia];
    
    // Apply search filter
    if (searchTerm) {
      combined = combined.filter(item => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      if (selectedCategory === "Images") {
        combined = combined.filter(item => item.type === "image");
      } else if (selectedCategory === "Videos") {
        combined = combined.filter(item => item.type === "video");
      } else {
        combined = combined.filter(item => item.category === selectedCategory);
      }
    }
    
    // Apply favorites filter
    if (showFavoritesOnly) {
      combined = combined.filter(item => favorites.includes(item.id));
    }
    
    // Apply sorting
    combined.sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'nameDesc':
          return (b.name || '').localeCompare(a.name || '');
        default:
          return 0;
      }
    });
    
    return combined;
  }, [fetchedMedia, selectedCategory, searchTerm, sortBy, favorites, showFavoritesOnly]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach(cat => {
      if (cat === "All") {
        counts[cat] = allMedia.length;
      } else if (cat === "Images") {
        counts[cat] = allMedia.filter(m => m.type === "image").length;
      } else if (cat === "Videos") {
        counts[cat] = allMedia.filter(m => m.type === "video").length;
      } else {
        counts[cat] = allMedia.filter(m => m.category === cat).length;
      }
    });
    return counts;
  }, [allMedia, categories]);

  // Get lightbox images (only images, not videos)
  const lightboxImages = useMemo(() => 
    allMedia.filter(item => item.type === "image"),
    [allMedia]
  );

  const handleLightboxOpen = (index) => {
    // Find the index in the full images list
    const imageIndex = lightboxImages.findIndex(img => img.src === allMedia[index]?.src);
    setLightboxIndex(imageIndex);
  };

  const handleLightboxClose = () => setLightboxIndex(null);
  
  const handleLightboxNext = () => {
    setLightboxIndex(prev => (prev + 1) % lightboxImages.length);
  };
  
  const handleLightboxPrev = () => {
    setLightboxIndex(prev => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleShare = async (item) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: `Check out this ${item.type} by Satya`,
          url: item.src,
        });
      } catch (err) {
        console.log('Share cancelled:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(item.src);
      alert('Link copied to clipboard!');
    }
  };

  // No results component
  const NoResults = () => (
    <div className="col-span-full text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl text-white mb-2">No media found</h3>
      <p className="text-gray-400">
        {searchTerm ? `No results for "${searchTerm}"` : 'Try adjusting your filters'}
      </p>
      {(searchTerm || selectedCategory !== "All" || showFavoritesOnly) && (
        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedCategory("All");
            setShowFavoritesOnly(false);
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-black z-50 border-b border-gray-800 select-none">
          {/* Top Row */}
          <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-3 gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigate(-1)}
                className="border border-gray-500 px-3 py-1 rounded-md text-white hover:text-blue-400 hover:border-blue-400 transition cursor-pointer"
                aria-label="Go back"
              >
                ← Back
              </button>

              <select
                className="bg-black border border-gray-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by type"
              >
                {["All", "Images", "Videos"].map((type) => (
                  <option key={type} value={type} className="text-white">
                    {type} ({categoryCounts[type]})
                  </option>
                ))}
              </select>

              {/* Search - Hidden on mobile, shown in its own row */}
              <div className="hidden md:block">
                <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
              </div>

              {/* Sort Options */}
              <SortOptions onSort={setSortBy} currentSort={sortBy} />

              {/* Favorites Toggle */}
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-3 py-2 rounded-md transition ${
                  showFavoritesOnly 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                aria-label="Show favorites only"
              >
                ⭐ {showFavoritesOnly ? 'Showing Favorites' : 'Favorites'}
              </button>
            </div>

            <div className="text-white text-lg font-bold italic tracking-wider hover:text-blue-400 transition cursor-pointer">
              Satya
            </div>
          </div>

          {/* Search Row - Mobile Only */}
          <div className="px-4 pb-3 md:hidden">
            <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
          </div>

          {/* Category Filters */}
          <CategoryFilter 
            categories={categories.slice(3)} // Skip All, Images, Videos as they're in dropdown
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
            counts={categoryCounts}
          />

          {/* Description */}
          <div className="px-4 md:px-6 pb-4">
            <p className="text-gray-400 text-sm md:text-base text-center select-none">
              Explore our collection of creative Photos, Videos and innovative
              solutions that demonstrate My expertise.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="px-4 pb-4">
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md">
                <p className="font-medium">Error loading media: {error}</p>
                {retryCount < 3 && (
                  <button 
                    onClick={() => setRetryCount(prev => prev + 1)}
                    className="mt-2 text-sm underline hover:text-white"
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Media Grid Section */}
        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-12">
          {isLoading && page === 1 ? (
            // Skeleton Grid
            <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {[...Array(12)].map((_, i) => (
                <MediaSkeleton key={i} />
              ))}
            </div>
          ) : allMedia.length === 0 ? (
            <NoResults />
          ) : (
            <>
              <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {allMedia.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative">
                      {item.type === "image" ? (
                        <ProgressiveImage
                          src={item.src}
                          alt={item.name}
                          onClick={() => handleLightboxOpen(index)}
                        />
                      ) : (
                        <VideoPlayer src={item.src} name={item.name} />
                      )}
                      
                      {/* Overlay with actions */}
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className={`p-2 rounded-full ${
                            favorites.includes(item.id)
                              ? 'bg-yellow-500 text-black'
                              : 'bg-black/50 text-white hover:bg-black/70'
                          }`}
                          aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          ⭐
                        </button>
                        
                        {/* Share Button */}
                        <button
                          onClick={() => handleShare(item)}
                          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                          aria-label="Share"
                        >
                          🔗
                        </button>
                      </div>
                      
                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium truncate">
                          {item.name || 'Untitled'}
                        </p>
                        <p className="text-gray-300 text-xs">
                          {item.category} • {item.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Infinite Scroll Loader */}
              {hasMore && (
                <div ref={loaderRef} className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Lightbox */}
        {lightboxIndex !== null && lightboxImages.length > 0 && (
          <Lightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={handleLightboxClose}
            onNext={handleLightboxNext}
            onPrev={handleLightboxPrev}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ShowcasePage;