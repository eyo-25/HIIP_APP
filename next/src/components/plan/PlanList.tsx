import React, { Dispatch, SetStateAction } from "react";
import PlanCard from "./PlanCard";
import { PlanType } from "@/comman/types";

type Props = {
  data: PlanType[];
  selectPlanId: string;
  setSelectPlanId: Dispatch<SetStateAction<string>>;
};

function PlanList({ data, selectPlanId, setSelectPlanId }: Props) {
  return (
    <ul className="pb-40pxr sroll h-full w-full px-[5%] mx-auto overflow-hidden">
      {data.map((plan, i) => (
        <PlanCard
          key={i}
          data={plan}
          selectPlanId={selectPlanId}
          setSelectPlanId={setSelectPlanId}
        />
      ))}
    </ul>
  );
}

export default React.memo(PlanList);
