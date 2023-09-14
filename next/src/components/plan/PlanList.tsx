import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import { useAtomValue, useSetAtom } from "jotai";
import {
  clicked_date_atom,
  filtered_planlist_atom,
  selectPlanAtom,
  selected_plan_atom,
  updatePlanList,
} from "@/store";
import { usePlanList } from "@/comman/hooks/plan";
import { PlanModel } from "@/comman/model/plan";

function PlanList() {
  // const selectedPlan = useAtomValue(selected_plan_atom);
  // const setSelectedPlan = useSetAtom(selectPlanAtom);
  const filterdPlanList = useAtomValue(filtered_planlist_atom);
  console.log(filterdPlanList);

  // useEffect(() => {
  //   if (!selectedPlan) {
  //     setSelectedPlan(planListData && planListData[0]);
  //   }
  // }, [clickedDate, planListData]);

  return (
    <ul className="pb-40pxr sroll h-full w-full px-[5%] mx-auto overflow-hidden">
      {filterdPlanList &&
        filterdPlanList.map((plan: any, i: number) => (
          <PlanCard key={i} data={plan} />
        ))}
    </ul>
  );
}

export default React.memo(PlanList);
