import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonthCalendar, getWeeklyCalendar } from "@/utils/calendar";

type Props = {
  displayDate: dayjs.Dayjs;
  clickedDate: dayjs.Dayjs;
  setClickedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  setDisplayDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  isWeekly: boolean;
};

function CalendarPiker({
  displayDate,
  clickedDate,
  setClickedDate,
  setDisplayDate,
  isWeekly,
}: Props) {
  const [dateArray, setDateArray] = useState<string[]>([]);
  const nowMonth = displayDate.month() + 1;
  const today = clickedDate.format("YYYY-MM-DD");

  const onDateClick = (clickedDate: string) => {
    const date = dayjs(clickedDate);
    setClickedDate(date);
    if (!isWeekly && nowMonth !== Number(date.format("M"))) {
      setDisplayDate(date);
    }
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
      {dateArray.map((date: string) => (
        <li
          onClick={() => onDateClick(date)}
          className={`flex-center mx-auto cursor-pointer w-full ${
            Number(date.split("-")[1]) !== nowMonth && "text-gray-600"
          }`}
          key={date}
        >
          <div
            className={`flex-center w-34pxr h-34pxr ${
              today === date && "bg-black rounded-full text-white"
            }`}
          >
            {date.split("-")[2]}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CalendarPiker;
