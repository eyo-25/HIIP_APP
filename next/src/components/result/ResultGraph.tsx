import { HomePlanModel } from "@/comman/model/plan";
import { usePlanPercent } from "@/comman/utils/planPercent";
import { weekSuccessPercent } from "@/comman/utils/weekSuccessPercent";
import React from "react";
import WeeklyGraph from "../ui/WeeklyGraph";
import { today } from "@/comman/utils/today";

type Props = {
  planData: HomePlanModel;
  isSuccess: boolean;
};

function ResultGraph({ planData, isSuccess }: Props) {
  const planPercent = usePlanPercent(planData, isSuccess ? "success" : "home");
  const weekSuccessArr = weekSuccessPercent(planData, planPercent);

  const percentDiff = () => {
    const diff = weekSuccessArr[today.day() + 1] - weekSuccessArr[today.day()];
    if (0 <= diff) return `${diff}% 증가`;
    else return `${diff.toString().slice(1)}% 하락`;
  };

  return (
    <div className="flex h-[69%] w-full py-[5%]">
      <div className="flex flex-col h-full w-full py-[6%] px-[8%] bg-white rounded-md shadow-lg">
        <div className="flex flex-col items-center desktop:mb-8pxr mb-4pxr">
          <strong className="text-lg font-bold mb-3pxr">COACH TIP</strong>
          <p className="text-center text-sm">
            어제보다 성공률이
            <br />
            <span
              className={`font-semibold ${
                isSuccess ? "text-blue" : "text-red"
              }`}
            >
              {percentDiff()}
            </span>
            하였습니다
          </p>
        </div>
        <WeeklyGraph isSuccess={isSuccess} weekSuccessArr={weekSuccessArr} />
      </div>
    </div>
  );
}

export default React.memo(ResultGraph);
