import { useEffect, useState } from "react";
import Link from "next/link";
import HomeHeader from "./HomeHeader";
import HomeInfo from "./HomeInfo";
import HomePlanListBoard from "./HomePlanListBoard";
import { useTouchHandlers } from "@/comman/utils/touchHandlers";
import { useMouseHandlers } from "@/comman/utils/mouseHandlers";
import MetaButton from "../ui/MetaButton";
import { HomePlanModel } from "@/comman/model/plan";
import HomeDetailInfo from "./HomeDetailInfo";
import dayjs from "dayjs";

type Props = {
  planListData: HomePlanModel[] | undefined;
};

function HomeSection({ planListData }: Props) {
  const [isExtend, setIsExtend] = useState(false);
  const [planList, setPlanList] = useState<HomePlanModel[]>([]);
  const isPlanList = 0 < planList.length;

  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsExtend);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsExtend,
    isExtend
  );

  const planListSort = (id: string) => {
    setPlanList((planList) => {
      const newPlanList = [...planList].sort((a, b) => {
        if (a._id === id) return -1;
        if (b._id === id) return 1;
        return 0;
      });
      return newPlanList;
    });
  };

  useEffect(() => {
    if (planListData) {
      setPlanList(planListData);
    }
  }, [planListData]);

  return (
    <div
      className={`w-full h-full z-10 ${isExtend && "bg-black/50"}`}
      onMouseDown={isPlanList ? handleMouseDown : undefined}
      onMouseUp={isPlanList ? handleMouseUp : undefined}
      onTouchEnd={isPlanList ? handleTouchEnd : undefined}
      onTouchStart={isPlanList ? handleTouchStart : undefined}
    >
      <section className="w-full h-[12%]">
        <HomeHeader selectedPlan={planList[0]} />
      </section>
      <section className={`w-full ${isExtend ? "h-[19%]" : "h-[48%]"}`}>
        <HomeInfo selectedPlan={planList[0]} isExtend={isExtend} />
      </section>
      <section
        className={`relative bg-white w-full rounded-t-3xl ${
          isExtend ? "h-[69%]" : "h-[40%]"
        }`}
      >
        <HomePlanListBoard planList={planList} planListSort={planListSort} />
      </section>
      <Link href={planList[0] ? `/timer/${planList[0]._id}` : "/write/creat"}>
        <MetaButton mode={isPlanList ? "play" : "creat"} />
      </Link>
    </div>
  );
}

export default HomeSection;
