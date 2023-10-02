import dayjs from "dayjs";

export const getCalendar = (displayMonth: dayjs.Dayjs) => {
  const startDate = displayMonth.startOf("month");
  const startDay = startDate.day();

  const calendarArray = Array.from({ length: 42 }, (_, index) => {
    const currentDate = startDate.add(index - startDay, "d");
    return currentDate.format("YYYY-MM-DD");
  });

  return calendarArray;
};
