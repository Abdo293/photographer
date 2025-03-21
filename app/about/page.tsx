"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Camera, Video, Clock, Award, Users, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const About = () => {
  const t = useTranslations("aboutPage");

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const whyChooseReasons = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: t("highProfile"),
      description: t("caption1"),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("quick"),
      description: t("caption2"),
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: t("quality"),
      description: t("caption3"),
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: t("equipment"),
      description: t("caption4"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
      {/* Hero Section - With Background Image */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pagetitle07.webp"
            alt="Professional photography gear"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent opacity-90"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: -10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
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
              {t("about")}
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

      {/* Stats Section - Glass Card Design */}
      <div className="container mx-auto px-6 -mt-24 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            {
              number: "10+",
              label: t("yearExp"),
              icon: <Clock className="w-8 h-8" />,
              color: "from-red-500/20 to-red-600/10",
            },
            {
              number: "100+",
              label: t("capture"),
              icon: <Camera className="w-8 h-8" />,
              color: "from-blue-500/20 to-blue-600/10",
            },
            {
              number: "50+",
              label: t("corporate"),
              icon: <Users className="w-8 h-8" />,
              color: "from-purple-500/20 to-purple-600/10",
            },
            {
              number: "24/7",
              label: t("sppoourt"),
              icon: <Award className="w-8 h-8" />,
              color: "from-green-500/20 to-green-600/10",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`p-8 backdrop-blur-lg bg-gradient-to-br ${stat.color} shadow-xl rounded-2xl text-center border border-white/5 transform hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/5 shadow-inner text-white rounded-2xl">
                  {stat.icon}
                </div>
              </div>
              <h4 className="text-5xl font-bold text-white mb-3 tracking-tighter">
                {stat.number}
              </h4>
              <p className="text-gray-300 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Why Choose Me Section - Side by Side */}
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
                <img
                  src="/about-choose-us.webp"
                  alt="Professional photography setup"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
              </div>
            </motion.div>

            {/* Content Column */}
            <div className="lg:w-1/2 space-y-8">
              <motion.h2
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-white relative inline-block"
              >
                <span className="relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-20 after:h-1 after:bg-red-500 rtl:after:right-0 rtl:after:left-auto">
                  {t("chooseMe")}
                </span>
              </motion.h2>

              <Accordion type="single" collapsible className="space-y-6 mt-8">
                {whyChooseReasons.map((reason, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    key={index}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl"
                    >
                      <AccordionTrigger className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/10 text-white rounded-xl backdrop-blur-sm group-hover:bg-red-500/30 transition-all duration-300">
                            {reason.icon}
                          </div>
                          <span className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                            {reason.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-8 py-6 text-gray-300 backdrop-blur-sm bg-black/20">
                        {reason.description}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Services Section - Reversed Side by Side */}
      <div className="bg-black/30 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
                  <img
                    src="/about3.webp"
                    alt="Professional services showcase"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                </div>
              </motion.div>

              {/* Content Column */}
              <div className="lg:w-1/2 space-y-8">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-white relative inline-block"
                >
                  <span className="relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-20 after:h-1 after:bg-red-500 rtl:after:right-0 rtl:after:left-auto">
                    {t("service")}
                  </span>
                </motion.h2>

                <div className="space-y-6 mt-8">
                  {[
                    {
                      title: t("serv1"),
                      description: t("servCaption1"),
                      icon: <Users className="w-6 h-6" />,
                      color: "from-blue-500/20 to-blue-600/10",
                    },
                    {
                      title: t("serv2"),
                      description: t("servCaption2"),
                      icon: <Camera className="w-6 h-6" />,
                      color: "from-purple-500/20 to-purple-600/10",
                    },
                    {
                      title: t("serv3"),
                      description: t("servCaption3"),
                      icon: <Camera className="w-6 h-6" />,
                      color: "from-green-500/20 to-green-600/10",
                    },
                    {
                      title: t("serv4"),
                      description: t("servCaption4"),
                      icon: <Video className="w-6 h-6" />,
                      color: "from-red-500/20 to-red-600/10",
                    },
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                      }}
                      className={`p-8 backdrop-blur-sm bg-gradient-to-br ${service.color} rounded-2xl border border-white/5 transform transition-all duration-300 hover:-translate-y-2`}
                    >
                      <div className="flex items-start gap-5">
                        <div className="p-4 bg-white/5 text-white shadow-inner rounded-xl">
                          {service.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-3">
                            {service.title}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact CTA - Side by Side */}
      <div className="py-24 relative">
        <div className="absolute inset-0 bg-[#0A0A0A] opacity-70"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row gap-12 items-center backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-10">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/contact.png"
                  alt="Ready to start your project"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </motion.div>

              {/* Content */}
              <div className="lg:w-1/2 p-8 space-y-8 text-center lg:text-left">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl lg:text-5xl font-bold text-white tracking-tighter"
                >
                  {t("contactTitle")}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-xl text-gray-300 font-light leading-relaxed"
                >
                  {t("contactCaption")}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(220, 38, 38, 0.7)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-600/20"
                >
                  <Link href={"/contact"}>{t("contactBtn")}</Link>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
