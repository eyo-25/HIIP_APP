import { DAYS } from "@/comman/constants";
import { HomePlanModel } from "@/comman/model/plan";
import { usePlanPercent } from "@/comman/utils/planPercent";
import { weekSuccessPercent } from "@/comman/utils/weekSuccessPercent";
import dayjs from "dayjs";
import React from "react";

type Props = {
  planData: HomePlanModel;
  isSuccess: boolean;
};

function ResultGraph({ planData, isSuccess }: Props) {
  const today = dayjs();
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
        <div className="relative flex flex-col h-full w-full">
          <div className="grid grid-rows-4 my-6pxr h-full pb-18pxr">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="border-b border-gray-800"></div>
            ))}
            <ul className="absolute grid grid-cols-7 h-full w-full">
              {DAYS.map((day, idx) => (
                <li
                  key={day}
                  className="flex flex-col justify-end items-center"
                >
                  <div
                    className={`w-[50%] mb-4pxr ${
                      today.day() === idx
                        ? isSuccess
                          ? "bg-blue"
                          : "bg-red"
                        : "bg-gray-600"
                    }`}
                    style={{ height: `${weekSuccessArr[idx + 1] + 0.5}%` }}
                  ></div>
                  <p className="text-sm text-gray-900">{day}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ResultGraph);
