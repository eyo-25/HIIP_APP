import { useLayoutEffect, useMemo, useState } from "react";
import { randomWiseSaying } from "@/comman/utils/randomWiseSaying";
import { HomePlanModel } from "@/comman/model/plan";
import dayjs from "dayjs";

type Props = {
  selectedPlan: HomePlanModel;
  isExtend: boolean;
};

function HomeInfo({ selectedPlan, isExtend }: Props) {
  const [wiseSaying, setWiseSaying] = useState<string[]>([]);
  const today = dayjs();
  const leftSet = selectedPlan?.history[today.format("YYYY-MM-DD")]?.focusSet;

  useLayoutEffect(() => setWiseSaying(randomWiseSaying()), []);

  const processPercent = useMemo(() => {
    if (!selectedPlan) return 0;

    const { history, interval } = selectedPlan;
    let totalCount = 0;
    if (history[today.format("YYYY-MM-DD")]) {
      totalCount += interval - history[today.format("YYYY-MM-DD")].focusSet;
    }
    return Math.floor((totalCount / interval) * 100);
  }, [selectedPlan]);

  const averagePercent = useMemo(() => {
    if (!selectedPlan) return 0;

    const { history, interval } = selectedPlan;
    let totalDays = 0;
    let totalCount = 0;
    let currentDate = dayjs(selectedPlan.startDate);

    while (currentDate.isSameOrBefore(today)) {
      if (selectedPlan.days.includes(currentDate.day())) {
        totalDays++;
      }
      if (history[currentDate.format("YYYY-MM-DD")]?.focusSet) {
        totalCount +=
          interval - history[currentDate.format("YYYY-MM-DD")].focusSet;
      }
      currentDate = currentDate.add(1, "day");
    }

    return Math.floor((totalCount / (totalDays * interval)) * 10);
  }, [selectedPlan]);

  const successPercent = useMemo(() => {
    if (!selectedPlan) return 0;

    const { history } = selectedPlan;
    let totalDays = 0;
    let succesCount = 0;
    let currentDate = dayjs(selectedPlan.startDate);

    while (currentDate.isSameOrBefore(today)) {
      if (selectedPlan.days.includes(currentDate.day())) {
        totalDays++;
      }
      if (
        history[currentDate.format("YYYY-MM-DD")] &&
        history[currentDate.format("YYYY-MM-DD")].isSuccess
      ) {
        succesCount++;
      }
      currentDate = currentDate.add(1, "day");
    }

    return Math.floor((succesCount / totalDays) * 100);
  }, [selectedPlan]);

  return (
    <div className="flex flex-col items-center h-full text-white">
      {!isExtend && (
        <div className="flex-center flex-col text-2xl leading-loose h-[75%]">
          {selectedPlan ? (
            wiseSaying?.map((word, idx) => <p key={idx}>{word}</p>)
          ) : (
            <p className="text-center">
              오늘 진행할 플랜이 <br /> 없습니다.
            </p>
          )}
        </div>
      )}
      <div
        className={`relative flex items-end w-full ${
          isExtend ? "h-full" : "h-[25%]"
        }`}
      >
        <div className="absolute flex w-full top-[-5px]">
          <p className="italic font-black text-[80px] mx-auto">
            {selectedPlan
              ? dayjs(selectedPlan.endDate).diff(dayjs(), "day") + 1
              : 0}
            <span className="text-xl">D.DAY</span>
          </p>
        </div>
        {isExtend && (
          <ul className="w-full grid grid-cols-4 px-25pxr pb-18pxr text-center">
            <li>
              <p className="text-lg">
                {leftSet ? leftSet : selectedPlan ? selectedPlan.interval : 0}
                <span> SET</span>
              </p>
              <h5 className="text-xs font-thin text-gray-600">남은 세트</h5>
            </li>
            <li>
              <p className="text-lg tracking-widest">{successPercent}%</p>
              <h5 className="text-xs font-thin text-gray-600">계획 성공</h5>
            </li>
            <li>
              <p className="text-lg">{averagePercent} SET</p>
              <h5 className="text-xs font-thin text-gray-600">평균 세트</h5>
            </li>
            <li>
              <p className="text-lg">{processPercent}%</p>
              <h5 className="text-xs font-thin text-gray-600">계획 진행</h5>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomeInfo;
