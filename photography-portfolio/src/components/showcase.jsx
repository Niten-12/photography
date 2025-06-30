//showcase.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Showcase() {
  const images = [1, 2, 3, 4, 5, 6];
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Handle scroll event to update active dot
  const onScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const containerWidth = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    setActiveIndex(newIndex);
  };

  // Scroll to slide on dot click
  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: index * containerWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="showcase" className="min-h-screen p-12" data-scroll-section>
      <h2 className="text-3xl font-bold mb-6">Showcase</h2>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 aspect-square rounded-lg overflow-hidden relative snap-center mx-2 bg-gray-800"
          >
            <img
              src={`https://picsum.photos/600/600?random=${i}`}
              alt={`Showcase ${i}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
              <span className="text-white font-medium"></span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-3 ">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              activeIndex === idx ? "bg-black" : "bg-gray-400 cursor-pointer"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
      {/* Explore Button - Bottom Center */}
      <div className="flex justify-center mt-12">
        <Link
          to="/exploreshowcase"
          className="bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-black border border-white transition-all duration-300"
        >
          Explore All Showcase
        </Link>
      </div>
    </section>
  );
}
