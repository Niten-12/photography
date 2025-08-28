import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const IntroSection = () => {
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    // GSAP entrance animations
    gsap.fromTo(
      headlineRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );

    gsap.fromTo(
      subtextRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power2.out", delay: 0.7 }
    );

    // Locomotive Scroll init
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    return () => scroll.destroy();
  }, []);

  return (
    <section
      id="intro"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      data-scroll-section
      data-scroll-container
    >
      {/* Background Video with Parallax */}
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
        <img
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=80"
          alt="fallback background"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Overlay Gradient for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

      {/* Content */}
      <div
        className="relative z-20 px-6 md:px-12 text-center text-white max-w-4xl mx-auto"
        data-scroll
        data-scroll-speed="1"
      >
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 drop-shadow-xl font-serif"
        >
          UNVEILING THE <span className="text-amber-400">DARK</span> AESTHETIC
        </h1>
        <p
          ref={subtextRef}
          className="text-lg md:text-2xl mb-10 font-light font-sans italic"
        >
          A cinematic journey through shadows and highlights — experience
          photography as you've never seen it before.
        </p>
        {/* <button className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-2xl hover:bg-amber-400 transition-all duration-300 shadow-lg">
          Explore Gallery
        </button> */}
      </div>
    </section>
  );
};

export default IntroSection;
