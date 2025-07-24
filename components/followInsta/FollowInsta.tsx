import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/client";
import { useLocale } from "next-intl";

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

const PhotoCarousel = () => {
  const supabase = createClient();
  const locale = useLocale();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch media items - get more for carousel effect
      const { data: mediaData, error: mediaError } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(12); // Get more items for better carousel effect

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

  // If no media items or still loading, show loading state
  if (isLoading || mediaItems.length === 0) {
    return (
      <div className="relative w-full h-48 overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white">
          {isLoading ? "Loading..." : "No media items found"}
        </div>
      </div>
    );
  }

  // Create three sets of media items to ensure smooth looping
  const triplicatedMediaItems = [...mediaItems, ...mediaItems, ...mediaItems];

  // Calculate total width of middle set for animation
  const midSetWidth = mediaItems.length * 192; // 192px = w-48 (12rem = 192px)

  // Check if RTL
  const isRTL = locale === "ar";

  return (
    <div className="relative w-full overflow-hidden bg-black" dir="ltr">
      <motion.div
        className="flex"
        initial={{ x: -midSetWidth }}
        animate={{
          x: [-midSetWidth, -midSetWidth * 2],
        }}
        transition={{
          duration: 70,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        }}
      >
        {triplicatedMediaItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0 w-48 h-48 relative group"
          >
            {item.type === "image" ? (
              <img
                src={item.file_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={item.file_url}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
                {/* Play icon overlay for videos */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
                  <Play className="w-8 h-8 text-white/80 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            )}

            {/* Optional: Add title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xs truncate">{item.title}</p>
              <span className="text-white/70 text-xs">{item.type}</span>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Button
          variant="secondary"
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 backdrop-blur-sm"
          onClick={() =>
            window.open(
              "https://www.instagram.com/ahmed.ragabph?igsh=YTl3anc2cWwzdHNn",
              "_blank"
            )
          }
        >
          <Instagram className="w-4 h-4" />
          <span>{isRTL ? "تابعنا على انستغرام" : "Follow on Instagram"}</span>
        </Button>
      </div>
    </div>
  );
};

export default PhotoCarousel;
