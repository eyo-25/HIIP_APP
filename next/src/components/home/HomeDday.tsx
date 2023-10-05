import { HomePlanModel } from "@/comman/model/plan";
import dayjs from "dayjs";

type Props = {
  selectedPlan: HomePlanModel | undefined;
};

function HomeDday({ selectedPlan }: Props) {
  return (
    <div className="flex w-full">
      <p className="italic font-black text-[80px] mx-auto">
        {selectedPlan
          ? dayjs(selectedPlan.endDate).diff(dayjs(), "day") + 1
          : 0}
        <span className="text-xl">D.DAY</span>
      </p>
    </div>
  );
}

export default HomeDday;
