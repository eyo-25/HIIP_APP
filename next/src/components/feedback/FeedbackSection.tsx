"use client";

import { FeedbackDataModel } from "@/comman/model/plan";
import { useEffect, useState } from "react";
import FeebackTotalScore from "./FeebackTotalScore";
import FeedbackGraph from "./FeedbackGraph";
import HelpIcon from "../ui/HelpIcon";
import FeedbackSuccessInfo from "./FeedbackSuccessInfo";

export type RatingType = "BAD" | "SAD" | "SOSO" | "GOOD" | "PERFECT";
interface SuccessType {
  totalSuccessPercent: string;
  totalFocusTime: number;
  averageTime: number;
  totalProcessSet: number;
}
export type ScoreInfoType = {
  score: number;
  rating: RatingType;
  success: SuccessType;
};
type Props = {
  feedBackList: FeedbackDataModel[];
};

export default function FeedbackSection({ feedBackList }: Props) {
  const [scoreInfo, setScoreInfo] = useState<ScoreInfoType>();

  useEffect(() => {
    let totalFocusTime = 0;
    let totalProcessSet = 0;
    const totalSetArr: number[] = [];
    const averageTimeArr: number[] = [];

    const totalArr = feedBackList.reduce(
      (acc, cu) => {
        const {
          successPercent,
          processPercent,
          averageSet,
          interval,
          totalSet,
          totalDay,
          focusTime,
          processCount,
        } = cu;
        const copy = [...acc];
        copy[0] += successPercent;
        copy[1] += processPercent;
        copy[2] += Math.floor((averageSet / interval) * 100);

        const averageTime =
          totalDay !== 0
            ? Math.floor((cu.totalSet * focusTime) / (totalDay * focusTime))
            : 0;
        console.log("토탈 데이", totalDay);
        averageTimeArr.push(averageTime);

        totalProcessSet += processCount;
        totalFocusTime += cu.totalSet * focusTime;
        console.log(cu.totalSet, focusTime);
        totalSetArr.push(Math.floor(totalSet / totalDay));

        return copy;
      },
      [0, 0, 0]
    );

    let totalScore = Math.floor(
      totalArr.reduce(
        (acc, cu) => acc + Math.floor(cu / feedBackList.length),
        0
      ) / 3
    );

    const averageTime = Math.floor(
      averageTimeArr.reduce((acc, cu) => acc + cu, 0) / feedBackList.length
    );
    console.log(averageTimeArr);

    const success: SuccessType = {
      totalSuccessPercent: (totalArr[0] / feedBackList.length).toFixed(1),
      totalFocusTime: totalFocusTime,
      averageTime,
      totalProcessSet,
    };

    let rating: RatingType = "SAD";

    if (80 < totalScore) {
      rating = "PERFECT";
    } else if (60 < totalScore) {
      rating = "GOOD";
    } else if (40 < totalScore) {
      rating = "SOSO";
    } else if (20 < totalScore) {
      rating = "BAD";
    }

    setScoreInfo({ score: totalScore, rating, success });
  }, [feedBackList]);

  // console.log(scoreInfo);

  return (
    <main className="w-full overflow-hidden sroll h-full">
      {scoreInfo && (
        <>
          <section className="relative flex w-full h-[90%] pb-[18%] bg-black text-white">
            <FeebackTotalScore scoreInfo={scoreInfo} />
          </section>
          <section className="w-full h-480pxr bg-white px-24pxr">
            <FeedbackGraph feedBackList={feedBackList} />
          </section>
          <section className="w-full h-260pxr flex px-24pxr mb-240pxr text-black">
            <FeedbackSuccessInfo scoreInfo={scoreInfo} />
          </section>
        </>
      )}
    </main>
  );
}
