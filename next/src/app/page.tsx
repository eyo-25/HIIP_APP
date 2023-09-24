"use client";

import { HomeBackground } from "@/comman/assets";
import { useDatePlanList } from "@/comman/hooks/plan";
import HomeSection from "@/components/home/HomeSection";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

export default function Main() {
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs>(dayjs());
  const { planListData, isLoading, error } = useDatePlanList(
    clickedDate.format("YYYY-MM-DD")
  );

  const clickedDateSetter = (date: dayjs.Dayjs) => {
    setClickedDate(date);
  };

  return (
    <main className="relative flex-center bg-black h-full">
      <HomeSection
        planListData={planListData}
        clickedDate={clickedDate}
        clickedDateSetter={clickedDateSetter}
      />
      <Image
        className="absolute opacity-70"
        fill
        src={HomeBackground}
        alt="home 배경"
      />
    </main>
  );
}
