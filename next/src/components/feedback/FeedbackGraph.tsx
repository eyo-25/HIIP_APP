import { FeedbackDataModel } from "@/comman/model/plan";
import WeeklyGraph from "../ui/WeeklyGraph";
import { useState } from "react";

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

  return (
    <div className="flex flex-col w-full h-full py-40pxr px-24pxr">
      <div className="flex flex-col h-[35%]">
        <div className="flex justify-end items-center">
          <select
            value={feedBackList[selectPlanIndex].title}
            onChange={handleSelectChange}
          >
            {feedBackList.map(({ title }) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <p>
          기간별 각<br /> PLAN 분석
        </p>
        <h5></h5>
      </div>
      <div className="h-[65%]">
        <WeeklyGraph
          weekSuccessArr={feedBackList[selectPlanIndex].weekSuccessArr}
        />
      </div>
    </div>
  );
}

export default FeedbackGraph;
