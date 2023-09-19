import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import CalendarList from "./CalendarList";
import {
  CalendaMemoModel,
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import { dateMemoKey } from "./calendarUtils";

type Props = {
  isWeekly: boolean;
  selectedPlan?: SelectPlanModel;
  calendarArray: CalendarModel[][];
  displayDate: dayjs.Dayjs;
  clickedDate: dayjs.Dayjs;
  calendarMemo: CalendaMemoModel;
  setDisplayDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
  setClickedDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
  setPlanList: Dispatch<SetStateAction<SimplePlanModel[]>>;
  setDisplayMonth: Dispatch<SetStateAction<number>>;
};

const BUTTONCLASSNAME = "w-23pxr h-23pxr cursor-pointer";
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function CalendarPicker({
  isWeekly,
  selectedPlan,
  calendarArray,
  displayDate,
  calendarMemo,
  clickedDate,
  setDisplayDate,
  setClickedDate,
  setPlanList,
  setDisplayMonth,
}: Props) {
  const [weekIndex, setWeekIndex] = useState(
    Math.floor((dayjs().day() + dayjs().date()) / 7)
  );
  const today = useMemo(() => dayjs(), []);

  const updateCalendarValue = (newDate: dayjs.Dayjs, index: number) => {
    setDisplayDate(newDate);
    setDisplayMonth(newDate.month());
    setWeekIndex(index);
  };

  const handleWeeklyPrevClick = () => {
    if (
      weekIndex === 0 ||
      dayjs(calendarArray[weekIndex][0].date).month() !== displayDate.month()
    ) {
      const prevMonth = displayDate.subtract(1, "M");
      const index =
        Math.floor(
          (prevMonth.startOf("month").day() + prevMonth.endOf("month").date()) /
            7
        ) - 1;
      updateCalendarValue(prevMonth, index);
    } else {
      setWeekIndex((prev) => prev - 1);
    }
  };
  const handleWeeklyNextClick = () => {
    if (
      weekIndex === 5 ||
      dayjs(calendarArray[weekIndex + 1][0].date).month() !==
        displayDate.month()
    ) {
      const nextMonth = displayDate.add(1, "M");
      const index = nextMonth.startOf("month").day() === 0 ? 0 : 1;
      updateCalendarValue(nextMonth, index);
    } else {
      setWeekIndex((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    if (isWeekly) {
      handleWeeklyPrevClick();
    } else {
      const prevMonth = displayDate.subtract(1, "M");
      updateCalendarValue(prevMonth, 0);
    }
  };
  const handleNextClick = () => {
    if (isWeekly) {
      handleWeeklyNextClick();
    } else {
      const nextMonth = displayDate.add(1, "M");
      updateCalendarValue(nextMonth, 0);
    }
  };
  const handleTodayClick = () => {
    const memoKey = dateMemoKey(today);
    const index = Math.ceil((today.day() + today.date()) / 7);
    updateCalendarValue(today, index);
    setClickedDate(today);
    setPlanList(calendarMemo[memoKey][index][today.day()].list);
  };

  const handleDateClick = (date: string, planList: SimplePlanModel[]) => {
    const selectDate = dayjs(date);
    const selectMonth = selectDate.month();
    const selectWeekIndex =
      Math.ceil((selectDate.startOf("month").day() + selectDate.date()) / 7) -
      1;
    setClickedDate(selectDate);
    setPlanList(planList);
    if (selectMonth + 1 !== selectMonth) {
      setDisplayDate(selectDate);
      setDisplayMonth(selectMonth);
    }
    if (weekIndex !== selectWeekIndex) {
      setWeekIndex(selectWeekIndex);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white drop-shadow-sm">
      <section className="flex w-[88%] justify-between mb-18pxr">
        <IoChevronBack onClick={handlePrevClick} className={BUTTONCLASSNAME} />
        <p onClick={handleTodayClick} className="font-medium cursor-pointer">
          {displayDate.month() + 1} 월
        </p>
        <IoChevronForward
          onClick={handleNextClick}
          className={BUTTONCLASSNAME}
        />
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
          <CalendarList
            calendarArray={calendarArray}
            selectedPlan={selectedPlan}
            isWeekly={isWeekly}
            displayDate={displayDate}
            clickedDate={clickedDate}
            weekIndex={weekIndex}
            handleDateClick={handleDateClick}
          />
        }
      </section>
    </div>
  );
}

export default CalendarPicker;
