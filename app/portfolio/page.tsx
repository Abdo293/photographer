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
  ArrowLeft,
  Tag,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/client";
import { toast } from "sonner";

interface Category {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
}

interface Brand {
  id: string;
  name_ar: string;
  name_en: string;
  category_id: number;
  created_at: string;
}

interface MediaItem {
  id: number;
  title: string;
  type: "image" | "video";
  file_url: string;
  category_id: number;
  brand_id?: string;
  created_at: string;
  public_id: string;
  categories?: {
    id: number;
    name_ar: string;
    name_en: string;
  };
}

const Portfolio = () => {
  const supabase = createClient();
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getImages, setGetImages] = useState<MediaItem[]>([]);
  const t = useTranslations("portfolioPage");
  const locale = useLocale();

  // State for active category filter and search term
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [activeBrand, setActiveBrand] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeSection, setActiveSection] = useState("all"); // "all", "images", "videos"
  const [viewMode, setViewMode] = useState<"categories" | "brands" | "media">(
    "categories"
  );

  // Lightbox states
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [currentMediaList, setCurrentMediaList] = useState<MediaItem[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("name_ar");

        if (error) throw error;
        if (data) setAllCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch brands when category is selected
  useEffect(() => {
    if (!selectedCategoryId) {
      setBrands([]);
      return;
    }

    const fetchBrands = async () => {
      try {
        const { data, error } = await supabase
          .from("brand")
          .select("*")
          .eq("category_id", parseInt(selectedCategoryId))
          .order("name_ar");

        if (error) throw error;
        if (data) setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to load brands");
      }
    };

    fetchBrands();
  }, [selectedCategoryId]);

  // Fetch media
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("media")
          .select(
            `
            *,
            categories (
              id,
              name_ar,
              name_en
            )
          `
          )
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setGetImages(data);
      } catch (error) {
        console.error("Error fetching media:", error);
        toast.error("Failed to load media");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Helper function to get category name based on locale
  const getCategoryName = (categoryId: number) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    if (!category) return "";
    return locale === "ar" ? category.name_ar : category.name_en;
  };

  // Helper function to get brand name based on locale
  const getBrandName = (brandId: string) => {
    const brand = brands.find((b) => b.id === brandId);
    if (!brand) return "";
    return locale === "ar" ? brand.name_ar : brand.name_en;
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === "all") {
      setActiveCategory("all");
      setSelectedCategoryId(null);
      setViewMode("media");
      setActiveBrand("all");
    } else {
      setActiveCategory(categoryId);
      setSelectedCategoryId(categoryId);
      setViewMode("brands");
      setActiveBrand("all");
    }
    setVisibleCount(8);
  };

  // Handle brand selection
  const handleBrandSelect = (brandId: string) => {
    setActiveBrand(brandId);
    setViewMode("media");
    setVisibleCount(8);
  };

  // Go back to categories
  const goBackToCategories = () => {
    setViewMode("categories");
    setActiveCategory("all");
    setSelectedCategoryId(null);
    setActiveBrand("all");
  };

  // Go back to brands
  const goBackToBrands = () => {
    setViewMode("brands");
    setActiveBrand("all");
  };

  // Filter items based on active category, brand, section, and search term
  const filteredItems = getImages
    .filter((item) => {
      const matchesCategory =
        activeCategory === "all" ||
        item.category_id === parseInt(activeCategory);

      const matchesBrand =
        activeBrand === "all" || item.brand_id === activeBrand;

      const matchesSection =
        activeSection === "all" || item.type === activeSection.slice(0, -1);

      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesBrand && matchesSection && matchesSearch;
    })
    .slice(0, visibleCount);

  // Open lightbox with specific media
  const openLightbox = (index: number) => {
    const fullFilteredList = getImages.filter((item) => {
      const matchesCategory =
        activeCategory === "all" ||
        item.category_id === parseInt(activeCategory);
      const matchesBrand =
        activeBrand === "all" || item.brand_id === activeBrand;
      const matchesSection =
        activeSection === "all" || item.type === activeSection.slice(0, -1);
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesBrand && matchesSection && matchesSearch;
    });

    setCurrentMediaList(fullFilteredList);
    setCurrentMediaIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset";
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
        {/* Breadcrumb Navigation */}
        {(viewMode === "brands" || viewMode === "media") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.button
              onClick={goBackToCategories}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 transition-all duration-300"
            >
              {locale === "en" ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>{t("categories") || "Categories"}</span>
            </motion.button>

            {viewMode === "media" &&
              selectedCategoryId &&
              brands.length > 0 && (
                <>
                  <span className="text-gray-500">/</span>
                  <motion.button
                    onClick={goBackToBrands}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 transition-all duration-300"
                  >
                    <Building className="w-4 h-4" />
                    <span>{getCategoryName(parseInt(selectedCategoryId))}</span>
                  </motion.button>
                </>
              )}

            {viewMode === "media" && activeBrand !== "all" && (
              <>
                <span className="text-gray-500">/</span>
                <span className="text-white font-medium">
                  {getBrandName(activeBrand)}
                </span>
              </>
            )}
          </motion.div>
        )}

        {/* Section Toggle Buttons (All, Images, Videos) - Only show in media view */}
        {viewMode === "media" && (
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
        )}

        {/* Categories View */}
        {viewMode === "categories" && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center md:justify-start gap-3"
            >
              <motion.button
                onClick={() => handleCategorySelect("all")}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl flex items-center gap-2 backdrop-blur-sm transition-all duration-300 bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
              >
                <Aperture className="w-4 h-4" />
                <span>{t("all") || "All"}</span>
              </motion.button>

              {allCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id.toString())}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
                  className="px-6 py-3 rounded-xl flex items-center gap-2 backdrop-blur-sm transition-all duration-300 bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                >
                  <Camera className="w-4 h-4" />
                  <span>{getCategoryName(category.id)}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        )}

        {/* Brands View */}
        {viewMode === "brands" && brands.length > 0 && (
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white font-bold mb-8 text-center"
            >
              {selectedCategoryId &&
                getCategoryName(parseInt(selectedCategoryId))}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {brands.map((brand, index) => (
                  <motion.div
                    key={brand.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group cursor-pointer"
                    onClick={() => handleBrandSelect(brand.id)}
                  >
                    <div className="p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/5 shadow-xl transition-all duration-300 hover:bg-white/10 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center">
                        <Building className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {locale === "ar" ? brand.name_ar : brand.name_en}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {t("viewWork") || "View Work"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Media Grid - Show when viewMode is "media" or when in categories view with "all" selected */}
        {(viewMode === "media" ||
          (viewMode === "categories" && activeCategory === "all")) && (
          <>
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
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors duration-300">
                                <Play className="w-12 h-12 text-white/80 group-hover:text-white transition-colors duration-300" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-block px-3 py-1 rounded-full bg-red-500/30 text-red-100 text-xs backdrop-blur-sm">
                              {getCategoryName(item.category_id)}
                            </span>
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-xs backdrop-blur-sm">
                              {item.type}
                            </span>
                            {item.brand_id && (
                              <span className="inline-block px-3 py-1 rounded-full bg-green-500/30 text-green-100 text-xs backdrop-blur-sm">
                                {getBrandName(item.brand_id)}
                              </span>
                            )}
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
                const matchesBrand =
                  activeBrand === "all" || item.brand_id === activeBrand;
                const matchesSection =
                  activeSection === "all" ||
                  item.type === activeSection.slice(0, -1);
                return matchesCategory && matchesBrand && matchesSection;
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
          </>
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
                {currentMediaList[currentMediaIndex].brand_id && (
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/30">
                    {getBrandName(currentMediaList[currentMediaIndex].brand_id)}
                  </span>
                )}
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
