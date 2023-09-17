import {
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import dayjs from "dayjs";
import { planColor } from "../plan/PlanCard.data";

type Props = {
  handleDateClick: (date: string, planList: SimplePlanModel[]) => void;
  data: CalendarModel;
  idx: number;
  selectedPlan?: SelectPlanModel;
  clickedDate: dayjs.Dayjs;
  displayDate: dayjs.Dayjs;
};

function CalendarCard({
  handleDateClick,
  data,
  idx,
  selectedPlan,
  clickedDate,
  displayDate,
}: Props) {
  const { date, list, colors } = data;
  const today = clickedDate.format("YYYY-MM-DD");

  const getDateStyle = (date: string) => {
    if (date === today) return "bg-black text-white z-20";
    if (
      dayjs(selectedPlan?.startDate) <= dayjs(date) &&
      dayjs(date) <= dayjs(selectedPlan?.endDate)
    ) {
      return "bg-gray-300";
    }
    return "";
  };

  const liClassFn = (date: string) => {
    return `relative flex-center mx-auto my-[8%] cursor-pointer w-full ${
      Number(date.split("-")[1]) !== displayDate.month() + 1 && "text-gray-600"
    }`;
  };
  const circleClassFn = (date: string) => {
    return `z-10 flex-center h-full w-[64%] rounded-full ${getDateStyle(date)}`;
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
    <li
      onClick={() => handleDateClick(date, list)}
      className={liClassFn(date)}
      key={date}
    >
      {idx !== 0 && isEdgeDate(date) && selectedPlan?.startDate !== date && (
        <div className={`absolute h-full w-[50%] left-0pxr bg-gray-300`}></div>
      )}
      <div className={circleClassFn(date)}>{date.split("-")[2]}</div>
      {idx !== 6 && isEdgeDate(date) && selectedPlan?.endDate !== date && (
        <div className={`absolute h-full w-[50%] right-0pxr bg-gray-300`}></div>
      )}
      <ul className="absolute bottom-[10%] z-10 flex-center w-full gap-[5%]">
        {colors.map((color, idx) => (
          <li
            key={idx}
            className={`w-4pxr h-4pxr rounded-full ${planColor[color]}`}
          ></li>
        ))}
      </ul>
    </li>
  );
}

export default CalendarCard;
