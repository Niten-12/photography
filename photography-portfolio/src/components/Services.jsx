import React, { useRef, useState } from "react";

const services = [
  {
    title: "Photography Sessions",
    description: "Professional photography sessions tailored to your needs.",
    points: [
      "1-5 hour session",
      "Professional editing",
      "High-resolution images",
    ],
    price: "Custom pricing",
    color: "blue",
    button: "Book Now",
  },
  {
    title: "Videography",
    description: "High-quality video production for commercials & events.",
    points: ["4K resolution", "Professional editing", "Color grading"],
    price: "Custom pricing",
    color: "purple",
    button: "Book Now",
  },
  {
    title: "Commercial Photography",
    description: "Product shots, corporate headshots & branding imagery.",
    points: ["Product photography", "Corporate events", "Branding sessions"],
    price: "Custom pricing",
    color: "pink",
    button: "Contact Us",
  },
];

// SVG icons for each service title
const serviceIcons = {
  "Photography Sessions": (
    <svg
      className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 7h16M4 7a4 4 0 014-4h8a4 4 0 014 4M4 7v10a4 4 0 004 4h8a4 4 0 004-4V7M8 11h8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  ),
  Videography: (
    <svg
      className="w-6 h-6 mr-2 text-purple-500 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h11a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  ),
  "Commercial Photography": (
    <svg
      className="w-6 h-6 mr-2 text-pink-500 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 7h18M7 3v18M17 3v18M3 17h18"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  ),
};

const Services = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = window.innerWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => {
    carouselRef.current.scrollTo({
      left: index * window.innerWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="services"
      className="w-full md:min-h-[700px] min-h-[280px]"
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
          My Services
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 px-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-xl transition-shadow duration-300 flex flex-col items-start"
            >
              <div
                className={`w-16 h-16 bg-${service.color}-500 rounded-full flex items-center justify-center mb-6`}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="flex items-center text-2xl font-bold mb-4 text-gray-800 dark:text-white justify-start w-full">
                {serviceIcons[service.title]}
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left w-full">
                {service.description}
              </p>
              <ul className="space-y-3 mb-6 text-left w-full">
                {service.points.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-green-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p
                className={`text-lg font-semibold text-${service.color}-600 dark:text-${service.color}-400 mb-4`}
              >
                {service.price === "Custom pricing" ? (
                  "Custom pricing"
                ) : (
                  <>
                    Starting at{" "}
                    <span className="text-2xl">{service.price}</span>
                  </>
                )}
              </p>
              <button
                className={`bg-${service.color}-600 hover:bg-${service.color}-700 text-white font-medium py-2 px-4 rounded-full self-start cursor-pointer`}
              >
                {service.button}
              </button>
            </div>
          ))}
        </div>

        {/* Mobile 3D Scroll with Gaps and Beautified Cards */}
        <div
          className="md:hidden w-full overflow-x-auto scroll-smooth px-4"
          ref={carouselRef}
          onScroll={handleScroll}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE & Edge
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex space-x-4 pr-10 md:pr-0">
            {services.map((service, index) => {
              const isActive = currentIndex === index;
              const rotation = isActive
                ? "rotateY(0deg)"
                : index < currentIndex
                ? "rotateY(10deg)"
                : "rotateY(-10deg)";

              return (
                <div
                  key={index}
                  style={{
                    scrollSnapAlign: "center",
                    width: "85vw",
                    minWidth: "85vw",
                    transform: rotation,
                    transition: "transform 0.5s ease",
                  }}
                  className="flex-shrink-0 bg-white/20 backdrop-blur-md dark:bg-white/10 rounded-2xl shadow-xl p-6 flex flex-col items-start text-left"
                >
                  <div className="h-full flex flex-col justify-center items-start text-left w-full">
                    <h3 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white mb-2 justify-start w-full">
                      {serviceIcons[service.title]}
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-left w-full">
                      {service.description}
                    </p>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mb-3 text-left w-full">
                      {service.points.map((pt, i) => (
                        <li key={i} className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-green-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                          </svg>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <p
                      className={`text-lg font-semibold text-${service.color}-600 dark:text-${service.color}-400 mb-4 text-left w-full`}
                    >
                      {service.price === "Custom pricing" ? (
                        "Custom pricing"
                      ) : (
                        <>
                          Starting at{" "}
                          <span className="text-2xl">{service.price}</span>
                        </>
                      )}
                    </p>
                    <button
                      className={`bg-${service.color}-600 hover:bg-${service.color}-700 text-white font-medium py-2 px-6 rounded-full self-start`}
                    >
                      {service.button}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="md:hidden flex justify-center mt-4 space-x-3">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === idx ? "bg-blue-600" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
