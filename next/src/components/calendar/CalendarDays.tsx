import { DAYS } from "@/comman/constants";

type Props = {
  isWeekly?: boolean;
};

export default function CalendarDays({ isWeekly }: Props) {
  return (
    <ul
      className={`grid grid-cols-7 mobile:text-xs text-sm ${
        isWeekly ? "h-[40%]" : "desktop:h-[9%] mobile:h-[6%] h-[8%]"
      }`}
    >
      {DAYS.map((day) => (
        <li className="mx-auto" key={day}>
          {day}
        </li>
      ))}
    </ul>
  );
}
