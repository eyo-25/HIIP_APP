import { HomePlanModel } from "@/comman/model/plan";
import HomePlanCard from "./HomePlanCard";
import { motion } from "framer-motion";

const boardVariants = {
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
  planList: HomePlanModel[] | undefined;
  planListSort: (planList: string) => void;
};

function HomePlanListBoard({ planList, planListSort }: Props) {
  return (
    <div>
      <div className="absolute top-[5px] w-full">
        <div className="mx-auto w-100pxr h-3pxr bg-gray-400 rounded-md"></div>
      </div>
      <motion.ul
        variants={boardVariants}
        initial="normal"
        animate="animate"
        className="sroll h-full pt-26pxr w-full px-24pxr mx-auto overflow-hidden"
      >
        {planList && (
          <>
            {planList.map((data, idx) => (
              <HomePlanCard
                key={data._id}
                data={data}
                idx={idx}
                planListSort={planListSort}
              />
            ))}
          </>
        )}
      </motion.ul>
    </div>
  );
}

export default HomePlanListBoard;
