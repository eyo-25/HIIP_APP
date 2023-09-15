import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import dayjs from "dayjs";
import PlanCard from "./PlanCard";
import { clicked_date_atom, planlist_atom } from "@/store";
import { FullPlanModel, SimplePlanModel } from "@/comman/model/plan";
import { FAIL, PENDING, SUCCESS } from "@/comman/constants";

type Props = {
  selectedPlanId?: string;
  selectPlan: (data: SimplePlanModel) => void;
};

function PlanListBoard({ selectedPlanId, selectPlan }: Props) {
  const [filterdPlanList, setFilterdPlanList] = useState<
    FullPlanModel[] | undefined
  >();
  const planList = useAtomValue(planlist_atom);
  const clickedDate = useAtomValue(clicked_date_atom);
  const clickedDay = clickedDate.day();
  const isBeforeDay = clickedDate.isBefore(dayjs(), "day");

  // useEffect(() => {
  //   if (!selectedPlan) {
  //     setSelectedPlan(planListData && planListData[0]);
  //   }
  // }, [clickedDate, planListData]);

  useEffect(() => {
    if (planList) {
      setFilterdPlanList(() => {
        console.log("렌더");
        return planList
          ?.filter(
            (plan) =>
              clickedDate.isSameOrAfter(plan.startDate) &&
              clickedDate.isSameOrBefore(plan.endDate) &&
              plan.days.includes(clickedDay)
          )
          .map((plan) => {
            const history = plan.history?.find((el) =>
              clickedDate.isSame(el.date, "day")
            );

            let status: "pending" | "success" | "fail" = PENDING;
            if (history?.isSuccess) {
              status = SUCCESS;
            } else if (isBeforeDay) {
              status = FAIL;
            }
            return { ...plan, status };
          });
      });
    }
  }, [planList, clickedDate]);

  return (
    <ul className="pb-40pxr sroll h-full w-full px-[5%] mx-auto overflow-hidden">
      {filterdPlanList &&
        filterdPlanList.map((plan: any, i: number) => (
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
