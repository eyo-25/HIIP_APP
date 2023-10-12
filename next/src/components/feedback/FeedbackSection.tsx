"use client";

import { FeedbackDataModel } from "@/comman/model/plan";
import { useEffect, useState } from "react";
import FeebackTotalScore from "./FeebackTotalScore";
import FeedbackGraph from "./FeedbackGraph";

export type RatingType = "BAD" | "SAD" | "SOSO" | "GOOD" | "PERFECT";
export type ScoreInfoType = {
  score: number;
  rating: RatingType;
};
type Props = {
  feedBackList: FeedbackDataModel[];
};

export default function FeedbackSection({ feedBackList }: Props) {
  const [scoreInfo, setScoreInfo] = useState<ScoreInfoType>();

  useEffect(() => {
    const totalArr = feedBackList.reduce(
      (acc, cu) => {
        const { successPercent, processPercent, averageSet, interval } = cu;
        const copy = [...acc];
        copy[0] += successPercent;
        copy[1] += processPercent;
        copy[2] += Math.floor((averageSet / interval) * 100);

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

    setScoreInfo({ score: totalScore, rating });
  }, [feedBackList]);

  return (
    <main className="w-full overflow-hidden sroll h-full">
      <section className="relative flex w-full h-[90%] pb-[18%] bg-black text-white">
        {scoreInfo && <FeebackTotalScore scoreInfo={scoreInfo} />}
      </section>
      <section className="w-full h-450pxr bg-white mb-200pxr">
        <FeedbackGraph feedBackList={feedBackList} />
      </section>
    </main>
  );
}
