import { useEffect, useState } from "react";
import dayjs from "dayjs";

type Props = {
  displayDate: dayjs.Dayjs;
  clickedDate: dayjs.Dayjs;
  setClickedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

export default function MonthCalendar({
  displayDate,
  clickedDate,
  setClickedDate,
}: Props) {
  const [monthArray, setMonthArray] = useState<string[]>([]);
  const nowMonth = displayDate.month() + 1;
  const today = clickedDate.format("YYYY-MM-DD");

  const onDateClick = (clickedDate: string) => {
    setClickedDate(dayjs(clickedDate));
  };

  useEffect(() => {
    setMonthArray(() => {
      const newMonthArray = [];
      let monthStartDate = displayDate.startOf("month");
      let monthStartDay = monthStartDate.day();

      for (let i = monthStartDay; i >= 1; i--) {
        newMonthArray.push(
          monthStartDate.subtract(i, "d").format("YYYY-MM-DD")
        );
      }
      for (let i = 0; i < 42 - monthStartDay; i++) {
        newMonthArray.push(monthStartDate.add(i, "d").format("YYYY-MM-DD"));
      }

      return newMonthArray;
    });
  }, [displayDate]);

  return (
    <>
      {monthArray.map((date: string) => (
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
    </>
  );
}
