import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import dayjs from "dayjs";
import {
  CalendaMemoModel,
  CalendarModel,
  PlanModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import CalendarPicker from "./CalendarPicker";
import { getCalendar } from "@/comman/utils/calendar";
import {
  calculatePlanStatus,
  dateMemoKey,
  filterPlansByDate,
} from "./calendarUtils";

type Props = {
  planListData: PlanModel[];
  isWeekly: boolean;
  selectedPlan: SelectPlanModel | null;
  calendarMemo: CalendaMemoModel;
  setPlanList: Dispatch<SetStateAction<SimplePlanModel[]>>;
  setCalendarMemo: Dispatch<SetStateAction<CalendaMemoModel>>;
};

function Calendar({
  planListData,
  isWeekly,
  selectedPlan,
  calendarMemo,
  setPlanList,
  setCalendarMemo,
}: Props) {
  const today = useMemo(() => dayjs(), []);
  const [calendarArray, setCalendarArray] = useState<CalendarModel[][]>([]);
  const [displayDate, setDisplayDate] = useState<dayjs.Dayjs>(today);
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs>(today);
  const [displayMonth, setDisplayMonth] = useState<number>(today.month());

  const updateCalendar = (isReset: boolean) => {
    const calendarDates = getCalendar(displayDate);

    const updateCalendar = calendarDates.map((date: string) => {
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

      if (calendarDate.isSame(clickedDate, "day")) {
        setPlanList(updatedPlans);
      }
      return { date, list: updatedPlans, colors };
    });

    const updateCalendarArray: CalendarModel[][] = [];
    for (let i = 0; i < updateCalendar.length; i += 7) {
      updateCalendarArray.push(updateCalendar.slice(i, i + 7));
    }
    setCalendarArray(updateCalendarArray);

    const memoKey = dateMemoKey(displayDate);
    if (isReset) {
      setCalendarMemo(() => {
        const newArray: CalendaMemoModel = {};
        newArray[memoKey] = updateCalendarArray;
        return newArray;
      });
    } else {
      setCalendarMemo((memo) => {
        const newArray = { ...memo };
        newArray[memoKey] = updateCalendarArray;
        return newArray;
      });
    }
  };

  useEffect(() => {
    updateCalendar(true);
  }, [planListData]);

  useEffect(() => {
    if (!planListData) return;

    const memoKey = dateMemoKey(displayDate);
    if (calendarMemo[memoKey]) {
      setCalendarArray(calendarMemo[memoKey]);
      return;
    }

    updateCalendar(false);
  }, [displayMonth]);

  return (
    <CalendarPicker
      isWeekly={isWeekly}
      selectedPlan={selectedPlan}
      calendarArray={calendarArray}
      displayDate={displayDate}
      clickedDate={clickedDate}
      calendarMemo={calendarMemo}
      setDisplayDate={setDisplayDate}
      setClickedDate={setClickedDate}
      setPlanList={setPlanList}
      setDisplayMonth={setDisplayMonth}
    />
  );
}

export default React.memo(Calendar);
