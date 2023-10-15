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
  totalTodayFocus: number;
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
    let totalTodayFocus = 0;
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
          wasteTime,
          todayFocus,
        } = cu;
        const copy = [...acc];
        copy[0] += successPercent;
        copy[1] += processPercent;
        copy[2] += Math.floor((averageSet / interval) * 100);

        const totalMinute = totalDay * focusTime * interval;
        const averageTime =
          totalDay !== 0
            ? Math.floor((totalMinute - wasteTime) / (totalDay * interval))
            : 0;

        console.log(totalSet * focusTime);
        averageTimeArr.push(averageTime);

        totalProcessSet += totalSet;
        totalFocusTime += totalSet * focusTime;
        totalAverageSet += averageSet;
        totalWastTime += wasteTime;
        totalTodayFocus += todayFocus;

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

    console.log(totalAverageSet, feedBackList.length);

    const average: AverageType = {
      totalAverageSet: Math.floor(totalAverageSet / feedBackList.length),
      totalWastTime,
      totalTodayFocus,
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
          <section className="w-full h-480pxr bg-white px-24pxr">
            <FeedbackGraph feedBackList={feedBackList} />
          </section>
          <section className="w-full h-280pxr flex px-24pxr text-black">
            <FeedbackSuccessInfo scoreInfo={scoreInfo} />
          </section>
          <section className="flex flex-col h-400pxr mx-24pxr p-24pxr mb-[40%] rounded-lg drop-shadow-md bg-white text-black">
            <div className="flex flex-col mb-10pxr">
              <h5 className="black-italic text-5xl mb-10pxr">
                {scoreInfo.average.totalAverageSet}
                <span className="ml-4pxr text-4xl">SET</span>
              </h5>
              <p className="font-bold leading-tight">
                평균 인터벌 세트 수는
                <br />
                <span className="text-red">
                  {scoreInfo.average.totalAverageSet}
                  세트
                </span>
                입니다.
              </p>
            </div>
            <div className="mt-[10%]">
              <p className="text-sm text-gray-800">오늘의 집중시간</p>
              <p className="font-bold text-xl italic mt-5pxr">
                {60 <= scoreInfo.average.totalTodayFocus
                  ? Math.floor(scoreInfo.average.totalTodayFocus / 60) +
                    "h  " +
                    (scoreInfo.average.totalTodayFocus -
                      Math.floor(scoreInfo.average.totalTodayFocus / 60) * 60) +
                    "m"
                  : scoreInfo.average.totalTodayFocus + " m"}
              </p>
              <div className={`relative w-full h-8pxr bg-gray-400 mt-8pxr`}>
                <p className="absolute right-0pxr top-[-25px] text-sm text-gray-600">
                  Level {Math.floor(scoreInfo.average.totalTodayFocus / 60)}
                </p>
                <div
                  className="absolute h-full bg-blue"
                  style={{
                    width: `${Math.floor(
                      ((scoreInfo.average.totalTodayFocus -
                        Math.floor(scoreInfo.average.totalTodayFocus / 60) *
                          60) /
                        60) *
                        100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col mt-[10%]">
              <p className="text-sm text-gray-800">전체 낭비한 시간</p>
              <p className="font-bold text-xl italic mt-5pxr">
                {60 <= scoreInfo.average.totalWastTime
                  ? Math.floor(scoreInfo.average.totalWastTime / 60) +
                    "h  " +
                    (scoreInfo.average.totalWastTime -
                      Math.floor(scoreInfo.average.totalWastTime / 60) * 60) +
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
                      ((scoreInfo.average.totalWastTime -
                        Math.floor(scoreInfo.average.totalWastTime / 60) * 60) /
                        60) *
                        100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
