import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  FiCamera,
  FiHeart,
  FiAward,
  FiDownload,
  FiMail,
  FiX,
} from "react-icons/fi";
import { HiOutlinePhotograph, HiOutlineSparkles } from "react-icons/hi";
import { BsCameraReels, BsLightbulb } from "react-icons/bs";
import { MdOutlineTimeline, MdOutlinePhotoLibrary } from "react-icons/md";

const MotionSection = motion.section;

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [showVideo, setShowVideo] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: isMobile ? 0.1 : 0.3, // Mobile pe kam amount
  });

  const isImageInView = useInView(imageRef, {
    once: true,
    amount: isMobile ? 0.1 : 0.5,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Conditionally apply parallax (disable on mobile)
  const imageParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? 0 : -50],
  );
  const textParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? 0 : 30],
  );

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Tab content mapping
  const tabs = [
    { id: "story", label: "📖 My Story", icon: <HiOutlineSparkles /> },
    { id: "skills", label: "🎨 Skills", icon: <HiOutlinePhotograph /> },
    { id: "journey", label: "⏳ Journey", icon: <MdOutlineTimeline /> },
    { id: "gear", label: "📸 Gear", icon: <FiCamera /> },
  ];

  // Timeline data
  const timelineData = [
    {
      year: "2015",
      event: "First Camera",
      description: "Started with Canon 600D",
    },
    {
      year: "2017",
      event: "First Wedding",
      description: "Shot my first professional wedding",
    },
    {
      year: "2019",
      event: "Studio Launch",
      description: "Opened my first studio",
    },
    {
      year: "2021",
      event: "International",
      description: "First destination wedding",
    },
    {
      year: "2024",
      event: "1000+ Clients",
      description: "Celebrating milestone",
    },
  ];

  // Skills data
  const skills = [
    { name: "Wedding Photography", level: 95, icon: "💍" },
    { name: "Portrait Photography", level: 90, icon: "👤" },
    { name: "Photo Editing", level: 88, icon: "🎨" },
    { name: "Cinematography", level: 85, icon: "🎥" },
  ];

  return (
    <MotionSection
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-12 md:py-20 lg:py-24 overflow-visible"
      style={{
        backgroundColor: "#0B1120",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "block",
        visibility: "visible",
        opacity: 1,
        zIndex: 10,
      }}
      aria-labelledby="about-heading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      // ⚠️ IMPORTANT: data-scroll-section HATAYA - yeh conflict kar raha tha
    >
      {/* Dynamic Background with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
          y: prefersReducedMotion || isMobile ? 0 : textParallax,
        }}
      />

      {/* Floating Elements (Hidden for reduced motion or mobile) */}
      {!prefersReducedMotion && !isMobile && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </>
      )}

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header with Gradient Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4"
          >
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Transforming moments into timeless visual narratives
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mb-12 lg:mb-20">
          {/* Image Section with Parallax and Glass Morphism */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isImageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
            style={{
              y: prefersReducedMotion || isMobile ? 0 : imageParallax,
            }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] max-w-md mx-auto lg:max-w-none">
              {/* Image with lazy loading - FIXED PATHS */}
              {/* Image with lazy loading - SIRF JPG (webp hatao) */}
              <picture>
                {/* Webp nahi hai to ye poora hata do */}
                {/* <source srcSet="/image/satya1.webp" type="image/webp" /> */}
                <source srcSet="/image/satya1.JPG" type="image/jpeg" />
                <img
                  src="/image/satya1.JPG"
                  alt="Satya - Professional Photographer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800";
                  }}
                />
              </picture>

              {/* Gradient Overlay with Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"
                initial={{ opacity: 0.6 }}
                whileHover={!isMobile ? { opacity: 0.8 } : {}}
                transition={{ duration: 0.3 }}
              />

              {/* Name Badge with Glass Effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="backdrop-blur-md bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Satya Narayan Swain
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    Visual Storyteller
                  </p>
                </div>
              </motion.div>

              {/* Floating Social Proof Badge (Desktop only) */}
              {!prefersReducedMotion && !isMobile && (
                <motion.div
                  className="absolute top-4 right-4 backdrop-blur-md bg-black/30 rounded-lg p-3 border border-white/20"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <p className="text-sm font-semibold text-white">10+ Years</p>
                  <p className="text-xs text-gray-300">Experience</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 lg:space-y-8"
            style={{
              y: prefersReducedMotion || isMobile ? 0 : textParallax,
            }}
          >
            {/* Tab Navigation - Scrollable on mobile */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <div className="flex space-x-2 min-w-max">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm"
                    }`}
                    whileHover={
                      !prefersReducedMotion && !isMobile ? { scale: 1.05 } : {}
                    }
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content with Smooth Transitions */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700/50"
            >
              {/* Story Tab */}
              {activeTab === "story" && (
                <div className="space-y-4">
                  <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                    I'm Satya, a visual storyteller dedicated to capturing
                    moments that speak beyond words. Every frame I capture is an
                    opportunity to preserve emotions, tell stories, and create
                    timeless memories for the people I'm privileged to
                    photograph.
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
                    {[
                      {
                        icon: "🎯",
                        label: "Authentic",
                        desc: "Emotion-driven",
                      },
                      { icon: "🎨", label: "Artistic", desc: "Bold contrasts" },
                      { icon: "✨", label: "Cinematic", desc: "Story focused" },
                      {
                        icon: "💫",
                        label: "Timeless",
                        desc: "Evergreen style",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-gray-700/30 rounded-lg p-3 sm:p-4 text-center"
                        whileHover={
                          !prefersReducedMotion && !isMobile ? { y: -5 } : {}
                        }
                      >
                        <span className="text-2xl sm:text-3xl block mb-2">
                          {item.icon}
                        </span>
                        <h4 className="font-semibold text-white text-sm sm:text-base">
                          {item.label}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <p className="text-lg text-blue-400 font-semibold">
                    Specializations:
                  </p>
                  <div className="space-y-4">
                    {skills.map((skill, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white">
                            {skill.icon} {skill.name}
                          </span>
                          <span className="text-blue-400 text-sm font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                            initial={{ width: 0 }}
                            animate={
                              isInView ? { width: `${skill.level}%` } : {}
                            }
                            transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Journey Tab with Timeline */}
              {activeTab === "journey" && (
                <div className="space-y-6">
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />

                    {/* Timeline Items */}
                    <div className="space-y-6">
                      {timelineData.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="relative pl-10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={
                            !prefersReducedMotion && !isMobile ? { x: 5 } : {}
                          }
                        >
                          <div className="absolute left-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {idx + 1}
                            </span>
                          </div>
                          <div
                            className="bg-gray-700/30 rounded-lg p-3 sm:p-4 cursor-pointer"
                            onClick={() =>
                              setExpandedItem(expandedItem === idx ? null : idx)
                            }
                          >
                            <h4 className="font-bold text-white text-base sm:text-lg">
                              {item.year} - {item.event}
                            </h4>
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={
                                expandedItem === idx
                                  ? { height: "auto", opacity: 1 }
                                  : { height: 0, opacity: 0 }
                              }
                              transition={{ duration: 0.3 }}
                              className="text-gray-400 text-sm overflow-hidden mt-2"
                            >
                              {item.description}
                            </motion.p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Gear Tab */}
              {activeTab === "gear" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      category: "Camera",
                      items: ["Sony A7 IV", "33MP Full-frame"],
                      icon: "📷",
                    },
                    {
                      category: "Lenses",
                      items: ["50mm f/1.2 GM", "24-70mm f/2.8"],
                      icon: "🔭",
                    },
                    {
                      category: "Software",
                      items: ["Lightroom", "Photoshop"],
                      icon: "💻",
                    },
                    {
                      category: "Style",
                      items: ["Cinematic", "Natural Colors"],
                      icon: "🎨",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50"
                      whileHover={
                        !prefersReducedMotion && !isMobile
                          ? { y: -5, scale: 1.02 }
                          : {}
                      }
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        <h4 className="font-bold text-white">
                          {item.category}
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {item.items.map((subItem, subIdx) => (
                          <li
                            key={subIdx}
                            className="text-gray-300 text-sm flex items-center"
                          >
                            <span className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                            {subItem}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <motion.button
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold overflow-hidden"
                whileHover={
                  !prefersReducedMotion && !isMobile ? { scale: 1.05 } : {}
                }
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contact = document.getElementById("contact");
                  if (contact) {
                    contact.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <FiMail />
                  <span>Work With Me</span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "100%" }}
                  whileHover={!isMobile ? { x: 0 } : {}}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                className="px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-full text-white font-semibold flex items-center justify-center space-x-2 border border-gray-600 hover:border-blue-400 transition-colors"
                whileHover={
                  !prefersReducedMotion && !isMobile ? { scale: 1.05 } : {}
                }
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("/portfolio.pdf", "_blank")}
              >
                <FiDownload />
                <span>Download Brochure</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mt-12 lg:mt-20"
        >
          {[
            { number: "500+", label: "Weddings", icon: "💍" },
            { number: "50+", label: "Destinations", icon: "🌍" },
            { number: "15+", label: "Awards", icon: "🏆" },
            { number: "1000+", label: "Happy Clients", icon: "😊" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-4 sm:p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
              whileHover={
                !prefersReducedMotion && !isMobile ? { y: -5, scale: 1.02 } : {}
              }
            >
              <span className="text-2xl sm:text-3xl block mb-2">
                {stat.icon}
              </span>
              <motion.div
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-white"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", delay: 0.2 + idx * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <FiX size={24} />
            </button>
            <video
              controls
              autoPlay
              className="w-full h-full rounded-lg"
              poster="/image/video-thumbnail.jpg"
            >
              <source src="/videos/about-intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      )}
    </MotionSection>
  );
};

export default AboutSection;
