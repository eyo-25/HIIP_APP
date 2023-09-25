import { HomePlanModel } from "@/comman/model/plan";
import dayjs from "dayjs";
import { useState } from "react";

const getHomeCalendar = (date: dayjs.Dayjs) => {
  const newArray: string[] = [];

  for (let i = 3; 0 < i; i--) {
    newArray.push(date.subtract(i, "d").format("YYYY-MM-DD"));
  }
  for (let i = 0; i <= 3; i++) {
    newArray.push(date.add(i, "d").format("YYYY-MM-DD"));
  }

  return newArray;
};

type Props = {
  selectedPlan: HomePlanModel | undefined;
};

function HomeHeader({ selectedPlan }: Props) {
  const [weekArray, setWeekArray] = useState<string[]>(
    getHomeCalendar(dayjs())
  );

  return (
    <div className="flex flex-col w-full h-full px-20pxr text-white">
      <div className="flex items-center justify-between h-[58%] px-5pxr pt-7pxr">
        <p>{dayjs().month() + 1}월</p>
        <p>{selectedPlan ? selectedPlan.title : ""}</p>
      </div>
      <div className="h-[42%]">
        <ul className="flex h-full items-center justify-between">
          {weekArray.map((day, idx) => (
            <li
              key={day}
              className={`flex-center w-28pxr h-28pxr rounded-full ${
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
