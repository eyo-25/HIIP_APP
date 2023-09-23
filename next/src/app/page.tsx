"use client";

import { HomeBackground } from "@/comman/assets";
import HomeSection from "@/components/home/HomeSection";
import Image from "next/image";

export default function Main() {
  return (
    <main className="relative flex-center bg-black h-full">
      <HomeSection />
      <Image
        className="absolute opacity-70"
        fill
        src={HomeBackground}
        alt="home 배경"
      />
    </main>
  );
}
