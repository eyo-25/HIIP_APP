"use client";

import { FailBackground, SuccessBackground } from "@/comman/assets";
import { usePlanDetail } from "@/comman/hooks/plan";
import ResultSection from "@/components/result/ResultSection";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type Props = {
  params: {
    planId: string;
  };
};

function TimerResultPage({ params: { planId } }: Props) {
  const { planData, isLoading, error } = usePlanDetail(planId);

  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("type") === "success";

  return (
    <main className="relative flex flex-col h-full w-full">
      <ResultSection
        isLoading={isLoading}
        isSuccess={isSuccess}
        planId={planId}
        planData={planData}
      />
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
