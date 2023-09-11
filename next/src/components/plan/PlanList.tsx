import React from "react";
import PlanCard from "./PlanCard";
import { PlanType } from "@/comman/types";

type Props = {
  data: PlanType[];
};

function PlanList({ data }: Props) {
  return (
    <ul className="pb-40pxr sroll h-full w-full px-[5%] mx-auto overflow-hidden">
      {data.map((plan, i) => (
        <PlanCard key={i} data={plan} />
      ))}
    </ul>
  );
}

export default React.memo(PlanList);
