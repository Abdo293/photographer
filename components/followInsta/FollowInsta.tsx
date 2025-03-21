import React from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const PhotoCarousel = () => {
  const images = [
    "/gallery1.webp",
    "/gallery2.webp",
    "/gallery3.webp",
    "/gallery4.webp",
    "/gallery5.webp",
    "/about4-638x401.webp",
    "/download.jpeg",
    "/project01-416x812.jpg",
    "/project14-416x393.webp",
  ];

  // Create three sets of images to ensure smooth looping
  const triplicatedImages = [...images, ...images, ...images];

  // Calculate total width of middle set for animation
  const midSetWidth = images.length * 192; // 192px = 48px (w-48) * 4

  // Get the current direction from HTML dir attribute
  const isRTL = document.dir === "rtl";

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
        {triplicatedImages.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-48 h-48 relative">
            <img
              src={image}
              alt={`Gallery image ${(index % images.length) + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Button
          variant="secondary"
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700"
          onClick={() =>
            window.open("https://instagram.com/photographerhandle", "_blank")
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
