import dayjs from "dayjs";
import {
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import CalendarCard from "./CalendarCard";

type Props = {
  isWeekly: boolean;
  handleDateClick: (date: string, planList: SimplePlanModel[]) => void;
  selectedPlan?: SelectPlanModel;
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
    <ul
      className={`grid grid-cols-7 text-sm ${isWeekly ? "h-[60%]" : "h-[84%]"}`}
    >
      {isWeekly
        ? calendarArray[weekIndex].map((data, idx: number) => (
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
        : calendarArray.map((week) =>
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
    </ul>
  );
}

export default CalendarList;
