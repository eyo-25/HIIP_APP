"use client";

import { TimerBackground } from "@/comman/assets";
import { usePlanTimer } from "@/comman/hooks/plan";
import TimerSplash from "@/components/splash/TimerSplash";
import TimerSection from "@/components/timer/TimerSection";
import Image from "next/image";
import { useState } from "react";

type Props = {
  params: {
    planId: string;
  };
};

export default function TimerPage({ params: { planId } }: Props) {
  const { planTimerData, isLoading, error } = usePlanTimer(planId);
  const [isSplash, setIsSplash] = useState(true);

  const splashDone = () => {
    setIsSplash(false);
  };

  return (
    <main className="relative flex-center bg-black h-full">
      {isSplash ? (
        <TimerSplash splashDone={splashDone} />
      ) : (
        <>
          <TimerSection
            planTimerData={planTimerData}
            planId={planId}
            isLoading={isLoading}
          />
          <Image
            className="absolute opacity-70"
            fill
            src={TimerBackground}
            alt="timer 배경"
          />
        </>
      )}
    </main>
  );
}
