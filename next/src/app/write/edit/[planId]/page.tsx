"use client";

import { usePlan } from "@/comman/hooks/plan";
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
      <PlanWriter planData={planData} mode={"edit"} planId={planId} />
    </>
  );
}

export default EditPage;
