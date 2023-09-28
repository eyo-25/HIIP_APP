"use client";

import { TimerBackground } from "@/comman/assets";
import { usePlanTimer } from "@/comman/hooks/plan";
import TimerSection from "@/components/timer/TimerSection";
import Image from "next/image";

type Props = {
  params: {
    planId: string;
  };
};

export default function TimerPage({ params: { planId } }: Props) {
  const { planTimerData, isLoading, error } = usePlanTimer(planId);

  return (
    <main className="relative flex-center bg-black h-full">
      {planTimerData && (
        <TimerSection planTimerData={planTimerData} planId={planId} />
      )}
      <Image
        className="absolute opacity-70"
        fill
        src={TimerBackground}
        alt="timer 배경"
      />
    </main>
  );
}
