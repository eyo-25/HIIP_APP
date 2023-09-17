import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";

import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import CalendarList from "./CalendarList";
import {
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";

type Props = {
  isWeekly: boolean;
  selectedPlan?: SelectPlanModel;
  calendarArray: CalendarModel[][];
  displayDate: dayjs.Dayjs;
  setDisplayDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
  setClickedDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
  setPlanList: Dispatch<SetStateAction<SimplePlanModel[]>>;
  clickedDate: dayjs.Dayjs;
  setDisplayMonth: Dispatch<SetStateAction<number>>;
  handleTodayClick: () => void;
};

const BUTTONCLASS = "w-23pxr h-23pxr cursor-pointer";
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function CalendarPicker({
  isWeekly,
  selectedPlan,
  calendarArray,
  displayDate,
  setDisplayDate,
  setClickedDate,
  setPlanList,
  setDisplayMonth,
  handleTodayClick,
  clickedDate,
}: Props) {
  const [weekIndex, setWeekIndex] = useState(
    Math.floor((dayjs().day() + dayjs().date()) / 7)
  );

  const handlePrevClick = () => {
    if (isWeekly) {
      if (
        weekIndex === 0 ||
        dayjs(calendarArray[weekIndex][0].date).month() !== displayDate.month()
      ) {
        const prevMonth = displayDate.subtract(1, "M");
        const index =
          Math.floor(
            (prevMonth.startOf("month").day() +
              prevMonth.endOf("month").date()) /
              7
          ) - 1;
        setDisplayDate(prevMonth);
        setDisplayMonth(prevMonth.month());
        setWeekIndex(index);
      } else {
        setWeekIndex((prev) => prev - 1);
      }
    } else {
      const prevMonth = displayDate.subtract(1, "M");
      setDisplayDate(prevMonth);
      setDisplayMonth(prevMonth.month());
      setWeekIndex(0);
    }
  };
  const handleNextClick = () => {
    if (isWeekly) {
      if (
        weekIndex === 5 ||
        dayjs(calendarArray[weekIndex + 1][0].date).month() !==
          displayDate.month()
      ) {
        const nextMonth = displayDate.add(1, "M");
        const index = nextMonth.startOf("month").day() === 0 ? 0 : 1;
        setDisplayDate(nextMonth);
        setDisplayMonth(nextMonth.month());
        setWeekIndex(index);
      } else {
        setWeekIndex((prev) => prev + 1);
      }
    } else {
      const nextMonth = displayDate.add(1, "M");
      setDisplayDate(nextMonth);
      setDisplayMonth(nextMonth.month());
      setWeekIndex(0);
    }
  };

  const handleDateClick = (date: string, planList: SimplePlanModel[]) => {
    const selectDate = dayjs(date);
    const selectMonth = selectDate.month();
    setClickedDate(selectDate);
    if (selectMonth + 1 !== selectMonth) {
      setDisplayDate(selectDate);
      setDisplayMonth(selectMonth);
    }
    setPlanList(planList);
  };

  useEffect(() => {
    setWeekIndex(
      Math.ceil((clickedDate.date() + clickedDate.startOf("month").day()) / 7) -
        1
    );
  }, [clickedDate]);

  return (
    <div className="flex flex-col items-center w-full h-full bg-white drop-shadow-sm">
      <section className="flex w-[88%] justify-between mb-18pxr">
        <IoChevronBack onClick={handlePrevClick} className={BUTTONCLASS} />
        <p onClick={handleTodayClick} className="font-medium cursor-pointer">
          {displayDate.month() + 1} 월
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
          <CalendarList
            calendarArray={calendarArray}
            selectedPlan={selectedPlan}
            isWeekly={isWeekly}
            handleDateClick={handleDateClick}
            displayDate={displayDate}
            clickedDate={clickedDate}
            weekIndex={weekIndex}
          />
        }
      </section>
    </div>
  );
}

export default CalendarPicker;
