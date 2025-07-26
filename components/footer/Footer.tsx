import React from "react";
import { Instagram, Mail, Phone, MapPin, Facebook } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const n = useTranslations("navbar");
  const locale = useLocale();

  return (
    <footer className="bg-[#151515] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              {locale === "ar" ? "احمد رجب" : "Ahmed Ragab"}
            </h2>
            <p className="text-gray-400">{t("capMoment")}</p>
            <div className="flex itemce gap-4">
              <Link
                href="https://www.instagram.com/ahmed.ragabph?igsh=YTl3anc2cWwzdHNn"
                className="hover:text-gray-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.facebook.com/ahmedragab.photographer"
                className="hover:text-gray-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link
                href="mailto:A.ragab3444@gmail.com"
                className="hover:text-gray-400 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("links")}</h3>
            <nav className="space-y-3">
              <a
                href="/"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {n("home")}
              </a>
              <a
                href="/portfolio"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {n("portfolio")}
              </a>
              <a
                href="/about"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {n("about")}
              </a>
              <a
                href="/contact"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {n("contact")}
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact")}</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+20 111 495 5344</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>A.ragab3444@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{t("lcoation")}</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("busHours")}</h3>
            <div className="space-y-3 text-gray-400">
              <p>{t("workDays")}</p>
              <p>{t("weekend")}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} {t("name")}. {t("rights")}.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">
                {t("privacy")}
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                {t("terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
