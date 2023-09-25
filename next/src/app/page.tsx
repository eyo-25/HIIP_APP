"use client";

import { HomeBackground } from "@/comman/assets";
import { useDatePlanList } from "@/comman/hooks/plan";
import HomeSection from "@/components/home/HomeSection";
import dayjs from "dayjs";
import Image from "next/image";

export default function Main() {
  const { planListData, isLoading, error } = useDatePlanList(
    dayjs().format("YYYY-MM-DD")
  );

  return (
    <main className="relative flex-center bg-black h-full">
      <HomeSection planListData={planListData} />
      <Image
        className="absolute opacity-70"
        fill
        src={HomeBackground}
        alt="home 배경"
      />
    </main>
  );
}
