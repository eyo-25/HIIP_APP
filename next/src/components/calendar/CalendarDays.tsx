import { DAYS } from "@/comman/constants";

type Props = {
  isWeekly?: boolean;
};

export default function CalendarDays({ isWeekly }: Props) {
  return (
    <ul
      className={`grid grid-cols-7 text-sm ${isWeekly ? "h-[40%]" : "h-[9%]"}`}
    >
      {DAYS.map((day) => (
        <li className="mx-auto" key={day}>
          {day}
        </li>
      ))}
    </ul>
  );
}