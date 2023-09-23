import dayjs from "dayjs";
import { useState } from "react";

const getHomeCalendar = (date: dayjs.Dayjs) => {
  const newArray: string[] = [];

  for (let i = 1; i <= 3; i++) {
    newArray.push(date.subtract(i, "d").format("YYYY-MM-DD"));
  }
  for (let i = 0; i <= 3; i++) {
    newArray.push(date.add(i, "d").format("YYYY-MM-DD"));
  }

  return newArray;
};

function HomeHeader() {
  const [weekArray, setWeekArray] = useState<string[]>(
    getHomeCalendar(dayjs())
  );
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs>(dayjs());

  const handleDateClick = (date: string) => {
    const seletedDate = dayjs(date);
    setWeekArray(getHomeCalendar(seletedDate));
    setClickedDate(seletedDate);
  };
  const handleTodayClick = () => {
    const today = dayjs();
    setWeekArray(getHomeCalendar(today));
    setClickedDate(today);
  };

  return (
    <div className="flex flex-col w-full h-full px-20pxr text-white">
      <div className="flex items-center justify-between h-[58%] px-5pxr pt-7pxr">
        <p>{clickedDate.month() + 1}월</p>
        <p>영어시험</p>
        <p className="cursor-pointer" onClick={handleTodayClick}>
          오늘
        </p>
      </div>
      <div className="h-[42%]">
        <ul className="flex h-full items-center justify-between">
          {weekArray.map((day, idx) => (
            <li
              key={day}
              onClick={() => handleDateClick(day)}
              className={`flex-center cursor-pointer w-28pxr h-28pxr rounded-full ${
                idx === 3 && "bg-white"
              }`}
            >
              <p className={`text-xs font-medium ${idx === 3 && "text-black"}`}>
                {day.split("-")[2]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomeHeader;
