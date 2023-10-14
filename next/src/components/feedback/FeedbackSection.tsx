"use client";

import { FeedbackDataModel } from "@/comman/model/plan";
import { useEffect, useState } from "react";
import FeebackTotalScore from "./FeebackTotalScore";
import FeedbackGraph from "./FeedbackGraph";
import FeedbackSuccessInfo from "./FeedbackSuccessInfo";

export type RatingType = "BAD" | "SAD" | "SOSO" | "GOOD" | "PERFECT";
interface SuccessType {
  totalSuccessPercent: string;
  totalFocusTime: number;
  averageTime: number;
  totalProcessSet: number;
}
interface AverageType {
  totalAverageSet: number;
  totalWastTime: number;
}
export type ScoreInfoType = {
  score: number;
  rating: RatingType;
  success: SuccessType;
  average: AverageType;
};
type Props = {
  feedBackList: FeedbackDataModel[];
};

export default function FeedbackSection({ feedBackList }: Props) {
  const [scoreInfo, setScoreInfo] = useState<ScoreInfoType>();

  useEffect(() => {
    let totalFocusTime = 0;
    let totalProcessSet = 0;
    let totalAverageSet = 0;
    let totalWastTime = 0;
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
          wasteTime,
        } = cu;
        const copy = [...acc];
        copy[0] += successPercent;
        copy[1] += processPercent;
        copy[2] += Math.floor((averageSet / interval) * 100);

        const averageTime =
          totalDay !== 0
            ? Math.floor((cu.totalSet * focusTime) / (totalDay * focusTime))
            : 0;
        averageTimeArr.push(averageTime);

        totalProcessSet += processCount;
        totalFocusTime += cu.totalSet * focusTime;
        totalSetArr.push(Math.floor(totalSet / totalDay));

        totalAverageSet += averageSet;
        totalWastTime += wasteTime;

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

    const average: AverageType = {
      totalAverageSet: Math.floor(totalAverageSet / feedBackList.length),
      totalWastTime,
    };

    setScoreInfo({
      score: totalScore,
      rating,
      success,
      average,
    });
  }, [feedBackList]);

  return (
    <main className="w-full overflow-hidden sroll h-full">
      {scoreInfo && (
        <>
          <section className="relative flex w-full h-[90%] pb-[18%] bg-black text-white">
            <FeebackTotalScore scoreInfo={scoreInfo} />
          </section>
          <section className="w-full h-450pxr bg-white px-24pxr">
            <FeedbackGraph feedBackList={feedBackList} />
          </section>
          <section className="w-full h-260pxr flex px-24pxr text-black">
            <FeedbackSuccessInfo scoreInfo={scoreInfo} />
          </section>
          <section className="flex flex-col h-400pxr mx-24pxr p-24pxr mb-240pxr rounded-lg drop-shadow-md bg-white text-black">
            <div className="flex flex-col">
              <h5 className="black-italic text-5xl mb-10pxr">
                {scoreInfo.average.totalAverageSet}
                <span className="ml-4pxr text-4xl">SET</span>
              </h5>
              <p className="font-bold leading-tight">
                인터벌 세트 수를
                <br />
                <span className="text-red">
                  최대 {scoreInfo.average.totalAverageSet}
                  세트
                </span>
                로 설정하세요.
              </p>
            </div>
            <div className="flex flex-col mt-[10%]">
              <p className="text-sm text-gray-800">전체 낭비한 시간</p>
              <p className="font-bold text-xl italic mt-5pxr">
                {60 < scoreInfo.average.totalWastTime
                  ? Math.floor(scoreInfo.average.totalWastTime / 60) +
                    "h  " +
                    (scoreInfo.average.totalWastTime -
                      Math.floor(scoreInfo.average.totalWastTime / 60)) +
                    "m"
                  : scoreInfo.average.totalWastTime + " m"}
              </p>
              <div className={`relative w-full h-8pxr bg-gray-400 mt-8pxr`}>
                <p className="absolute right-0pxr top-[-25px] text-sm text-gray-600">
                  Level {Math.floor(scoreInfo.average.totalWastTime / 60)}
                </p>
                <div
                  className="absolute h-full bg-blue"
                  style={{
                    width: `${Math.floor(
                      Math.floor(
                        ((scoreInfo.average.totalWastTime -
                          Math.floor(scoreInfo.average.totalWastTime / 60)) /
                          60) *
                          100
                      )
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="mt-[10%]">
              <p className="text-sm text-gray-800">전체 낭비한 시간</p>
              <div className="font-bold text-xl italic mt-10pxr"></div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
