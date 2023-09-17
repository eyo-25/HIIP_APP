import React from "react";
import PlanCard from "./PlanCard";
import { SelectPlanModel, SimplePlanModel } from "@/comman/model/plan";

type Props = {
  planList: SimplePlanModel[];
  selectedPlanId?: string;
  selectPlan: (data: SelectPlanModel) => void;
};

function PlanListBoard({ planList, selectedPlanId, selectPlan }: Props) {
  return (
    <ul className="pb-[40%] sroll h-full w-full px-[5%] mx-auto overflow-hidden">
      {planList.map((plan: SimplePlanModel, i: number) => (
        <PlanCard
          key={i}
          data={plan}
          selectedPlanId={selectedPlanId}
          selectPlan={selectPlan}
        />
      ))}
    </ul>
  );
}

export default React.memo(PlanListBoard);
