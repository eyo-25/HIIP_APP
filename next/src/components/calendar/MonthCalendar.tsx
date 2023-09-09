import { useEffect, useState } from "react";
import dayjs from "dayjs";

type Props = {
  displayDate: dayjs.Dayjs;
};

export default function MonthCalendar({ displayDate }: Props) {
  const [monthArray, setMonthArray] = useState<string[]>([]);
  const nowMonth = displayDate.month() + 1;

  useEffect(() => {
    setMonthArray(() => {
      const newMonthArray = [];

      let nowMonthLast = Number(displayDate.endOf("month").format("DD"));
      let nowMonthStartDay = displayDate.startOf("month").day();
      let prevMonthLast = displayDate.subtract(1, "month").endOf("month");
      let prevMonthLastDate = Number(prevMonthLast.format("D"));
      let nextMonthLastDate = displayDate.add(1, "month");

      for (let i = 1; i <= nowMonthStartDay; i++) {
        newMonthArray.push(
          prevMonthLast.format("YYYY-MM-") +
            (prevMonthLastDate - (nowMonthStartDay - i))
        );
      }
      for (let i = 1; i <= nowMonthLast; i++) {
        newMonthArray.push(displayDate.format("YYYY-MM-") + i);
      }
      for (let i = 1; i <= 42 - (nowMonthStartDay + nowMonthLast); i++) {
        newMonthArray.push(nextMonthLastDate.format("YYYY-MM-") + i);
      }

      return newMonthArray;
    });
  }, [displayDate]);

  return (
    <>
      {monthArray.map((date: string) => (
        <li
          className={`flex-center mx-auto ${
            Number(date.split("-")[1]) !== nowMonth && "text-gray-600"
          }`}
          key={date}
        >
          {date.split("-")[2]}
        </li>
      ))}
    </>
  );
}
