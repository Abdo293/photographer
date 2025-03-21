import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const PhotoGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const locale = useLocale();
  const p = useTranslations("portfolio");
  const t = useTranslations("navbar");

  const photos = [
    {
      id: 1,
      src: "project01-416x812.jpg",
      alt: "Sample photo 1",
      caption: "Nature Photography",
      className: "md:row-span-2 md:col-span-1",
    },
    {
      id: 2,
      src: "project14-416x393.webp",
      alt: "Sample photo 2",
      caption: "Portrait Session",
      className: "md:col-span-1",
    },
    {
      id: 3,
      src: "project12-416x393.jpg",
      alt: "Sample photo 3",
      caption: "Street Photography",
      className: "md:col-span-1",
    },
    {
      id: 4,
      src: "project10-858x393.webp",
      alt: "Sample photo 4",
      caption: "Architecture",
      className: "md:col-span-2",
    },
    {
      id: 5,
      src: "service0010-858x393.webp",
      alt: "Sample photo 5",
      caption: "Landscape",
      className: "md:col-span-2",
    },
    {
      id: 6,
      src: "home7-01-416x393.webp",
      alt: "Sample photo 6",
      caption: "Urban Life",
      className: "md:col-span-1",
    },
  ];

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === 0 ? photos.length - 1 : prev - 1) : 0
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === photos.length - 1 ? 0 : prev + 1) : 0
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

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
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`relative group overflow-hidden rounded-lg cursor-pointer ${photo.className}`}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="w-full h-full overflow-hidden">
              <motion.img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-lg font-semibold">{photo.caption}</p>
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
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 bg-red-700 px-3 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 bg-red-700 px-3 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-5xl max-h-[90vh] relative overflow-hidden">
            <img
              src={photos[selectedIndex].src}
              alt={photos[selectedIndex].alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center bg-black bg-opacity-50">
              <p className="text-lg font-semibold">
                {photos[selectedIndex].caption}
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
