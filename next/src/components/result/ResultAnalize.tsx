import { HomePlanModel } from "@/comman/model/plan";
import { usePlanPercent } from "@/comman/utils/planPercent";
import { analizeInfoList } from "./Result.data";
import React from "react";
import { PlanPercentKeyType } from "../home/Home.data";

type Props = {
  planData: HomePlanModel;
  isSuccess: boolean;
};

function ResultAnalize({ planData, isSuccess }: Props) {
  const successPlanPercentData = usePlanPercent(
    planData,
    isSuccess ? "success" : "home"
  );
  const planPercentData = usePlanPercent(planData, "prev");

  const changePercent = (key: PlanPercentKeyType) => {
    const diff = successPlanPercentData[key] - planPercentData[key];

    if (0 <= diff) return `+ ${diff}`;
    return `- ${Math.abs(diff)}`;
  };

  return (
    <ul className="flex h-[19%] gap-[6%]">
      {analizeInfoList.map(({ title, key, unit }) => (
        <li
          key={key}
          className="bg-white flex-center flex-col w-full h-full rounded-md shadow-lg"
        >
          <div className="text-sm text-white bg-black px-8pxr rounded-xl">
            {changePercent(key)}
          </div>
          <strong className="font-bold text-xl my-[3%]">
            {successPlanPercentData[key]}
            {unit}
          </strong>
          <p className="text-xs">{title}</p>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(ResultAnalize);
