import { randomWiseSaying } from "@/comman/utils/randomWiseSaying";
import { useMemo } from "react";

type Props = {
  isSelectedPlan: boolean;
};

function HomeWiseSaying({ isSelectedPlan }: Props) {
  const wiseSaying = useMemo(() => randomWiseSaying(), []);

  return (
    <div className="flex-center flex-col text-2xl leading-loose h-[75%]">
      {isSelectedPlan ? (
        wiseSaying?.map((word, idx) => <p key={idx}>{word}</p>)
      ) : (
        <p className="text-center">
          오늘 진행할 플랜이 <br /> 없습니다.
        </p>
      )}
    </div>
  );
}

export default HomeWiseSaying;
