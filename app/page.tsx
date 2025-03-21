"use client";

import AboutSection from "@/components/about/About";
import PhotoCarousel from "@/components/followInsta/FollowInsta";
import { Background } from "@/components/hero section/Background";
import PhotoGallery from "@/components/portfolio/Portfolio";
import { Services } from "@/components/sevices/Services";

export default function Home() {
  return (
    <main className="bg-[#1A1A1A]">
      <Background />
      <Services />
      <AboutSection />
      <PhotoGallery />
      <PhotoCarousel />
    </main>
  );
}
