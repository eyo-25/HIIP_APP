import { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import CalendarList from "./CalendarList";
import {
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import { motion } from "framer-motion";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import { today } from "@/comman/utils/today";

type Props = {
  isWeekly: boolean;
  selectedPlan: SelectPlanModel | null;
  clickedDate: dayjs.Dayjs;
  calendarData: CalendarModel[][];
  displayDate: dayjs.Dayjs;
  weekIndex: number;
  setWeekIndex: Dispatch<SetStateAction<number>>;
  setDisplayDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
  setClickedDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
  setPlanList: Dispatch<SetStateAction<SimplePlanModel[]>>;
  displayMonthSetter: (year: number, month: number) => void;
};

const calendarVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "linear",
    },
  },
};

function CalendarPicker({
  calendarData,
  isWeekly,
  selectedPlan,
  clickedDate,
  displayDate,
  weekIndex,
  setWeekIndex,
  setDisplayDate,
  setClickedDate,
  setPlanList,
  displayMonthSetter,
}: Props) {
  const updateCalendarValue = (newDate: dayjs.Dayjs, index: number) => {
    setDisplayDate(newDate);
    displayMonthSetter(newDate.year(), newDate.month() + 1);
    setWeekIndex(index);
  };
  const handleWeeklyPrevClick = () => {
    if (
      weekIndex === 0 ||
      dayjs(calendarData[weekIndex][0].date).month() !== displayDate.month()
    ) {
      const prevMonth = displayDate.subtract(1, "M");
      const prevStartMonthDay = prevMonth.startOf("month").day();
      const prevMonthDate = prevMonth.endOf("month").date();
      const prevEndMonthDay = prevMonth.endOf("month").day();

      const index =
        6 === prevEndMonthDay
          ? Math.ceil((prevStartMonthDay + prevMonthDate) / 7) - 1
          : Math.ceil((prevStartMonthDay + prevMonthDate) / 7) - 2;

      updateCalendarValue(prevMonth, index);
    } else {
      setWeekIndex((prev) => prev - 1);
    }
  };
  const handleWeeklyNextClick = () => {
    if (
      weekIndex === 5 ||
      dayjs(calendarData[weekIndex + 1][0].date).month() !== displayDate.month()
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
    const index =
      Math.ceil((today.startOf("month").day() + today.date()) / 7) - 1;
    updateCalendarValue(today, index);
    setClickedDate(today);
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
      displayMonthSetter(selectDate.year(), selectMonth + 1);
    }
    if (weekIndex !== selectWeekIndex) {
      setWeekIndex(selectWeekIndex);
    }
  };

  return (
    <motion.div
      variants={calendarVariants}
      initial="normal"
      animate="animate"
      className="relative flex flex-col items-center w-full h-full"
    >
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
          calendarData={calendarData}
          selectedPlan={selectedPlan}
          isWeekly={isWeekly}
          displayDate={displayDate}
          clickedDate={clickedDate}
          weekIndex={weekIndex}
          handleDateClick={handleDateClick}
        />
      </section>
      <div className="absolute bottom-[5px] w-full">
        <div className="mx-auto w-100pxr h-3pxr bg-gray-400 rounded-md"></div>
      </div>
    </motion.div>
  );
}

export default CalendarPicker;
