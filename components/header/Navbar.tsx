"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@/utils/client";
import Image from "next/image";

const MenuIcon = ({ isOpen }: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      animate={{
        d: isOpen ? "M18 6L6 18M6 6L18 18" : "M4 6H20M4 12H20M4 18H20",
      }}
      transition={{ duration: 0.3 }}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Navbar = () => {
  const t = useTranslations("navbar");
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

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/contact", label: t("contact") },
  ];
  const [isOpen, setIsOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`py-4 z-50 w-full transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              <Image
                src={getImages[0]?.logo}
                width={50}
                height={50}
                alt="logo"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex gap-5 items-center justify-center">
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors relative group ${
                      isScrolled
                        ? "text-gray-200 hover:text-white"
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-md:hidden">
            <LanguageSwitcher />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <MenuIcon isOpen={isOpen} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-[#151515]/95 backdrop-blur-lg"
              >
                <nav className="flex flex-col space-y-6 mt-8">
                  <AnimatePresence>
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          delay: index * 0.1,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="text-lg font-medium text-gray-200 hover:text-white transition-colors flex items-center group"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="relative">
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
