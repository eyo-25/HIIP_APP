import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import { useAtomValue, useSetAtom } from "jotai";
import { clicked_date_atom, selectPlanAtom, selected_plan_atom } from "@/store";
import { usePlanList } from "@/comman/hooks/plan";

function PlanList() {
  // TO-DO: 나중에 swr로 패치
  const selectedPlan = useAtomValue(selected_plan_atom);
  const setSelectedPlan = useSetAtom(selectPlanAtom);
  const clickedDate = useAtomValue(clicked_date_atom);

  const { planListData, isLoading, error } = usePlanList(
    clickedDate.format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (!selectedPlan) {
      setSelectedPlan(planListData && planListData[0]);
    }
  }, [clickedDate, planListData]);

  return (
    <ul className="pb-40pxr sroll h-full w-full px-[5%] mx-auto overflow-hidden">
      {planListData &&
        planListData.map((plan: any, i: number) => (
          <PlanCard key={i} data={plan} />
        ))}
    </ul>
  );
}

export default React.memo(PlanList);
