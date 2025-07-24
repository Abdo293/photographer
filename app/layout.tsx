import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { Navbar } from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Ragab",
  description: "welcome to our site",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className={`${cairo.className} bg-[#1A1A1A]`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
