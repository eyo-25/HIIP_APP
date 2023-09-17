import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import CalendarPicker from "./CalendarPicker";
import dayjs from "dayjs";
import {
  CalendaMemoModel,
  CalendarModel,
  PlanModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import { getCalendar } from "@/comman/utils/calendar";
import { calculatePlanStatus, filterPlansByDate } from "./calendarUtils";

type Props = {
  planListData: PlanModel[];
  isWeekly: boolean;
  selectedPlan?: SelectPlanModel;
  setPlanList: Dispatch<SetStateAction<SimplePlanModel[]>>;
};

function Calendar({
  planListData,
  isWeekly,
  selectedPlan,
  setPlanList,
}: Props) {
  const today = useMemo(() => dayjs(), []);
  const [calendarMemo, setCalendarMemo] = useState<CalendaMemoModel>({});
  const [calendarArray, setCalendarArray] = useState<CalendarModel[][]>([]);
  const [displayDate, setDisplayDate] = useState<dayjs.Dayjs>(today);
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs>(today);
  const [displayMonth, setDisplayMonth] = useState<number>(today.month());

  const updateCalendar = () => {
    const displayYear = displayDate.year();
    const displayMonth = displayDate.month();
    const memoKey = `${displayYear}-${displayMonth}`;
    if (calendarMemo[memoKey]) {
      setCalendarArray(calendarMemo[memoKey]);
      return;
    }

    const calendarDates = getCalendar(displayDate);

    const updateCalendarArray = calendarDates.map((date: string) => {
      const calendarDate = dayjs(date);

      const filteredPlanList = filterPlansByDate(calendarDate, planListData);
      const colors = filteredPlanList.map((plan) => plan.color);

      const updatedPlans = filteredPlanList.map((plan) => {
        let planStatus = calculatePlanStatus(plan, date, today);

        const { title, memo, interval, color, _id, startDate, endDate } = plan;
        return {
          title,
          memo,
          interval,
          color,
          _id,
          status: planStatus,
          startDate,
          endDate,
        };
      });

      if (calendarDate.isSame(clickedDate, "day") && 0 < updatedPlans.length) {
        setPlanList(updatedPlans);
      }
      return { date, list: updatedPlans, colors };
    });

    const doubleArray: CalendarModel[][] = [];
    for (let i = 0; i < updateCalendarArray.length; i += 7) {
      doubleArray.push(updateCalendarArray.slice(i, i + 7));
    }
    setCalendarArray(doubleArray);

    setCalendarMemo((memo) => {
      const newArray = { ...memo };
      newArray[memoKey] = doubleArray;
      return newArray;
    });
  };

  useEffect(() => {
    if (!planListData) return;
    updateCalendar();
  }, [planListData, displayMonth]);

  const handleTodayClick = () => {
    setDisplayDate(today);
    setClickedDate(today);
    setDisplayMonth(today.month());
    const displayYear = today.year();
    const displayMonth = today.month();
    const memoKey = `${displayYear}-${displayMonth}`;
    const index = Math.ceil((today.day() + today.date()) / 7);

    setPlanList(calendarMemo[memoKey][index][today.day()].list);
  };

  return (
    <CalendarPicker
      isWeekly={isWeekly}
      selectedPlan={selectedPlan}
      calendarArray={calendarArray}
      displayDate={displayDate}
      clickedDate={clickedDate}
      setDisplayDate={setDisplayDate}
      setClickedDate={setClickedDate}
      setPlanList={setPlanList}
      setDisplayMonth={setDisplayMonth}
      handleTodayClick={handleTodayClick}
    />
  );
}

export default React.memo(Calendar);
