import HelpIcon from "../ui/HelpIcon";
import { ScoreInfoType } from "./FeedbackSection";

type Props = {
  scoreInfo: ScoreInfoType;
};

function FeedbackSuccessInfo({ scoreInfo }: Props) {
  return (
    <div className="flex flex-col justify-center h-full w-full">
      <div className="flex font-bold text-xl items-center">
        <p>진행률</p>
        <HelpIcon />
      </div>
      <h5 className="black-italic text-5xl mt-[3%] mb-[6%]">
        {scoreInfo.success.totalProccessPercent}
        <span className="text-3xl">%</span>
      </h5>
      <ul className="flex desktop:gap-28pxr gap-23pxr">
        <li className="flex-col">
          <h6 className="font-black text-2xl mobile:text-xl">
            {scoreInfo.success.totalProcessSet}
            <span className="ml-5pxr">set</span>
          </h6>
          <p className="text-gray-700 text-sm">총 진행한 세트</p>
        </li>
        <li className="flex-col">
          <h6 className="font-black text-2xl mobile:text-xl">
            {60 <= scoreInfo.success.totalFocusTime
              ? Math.floor(scoreInfo.success.totalFocusTime / 60) +
                "h  " +
                (scoreInfo.success.totalFocusTime -
                  Math.floor(scoreInfo.success.totalFocusTime / 60) * 60) +
                "m"
              : scoreInfo.success.totalFocusTime + " m"}
          </h6>
          <p className="text-gray-700 text-sm">총 집중시간</p>
        </li>
        <li className="flex-col">
          <h6 className="font-black text-2xl mobile:text-xl">
            {60 <= scoreInfo.success.averageTime
              ? Math.floor(scoreInfo.success.averageTime / 60) +
                "h  " +
                (scoreInfo.success.averageTime -
                  Math.floor(scoreInfo.success.averageTime / 60) * 60) +
                "m"
              : scoreInfo.success.averageTime + " m"}
          </h6>
          <p className="text-gray-700 text-sm">평균 집중시간</p>
        </li>
      </ul>
    </div>
  );
}

export default FeedbackSuccessInfo;
