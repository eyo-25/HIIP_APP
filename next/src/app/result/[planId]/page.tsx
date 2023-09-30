"use client";

import { FailBackground, SuccessBackground } from "@/comman/assets";
import { usePlan } from "@/comman/hooks";
import ResultSection from "@/components/result/ResultSection";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type Props = {
  params: {
    planId: string;
  };
};

function TimerResultPage({ params: { planId } }: Props) {
  const { planData, isLoading, error } = usePlan(planId);
  console.log(planData && planData);

  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("type") === "success";

  return (
    <main className="relative flex flex-col h-full w-full">
      <ResultSection isSuccess={isSuccess} planId={planId} />
      <Image
        className="absolute"
        fill
        src={isSuccess ? SuccessBackground : FailBackground}
        alt="result 배경"
      />
    </main>
  );
}

export default TimerResultPage;
