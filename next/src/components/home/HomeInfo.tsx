import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { randomWiseSaying } from "@/comman/utils/randomWiseSaying";
import { HomePlanModel } from "@/comman/model/plan";
import dayjs from "dayjs";

type Props = {
  selectedPlan?: HomePlanModel;
  isExtend: boolean;
};

function HomeInfo({ selectedPlan, isExtend }: Props) {
  const [wiseSaying, setWiseSaying] = useState<string[]>([]);
  const today = dayjs();
  const todayHistory = selectedPlan?.history?.[today.format("YYYY-MM-DD")];

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

  const getProcessPercent = useCallback(() => {
    if (!selectedPlan) return 0;
    // 히스토리를 매핑하면서 얼마나 진행했는지 체크
    // 진행했다 = 히스토리의 intervalSet가 0인 경우
    // 시작일 부터 현재까지의 일수에서 요일인 경우의 총합을 구하고
    // 위의 진행한 히스토리를 빼서 리턴
  }, [selectedPlan]);

  // 수정필요
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

  // 성공률은 옳바르게 출력
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

  const getLeftSet = useCallback(() => {
    if (!selectedPlan) return 0;
    const interval = selectedPlan.interval;
    if (!todayHistory) return interval;

    return interval - (interval - todayHistory.focusSet);
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
                {getLeftSet()}
                <span> SET</span>
              </p>
              <h5 className="text-xs font-thin text-gray-600">남은 세트</h5>
            </li>
            <li>
              <p className="text-lg tracking-widest">{successPercent}%</p>
              <h5 className="text-xs font-thin text-gray-600">성공률</h5>
            </li>
            <li>
              <p className="text-lg">{averagePercent} SET</p>
              <h5 className="text-xs font-thin text-gray-600">평균 세트</h5>
            </li>
            <li>
              <p className="text-lg">{processPercent}%</p>
              <h5 className="text-xs font-thin text-gray-600">진행률</h5>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomeInfo;
