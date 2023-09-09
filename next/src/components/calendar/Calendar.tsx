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
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs>(dayjs());

  const onPrevClick = () => {
    if (isWeekly) {
      setDisplayDate(displayDate.subtract(7, "d"));
    } else {
      setDisplayDate(displayDate.subtract(1, "M"));
    }
  };
  const onNextClick = () => {
    if (isWeekly) {
      setDisplayDate(displayDate.add(7, "d"));
    } else {
      setDisplayDate(displayDate.add(1, "M"));
    }
  };
  const onTodayClick = () => {
    setDisplayDate(dayjs());
    setClickedDate(dayjs());
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
            <WeeklyCalendar
              displayDate={displayDate}
              clickedDate={clickedDate}
              setClickedDate={setClickedDate}
            />
          ) : (
            <MonthCalendar
              displayDate={displayDate}
              clickedDate={clickedDate}
              setClickedDate={setClickedDate}
            />
          )}
        </ul>
      </section>
    </article>
  );
}

export default React.memo(Calendar);
