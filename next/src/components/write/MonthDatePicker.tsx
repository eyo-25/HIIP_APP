import { useEffect, useMemo, useState } from "react";
import CalendarHeader from "../calendar/CalendarHeader";
import dayjs from "dayjs";
import CalendarDays from "../calendar/CalendarDays";
import { getCalendar } from "@/comman/utils/calendar";
import CalendarCard from "../calendar/CalendarCard";
import { SimplePlanModel } from "@/comman/model/plan";

type Props = {
  isStartDate: boolean;
  modalClose: () => void;
  handleDateSet: (date: string) => void;
};

function MonthDatePicker({ modalClose, handleDateSet, isStartDate }: Props) {
  const today = useMemo(() => dayjs(), []);
  const [displayDate, setDisplayDate] = useState<dayjs.Dayjs>(today);
  const [calendarArray, setCalendarArray] = useState<string[]>();

  useEffect(() => {
    const calendarDates = getCalendar(displayDate);
    setCalendarArray(calendarDates);
  }, [displayDate]);

  const handlePrevClick = () => setDisplayDate((prev) => prev.subtract(1, "M"));
  const handleTodayClick = () => {
    setDisplayDate(today);
  };
  const handleNextClick = () => setDisplayDate((prev) => prev.add(1, "M"));

  const handleDateClick = (date: string, planList: SimplePlanModel[]) => {
    const selectDate = dayjs(date);
    if (selectDate.isBefore(today, "d")) return;
    handleDateSet(selectDate.format("YYYY-MM-DD"));
    modalClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col px-8pxr items-center fixed bg-white w-full mobile:h-390pxr h-400pxr desktop:h-430pxr bottom-0pxr rounded-t-3xl max-w-md"
    >
      <div className="flex flex-col items-center max-w-sm w-full">
        <h5 className="py-23pxr text-gray-700">
          {isStartDate ? "시작날짜" : "종료날짜"}를 설정해 주세요
        </h5>
        <CalendarHeader
          handlePrevClick={handlePrevClick}
          handleTodayClick={handleTodayClick}
          handleNextClick={handleNextClick}
          displayDate={displayDate}
        />
      </div>
      <section className="w-full desktop:px-7pxr font-medium h-[88%] max-w-sm">
        <CalendarDays />
        <ul className="grid grid-cols-7 text-sm h-[84%]">
          {calendarArray?.map((date) => (
            <CalendarCard
              handleDateClick={handleDateClick}
              clickedDate={today}
              displayDate={displayDate}
              displayType="month"
              data={{ date: date, list: [], colors: [] }}
              key={date}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MonthDatePicker;
