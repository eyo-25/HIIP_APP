import {
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import dayjs from "dayjs";
import { planColor } from "../plan/PlanCard.data";
import { motion } from "framer-motion";
import { calendarCardVariants } from "../plan/PlanVariants";

type Props = {
  data: CalendarModel;
  clickedDate: dayjs.Dayjs;
  displayDate: dayjs.Dayjs;
  idx?: number;
  weekIndex?: number;
  selectedPlan?: SelectPlanModel | null;
  displayType: "month" | "week-month";
  handleDateClick?: (date: string, planList: SimplePlanModel[]) => void;
};

function CalendarCard({
  data,
  idx,
  selectedPlan,
  clickedDate,
  displayDate,
  displayType,
  handleDateClick,
}: Props) {
  const { date, list, colors } = data;
  const today = clickedDate.format("YYYY-MM-DD");
  const isCurrentMonth = Number(date.split("-")[1]) === displayDate.month() + 1;
  const isStartDate = dayjs(date).isSame(selectedPlan?.startDate, "day");
  const isEndDate = dayjs(date).isSame(selectedPlan?.endDate, "day");

  const liClassName = (date: string) => {
    const baseStyle =
      "relative flex-center desktop:max-h-44pxr max-h-40pxr mx-auto mobile:my-[4%] my-[6%] desktop:my-[8%] cursor-pointer w-full";
    if (displayType === "month") {
      return dayjs().isAfter(dayjs(date), "day")
        ? `${baseStyle} text-gray-600`
        : baseStyle;
    }

    return `${baseStyle} ${!isCurrentMonth && "text-gray-600"}`;
  };
  const circleClassName = (date: string) => {
    const baseStyle =
      "z-10 flex-center h-full desktop:w-[73%] w-[70%] rounded-full mobile:text-xs text-sm desktop:text-baseStyle";

    if (date === today) return `bg-black text-white ${baseStyle}`;
    if (
      selectedPlan &&
      dayjs(date).isSameOrAfter(selectedPlan?.startDate, "day") &&
      dayjs(date).isSameOrBefore(selectedPlan?.endDate, "day")
    ) {
      return `bg-gray-300 ${baseStyle}`;
    }
    return baseStyle;
  };

  const isEdgeDate = (date: string) => {
    if (
      dayjs(selectedPlan?.startDate).isSameOrBefore(date, "day") &&
      dayjs(selectedPlan?.endDate).isSameOrAfter(date, "day")
    ) {
      return true;
    }
    return false;
  };

  return (
    <motion.li
      variants={calendarCardVariants}
      initial="normal"
      animate="animate"
      onClick={() => handleDateClick && handleDateClick(date, list)}
      className={liClassName(date)}
      key={date}
    >
      {idx !== 0 && isEdgeDate(date) && !isStartDate && (
        <div className={`absolute h-full w-[50%] left-0pxr bg-gray-300`}></div>
      )}
      <div className={circleClassName(date)}>{date.split("-")[2]}</div>
      {idx !== 6 && isEdgeDate(date) && !isEndDate && (
        <div className={`absolute h-full w-[50%] right-0pxr bg-gray-300`}></div>
      )}
      {date !== today && (
        <ul
          className={`absolute z-20 bottom-[10%] flex-center w-full gap-[5%] ${
            !isCurrentMonth && "opacity-50"
          }`}
        >
          {colors.slice(0, 5).map((color, idx) => (
            <li
              key={idx}
              className={`w-4pxr h-4pxr rounded-full ${planColor[color]}`}
            ></li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}

export default CalendarCard;
