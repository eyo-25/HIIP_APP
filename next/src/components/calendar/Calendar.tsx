import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import CalendarPiker from "./CalendarPiker";

type Props = {
  isWeekly: boolean;
};

const BUTTONCLASS = "w-23pxr h-23pxr cursor-pointer";
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function Calendar({ isWeekly }: Props) {
  const [displayDate, setDisplayDate] = useState<dayjs.Dayjs>(dayjs());
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs>(dayjs());
  const nowMonth = displayDate.month() + 1;

  const handlePrevClick = () => {
    if (isWeekly) {
      setDisplayDate(displayDate.subtract(7, "d"));
    } else {
      setDisplayDate(displayDate.subtract(1, "M"));
    }
  };
  const handleNextClick = () => {
    if (isWeekly) {
      setDisplayDate(displayDate.add(7, "d"));
    } else {
      setDisplayDate(displayDate.add(1, "M"));
    }
  };
  const handleTodayClick = () => {
    setDisplayDate(dayjs());
    setClickedDate(dayjs());
  };
  const handleDateClick = (date: string) => {
    const selectedDate = dayjs(date);
    setClickedDate(selectedDate);
    if (!isWeekly && nowMonth !== Number(selectedDate.format("M"))) {
      setDisplayDate(selectedDate);
    }
  };

  useEffect(() => {
    setDisplayDate(clickedDate);
  }, [isWeekly]);

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <section className="flex w-[88%] justify-between mb-18pxr">
        <IoChevronBack onClick={handlePrevClick} className={BUTTONCLASS} />
        <p onClick={handleTodayClick} className="font-medium cursor-pointer">
          {displayDate.format("M")} 월
        </p>
        <IoChevronForward onClick={handleNextClick} className={BUTTONCLASS} />
      </section>
      <section
        className={`w-full px-7pxr font-medium ${
          isWeekly ? "h-[59%]" : "h-[88%]"
        }`}
      >
        <ul
          className={`grid grid-cols-7 text-sm ${
            isWeekly ? "h-[40%]" : "h-[9%]"
          }`}
        >
          {DAYS.map((day) => (
            <li className="mx-auto" key={day}>
              {day}
            </li>
          ))}
        </ul>
        {
          <CalendarPiker
            displayDate={displayDate}
            clickedDate={clickedDate}
            isWeekly={isWeekly}
            handleDateClick={handleDateClick}
          />
        }
      </section>
    </div>
  );
}

export default React.memo(Calendar);
