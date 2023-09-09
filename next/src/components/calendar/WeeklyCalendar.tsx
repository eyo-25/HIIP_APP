import dayjs from "dayjs";
import { useEffect, useState } from "react";

type Props = {
  displayDate: dayjs.Dayjs;
};

export default function WeeklyCalendar({ displayDate }: Props) {
  const [weekArray, setWeekArray] = useState<string[]>([]);

  useEffect(() => {
    setWeekArray(() => {
      const newWeekArray = [];
      const today = displayDate.day();

      for (let i = 1; i <= today; i++) {
        newWeekArray.push(displayDate.subtract(i, "d").format("YYYY-MM-DD"));
      }
      for (let i = 0; i < 7 - today; i++) {
        newWeekArray.push(displayDate.add(i, "d").format("YYYY-MM-DD"));
      }

      return newWeekArray;
    });
  }, [displayDate]);

  console.log(weekArray);

  return <></>;
}
