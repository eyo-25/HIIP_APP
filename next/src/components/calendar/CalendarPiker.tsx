import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonthCalendar, getWeeklyCalendar } from "@/utils/calendar";

type Props = {
  displayDate: dayjs.Dayjs;
  clickedDate: dayjs.Dayjs;
  isWeekly: boolean;
  handleDateClick: (date: string) => void;
};

function CalendarPiker({
  displayDate,
  clickedDate,
  handleDateClick,
  isWeekly,
}: Props) {
  const [dateArray, setDateArray] = useState<string[][]>([]);
  const nowMonth = displayDate.month() + 1;
  const today = clickedDate.format("YYYY-MM-DD");

  const fakePlan = {
    days: [1, 3, 5],
    startDate: "2023-09-10",
    endDate: "2023-09-20",
  };

  const getDateStyle = (date: string) => {
    if (date === today) return "bg-black text-white z-20";
    if (
      dayjs(fakePlan.startDate) <= dayjs(date) &&
      dayjs(date) <= dayjs(fakePlan.endDate)
    ) {
      return "bg-gray-300";
    }
    return "";
  };
  const isEdgeDate = (date: string) => {
    if (
      dayjs(fakePlan.startDate) <= dayjs(date) &&
      dayjs(date) <= dayjs(fakePlan.endDate)
    ) {
      return true;
    }
    return false;
  };

  const liClass = (date: string) => {
    return `relative flex-center mx-auto my-[8%] cursor-pointer w-full ${
      Number(date.split("-")[1]) !== nowMonth && "text-gray-600"
    }`;
  };
  const circleClass = (date: string) => {
    return `z-10 flex-center h-full w-[64%] rounded-full ${getDateStyle(date)}`;
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
            className={liClass(date)}
            key={date}
          >
            {idx !== 0 && isEdgeDate(date) && fakePlan.startDate !== date && (
              <div
                className={`absolute h-full w-[50%] left-0pxr bg-gray-300`}
              ></div>
            )}
            <div className={circleClass(date)}>{date.split("-")[2]}</div>
            {idx !== 6 && isEdgeDate(date) && fakePlan.endDate !== date && (
              <div
                className={`absolute h-full w-[50%] right-0pxr bg-gray-300`}
              ></div>
            )}
            {fakePlan.days.includes(idx) && isEdgeDate(date) && (
              <span className="bg-red w-4pxr h-4pxr absolute z-10 bottom-[10%] rounded-full"></span>
            )}
          </li>
        ))
      )}
    </ul>
  );
}

export default CalendarPiker;
