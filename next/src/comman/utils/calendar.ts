import dayjs from "dayjs";

export const getWeeklyCalendar = (displayDate: dayjs.Dayjs) => {
  const startDate = displayDate.startOf("week");
  const calendarArray = Array.from({ length: 7 }, (_, index) => {
    const currentDate = startDate.add(index, "d");
    return currentDate.format("YYYY-MM-DD");
  });

  return [calendarArray];
};

export const getMonthCalendar = (displayDate: dayjs.Dayjs) => {
  const startDate = displayDate.startOf("month");
  const startDay = startDate.day();

  const calendarArray = Array.from({ length: 42 }, (_, index) => {
    const currentDate = startDate.add(index - startDay, "d");
    return currentDate.format("YYYY-MM-DD");
  });

  const doubleArray = [];
  for (let i = 0; i < calendarArray.length; i += 7) {
    doubleArray.push(calendarArray.slice(i, i + 7));
  }

  return doubleArray;
};
