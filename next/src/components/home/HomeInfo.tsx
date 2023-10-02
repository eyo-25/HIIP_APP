import { useMemo } from "react";
import { randomWiseSaying } from "@/comman/utils/randomWiseSaying";
import { HomePlanModel } from "@/comman/model/plan";
import HomeDetailInfo from "./HomeDetailInfo";
import dayjs from "dayjs";

type Props = {
  selectedPlan: HomePlanModel | undefined;
  isExtend: boolean;
};

function HomeInfo({ selectedPlan, isExtend }: Props) {
  const wiseSaying = useMemo(() => randomWiseSaying(), []);

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
        className={`relative flex w-full items-end text-white ${
          isExtend && "h-full"
        }`}
      >
        {selectedPlan && isExtend && (
          <HomeDetailInfo selectedPlan={selectedPlan} />
        )}
        <div className="absolute flex w-full top-[-5px]">
          <p className="italic font-black text-[80px] mx-auto">
            {selectedPlan
              ? dayjs(selectedPlan.endDate).diff(dayjs(), "day") + 1
              : 0}
            <span className="text-xl">D.DAY</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeInfo;
