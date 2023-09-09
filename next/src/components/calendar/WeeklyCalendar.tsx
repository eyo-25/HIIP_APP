import dayjs from "dayjs";
import { useEffect, useState } from "react";

type Props = {
  displayDate: dayjs.Dayjs;
  clickedDate: dayjs.Dayjs;
  setClickedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

export default function WeeklyCalendar({
  displayDate,
  clickedDate,
  setClickedDate,
}: Props) {
  const [weekArray, setWeekArray] = useState<string[]>([]);
  const nowMonth = displayDate.month() + 1;
  const today = clickedDate.format("YYYY-MM-DD");

  const onDateClick = (clickedDate: string) => {
    setClickedDate(dayjs(clickedDate));
  };

  useEffect(() => {
    setWeekArray(() => {
      const newWeekArray = [];
      const todayDay = displayDate.day();

      for (let i = 1; i <= todayDay; i++) {
        newWeekArray.push(displayDate.subtract(i, "d").format("YYYY-MM-DD"));
      }
      for (let i = 0; i < 7 - todayDay; i++) {
        newWeekArray.push(displayDate.add(i, "d").format("YYYY-MM-DD"));
      }

      return newWeekArray;
    });
  }, [displayDate]);

  return (
    <>
      {weekArray.map((date: string) => (
        <li
          onClick={() => onDateClick(date)}
          className={`flex-center mx-auto cursor-pointer ${
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
    </>
  );
}
