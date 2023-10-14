import dayjs from "dayjs";
import {
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import CalendarCard from "./CalendarCard";
import { motion } from "framer-motion";

const calendarVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.5,
      type: "linear",
    },
  },
};

type Props = {
  isWeekly: boolean;
  handleDateClick: (date: string, planList: SimplePlanModel[]) => void;
  selectedPlan: SelectPlanModel | null;
  calendarArray: CalendarModel[][];
  displayDate: dayjs.Dayjs;
  clickedDate: dayjs.Dayjs;
  weekIndex: number;
};

function CalendarList({
  handleDateClick,
  isWeekly,
  selectedPlan,
  calendarArray,
  displayDate,
  clickedDate,
  weekIndex,
}: Props) {
  return (
    <>
      {isWeekly ? (
        <motion.ul
          variants={calendarVariants}
          initial="normal"
          animate="animate"
          key={"weekly"}
          className={`grid grid-cols-7 text-sm ${
            isWeekly ? "h-[60%]" : "h-[88%]"
          }`}
        >
          {calendarArray[weekIndex].map((data, idx: number) => (
            <CalendarCard
              handleDateClick={handleDateClick}
              data={data}
              idx={idx}
              displayType="week-month"
              weekIndex={weekIndex}
              selectedPlan={selectedPlan}
              clickedDate={clickedDate}
              displayDate={displayDate}
              key={idx}
            />
          ))}
        </motion.ul>
      ) : (
        <motion.div
          variants={calendarVariants}
          initial="normal"
          animate="animate"
          key={"month"}
          className={`grid grid-cols-7 text-sm ${
            isWeekly ? "h-[60%]" : "h-[88%] mobile:h-[93%]"
          }`}
        >
          {calendarArray.map((week) =>
            week.map((data, idx: number) => (
              <CalendarCard
                handleDateClick={handleDateClick}
                data={data}
                idx={idx}
                displayType="week-month"
                weekIndex={weekIndex}
                selectedPlan={selectedPlan}
                clickedDate={clickedDate}
                displayDate={displayDate}
                key={idx}
              />
            ))
          )}
        </motion.div>
      )}
    </>
  );
}

export default CalendarList;
