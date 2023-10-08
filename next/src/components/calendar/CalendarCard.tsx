import {
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { planColor } from "../plan/PlanCard.data";

const calendarVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.35,
      duration: 0.5,
      type: "linear",
    },
  },
};

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

  const liClassName = (date: string) => {
    const base =
      "relative flex-center desktop:max-h-44pxr max-h-40pxr mx-auto my-[8%] cursor-pointer w-full";
    if (displayType === "month") {
      return dayjs().isAfter(dayjs(date)) ? `${base} text-gray-600` : base;
    }

    return `${base} ${!isCurrentMonth && "text-gray-600"}`;
  };
  const circleClassName = (date: string) => {
    const base = "z-10 flex-center h-full desktop:w-[73%] w-[70%] rounded-full";

    if (date === today) return `bg-black text-white ${base}`;
    if (
      dayjs(selectedPlan?.startDate) <= dayjs(date) &&
      dayjs(date) <= dayjs(selectedPlan?.endDate)
    ) {
      return `bg-gray-300 ${base}`;
    }
    return base;
  };

  const isEdgeDate = (date: string) => {
    if (
      dayjs(selectedPlan?.startDate) <= dayjs(date) &&
      dayjs(date) <= dayjs(selectedPlan?.endDate)
    ) {
      return true;
    }
    return false;
  };

  return (
    <motion.li
      variants={calendarVariants}
      initial="normal"
      animate="animate"
      onClick={() => handleDateClick && handleDateClick(date, list)}
      className={liClassName(date)}
      key={date}
    >
      {idx !== 0 && isEdgeDate(date) && selectedPlan?.startDate !== date && (
        <div className={`absolute h-full w-[50%] left-0pxr bg-gray-300`}></div>
      )}
      <div className={circleClassName(date)}>{date.split("-")[2]}</div>
      {idx !== 6 && isEdgeDate(date) && selectedPlan?.endDate !== date && (
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
