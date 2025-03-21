"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "عربى", flag: "🇦🇪" },
];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cookieLocale = document.cookie.match(/locale=([^;]*)/)?.[1] || "en";
    setCurrentLocale(cookieLocale);

    // Click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChangeLanguage = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/`;
    setCurrentLocale(newLocale);

    const direction = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", direction);

    setIsOpen(false);
    router.refresh();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Custom Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md dark:hover:bg-blue-500 transition-all duration-200 border border-gray-200 dark:border-borderColor text-white"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="font-medium">
          {languages.find((lang) => lang.code === currentLocale)?.label}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-1 w-full p-1 bg-white dark:bg-[#19202F] rounded-lg shadow-lg border dark:border-borderColor border-gray-200 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleChangeLanguage(language.code)}
              className="flex items-center justify-between w-full px-4 py-1 rounded text-sm hover:bg-gray-100 dark:hover:bg-blue-500 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>{language.label}</span>
              </div>
              {currentLocale === language.code && (
                <svg
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
