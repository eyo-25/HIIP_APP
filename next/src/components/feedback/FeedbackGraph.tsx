import { FeedbackDataModel } from "@/comman/model/plan";
import WeeklyGraph from "../ui/WeeklyGraph";
import { useEffect, useState } from "react";
import HelpIcon from "../ui/HelpIcon";
import dayjs from "dayjs";

type Props = {
  feedBackList: FeedbackDataModel[];
};

function FeedbackGraph({ feedBackList }: Props) {
  const [selectPlanIndex, setSelectPlanIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string>(
    feedBackList[selectPlanIndex].title
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = e.target.value;
    const index = feedBackList.findIndex(
      (item) => item.title === selectedTitle
    );
    setSelectedValue(selectedTitle);
    setSelectPlanIndex(index);
  };

  useEffect(() => {
    setSelectedValue(feedBackList[selectPlanIndex].title);
  }, [feedBackList]);

  return (
    <div className="flex flex-col justify-between w-full h-full py-30pxr">
      <div className="flex flex-col justify-between h-[35%] pb-[2%]">
        <div className="flex justify-end items-center">
          <p className="text-gray-800 text-sm mr-2pxr">플랜명 :</p>
          <select value={selectedValue} onChange={handleSelectChange}>
            {feedBackList.map(({ title }, idx) => (
              <option className="text-center" key={idx} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <p className="font-bold text-xl leading-tight">
            주간 계획별
            <br />
            성공률 분석
          </p>
          <HelpIcon />
        </div>
        <div className="flex items-end">
          <h5 className="black-italic text-5xl">
            {dayjs().isAfter(feedBackList[selectPlanIndex].endDate, "day")
              ? 0
              : feedBackList[selectPlanIndex].successPercent}
            <span className="text-3xl">%</span>
          </h5>
          <p
            className={`ml-10pxr italic font-bold text-xl ${
              0 <= feedBackList[selectPlanIndex].percentDiff
                ? "text-blue"
                : "text-red"
            }`}
          >
            {0 < feedBackList[selectPlanIndex].percentDiff && "+"}
            {feedBackList[selectPlanIndex].percentDiff}%
          </p>
        </div>
      </div>
      <div className="h-[60%]">
        <WeeklyGraph
          weekSuccessArr={feedBackList[selectPlanIndex].weekSuccessArr}
        />
      </div>
    </div>
  );
}

export default FeedbackGraph;
