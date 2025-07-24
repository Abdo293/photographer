"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Camera,
  Heart,
  Building,
  Users,
  Aperture,
  Search,
  Play,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/client";

const Portfolio = () => {
  const supabase = createClient();
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getImages, setGetImages] = useState<any[]>([]);
  const t = useTranslations("portfolioPage");
  const locale = useLocale();

  // State for active category filter and search term
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeSection, setActiveSection] = useState("all"); // "all", "images", "videos"

  // Lightbox states
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [currentMediaList, setCurrentMediaList] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setAllCategories(data || []);
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setGetImages(data || []);
      setIsLoading(false);
    };

    fetchImages();
  }, []);

  // Helper function to get category name based on locale
  const getCategoryName = (categoryId: number) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    if (!category) return "";
    return locale === "ar" ? category.name_ar : category.name_en;
  };

  // Filter items based on active category, section, and search term
  const filteredItems = getImages
    .filter((item) => {
      const matchesCategory =
        activeCategory === "all" ||
        item.category_id === parseInt(activeCategory);
      const matchesSection =
        activeSection === "all" || item.type === activeSection.slice(0, -1); // Remove 's' from 'images'/'videos'
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSection && matchesSearch;
    })
    .slice(0, visibleCount);

  // Open lightbox with specific media
  const openLightbox = (index: number) => {
    const fullFilteredList = getImages.filter((item) => {
      const matchesCategory =
        activeCategory === "all" ||
        item.category_id === parseInt(activeCategory);
      const matchesSection =
        activeSection === "all" || item.type === activeSection.slice(0, -1);
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSection && matchesSearch;
    });

    setCurrentMediaList(fullFilteredList);
    setCurrentMediaIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  // Navigate to previous media
  const goToPrevious = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? currentMediaList.length - 1 : prev - 1
    );
  };

  // Navigate to next media
  const goToNext = () => {
    setCurrentMediaIndex((prev) =>
      prev === currentMediaList.length - 1 ? 0 : prev + 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isLightboxOpen, currentMediaList.length]);

  // Separate images and videos for dedicated sections
  const images = getImages.filter((item) => item.type === "image");
  const videos = getImages.filter((item) => item.type === "video");

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  // Section buttons
  const sectionButtons = [
    {
      id: "all",
      label: t("all") || "All",
      icon: <Aperture className="w-4 h-4" />,
    },
    {
      id: "images",
      label: t("images") || "Images",
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      id: "videos",
      label: t("videos") || "Videos",
      icon: <Play className="w-4 h-4" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
      {/* Hero Section - With Background Image */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pagetitle07.webp"
            alt="Professional photography gear"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent opacity-90"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="absolute w-full h-full bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay"></div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "30%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
          />
          <div className="text-center z-10 p-12 backdrop-blur-sm bg-black/20 rounded-3xl border border-white/5 shadow-2xl">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl text-white font-bold mb-4 tracking-tight"
            >
              {t("portfolio")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-300 text-xl font-light"
            >
              {t("caption")}
            </motion.p>
          </div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "30%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-l from-transparent via-red-500 to-transparent"
          />
        </motion.div>
      </div>

      {/* Portfolio Controls Section */}
      <div className="container mx-auto px-6 py-16">
        {/* Section Toggle Buttons (All, Images, Videos) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 mb-8"
        >
          {sectionButtons.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 backdrop-blur-sm transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/20"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
              }`}
            >
              {section.icon}
              <span>{section.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          {/* Category Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center md:justify-start gap-3"
          >
            <motion.button
              onClick={() => setActiveCategory("all")}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 backdrop-blur-sm transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/20"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
              }`}
            >
              <Aperture className="w-4 h-4" />
              <span>{t("all") || "All"}</span>
            </motion.button>

            {allCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id.toString())}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
                className={`px-6 py-3 rounded-xl flex items-center gap-2 backdrop-blur-sm transition-all duration-300 ${
                  activeCategory === category.id.toString()
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/20"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{getCategoryName(category.id)}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: (index % 8) * 0.05 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/5 shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <div className="relative w-full h-full">
                      {item.type === "image" ? (
                        <Image
                          src={item.file_url}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="relative w-full h-full bg-black">
                          <video
                            src={item.file_url}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            muted
                            loop
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => e.currentTarget.pause()}
                          />
                          {/* Play icon overlay for videos */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors duration-300">
                            <Play className="w-12 h-12 text-white/80 group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-red-500/30 text-red-100 text-xs backdrop-blur-sm">
                          {getCategoryName(item.category_id)}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-xs backdrop-blur-sm">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                {...fadeInUp}
                className="col-span-full text-center py-20"
              >
                <p className="text-gray-300 text-xl">
                  {t("noMatching") || "No matching projects found."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {filteredItems.length <
          getImages.filter((item) => {
            const matchesCategory =
              activeCategory === "all" ||
              item.category_id === parseInt(activeCategory);
            const matchesSection =
              activeSection === "all" ||
              item.type === activeSection.slice(0, -1);
            return matchesCategory && matchesSection;
          }).length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-16"
          >
            <motion.button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-600/20"
            >
              {t("loadMore") || "Load More"}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && currentMediaList[currentMediaIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-60 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation Buttons */}
            {currentMediaList.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Media Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentMediaList[currentMediaIndex].type === "image" ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={currentMediaList[currentMediaIndex].file_url}
                    alt={currentMediaList[currentMediaIndex].title}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    priority
                  />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    src={currentMediaList[currentMediaIndex].file_url}
                    controls
                    autoPlay
                    className="max-w-full max-h-full rounded-lg"
                    style={{ maxWidth: "90vw", maxHeight: "90vh" }}
                  />
                </div>
              )}
            </motion.div>

            {/* Media Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 left-6 right-6 text-center"
            >
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm text-white">
                <span className="text-sm font-medium">
                  {currentMediaList[currentMediaIndex].title}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-red-500/30">
                  {getCategoryName(
                    currentMediaList[currentMediaIndex].category_id
                  )}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/30">
                  {currentMediaList[currentMediaIndex].type}
                </span>
                {currentMediaList.length > 1 && (
                  <span className="text-xs text-gray-300">
                    {currentMediaIndex + 1} of {currentMediaList.length}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
