import { ScoreInfoType } from "./FeedbackSection";

type Props = {
  scoreInfo: ScoreInfoType;
};

function FeedBackAverage({ scoreInfo }: Props) {
  return (
    <>
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
                  Math.floor(scoreInfo.average.totalTodayFocus / 60) * 60) /
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
    </>
  );
}

export default FeedBackAverage;
