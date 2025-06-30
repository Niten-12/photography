{
  /* <section
        id="showcase"
        className="min-h-screen p-12 relative"
        data-scroll-section
      >
        <h2 className="text-3xl font-bold mb-6">Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              k ey={i}
              className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden"
            >
              <img
                src={`https://picsum.photos/600/600?random=${i}`}
                alt={`Showcase ${i}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">View Project</span>
              </div>
            </div>
          ))}
        </div> */
}

{
  /* Explore Button - Bottom Center */
}
{
  /* <div className="flex justify-center mt-12">
          <Link
            to="/showcase"
            className="bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-black border border-white transition-all duration-300"
          >
            Explore All Showcase
          </Link>
        </div>
      </section> */
}
{
  /* <section id="services" className="min-h-screen p-12" data-scroll-section>
        <div className="max-w-6xl mx-auto">
          <h2
            data-aos="fade-up"
            className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
          >
            My Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Photography Sessions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Professional photography sessions tailored to your needs,
                whether it's portraits, events, or commercial work.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "1-2 hour session",
                  "Professional editing",
                  "High-resolution images",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Starting at <span className="text-2xl">₹2000</span>
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition cursor-pointer">
                Book Now
              </button>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Videography
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                High-quality video production services for commercials, events,
                and social media content.
              </p>
              <ul className="space-y-3 mb-6">
                {["4K resolution", "Professional editing", "Color grading"].map(
                  (item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">
                Starting at <span className="text-2xl">₹2500</span>
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-full transition cursor-pointer">
                Get Quote
              </button>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Commercial Photography
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Photography for businesses: product shots, corporate headshots,
                and branding imagery.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Product photography",
                  "Corporate events",
                  "Branding sessions",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-pink-600 dark:text-pink-400 mb-4 cursor-pointer">
                Custom pricing
                <span className="text-sm block mt-1">
                  (Licensing options available)
                </span>
              </p>
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-full transition cursor-pointer">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section> */
}
{
  /* <section
        id="feedback"
        className="min-h-screen bg-black text-white py-16 px-4 md:px-12"
        data-scroll-section=""
      > */
}
{
  /* Heading */
}
{
  /* <h2 className="text-4xl font-bold text-center mb-12">
          What Our Clients Say
        </h2> */
}

{
  /* Horizontal Review Slider */
}
{
  /* <div className="overflow-x-auto whitespace-nowrap space-x-6 pb-6 mb-12 flex">
          {[
            {
              quote:
                "Absolutely stunning wedding shots — the emotions, the colors, the timing — everything was just perfect. We couldn’t have asked for more!",
              author: "Ava Noah",
              initials: "AN",
              rating: 5,
              date: "21st May 2025",
            },
            {
              quote:
                "Captured the vibe of our event perfectly. Every candid moment was preserved so beautifully that we relive it every time we look at the pictures.",
              author: "Liam ByteMedia",
              initials: "LB",
              rating: 4,
              date: "01st April 2025",
            },
            {
              quote:
                "The portrait session felt effortless and fun. The final photos were absolutely stunning, showcasing a style that’s both moody and elegant.",
              author: "Isabella T.",
              initials: "IT",
              rating: 5,
              date: "24th March 2025",
            },
            {
              quote:
                "Professional, punctual, and passionate — Satya truly brought our brand to life with visuals that speak louder than words.",
              author: "Daniel R.",
              initials: "DR",
              rating: 4,
              date: "10th February 2025",
            },
          ].map((t, index) => (
            <div
              key={index}
              className="inline-block w-96 bg-gray-900 p-6 rounded-xl shadow-md min-h-[220px]"
            > */
}
{
  /* Avatar & Author */
}
{
  /* <div className="flex items-center mb-4">
                <div className="bg-amber-600 text-black font-bold w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  {t.initials}
                </div>
                <div>
                  <p className="text-amber-400 font-semibold">{t.author}</p>
                  <p className="text-gray-400 text-sm">{t.date}</p>
                </div>
              </div> */
}

{
  /* Quote */
}
{
  /* <blockquote className="italic text-gray-300 mb-4 leading-relaxed break-words whitespace-normal overflow-hidden text-ellipsis">
                “{t.quote}”
              </blockquote> */
}

{
  /* Rating */
}
{
  /* <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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
          ))}
        </div> */
}

{
  /* Review Submission Prompt Block */
}
{
  /* <div
          className="text-center max-w-md mx-auto bg-gray-950 p-8 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-300 "
          onClick={() => {
            window.location.href = "/submit-review";
          }}
        >
          <h3 className="text-2xl font-semibold mb-2">
            Rate Your Photography Experience
          </h3>
          <p className="text-gray-400 mb-4">Tell others what you think</p>

          {/* Star Rating Placeholder */
}
{
  /* <div className="flex justify-center space-x-1 mb-6 cursor-pointer">
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

          <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-6 rounded-full transition duration-300 cursor-pointer">
            Write a Review
          </button>
        </div>
      </section>  */
}
// import React from "react";
// import Index from "./components/index";
// import "./App.css";

// function App() {
//   return (
//     <>
//       <Index />
//     </>
//   );
// }

// export default App;
{
  /* about */
}
// <section
//   id="about"
//   className="min-h-screen px-8 py-16 md:px-16 bg-[#0B1120] text-white"
//   data-scroll-section
// >
//   <div className="text-center mb-12">
//     <h2 className="text-4xl font-bold mb-2">About Me</h2>
//     <p className="text-lg text-gray-400">
//       Transforming moments into timeless visual narratives
//     </p>
//   </div>

//   <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
//     <div
//       data-aos="fade-right"
//       className="relative group rounded-xl overflow-hidden shadow-xl h-96"
//     >
//       <img
//         src="image/satya1.JPG"
//         alt="Professional Photographer"
//         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
//         <h3 className="text-xl font-bold text-white">Satya</h3>
//       </div>
//     </div>

//     <div data-aos="fade-left" className="space-y-6">
//       <p className="text-lg leading-relaxed">
//         I'm [Your Name], an award-winning photographer with over 10 years
//         of experience transforming moments into timeless visual
//         narratives. My work has been featured in [Publications/Galleries]
//         and trusted by [Number]+ clients worldwide.
//       </p>

//       <div>
//         <h3 className="text-2xl font-bold text-white mb-4">
//           Specialization
//         </h3>
//         <p className="mb-4">
//           I specialize in{" "}
//           <span className="text-blue-400">wedding storytelling</span>,{" "}
//           <span className="text-blue-400">editorial portraits</span>, and{" "}
//           <span className="text-blue-400">adventure elopements</span>.
//         </p>
//         <ul className="space-y-3">
//           <li className="flex items-start">
//             <span className="text-2xl mr-3">🎯</span>
//             <span>Authentic, emotion-driven compositions</span>
//           </li>
//           <li className="flex items-start">
//             <span className="text-2xl mr-3">🎨</span>
//             <span>Natural color palettes with bold contrasts</span>
//           </li>
//           <li className="flex items-start">
//             <span className="text-2xl mr-3">✨</span>
//             <span>Cinematic storytelling techniques</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>

//   <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
//     <div
//       data-aos="fade-right"
//       className="bg-gray-800 p-8 rounded-xl shadow-xl border-l-4 border-blue-500"
//     >
//       <div className="flex items-center mb-6">
//         <div className="bg-blue-500/20 p-3 rounded-full mr-4">
//           <svg
//             className="w-8 h-8 text-blue-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//             ></path>
//           </svg>
//         </div>
//         <h3 className="text-2xl font-bold text-white">My Journey</h3>
//       </div>
//       <p className="mb-4 leading-relaxed">
//         My love affair with photography began at age 12 when I found my
//         father's old Nikon FM2. What started as capturing family picnics
//         evolved into a lifelong passion.
//       </p>
//       <p className="leading-relaxed">
//         After graduating from the New York Institute of Photography, I've
//         documented over 300 weddings across 15 countries, with work
//         featured in National Geographic and Vogue.
//       </p>
//     </div>

//     <div
//       data-aos="fade-left"
//       className="bg-gray-800 p-8 rounded-xl shadow-xl border-r-4 border-purple-500"
//     >
//       <div className="flex items-center mb-6">
//         <div className="bg-purple-500/20 p-3 rounded-full mr-4">
//           <svg
//             className="w-8 h-8 text-purple-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//             ></path>
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//             ></path>
//           </svg>
//         </div>
//         <h3 className="text-2xl font-bold text-white">My Toolkit</h3>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <h4 className="font-semibold text-white mb-2">Camera</h4>
//           <p className="text-gray-400">Sony A7 IV</p>
//           <p className="text-sm text-gray-500">33MP Full-frame</p>
//         </div>
//         <div>
//           <h4 className="font-semibold text-white mb-2">Lens</h4>
//           <p className="text-gray-400">50mm f/1.2 GM</p>
//           <p className="text-sm text-gray-500">Portrait Master</p>
//         </div>
//         <div>
//           <h4 className="font-semibold text-white mb-2">Software</h4>
//           <p className="text-gray-400">Lightroom</p>
//           <p className="text-gray-400">Photoshop</p>
//         </div>
//         <div>
//           <h4 className="font-semibold text-white mb-2">Style</h4>
//           <p className="text-gray-400">Cinematic</p>
//           <p className="text-gray-400">Natural Colors</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>
