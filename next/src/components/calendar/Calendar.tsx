import React, { useState } from "react";
import dayjs from "dayjs";

import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import MonthCalendar from "./MonthCalendar";
import WeeklyCalendar from "./WeeklyCalendar";

type Props = {
  isWeekly: boolean;
};

const ButtonClass = "w-23pxr h-23pxr cursor-pointer";
const Days = ["일", "월", "화", "수", "목", "금", "토"];

function Calendar({ isWeekly }: Props) {
  const [displayDate, setDisplayDate] = useState<dayjs.Dayjs>(dayjs());
  const [clickedDate, setClickedDate] = useState();

  const onPrevClick = () => {
    if (isWeekly) {
    } else {
      const prevMonth = displayDate.subtract(1, "M");
      setDisplayDate(prevMonth);
    }
  };
  const onNextClick = () => {
    if (isWeekly) {
    } else {
      const nextMonth = displayDate.add(1, "M");
      setDisplayDate(nextMonth);
    }
  };
  const onTodayClick = () => {
    setDisplayDate(dayjs());
  };

  return (
    <article className="flex flex-col items-center w-full h-full">
      <section className="flex w-[88%] justify-between mb-18pxr">
        <IoChevronBack onClick={onPrevClick} className={ButtonClass} />
        <p onClick={onTodayClick} className="font-medium cursor-pointer">
          {displayDate.format("M")} 월
        </p>
        <IoChevronForward onClick={onNextClick} className={ButtonClass} />
      </section>
      <section
        className={`w-full px-7pxr font-medium ${
          isWeekly ? "h-[60%]" : "h-[88%]"
        }`}
      >
        <ul
          className={`grid grid-cols-7 text-sm ${
            isWeekly ? "h-[40%]" : "h-[9%]"
          }`}
        >
          {Days.map((day) => (
            <li className="mx-auto" key={day}>
              {day}
            </li>
          ))}
        </ul>
        <ul
          className={`grid grid-cols-7 text-sm ${
            isWeekly ? "h-[60%]" : "h-[84%]"
          }`}
        >
          {isWeekly ? (
            <WeeklyCalendar displayDate={displayDate} />
          ) : (
            <MonthCalendar displayDate={displayDate} />
          )}
        </ul>
      </section>
    </article>
  );
}

export default React.memo(Calendar);
