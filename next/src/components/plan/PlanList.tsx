import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import { useAtomValue, useSetAtom } from "jotai";
import { clicked_date_atom, selectPlanAtom, selected_plan_atom } from "@/store";
import { fakePlanList } from "@/app/plan/FakePlanListData";
import { PlanType } from "@/comman/types";

function PlanList() {
  // TO-DO: 나중에 swr로 패치
  const [data, setData] = useState<PlanType[] | null>(fakePlanList);
  const selectedPlan = useAtomValue(selected_plan_atom);
  const setSelectedPlan = useSetAtom(selectPlanAtom);
  const clickedDate = useAtomValue(clicked_date_atom);

  // TO-DO: clickedDate가 이전이랑 다르면 해당 날짜의 DATA GET하고 selectPlan도 설정
  useEffect(() => {
    const clickDate = clickedDate.format("YYYY-MM-DD");

    if (!selectedPlan) {
      setSelectedPlan(data && data[0]);
    } else if (
      selectedPlan &&
      (clickDate < selectedPlan.startDate || clickDate > selectedPlan.endDate)
    ) {
      data && setSelectedPlan(data[0]);
    }
  }, [clickedDate]);

  return (
    <ul className="pb-40pxr sroll h-full w-full px-[5%] mx-auto overflow-hidden">
      {data && data.map((plan, i) => <PlanCard key={i} data={plan} />)}
    </ul>
  );
}

export default React.memo(PlanList);
