"use client";

import { usePlan } from "@/comman/hooks";
import LoadingSpinner from "@/components/ui/Loading";
import PlanWriter from "@/components/write/PlanWriter";
import { is_loading_atom } from "@/store";
import { useAtomValue } from "jotai";

type Props = {
  params: {
    planId: string;
  };
};

function EditPage({ params: { planId } }: Props) {
  const { planData, isLoading, error } = usePlan(planId);

  return (
    <>
      <PlanWriter
        planData={planData}
        mode={"edit"}
        planId={planId}
        isLoading={isLoading}
      />
    </>
  );
}

export default EditPage;
