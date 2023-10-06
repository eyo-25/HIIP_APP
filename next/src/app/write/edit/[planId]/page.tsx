"use client";

import { usePlan } from "@/comman/hooks";
import LoadingSpinner from "@/components/ui/Loading";
import PlanWriter from "@/components/write/PlanWriter";

type Props = {
  params: {
    planId: string;
  };
};

function EditPage({ params: { planId } }: Props) {
  const { planData, isLoading, error } = usePlan(planId);
  return (
    <>
      {isLoading && (
        <div className="flex flex-col z-30 absolute w-full h-full bg-black/50 backdrop-blur-[1px]">
          <LoadingSpinner size={60} text="Loading..." />
        </div>
      )}
      <PlanWriter planData={planData} mode={"edit"} planId={planId} />
    </>
  );
}

export default EditPage;
