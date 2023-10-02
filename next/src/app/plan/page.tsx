"use client";

import { usePlanList } from "@/comman/hooks";
import PlanSection from "@/components/plan/PlanSection";

function PlanPage() {
  const { planListData, isLoading, error } = usePlanList();

  return (
    <div className="relative h-[90%] w-full overflow-hidden">
      {planListData && <PlanSection planListData={planListData} />}
    </div>
  );
}

export default PlanPage;
