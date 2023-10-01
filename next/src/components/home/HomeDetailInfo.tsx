import dayjs from "dayjs";
import React from "react";
import { HomePlanModel } from "@/comman/model/plan";
import { usePlanPercent } from "@/comman/utils/planPercent";
import { detailInfoList } from "./Home.data";

type Props = {
  selectedPlan: HomePlanModel;
};

function HomeDetailInfo({ selectedPlan }: Props) {
  const planPercentData = usePlanPercent(selectedPlan);

  return (
    <ul className="w-full grid grid-cols-4 justify-end px-25pxr pb-18pxr text-center">
      {detailInfoList.map(({ title, key, unit }) => (
        <li key={key}>
          <p className="text-lg tracking-widest">
            {planPercentData[key]}
            <span>{unit}</span>
          </p>
          <h5 className="text-xs font-thin text-gray-600">{title}</h5>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(HomeDetailInfo);
