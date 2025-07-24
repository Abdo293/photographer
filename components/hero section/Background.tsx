"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@/utils/client";
import { useEffect, useState } from "react";

export const Background = () => {
  const t = useTranslations("heroSection");
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [getImages, setGetImages] = useState<any[]>([]);
  const locale = useLocale();

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("home_content")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setGetImages(data || []);
      setIsLoading(false);
    };

    fetchImages();
  }, []);

  console.log(getImages);

  return (
    <div className="relative h-[95vh] overflow-hidden">
      {/* Lens-inspired background elements */}
      <motion.div
        className="absolute inset-0 w-[150%] h-[150%] -left-1/4 -top-1/4"
        animate={{ rotate: 360 }}
        transition={{
          duration: 50,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div className="absolute w-full h-full border-[100px] border-gray-800/30 rounded-full" />
        <div className="absolute w-full h-full border-[60px] border-gray-700/20 rounded-full" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
        {/* Text Content */}
        <motion.div
          className="w-full lg:w-5/12 text-white z-10 mb-12 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t("capturing")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
              {t("letsMoment")}
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t("professional")}
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors">
              {t("portfolio")}
            </button>
            <button className="px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
              {t("contact")}
            </button>
          </motion.div>
        </motion.div>

        {/* Image Container with Lens Effect */}
        <motion.div
          className="w-full lg:w-7/12 relative h-[70vh] lg:h-[85vh]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Rotating lens elements behind image */}
            <motion.div
              className="absolute inset-0 z-0"
              animate={{ rotate: -360 }}
              transition={{
                duration: 40,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="absolute inset-0 border-[30px] border-gray-600/20 rounded-full" />
              <div className="absolute inset-0 border-[20px] border-gray-500/20 rounded-full" />
              <div className="absolute inset-0 border-[10px] border-gray-400/20 rounded-full" />
            </motion.div>

            {/* Main image */}
            <div className="relative w-full h-full z-10">
              <Image
                src={getImages[0]?.image}
                fill
                style={{ objectFit: "contain" }}
                alt="Professional Photography"
                className="rounded-2xl"
                priority
              />
            </div>

            {/* Updated floating elements */}
            <motion.div
              className="absolute -left-4 bottom-[2.5rem] bg-gradient-to-br from-gray-900 to-black p-4 rounded-2xl shadow-xl z-20 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-20"
                animate={{
                  x: ["-100%", "100%"],
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "linear",
                  },
                }}
              />
              <p className="text-white font-bold text-lg relative z-10">
                10+ {t("year")}
              </p>
              <p className="text-gray-300 text-sm relative z-10">{t("exp")}</p>
            </motion.div>

            <motion.div
              className="absolute -right-4 top-1/4 bg-gradient-to-br from-gray-900 to-black p-4 rounded-2xl shadow-xl z-20 overflow-hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-20"
                animate={{
                  x: ["-100%", "100%"],
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "linear",
                  },
                }}
              />
              <p className="text-white font-bold text-lg relative z-10">500+</p>
              <p className="text-gray-300 text-sm relative z-10">
                {t("happy")}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Additional camera-inspired decorative elements */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-10"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 border-8 border-gray-400 rounded-full" />
        <div className="absolute inset-[25%] border-4 border-gray-400 rounded-full" />
        <div className="absolute inset-[45%] border-2 border-gray-400 rounded-full" />
      </motion.div>
    </div>
  );
};
