import React from "react";
import { DAYS } from "@/comman/constants";

type Props = {
  selectedDays: number[];
  handleDayClick: (idx: number) => void;
};

function DaySelector({ selectedDays, handleDayClick }: Props) {
  return (
    <ul className="flex w-240pxr">
      {DAYS.map((day, idx) => (
        <li key={day} className="flex-center w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDayClick(idx);
            }}
            className={`text-sm font-normal w-30pxr h-30pxr rounded-sm ${
              selectedDays.includes(idx)
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {day}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DaySelector;
