import React from "react";
import {
  Camera,
  Award,
  Calendar,
  Building,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const AboutSection = () => {
  const t = useTranslations("about");
  const locale = useLocale();

  const stats = [
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      value: "10+",
      label: t("yearExp"),
    },
    {
      icon: <Building className="w-6 h-6 text-white" />,
      value: "200+",
      label: t("corporateClients"),
    },
    {
      icon: <Camera className="w-6 h-6 text-white" />,
      value: "500+",
      label: t("eventsCaptured"),
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      value: "15+",
      label: t("industryAwards"),
    },
  ];

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const staggerContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const statsCardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="py-16 bg-[#151515]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={staggerContainerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-white text-center mb-12"
          variants={fadeInUpVariants}
        >
          {t("captStory")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Image Column */}
          <motion.div
            className="relative w-full max-w-xl mx-auto md:mx-0"
            variants={imageVariants}
          >
            <div className="aspect-square w-full relative">
              <Image
                src="/about4-638x401.webp"
                width={600}
                height={600}
                alt="Professional Photographer at work"
                className="rounded-lg object-cover shadow-xl w-full h-full"
              />
            </div>
            <motion.div
              className={`absolute -bottom-6 ${
                locale === "en" ? "-right-6" : "-left-6"
              } p-4 bg-[#151515] rounded-lg shadow-lg hidden md:block`}
              variants={fadeInUpVariants}
            >
              <p className="text-3xl font-bold text-gray-200">1000+</p>
              <p className="text-gray-300">{t("satisfiedClients")}</p>
            </motion.div>
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            className="space-y-6 flex flex-col justify-center"
            variants={staggerContainerVariants}
          >
            <motion.p
              className="text-lg text-gray-300"
              variants={fadeInUpVariants}
            >
              {t("firstCaption")}
            </motion.p>
            <motion.p
              className="text-lg text-gray-300"
              variants={fadeInUpVariants}
            >
              {t("secondCaption")}
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-8"
              variants={staggerContainerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 rounded-lg shadow-lg bg-[#1a1a1a]"
                  variants={statsCardVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="flex justify-center mb-2"
                    variants={fadeInUpVariants}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold text-gray-400"
                    variants={fadeInUpVariants}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div
                    className="text-sm text-gray-200"
                    variants={fadeInUpVariants}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Learn More Button */}
            <motion.div className="mt-8" variants={fadeInUpVariants}>
              <Link
                className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 w-fit text-white px-6 py-2 rounded-lg text-lg"
                href={"/about"}
              >
                {t("moreAboutMe")}
                {locale === "en" ? (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                )}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
