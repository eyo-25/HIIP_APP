import { HomePlanModel } from "@/comman/model/plan";
import HomeDday from "./HomeDday";
import { motion } from "framer-motion";
import { usePlanPercent } from "@/comman/utils/planPercent";
import { detailInfoList } from "./Home.data";

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
  selectedPlan: HomePlanModel;
  isExtend: boolean;
};

function HomeDetailInfo({ selectedPlan, isExtend }: Props) {
  const planPercentData = usePlanPercent(selectedPlan);

  return (
    <motion.div
      variants={infoVariants}
      initial="normal"
      animate="animate"
      className="relative flex flex-col w-full items-end text-white h-full"
    >
      <HomeDday selectedPlan={selectedPlan} />
      {selectedPlan && isExtend && (
        <ul className="w-full grid grid-cols-4 justify-end px-25pxr pb-18pxr text-center">
          {detailInfoList.map(({ title, key, unit }) => (
            <li key={key}>
              <p className="text-lg tracking-widest">
                {planPercentData[key]}
                <span>{unit}</span>
              </p>
              <h5 className="text-xs font-thin text-gray-600">{title}</h5>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default HomeDetailInfo;
