import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import CalendarPiker from "./CalendarPiker";
import { useAtomValue, useSetAtom } from "jotai";
import { clickDateAtom, clicked_date_atom } from "@/store";

type Props = {
  isWeekly: boolean;
};

const BUTTONCLASS = "w-23pxr h-23pxr cursor-pointer";
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function Calendar({ isWeekly }: Props) {
  const [displayDate, setDisplayDate] = useState<dayjs.Dayjs>(dayjs());
  const nowMonth = displayDate.month() + 1;
  const clickedDate = useAtomValue(clicked_date_atom);
  const setClickedDate = useSetAtom(clickDateAtom);

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

  useEffect(() => {
    setClickedDate(dayjs());
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full bg-white drop-shadow-sm">
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
            isWeekly={isWeekly}
            handleDateClick={handleDateClick}
          />
        }
      </section>
    </div>
  );
}

export default React.memo(Calendar);
