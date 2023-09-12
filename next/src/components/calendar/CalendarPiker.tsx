import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonthCalendar, getWeeklyCalendar } from "@/comman/utils/calendar";
import { useAtomValue } from "jotai";
import { clicked_date_atom, selected_plan_atom } from "@/store";

type Props = {
  displayDate: dayjs.Dayjs;
  isWeekly: boolean;
  handleDateClick: (date: string) => void;
};

function CalendarPiker({ displayDate, handleDateClick, isWeekly }: Props) {
  const [dateArray, setDateArray] = useState<string[][]>([]);
  const clickedDate = useAtomValue(clicked_date_atom);
  const plan = useAtomValue(selected_plan_atom);
  const nowMonth = displayDate.month() + 1;
  const today = clickedDate.format("YYYY-MM-DD");

  const getDateStyle = (date: string) => {
    if (date === today) return "bg-black text-white z-20";
    if (
      dayjs(plan?.startDate) <= dayjs(date) &&
      dayjs(date) <= dayjs(plan?.endDate)
    ) {
      return "bg-gray-300";
    }
    return "";
  };
  const liClassFn = (date: string) => {
    return `relative flex-center mx-auto my-[8%] cursor-pointer w-full ${
      Number(date.split("-")[1]) !== nowMonth && "text-gray-600"
    }`;
  };
  const circleClassFn = (date: string) => {
    return `z-10 flex-center h-full w-[64%] rounded-full ${getDateStyle(date)}`;
  };

  const isEdgeDate = (date: string) => {
    if (
      dayjs(plan?.startDate) <= dayjs(date) &&
      dayjs(date) <= dayjs(plan?.endDate)
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setDateArray(() =>
      isWeekly ? getWeeklyCalendar(displayDate) : getMonthCalendar(displayDate)
    );
  }, [displayDate, isWeekly]);

  return (
    <ul
      className={`grid grid-cols-7 text-sm ${isWeekly ? "h-[60%]" : "h-[84%]"}`}
    >
      {dateArray.map((week: string[]) =>
        week.map((date: string, idx: number) => (
          <li
            onClick={() => handleDateClick(date)}
            className={liClassFn(date)}
            key={date}
          >
            {idx !== 0 && isEdgeDate(date) && plan?.startDate !== date && (
              <div
                className={`absolute h-full w-[50%] left-0pxr bg-gray-300`}
              ></div>
            )}
            <div className={circleClassFn(date)}>{date.split("-")[2]}</div>
            {idx !== 6 && isEdgeDate(date) && plan?.endDate !== date && (
              <div
                className={`absolute h-full w-[50%] right-0pxr bg-gray-300`}
              ></div>
            )}
            {plan?.days.includes(idx) && isEdgeDate(date) && (
              <span className="bg-red w-4pxr h-4pxr absolute z-10 bottom-[10%] rounded-full"></span>
            )}
          </li>
        ))
      )}
    </ul>
  );
}

export default CalendarPiker;
