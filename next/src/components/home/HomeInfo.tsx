import { HomePlanModel } from "@/comman/model/plan";
import HomeDetailInfo from "./HomeDetailInfo";
import dayjs from "dayjs";

type Props = {
  selectedPlan: HomePlanModel | undefined;
  isExtend: boolean;
};

function HomeInfo({ selectedPlan, isExtend }: Props) {
  return (
    <div
      className={`relative flex w-full items-end text-white ${
        isExtend && "h-full"
      }`}
    >
      {selectedPlan && isExtend && (
        <HomeDetailInfo selectedPlan={selectedPlan} />
      )}
      <div className="absolute flex w-full top-[-5px]">
        <p className="italic font-black text-[80px] mx-auto">
          {selectedPlan
            ? dayjs(selectedPlan.endDate).diff(dayjs(), "day") + 1
            : 0}
          <span className="text-xl">D.DAY</span>
        </p>
      </div>
    </div>
  );
}

export default HomeInfo;
