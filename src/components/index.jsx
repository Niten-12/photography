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
// import AboutSection from "./AboutSection";

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
      <section
        id="intro"
        className="min-h-screen flex items-center justify-center relative h-[100vh] overflow-hidden"
        data-scroll-section
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          data-scroll
          data-scroll-speed="-2"
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
          style={{ transform: "translateZ(0)" }}
        >
          <source
            src="/videos/Untitled video - Made with Clipchamp.mp4"
            type="video/mp4"
          />
          {/* Fallback Image */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
            alt="dark aesthetic background"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Overlay Gradient for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

        {/* Content */}
        <div
          className="container mx-auto px-6 md:px-12 relative z-20 text-center text-white"
          data-scroll
          data-scroll-speed="1"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            CAPTURING THE <span className="text-amber-500">DARK</span> BEAUTY
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light italic">
            Exploring the world through my lens, one frame at a time.
          </p>
        </div>
      </section>

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
      {/* About Section - Upgraded Version */}
<section
  id="about"
  className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 md:py-24 lg:py-32 bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#0B1120] text-white overflow-hidden"
  data-scroll-section
>
  {/* Background Decorative Elements */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
  </div>

  {/* Section Header */}
  <div className="relative z-10 text-center mb-16 md:mb-20 lg:mb-24">
    <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
      📸 Photographer & Visual Storyteller
    </span>
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
      About Me
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light">
      Transforming fleeting moments into timeless visual narratives that speak to the soul
    </p>
  </div>

  {/* Main Content Grid */}
  <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center mb-20 lg:mb-28">
    {/* Image Column */}
    <div className="relative group order-2 lg:order-1">
      {/* Decorative Elements */}
      <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-500/30 rounded-tl-3xl"></div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-purple-500/30 rounded-br-3xl"></div>
      
      {/* Main Image Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 mix-blend-overlay z-10"></div>
        <img
          src="image/satya1.JPG"
          alt="Satya Narayan Swain - Professional Photographer"
          className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Image Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 sm:p-8 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">📷</span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Satya Narayan Swain</h3>
              <p className="text-sm text-gray-300">Visual Storyteller • 5+ Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="absolute -bottom-6 -left-6 bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-800 hidden lg:block">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">500+</div>
            <div className="text-xs text-gray-400">Projects</div>
          </div>
          <div className="w-px h-8 bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">300+</div>
            <div className="text-xs text-gray-400">Happy Clients</div>
          </div>
          <div className="w-px h-8 bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">15+</div>
            <div className="text-xs text-gray-400">Countries</div>
          </div>
        </div>
      </div>
    </div>

    {/* Content Column */}
    <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
      {/* Bio */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-blue-400">
          <span className="text-lg font-semibold">👋 Hello, I'm</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          Satya Narayan Swain
        </h3>
        <p className="text-lg sm:text-xl text-gray-300 border-l-4 border-blue-500 pl-4 italic">
          "Capturing the poetry of life through my lens, one frame at a time."
        </p>
        <p className="text-gray-400 leading-relaxed">
          I'm a passionate visual storyteller dedicated to capturing moments that speak beyond words. 
          While my journey hasn't yet been spotlighted in major galleries, my lens has shaped countless 
          personal narratives that clients cherish deeply. I believe in crafting every frame with emotion, 
          precision, and an eye for timeless beauty.
        </p>
      </div>

      {/* Specialization Tags */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3">Specializations</h4>
        <div className="flex flex-wrap gap-2">
          {[
            "Wedding Storytelling", 
            "Editorial Portraits", 
            "Adventure Elopements",
            "Documentary Style",
            "Fine Art Photography",
            "Brand Storytelling"
          ].map((item, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-sm text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-all duration-300 cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start space-x-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
          <span className="text-2xl">🎯</span>
          <div>
            <h5 className="font-semibold text-white mb-1">Authentic Moments</h5>
            <p className="text-sm text-gray-400">Emotion-driven, candid compositions</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
          <span className="text-2xl">🎨</span>
          <div>
            <h5 className="font-semibold text-white mb-1">Signature Style</h5>
            <p className="text-sm text-gray-400">Natural colors with bold contrasts</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-amber-500/50 transition-all duration-300">
          <span className="text-2xl">✨</span>
          <div>
            <h5 className="font-semibold text-white mb-1">Cinematic Approach</h5>
            <p className="text-sm text-gray-400">Storytelling through frames</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-green-500/50 transition-all duration-300">
          <span className="text-2xl">⚡</span>
          <div>
            <h5 className="font-semibold text-white mb-1">Quick Turnaround</h5>
            <p className="text-sm text-gray-400">Professional editing workflow</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Stats Cards - Mobile Version */}
  <div className="lg:hidden grid grid-cols-3 gap-3 max-w-md mx-auto mt-12 p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
    <div className="text-center">
      <div className="text-xl sm:text-2xl font-bold text-blue-400">500+</div>
      <div className="text-xs text-gray-400">Projects</div>
    </div>
    <div className="text-center">
      <div className="text-xl sm:text-2xl font-bold text-purple-400">300+</div>
      <div className="text-xs text-gray-400">Happy Clients</div>
    </div>
    <div className="text-center">
      <div className="text-xl sm:text-2xl font-bold text-amber-400">15+</div>
      <div className="text-xs text-gray-400">Countries</div>
    </div>
  </div>

  {/* Journey & Toolkit Cards */}
  <div className="relative z-10 max-w-7xl mx-auto mt-20 lg:mt-28 grid md:grid-cols-2 gap-6 lg:gap-8">
    {/* Journey Card */}
    <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Card Header */}
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white ml-4">My Journey</h3>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 font-bold">2018</span>
          <p className="text-gray-300">Started photography with father's old Nikon FM2</p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 font-bold">2020</span>
          <p className="text-gray-300">Graduated from New York Institute of Photography</p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 font-bold">2022</span>
          <p className="text-gray-300">First international wedding in Bali</p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 font-bold">2024</span>
          <p className="text-gray-300">Featured in emerging photographers showcase</p>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
    </div>

    {/* Toolkit Card */}
    <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white ml-4">My Toolkit</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h4 className="font-semibold text-white mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
            Camera
          </h4>
          <p className="text-gray-400 font-medium">Sony A7 IV</p>
          <p className="text-sm text-gray-500">33MP Full-frame</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
            Lens
          </h4>
          <p className="text-gray-400 font-medium">50mm f/1.2 GM</p>
          <p className="text-sm text-gray-500">Portrait Master</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
            Software
          </h4>
          <p className="text-gray-400">Lightroom</p>
          <p className="text-gray-400">Photoshop</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
            Style
          </h4>
          <p className="text-gray-400">Cinematic</p>
          <p className="text-gray-400">Natural Colors</p>
        </div>
      </div>

      {/* Additional Gear */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Additional Gear</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">DJI Ronin</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">Godox Lights</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">Peak Design</span>
        </div>
      </div>
    </div>
  </div>

  {/* Call to Action */}
  <div className="relative z-10 max-w-4xl mx-auto mt-16 lg:mt-20 text-center">
    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 sm:p-10 rounded-3xl border border-gray-800 backdrop-blur-sm">
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
        Let's Create Something Beautiful Together
      </h3>
      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
        Every picture has a story to tell. Let me help you tell yours through my lens.
      </p>
      <button 
        onClick={() => handleNavClick('contact')}
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-300"
      >
        <span>Book a Session</span>
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </button>
    </div>
  </div>
</section>
      {/* <AboutSection /> */}
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
