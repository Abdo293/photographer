"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import {
  Send,
  Calendar,
  CheckCircle,
  AlertCircle,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const ContactUs = () => {
  // In a real app, you would use this for translations
  const t = useTranslations("contactPage");
  const locale = useLocale();
  const isRTL = ["ar", "he", "fa", "ur"].includes(locale);

  // Fix: Properly type the form ref to HTMLFormElement
  const form = useRef<HTMLFormElement>(null);

  // EmailJS configuration
  const emailjsServiceId = "service_whhihp2"; // Replace with your service ID
  const emailjsTemplateId = "template_5fqzgc9"; // Replace with your template ID
  const emailjsPublicKey = "TG37jiUw3AocsxVhR"; // Replace with your public key

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    companyName: "",
    serviceName: "",
    message: "",
  });

  // Available services - in a real app, fetch from CMS/API
  const services = [
    { value: "wedding", label: t("wedding") },
    { value: "portrait", label: t("portrait") },
    { value: "corporate", label: t("corporate") },
    { value: "event", label: t("event") },
    { value: "nature", label: t("nature") },
  ];

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

    // Check if form.current exists before proceeding
    if (!form.current) {
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        emailjsServiceId,
        emailjsTemplateId,
        form.current,
        emailjsPublicKey
      );

      if (result.status === 200) {
        setIsSuccess(true);
        // Reset form data
        setFormData({
          name: "",
          address: "",
          companyName: "",
          serviceName: "",
          message: "",
        });
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const socialIcons = [
    { icon: <Instagram size={24} />, name: "LinkedIn" },
    { icon: <Facebook size={24} />, name: "Github" },
    { icon: <Twitter size={24} />, name: "Twitter" },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] "
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Section Header */}
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
              {t("contact")}
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

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto my-24 max-lg:mx-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="h-full rounded-3xl overflow-hidden relative">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/contact.png"
                  alt="Photography studio"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60"></div>
              </div>

              {/* Contact Info Content */}
              <div className="relative z-10 p-10 h-full flex flex-col">
                <div className="backdrop-blur-md bg-black/30 rounded-3xl p-8 border border-white/10 shadow-2xl flex-grow">
                  <h3 className="text-3xl font-semibold text-white mb-8">
                    {t("getInTouch")}
                  </h3>

                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-8"
                  >
                    <motion.div
                      variants={fadeIn}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-red-600/20 p-3 rounded-xl">
                        <Send className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {t("email")}
                        </h4>
                        <p className="text-gray-300">contact@yourstudio.com</p>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fadeIn}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-red-600/20 p-3 rounded-xl">
                        <Calendar className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {t("hours")}
                        </h4>
                        <p className="text-gray-300">
                          {t("weekdays")}: 9:00 - 18:00
                        </p>
                        <p className="text-gray-300">
                          {t("weekends")}: 10:00 - 15:00
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12"
                  >
                    <h4 className="text-white font-medium mb-4">
                      {t("followUs")}
                    </h4>
                    <div className="flex gap-4">
                      {socialIcons.map((social, index) => (
                        <motion.a
                          key={index}
                          href={`#${social.name}`}
                          whileHover={{ y: -5, scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.7 + index * 0.1,
                          }}
                          className="bg-white/10 p-3 rounded-xl hover:bg-red-600/30 transition-all duration-300"
                        >
                          <span className="sr-only">{social.name}</span>
                          <div className="text-gray-300">{social.icon}</div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            <h3 className="text-3xl font-semibold text-white mb-8">
              {t("bookingTitle")}
            </h3>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8"
              >
                <div className="flex justify-center mb-6">
                  <CheckCircle className="h-20 w-20 text-green-500" />
                </div>
                <h4 className="text-2xl font-medium text-white mb-4">
                  {t("thankYou")}
                </h4>
                <p className="text-gray-300 mb-8">{t("bookingConfirmation")}</p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-red-600/20"
                >
                  {t("bookAgain")}
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                ref={form}
                onSubmit={handleSubmit}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-6"
              >
                {/* Name Field */}
                <motion.div variants={fadeIn}>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    {t("name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    placeholder={t("namePlaceholder")}
                  />
                </motion.div>

                {/* Address Field */}
                <motion.div variants={fadeIn}>
                  <label htmlFor="address" className="block text-gray-300 mb-2">
                    {t("emailAddress")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    placeholder={t("addressPlaceholder")}
                  />
                </motion.div>

                {/* Company Name Field (Optional) */}
                <motion.div variants={fadeIn}>
                  <label
                    htmlFor="companyName"
                    className="block text-gray-300 mb-2"
                  >
                    {t("companyName")} ({t("optional")})
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    placeholder={t("companyPlaceholder")}
                  />
                </motion.div>

                {/* Service Selection */}
                <motion.div variants={fadeIn}>
                  <label
                    htmlFor="serviceName"
                    className="block text-gray-300 mb-2"
                  >
                    {t("service")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="serviceName"
                    name="serviceName"
                    required
                    value={formData.serviceName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 appearance-none"
                  >
                    <option value="" disabled className="bg-gray-900">
                      {t("selectService")}
                    </option>
                    {services.map((service) => (
                      <option
                        key={service.value}
                        value={service.value}
                        className="bg-gray-900"
                      >
                        {service.label}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Message Field */}
                <motion.div variants={fadeIn}>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    {t("message")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
                    placeholder={t("messagePlaceholder")}
                  ></textarea>
                </motion.div>

                {/* Error Message */}
                {isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm py-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>{t("errorMessage")}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div variants={fadeIn} className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t("submitting") : t("submitBooking")}
                  </button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
