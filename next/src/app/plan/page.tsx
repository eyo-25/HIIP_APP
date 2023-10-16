"use client";

import { usePlanList } from "@/comman/hooks";
import PlanSection from "@/components/plan/PlanSection";
import LoadingSpinner from "@/components/ui/Loading";
import NavigationContext from "@/context/NavigationContext";

function PlanPage() {
  const { planListData, isLoading, error } = usePlanList();

  return (
    <NavigationContext>
      <div className="relative h-[90%] w-full overflow-hidden">
        {isLoading && <LoadingSpinner text="플랜 로딩중..." color="black" />}
        {planListData && <PlanSection planListData={planListData} />}
      </div>
    </NavigationContext>
  );
}

export default PlanPage;
