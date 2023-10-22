import dayjs from "dayjs";
import {
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import CalendarCard from "./CalendarCard";
import { motion } from "framer-motion";
import { calendarListVariants } from "../plan/PlanVariants";

type Props = {
  isWeekly: boolean;
  handleDateClick: (date: string, planList: SimplePlanModel[]) => void;
  selectedPlan: SelectPlanModel | null;
  displayDate: dayjs.Dayjs;
  clickedDate: dayjs.Dayjs;
  weekIndex: number;
  calendarData: CalendarModel[][];
};

function CalendarList({
  handleDateClick,
  calendarData,
  isWeekly,
  selectedPlan,
  displayDate,
  clickedDate,
  weekIndex,
}: Props) {
  return (
    <>
      {isWeekly ? (
        <motion.ul
          variants={calendarListVariants}
          initial="normal"
          animate="animate"
          key={"weekly"}
          className={`grid grid-cols-7 text-sm ${
            isWeekly ? "h-[60%]" : "h-[88%]"
          }`}
        >
          {calendarData[weekIndex].map((data, idx: number) => (
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
          variants={calendarListVariants}
          initial="normal"
          animate="animate"
          key={"month"}
          className={`grid grid-cols-7 text-sm ${
            isWeekly ? "h-[60%]" : "h-[88%] mobile:h-[93%]"
          }`}
        >
          {calendarData.map((week) =>
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
