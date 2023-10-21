import { DAYS } from "@/comman/constants";
import { today } from "@/comman/utils/today";
import dayjs from "dayjs";

type Props = {
  weekSuccessArr: number[];
  isSuccess?: boolean;
};

function WeeklyGraph({ weekSuccessArr, isSuccess = true }: Props) {
  return (
    <div className="relative flex flex-col h-full w-full">
      <div className="grid grid-rows-4 my-6pxr h-full pb-18pxr">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="border-t border-gray-500"></div>
        ))}
        <ul className="absolute grid grid-cols-7 h-full w-full">
          {DAYS.map((day, idx) => (
            <li key={day} className="flex flex-col justify-end items-center">
              <div
                className={`w-[50%] mb-4pxr ${
                  today.day() === idx
                    ? isSuccess
                      ? "bg-blue"
                      : "bg-red"
                    : "bg-gray-600"
                }`}
                style={{ height: `${weekSuccessArr[idx + 1] + 0.5}%` }}
              ></div>
              <p className="text-sm text-gray-900">{day}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WeeklyGraph;
