"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { HomeBackground } from "@/comman/assets";
import { useDatePlanList } from "@/comman/hooks/plan";
import HomeSection from "@/components/home/HomeSection";
import NavigationContext from "@/context/NavigationContext";

export default function Main() {
  const { planListData, isLoading, error } = useDatePlanList(
    dayjs().format("YYYY-MM-DD")
  );

  return (
    <NavigationContext>
      <main className="relative flex-center bg-black h-full">
        <HomeSection planListData={planListData} isLoading={isLoading} />
        <Image
          className="absolute opacity-70"
          fill
          src={HomeBackground}
          alt="home 배경"
        />
      </main>
    </NavigationContext>
  );
}
