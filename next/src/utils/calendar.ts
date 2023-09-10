import dayjs from "dayjs";

export const getWeeklyCalendar = (displayDate: dayjs.Dayjs) => {
  console.log(displayDate.format("YYYY MM DD"));

  const newCalendarArray = [];
  const todayDay = displayDate.day();
  console.log(todayDay);

  for (let i = 0; i < todayDay; i++) {
    newCalendarArray.push(
      displayDate.subtract(todayDay - i, "d").format("YYYY-MM-DD")
    );
  }
  for (let i = 0; i < 7 - todayDay; i++) {
    newCalendarArray.push(displayDate.add(i, "d").format("YYYY-MM-DD"));
  }

  console.log(newCalendarArray);
  return newCalendarArray;
};

export const getMonthCalendar = (displayDate: dayjs.Dayjs) => {
  const newCalendarArray = [];
  let startDate = displayDate.startOf("month");
  let startDay = startDate.day();

  for (let i = startDay; i >= 1; i--) {
    newCalendarArray.push(startDate.subtract(i, "d").format("YYYY-MM-DD"));
  }
  for (let i = 0; i < 42 - startDay; i++) {
    newCalendarArray.push(startDate.add(i, "d").format("YYYY-MM-DD"));
  }

  return newCalendarArray;
};
