import { randomWiseSaying } from "@/comman/utils/randomWiseSaying";
import { useMemo } from "react";
import HomeDday from "./HomeDday";
import { HomePlanModel } from "@/comman/model/plan";
import { motion } from "framer-motion";

const infoVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.5,
      type: "linear",
    },
  },
};

type Props = {
  selectedPlan: HomePlanModel | undefined;
};

function HomeInfo({ selectedPlan }: Props) {
  const wiseSaying = useMemo(() => randomWiseSaying(), []);

  return (
    <motion.div
      variants={infoVariants}
      initial="normal"
      animate="animate"
      className="flex-center flex-col desktop:text-2xl text-xl h-full leading-loose"
    >
      <div className="flex-center flex-col h-full">
        {selectedPlan ? (
          wiseSaying?.map((word, idx) => <p key={idx}>{word}</p>)
        ) : (
          <p className="text-center">
            오늘 진행할 플랜이 <br /> 없습니다.
          </p>
        )}
      </div>
      <HomeDday selectedPlan={selectedPlan} />
    </motion.div>
  );
}

export default HomeInfo;
