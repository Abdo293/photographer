"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Camera, Heart, Building, Users, Aperture, Search } from "lucide-react";
import Image from "next/image";

const Portfolio = () => {
  // In a real app, you would use this for translations
  const t = useTranslations("portfolioPage");
  const locale = useLocale();

  // Categories for the filter buttons
  const categories = [
    { id: "all", label: t("all"), icon: <Aperture className="w-4 h-4" /> },
    { id: "wedding", label: t("wedding"), icon: <Heart className="w-4 h-4" /> },
    {
      id: "portrait",
      label: t("portrait"),
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "corporate",
      label: t("corporate"),
      icon: <Building className="w-4 h-4" />,
    },
    { id: "event", label: t("event"), icon: <Users className="w-4 h-4" /> },
    { id: "nature", label: t("nature"), icon: <Camera className="w-4 h-4" /> },
  ];

  // Sample portfolio items - in a real app, this would be fetched from a CMS or API
  const allItems = [
    {
      id: 1,
      category: "wedding",
      image: "/about-choose-us.webp",
      title: "Sarah & John's Wedding",
    },
    {
      id: 2,
      category: "portrait",
      image: "/about3.webp",
      title: "Executive Headshot",
    },
    {
      id: 3,
      category: "corporate",
      image: "/about4-638x401.webp",
      title: "Annual Corporate Event",
    },
    {
      id: 4,
      category: "wedding",
      image: "/contact.png",
      title: "Beach Wedding Ceremony",
    },
    {
      id: 5,
      category: "event",
      image: "/gallery1.webp",
      title: "Fashion Show Coverage",
    },
    {
      id: 6,
      category: "nature",
      image: "/gallery2.webp",
      title: "Mountain Landscapes",
    },
    {
      id: 7,
      category: "portrait",
      image: "/gallery3.webp",
      title: "Family Portrait Session",
    },
    {
      id: 8,
      category: "corporate",
      image: "/gallery4.webp",
      title: "Product Launch",
    },
    {
      id: 9,
      category: "event",
      image: "/gallery5.webp",
      title: "Music Festival",
    },
    {
      id: 10,
      category: "nature",
      image: "/home7-01-416x393.webp",
      title: "Seascape Series",
    },
    {
      id: 11,
      category: "wedding",
      image: "/project12-416x393.jpg",
      title: "Alex & Jamie's Wedding",
    },
    {
      id: 12,
      category: "portrait",
      image: "/project14-416x393.webp",
      title: "Studio Session",
    },
  ];

  // State for active category filter and search term
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter items based on active category and search term
  const filteredItems = allItems
    .filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .slice(0, visibleCount);

  // Animation variants - Faster animations for portfolio grid
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }, // Reduced from 0.5
  };

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
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center md:justify-start gap-3"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`px-6 py-3 rounded-xl flex items-center gap-2 backdrop-blur-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/20"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative w-full md:w-auto min-w-[300px]"
          >
            <input
              type="text"
              placeholder={t("search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 backdrop-blur-sm"
            />
            <Search
              className={`absolute ${
                locale === "ar" ? "left-4" : "right-4"
              } top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5`}
            />
          </motion.div>
        </div>

        {/* Portfolio Grid - With faster animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: (index % 8) * 0.05 }} // Faster animation (0.3 instead of 0.5) and faster delay (0.05 instead of 0.1)
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/5 shadow-xl transition-all duration-300" // Faster transition
                >
                  <div className="relative overflow-hidden aspect-square">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500" // Slightly faster hover animation
                      />
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>{" "}
                    {/* Faster hover overlay */}
                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {/* Faster overlay animation */}
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <span className="inline-block px-3 py-1 rounded-full bg-red-500/30 text-red-100 text-xs backdrop-blur-sm">
                        {t(item.category)}
                      </span>
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
                  No matching projects found.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {filteredItems.length <
          allItems.filter(
            (item) =>
              activeCategory === "all" || item.category === activeCategory
          ).length && (
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
              {t("loadMore")}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
