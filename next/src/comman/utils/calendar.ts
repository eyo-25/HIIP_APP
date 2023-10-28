import dayjs from "dayjs";

export const getCalendar = (displayMonth: dayjs.Dayjs): dayjs.Dayjs[] => {
  const startDate = displayMonth.startOf("month");
  const startDay = startDate.day();

  return Array.from({ length: 42 }, (_, index) =>
    startDate.add(index - startDay, "d")
  );
};
