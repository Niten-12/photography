//FeedbackSection.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FeedbackSection = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReview, setActiveReview] = useState(null);
  const scrollRef = useRef(null);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const formatDate = (created_at) => {
    return new Date(created_at).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/reviews/`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load reviews:", err);
        setLoading(false);
      });
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  const closeModal = () => setActiveReview(null);

  useEffect(() => {
    if (activeReview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeReview]);

  return (
    <section
      id="feedback"
      className="min-h-screen bg-black text-white py-16 px-4 md:px-12 relative"
      data-scroll-section=""
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        What Our Clients Say
      </h2>

      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-amber-500 transition"
        aria-label="Scroll Left"
      >
        ←
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-amber-500 transition"
        aria-label="Scroll Right"
      >
        →
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto flex pb-6 mb-12 space-x-6 scroll-smooth snap-x snap-mandatory"
      >
        {loading ? (
          <p className="text-center w-full text-gray-400">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center w-full text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((t, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-80 sm:w-64 bg-gray-900 p-4 sm:p-3 rounded-xl shadow-md min-h-[220px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center mb-3">
                  <div className="bg-amber-600 text-black font-bold w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="text-amber-400 font-semibold text-sm sm:text-xs">
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-[10px]">
                      {formatDate(t.created_at)}
                    </p>
                  </div>
                </div>

                <blockquote className="italic text-gray-300 mb-2 leading-relaxed line-clamp-5 whitespace-pre-line text-sm sm:text-xs">
                  {t.review}
                </blockquote>

                {t.review.length > 200 && (
                  <button
                    onClick={() => setActiveReview(t)}
                    className="text-amber-400 text-xs hover:underline cursor-pointer"
                  >
                    Read more
                  </button>
                )}
              </div>

              <div className="flex space-x-1 mt-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating ? "text-amber-400" : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.127 2.27a1 1 0 00-.364 1.118l1.2 3.685c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.127 2.27c-.784.57-1.838-.197-1.54-1.118l1.2-3.685a1 1 0 00-.364-1.118L3.042 9.112c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.2-3.685z" />
                  </svg>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {activeReview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            // 🛠️ MODIFIED: Clean modal container with max dimensions
            className="bg-white text-black max-w-lg w-[90vw] max-h-[90vh] p-6 rounded-xl relative shadow-xl overflow-y-auto"
          >
            {/* 🛠️ MODIFIED: Ensure visible close button on all screens */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black z-50"
            >
              &times;
            </button>

            {/* ✅ CONTENT STRUCTURE UNCHANGED */}
            <h3 className="text-xl font-bold mb-2">{activeReview.name}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {formatDate(activeReview.created_at)}
            </p>

            <div className="flex mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < activeReview.rating ? "text-amber-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.127 2.27a1 1 0 00-.364 1.118l1.2 3.685c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.127 2.27c-.784.57-1.838-.197-1.54-1.118l1.2-3.685a1 1 0 00-.364-1.118L3.042 9.112c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.2-3.685z" />
                </svg>
              ))}
            </div>

            <p className="whitespace-pre-line leading-relaxed text-sm">
              {activeReview.review}
            </p>
          </div>
        </div>
      )}

      {/* {activeReview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white text-black max-w-lg w-full h-auto md:h-auto sm:h-screen sm:rounded-none sm:px-4 p-6 rounded-xl relative shadow-xl overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black z-10"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2">{activeReview.name}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {formatDate(activeReview.created_at)}
            </p>
            <div className="flex mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < activeReview.rating ? "text-amber-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.127 2.27a1 1 0 00-.364 1.118l1.2 3.685c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.127 2.27c-.784.57-1.838-.197-1.54-1.118l1.2-3.685a1 1 0 00-.364-1.118L3.042 9.112c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.2-3.685z" />
                </svg>
              ))}
            </div>
            <p className="whitespace-pre-line leading-relaxed text-sm">
              {activeReview.review}
            </p>
          </div>
        </div>
      )} */}

      <div
        className="text-center max-w-md mx-auto bg-gray-950 p-8 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
        onClick={() => navigate("/submit-review")}
      >
        <h3 className="text-2xl font-semibold mb-2">
          Rate Your Photography Experience
        </h3>
        <p className="text-gray-400 mb-4">Tell others what you think</p>
        <div className="flex justify-center space-x-1 mb-6">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                className="w-6 h-6 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.127 2.27a1 1 0 00-.364 1.118l1.2 3.685c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.127 2.27c-.784.57-1.838-.197-1.54-1.118l1.2-3.685a1 1 0 00-.364-1.118L3.042 9.112c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.2-3.685z" />
              </svg>
            ))}
        </div>
        <button
          onClick={() => navigate("/submit-review")}
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-6 rounded-full transition duration-300 cursor-pointer"
        >
          Write a Review
        </button>
      </div>
    </section>
  );
};

export default FeedbackSection;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// const FeedbackSection = () => {
//   const navigate = useNavigate();
//   return (
//     <section
//       id="feedback"
//       className="min-h-screen bg-black text-white py-16 px-4 md:px-12"
//       data-scroll-section=""
//     >
//       {/* Heading */}
//       <h2 className="text-4xl font-bold text-center mb-12">
//         What Our Clients Say
//       </h2>

//       {/* Horizontal Review Slider */}
//       <div className="overflow-x-auto whitespace-nowrap space-x-6 pb-6 mb-12 flex">
//         {[
//           {
//             quote:
//               "Absolutely stunning wedding shots — the emotions, the colors, the timing — everything was just perfect. We couldn’t have asked for more!",
//             author: "Ava Noah",
//             initials: "AN",
//             rating: 5,
//             date: "21st May 2025",
//           },
//           {
//             quote:
//               "Captured the vibe of our event perfectly. Every candid moment was preserved so beautifully that we relive it every time we look at the pictures.",
//             author: "Liam ByteMedia",
//             initials: "LB",
//             rating: 4,
//             date: "01st April 2025",
//           },
//           {
//             quote:
//               "The portrait session felt effortless and fun. The final photos were absolutely stunning, showcasing a style that’s both moody and elegant.",
//             author: "Isabella T.",
//             initials: "IT",
//             rating: 5,
//             date: "24th March 2025",
//           },
//           {
//             quote:
//               "Professional, punctual, and passionate — Satya truly brought our brand to life with visuals that speak louder than words.",
//             author: "Daniel R.",
//             initials: "DR",
//             rating: 4,
//             date: "10th February 2025",
//           },
//         ].map((t, index) => (
//           <div
//             key={index}
//             className="inline-block w-96 bg-gray-900 p-6 rounded-xl shadow-md min-h-[220px]"
//           >
//             {/* Avatar & Author */}
//             <div className="flex items-center mb-4">
//               <div className="bg-amber-600 text-black font-bold w-10 h-10 rounded-full flex items-center justify-center mr-3">
//                 {t.initials}
//               </div>
//               <div>
//                 <p className="text-amber-400 font-semibold">{t.author}</p>
//                 <p className="text-gray-400 text-sm">{t.date}</p>
//               </div>
//             </div>

//             {/* Quote */}
//             <blockquote className="italic text-gray-300 mb-4 leading-relaxed break-words whitespace-normal overflow-hidden text-ellipsis">
//               “{t.quote}”
//             </blockquote>

//             {/* Rating */}
//             <div className="flex space-x-1">
//               {Array.from({ length: 5 }, (_, i) => (
//                 <svg
//                   key={i}
//                   className={`w-5 h-5 ${
//                     i < t.rating ? "text-amber-400" : "text-gray-600"
//                   }`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.127 2.27a1 1 0 00-.364 1.118l1.2 3.685c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.127 2.27c-.784.57-1.838-.197-1.54-1.118l1.2-3.685a1 1 0 00-.364-1.118L3.042 9.112c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.2-3.685z" />
//                 </svg>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Review Submission Prompt Block */}
//       <div
//         className="text-center max-w-md mx-auto bg-gray-950 p-8 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-300 "
//         onClick={() => {
//           window.location.href = "/submit-review";
//         }}
//       >
//         <h3 className="text-2xl font-semibold mb-2">
//           Rate Your Photography Experience
//         </h3>
//         <p className="text-gray-400 mb-4">Tell others what you think</p>

//         {/* Star Rating Placeholder */}
//         <div className="flex justify-center space-x-1 mb-6 ">
//           {Array(5)
//             .fill(0)
//             .map((_, i) => (
//               <svg
//                 key={i}
//                 className="w-6 h-6 text-amber-400"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.127 2.27a1 1 0 00-.364 1.118l1.2 3.685c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.127 2.27c-.784.57-1.838-.197-1.54-1.118l1.2-3.685a1 1 0 00-.364-1.118L3.042 9.112c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.2-3.685z" />
//               </svg>
//             ))}
//         </div>

//         <button
//           onClick={() => navigate("/submit-review")}
//           className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-6 rounded-full transition duration-300 cursor-pointer"
//         >
//           Write a Review
//         </button>
//       </div>
//     </section>
//   );
// };

// export default FeedbackSection;
