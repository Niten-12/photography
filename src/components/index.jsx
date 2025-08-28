import React, { useEffect, useState, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { FiMenu, FiX } from "react-icons/fi";
import Services from "./Services";
import { Link } from "react-router-dom";
import Showcase from "./showcase";
import FeedbackSection from "./FeedbackSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer"; // ✅ Import Footer
import IntroSection from "./Intro";
const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef(null);
  const locoScrollRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (scrollRef.current) {
      locoScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: !isMobile, // ✅ Disable smooth scroll on mobile
        multiplier: 1,
      });

      setTimeout(() => {
        locoScrollRef.current.update();
      }, 300);
    }

    const resizeHandler = () => {
      locoScrollRef.current?.update();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      locoScrollRef.current?.destroy();
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        !e.target.closest("#sidebar") &&
        !e.target.closest("#menu-btn")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const navItems = ["About", "Showcase", "Services", "Feedback", "Contact"];

  const handleNavClick = (id) => {
    if (locoScrollRef.current) {
      locoScrollRef.current.scrollTo(`#${id}`, {
        offset: 0,
        duration: 800,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="relative bg-black text-white overflow-x-hidden"
    >
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm text-white flex justify-between items-center px-6 py-4">
        <div className="text-white text-lg font-bold italic tracking-wider hover:text-blue-400 transition cursor-pointer">
          Satya
        </div>

        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => handleNavClick(item.toLowerCase())}
                className="hover:text-amber-500 transition-colors duration-300 cursor-pointer"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <div className="md:hidden" id="menu-btn">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="text-2xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div
          id="sidebar"
          className={`fixed top-0 right-0 w-64 h-screen text-white p-6 z-[9999] shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(4px)",
            willChange: "transform",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl focus:outline-none"
            >
              <FiX />
            </button>
          </div>

          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="hover:text-amber-500 transition-colors duration-300 text-left w-full"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-400">
            <p className="mb-1">🚧 Future Features Coming Soon</p>
            <ul className="list-disc ml-4">
              <li>Client Portal</li>
              <li>Print Store</li>
              <li>Booking Calendar</li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Intro */}
      <IntroSection />
      {/* <section
        id="intro"
        className="min-h-screen flex items-center justify-center relative h-[100vh] overflow-hidden"
        data-scroll-section
      >
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')`,
          }}
          data-scroll
          data-scroll-speed="-2"
        ></div>

        <div
          className="container mx-auto px-6 md:px-12 relative z-10 text-center text-white"
          data-scroll
          data-scroll-speed="1"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            CAPTURING THE <span className="text-amber-500">DARK</span> BEAUTY
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Exploring the world through my lens, one frame at a time.
          </p>
        </div>
      </section> */}

      {/* About */}
      <section
        id="about"
        className="min-h-screen px-8 py-16 md:px-16 bg-[#0B1120] text-white"
        data-scroll-section
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">About Me</h2>
          <p className="text-lg text-gray-400">
            Transforming moments into timeless visual narratives
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
          <div
            data-aos="fade-right"
            className="relative group rounded-xl overflow-hidden shadow-xl h-96"
          >
            <img
              src="image/satya1.JPG"
              alt="Professional Photographer"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
              <h3 className="text-xl font-bold text-white">Satya</h3>
            </div>
          </div>

          <div data-aos="fade-left" className="space-y-6">
            <p className="text-lg leading-relaxed">
              I'm Satya Narayan Swain, a passionate visual storyteller dedicated
              to capturing moments that speak beyond words. While my journey
              hasn’t yet been spotlighted in galleries or major publications, my
              lens has shaped countless personal narratives that clients cherish
              deeply. I believe in crafting every frame with emotion, precision,
              and an eye for timeless beauty.
            </p>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Specialization
              </h3>
              <p className="mb-4">
                I specialize in{" "}
                <span className="text-blue-400">wedding storytelling</span>,{" "}
                <span className="text-blue-400">editorial portraits</span>, and{" "}
                <span className="text-blue-400">adventure elopements</span>.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🎯</span>
                  <span>Authentic, emotion-driven compositions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🎨</span>
                  <span>Natural color palettes with bold contrasts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✨</span>
                  <span>Cinematic storytelling techniques</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
          <div
            data-aos="fade-right"
            className="bg-gray-800 p-8 rounded-xl shadow-xl border-l-4 border-blue-500"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">My Journey</h3>
            </div>
            <p className="mb-4 leading-relaxed">
              My love affair with photography began at age 12 when I found my
              father's old Nikon FM2. What started as capturing family picnics
              evolved into a lifelong passion.
            </p>
            <p className="leading-relaxed">
              After graduating from the New York Institute of Photography, I've
              documented over 300 weddings across 15 countries, with work
              featured in National Geographic and Vogue.
            </p>
          </div>

          <div
            data-aos="fade-left"
            className="bg-gray-800 p-8 rounded-xl shadow-xl border-r-4 border-purple-500"
          >
            <div className="flex items-center mb-6">
              <div className="bg-purple-500/20 p-3 rounded-full mr-4">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">My Toolkit</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Camera</h4>
                <p className="text-gray-400">Sony A7 IV</p>
                <p className="text-sm text-gray-500">33MP Full-frame</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Lens</h4>
                <p className="text-gray-400">50mm f/1.2 GM</p>
                <p className="text-sm text-gray-500">Portrait Master</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Software</h4>
                <p className="text-gray-400">Lightroom</p>
                <p className="text-gray-400">Photoshop</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Style</h4>
                <p className="text-gray-400">Cinematic</p>
                <p className="text-gray-400">Natural Colors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Showcase />
      <Services />
      <FeedbackSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
      {/* <footer
        className="bg-black/90 backdrop-blur-sm text-gray-500 text-center py-6 border-t border-gray-700"
        data-scroll-section
      >
        <div className="container mx-auto px-6">
          <p>
            © {new Date().getFullYear()} Satya Photography. All rights reserved.
            Developed with ❤️ by{" "}
            <a
              href="https://github.com/Niten-12"
              className="text-amber-400 hover:underline"
            >
              Niten Swain
            </a>
          </p>
          <p className="mt-2 text-sm">
            Crafted with passion and attention to detail.
          </p>

          <Link
            to="/admin"
            className="mt-4 inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300"
          >
            Admin
          </Link>
        </div>
      </footer> */}
    </div>
  );
};

export default Index;

// import React, { useEffect, useState, useRef } from "react";
// import LocomotiveScroll from "locomotive-scroll";
// import "locomotive-scroll/dist/locomotive-scroll.css";
// import { FiMenu, FiX } from "react-icons/fi";
// import Services from "./Services";
// import { Link } from "react-router-dom";
// import Showcase from "./showcase";
// import FeedbackSection from "./FeedbackSection";
// import ContactSection from "./ContactSection";
// const Index = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const scrollRef = useRef(null);
//   const locoScrollRef = useRef(null); // Store LocomotiveScroll instance

//   useEffect(() => {
//     if (scrollRef.current) {
//       locoScrollRef.current = new LocomotiveScroll({
//         el: scrollRef.current,
//         smooth: true,
//         multiplier: 1,
//         smartphone: { smooth: true },
//         tablet: { smooth: true },
//       });

//       setTimeout(() => {
//         locoScrollRef.current.update();
//       }, 100);
//     }

//     return () => {
//       if (locoScrollRef.current) {
//         locoScrollRef.current.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (
//         isOpen &&
//         !e.target.closest("#sidebar") &&
//         !e.target.closest("#menu-btn")
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("click", handleOutsideClick);
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//     return () => document.removeEventListener("click", handleOutsideClick);
//   }, [isOpen]);

//   const navItems = ["About", "Showcase", "Services", "Feedback", "Contact"];

//   // Smooth scroll to section using LocomotiveScroll
//   const handleNavClick = (id) => {
//     if (locoScrollRef.current) {
//       locoScrollRef.current.scrollTo(`#${id}`, {
//         offset: 0,
//         duration: 800,
//         easing: [0.25, 0.0, 0.35, 1.0],
//       });
//       setIsOpen(false);
//     }
//   };

//   return (
//     <div
//       ref={scrollRef}
//       data-scroll-container
//       className="relative bg-black text-white overflow-x-hidden overscroll-none touch-none"
//     >
//       {/* Navbar */}
//       <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm text-white flex justify-between items-center px-6 py-4">
//         {/* Logo */}
//         <div className="text-white text-lg font-bold italic tracking-wider hover:text-blue-400 transition cursor-pointer">
//           Satya
//         </div>

//         {/* Desktop Nav */}
//         <ul className="hidden md:flex space-x-6">
//           {navItems.map((item) => (
//             <li key={item}>
//               <button
//                 onClick={() => handleNavClick(item.toLowerCase())}
//                 className="hover:text-amber-500 transition-colors duration-300 cursor-pointer"
//               >
//                 {item}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden" id="menu-btn">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsOpen(!isOpen);
//             }}
//             className="text-2xl focus:outline-none"
//           >
//             {isOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Mobile Sidebar */}
//         <div
//           id="sidebar"
//           className={`fixed top-0 right-0 w-64 h-screen text-white p-6 z-[9999] shadow-2xl transition-transform duration-300 ${
//             isOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//           role="dialog"
//           aria-modal="true"
//           tabIndex={-1}
//           style={{
//             backgroundColor: "rgba(0, 0, 0, 0.95)",
//             backdropFilter: "blur(4px)",
//             willChange: "transform",
//             transform: isOpen ? "translateX(0)" : "translateX(100%)",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Close Button */}
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-2xl focus:outline-none"
//             >
//               <FiX />
//             </button>
//           </div>

//           {/* Nav Items */}
//           <ul className="flex flex-col space-y-4">
//             {navItems.map((item) => (
//               <li key={item}>
//                 <button
//                   onClick={() => handleNavClick(item.toLowerCase())}
//                   className="hover:text-amber-500 transition-colors duration-300 text-left w-full"
//                 >
//                   {item}
//                 </button>
//               </li>
//             ))}
//           </ul>

//           {/* Future Features */}
//           <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-400">
//             <p className="mb-1">🚧 Future Features Coming Soon</p>
//             <ul className="list-disc ml-4">
//               <li>Client Portal</li>
//               <li>Print Store</li>
//               <li>Booking Calendar</li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* All Sections Below */}
//       <section
//         id="intro"
//         className="min-h-screen flex items-center justify-center relative h-[100vh] overflow-hidden"
//         data-scroll-section
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-center will-change-transform z-0"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')`,
//           }}
//           data-scroll
//           data-scroll-speed="-2"
//         ></div>

//         <div
//           className="container mx-auto px-6 md:px-12 relative z-10 text-center text-white"
//           data-scroll
//           data-scroll-speed="1"
//         >
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//             CAPTURING THE <span className="text-amber-500">DARK</span> BEAUTY
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
//             Exploring the world through my lens, one frame at a time.
//           </p>
//         </div>
//       </section>

//       {/* about */}
//       <section
//         id="about"
//         className="min-h-screen px-8 py-16 md:px-16 bg-[#0B1120] text-white"
//         data-scroll-section
//       >
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold mb-2">About Me</h2>
//           <p className="text-lg text-gray-400">
//             Transforming moments into timeless visual narratives
//           </p>
//         </div>

//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
//           <div
//             data-aos="fade-right"
//             className="relative group rounded-xl overflow-hidden shadow-xl h-96"
//           >
//             <img
//               src="image/satya1.JPG"
//               alt="Professional Photographer"
//               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
//               <h3 className="text-xl font-bold text-white">Satya</h3>
//             </div>
//           </div>

//           <div data-aos="fade-left" className="space-y-6">
//             <p className="text-lg leading-relaxed">
//               I'm [Your Name], an award-winning photographer with over 10 years
//               of experience transforming moments into timeless visual
//               narratives. My work has been featured in [Publications/Galleries]
//               and trusted by [Number]+ clients worldwide.
//             </p>

//             <div>
//               <h3 className="text-2xl font-bold text-white mb-4">
//                 Specialization
//               </h3>
//               <p className="mb-4">
//                 I specialize in{" "}
//                 <span className="text-blue-400">wedding storytelling</span>,{" "}
//                 <span className="text-blue-400">editorial portraits</span>, and{" "}
//                 <span className="text-blue-400">adventure elopements</span>.
//               </p>
//               <ul className="space-y-3">
//                 <li className="flex items-start">
//                   <span className="text-2xl mr-3">🎯</span>
//                   <span>Authentic, emotion-driven compositions</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-2xl mr-3">🎨</span>
//                   <span>Natural color palettes with bold contrasts</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-2xl mr-3">✨</span>
//                   <span>Cinematic storytelling techniques</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
//           <div
//             data-aos="fade-right"
//             className="bg-gray-800 p-8 rounded-xl shadow-xl border-l-4 border-blue-500"
//           >
//             <div className="flex items-center mb-6">
//               <div className="bg-blue-500/20 p-3 rounded-full mr-4">
//                 <svg
//                   className="w-8 h-8 text-blue-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-bold text-white">My Journey</h3>
//             </div>
//             <p className="mb-4 leading-relaxed">
//               My love affair with photography began at age 12 when I found my
//               father's old Nikon FM2. What started as capturing family picnics
//               evolved into a lifelong passion.
//             </p>
//             <p className="leading-relaxed">
//               After graduating from the New York Institute of Photography, I've
//               documented over 300 weddings across 15 countries, with work
//               featured in National Geographic and Vogue.
//             </p>
//           </div>

//           <div
//             data-aos="fade-left"
//             className="bg-gray-800 p-8 rounded-xl shadow-xl border-r-4 border-purple-500"
//           >
//             <div className="flex items-center mb-6">
//               <div className="bg-purple-500/20 p-3 rounded-full mr-4">
//                 <svg
//                   className="w-8 h-8 text-purple-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                   ></path>
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                   ></path>
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-bold text-white">My Toolkit</h3>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h4 className="font-semibold text-white mb-2">Camera</h4>
//                 <p className="text-gray-400">Sony A7 IV</p>
//                 <p className="text-sm text-gray-500">33MP Full-frame</p>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-white mb-2">Lens</h4>
//                 <p className="text-gray-400">50mm f/1.2 GM</p>
//                 <p className="text-sm text-gray-500">Portrait Master</p>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-white mb-2">Software</h4>
//                 <p className="text-gray-400">Lightroom</p>
//                 <p className="text-gray-400">Photoshop</p>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-white mb-2">Style</h4>
//                 <p className="text-gray-400">Cinematic</p>
//                 <p className="text-gray-400">Natural Colors</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Showcase */}
//       <Showcase />

//       {/* Services */}
//       <Services />

//       {/* Feedback Section */}
//       <FeedbackSection />

//       {/* Contact */}
//       <ContactSection />

//       {/* Footer */}
//       <footer
//         className="bg-black/90 backdrop-blur-sm text-gray-500 text-center py-6 border-t border-gray-700"
//         data-scroll-section
//       >
//         <div className="container mx-auto px-6">
//           <p>
//             © {new Date().getFullYear()} Satya Photography. All rights reserved.
//           </p>
//           <p className="mt-2 text-sm">
//             Crafted with passion and attention to detail.
//           </p>

//           <Link
//             to="/admin"
//             className="mt-4 inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300"
//           >
//             Admin
//           </Link>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;
