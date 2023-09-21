import { Dispatch, SetStateAction, useMemo, useState } from "react";
import dayjs from "dayjs";

import CalendarList from "./CalendarList";
import {
  CalendaMemoModel,
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import { dateMemoKey } from "./calendarUtils";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";

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
    const index = Math.ceil((today.day() + today.date()) / 7) - 1;
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
      <CalendarHeader
        displayDate={displayDate}
        handlePrevClick={handlePrevClick}
        handleTodayClick={handleTodayClick}
        handleNextClick={handleNextClick}
      />
      <section
        className={`w-full px-7pxr font-medium ${
          isWeekly ? "h-[59%]" : "h-[88%]"
        }`}
      >
        <CalendarDays isWeekly={isWeekly} />
        <CalendarList
          calendarArray={calendarArray}
          selectedPlan={selectedPlan}
          isWeekly={isWeekly}
          displayDate={displayDate}
          clickedDate={clickedDate}
          weekIndex={weekIndex}
          handleDateClick={handleDateClick}
        />
      </section>
    </div>
  );
}

export default CalendarPicker;
