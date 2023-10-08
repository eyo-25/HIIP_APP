import dayjs from "dayjs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const BUTTONCLASSNAME = "w-23pxr h-23pxr cursor-pointer";

type Props = {
  handlePrevClick: () => void;
  handleTodayClick: () => void;
  handleNextClick: () => void;
  displayDate: dayjs.Dayjs;
};

export default function CalendarHeader({
  handlePrevClick,
  handleTodayClick,
  handleNextClick,
  displayDate,
}: Props) {
  return (
    <section className="flex w-[88%] justify-between desktop:mb-18pxr mb-10pxr">
      <IoChevronBack onClick={handlePrevClick} className={BUTTONCLASSNAME} />
      <p onClick={handleTodayClick} className="font-medium cursor-pointer">
        {displayDate.month() + 1} 월
      </p>
      <IoChevronForward onClick={handleNextClick} className={BUTTONCLASSNAME} />
    </section>
  );
}
