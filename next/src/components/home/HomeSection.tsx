import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HomeHeader from "./HomeHeader";
import HomeDetailInfo from "./HomeDetailInfo";
import HomePlanListBoard from "./HomePlanListBoard";
import { useTouchHandlers } from "@/comman/utils/touchHandlers";
import { useMouseHandlers } from "@/comman/utils/mouseHandlers";
import MetaButton from "../ui/MetaButton";
import { HomePlanModel } from "@/comman/model/plan";
import HomeInfo from "./HomeInfo";
import HomeSkeletonPlanList from "./HomeSkeletonPlanList";

const buttonVarients = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "linear",
    },
  },
};

type Props = {
  planListData: HomePlanModel[] | undefined;
  isLoading: boolean;
};

function HomeSection({ planListData, isLoading }: Props) {
  const [isExtend, setIsExtend] = useState(false);
  const [planList, setPlanList] = useState<HomePlanModel[]>([]);
  const isPlanList = 0 < planList.length;

  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsExtend);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsExtend,
    isExtend
  );

  const infoVariants = {
    normal: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        type: "tween",
      },
    },
  };
  const boardVariants = {
    normal: {
      height: "0%",
    },
    animate: {
      height: isExtend ? "69%" : "40%",
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  };

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
      className={`relative w-full h-full z-10 ${isExtend && "bg-black/50"}`}
      onMouseDown={isPlanList ? handleMouseDown : undefined}
      onMouseUp={isPlanList ? handleMouseUp : undefined}
      onTouchEnd={isPlanList ? handleTouchEnd : undefined}
      onTouchStart={isPlanList ? handleTouchStart : undefined}
    >
      <section className="w-full h-[12%]">
        <HomeHeader selectedPlan={planList[0]} />
      </section>
      <motion.section
        variants={infoVariants}
        initial="normal"
        animate="animate"
        className={`w-full ${isExtend ? "h-[19%]" : "h-[48%]"}`}
      >
        <div className="flex flex-col items-center h-full text-white">
          {isExtend ? (
            <HomeDetailInfo selectedPlan={planList[0]} isExtend={isExtend} />
          ) : (
            <HomeInfo selectedPlan={planList[0]} />
          )}
        </div>
      </motion.section>
      <motion.section
        className={`absolute bottom-0pxr bg-white w-full rounded-t-3xl`}
        variants={boardVariants}
        initial="normal"
        animate="animate"
      >
        {isLoading ? (
          <HomeSkeletonPlanList />
        ) : (
          <HomePlanListBoard planList={planList} planListSort={planListSort} />
        )}
      </motion.section>
      <motion.div variants={buttonVarients} initial="normal" animate="animate">
        <Link href={planList[0] ? `/timer/${planList[0]._id}` : "/write/creat"}>
          <MetaButton mode={isPlanList ? "play" : "creat"} />
        </Link>
      </motion.div>
    </div>
  );
}

export default HomeSection;
