import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
} from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { createClient } from "@/utils/client";

interface MediaItem {
  id: number;
  title: string;
  type: "image" | "video";
  file_url: string;
  category_id: number;
  created_at: string;
  public_id: string;
}

interface Category {
  id: number;
  name_ar: string;
  name_en: string;
  created_at: string;
}

const PhotoGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
  const p = useTranslations("portfolio");
  const t = useTranslations("navbar");
  const supabase = createClient();

  // Fetch media items and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch media items
      const { data: mediaData, error: mediaError } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6); // Limit to 6 items for home page

      // Fetch categories
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("*");

      if (!mediaError && mediaData) {
        setMediaItems(mediaData);
      }

      if (!categoryError && categoryData) {
        setCategories(categoryData);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [supabase]);

  // Helper function to get category name based on locale
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return "";
    return locale === "ar" ? category.name_ar : category.name_en;
  };

  // Define responsive grid classes for different positions
  const getGridClass = (index: number) => {
    const gridClasses = [
      "md:row-span-2 md:col-span-1", // First item - tall
      "md:col-span-1", // Second item - normal
      "md:col-span-1", // Third item - normal
      "md:col-span-2", // Fourth item - wide
      "md:col-span-2", // Fifth item - wide
      "md:col-span-1", // Sixth item - normal
    ];
    return gridClasses[index] || "md:col-span-1";
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === 0 ? mediaItems.length - 1 : prev - 1) : 0
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === mediaItems.length - 1 ? 0 : prev + 1) : 0
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-4xl font-bold text-white text-center pb-8">
          {t("portfolio")}
        </p>
        <div className="flex justify-center items-center py-20">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <p className="text-4xl font-bold text-white text-center pb-8">
        {t("portfolio")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mediaItems.map((item, index) => (
          <div
            key={item.id}
            className={`relative group overflow-hidden rounded-lg cursor-pointer ${getGridClass(
              index
            )}`}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="w-full h-full overflow-hidden">
              {item.type === "image" ? (
                <motion.img
                  src={item.file_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />
              ) : (
                <div className="relative w-full h-full">
                  <motion.video
                    src={item.file_url}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    muted
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                  {/* Play icon overlay for videos */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
                    <Play className="w-12 h-12 text-white/80 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm text-gray-300">
                  {getCategoryName(item.category_id)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal View */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X size={32} />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 bg-red-700 px-3 py-2 rounded text-white hover:bg-red-600 transition-colors z-10"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 bg-red-700 px-3 py-2 rounded text-white hover:bg-red-600 transition-colors z-10"
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-5xl max-h-[90vh] relative overflow-hidden">
            {mediaItems[selectedIndex].type === "image" ? (
              <img
                src={mediaItems[selectedIndex].file_url}
                alt={mediaItems[selectedIndex].title}
                className="max-w-full max-h-[90vh] object-contain"
              />
            ) : (
              <video
                src={mediaItems[selectedIndex].file_url}
                className="max-w-full max-h-[90vh] object-contain"
                controls
                autoPlay
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center bg-black bg-opacity-50">
              <p className="text-lg font-semibold">
                {mediaItems[selectedIndex].title}
              </p>
              <p className="text-sm text-gray-300">
                {getCategoryName(mediaItems[selectedIndex].category_id)} •{" "}
                {mediaItems[selectedIndex].type}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center pt-8">
        <Link
          className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg"
          href={"/portfolio"}
        >
          {p("seeMore")}
          {locale === "en" ? (
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          ) : (
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default PhotoGallery;
