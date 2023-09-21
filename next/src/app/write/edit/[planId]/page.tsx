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
  console.log(planData);
  return <>{planData && <PlanWriter planData={planData} />}</>;
}

export default EditPage;
