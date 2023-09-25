"use client";

import { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import HomeInfo from "./HomeInfo";
import HomePlanListBoard from "./HomePlanListBoard";
import { useTouchHandlers } from "@/comman/utils/touchHandlers";
import { useMouseHandlers } from "@/comman/utils/mouseHandlers";
import MetaButton from "../ui/MetaButton";
import Link from "next/link";
import { HomePlanModel } from "@/comman/model/plan";

type Props = {
  planListData: HomePlanModel[] | undefined;
};

function HomeSection({ planListData }: Props) {
  const [isExtend, setIsExtend] = useState(false);
  const [planList, setPlanList] = useState<HomePlanModel[]>([]);
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsExtend);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsExtend,
    isExtend
  );
  const isListData = planListData && 0 < planListData?.length;

  const planListSetter = (id: string) => {
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
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      <section className="w-full h-[12%]">
        <HomeHeader selectedPlan={planList[0]} />
      </section>
      <section className={`w-full ${isExtend ? "h-[19%]" : "h-[48%]"}`}>
        <HomeInfo isExtend={isExtend} selectedPlan={planList[0]} />
      </section>
      <section
        className={`relative bg-white w-full rounded-t-3xl ${
          isExtend ? "h-[69%]" : "h-[40%]"
        }`}
      >
        <HomePlanListBoard
          planList={planList}
          planListSetter={planListSetter}
        />
      </section>
      <Link href={isListData ? "/timer" : "/write/creat"}>
        <MetaButton mode={isListData ? "play" : "creat"} />
      </Link>
    </div>
  );
}

export default HomeSection;
