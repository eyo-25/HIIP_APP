import dayjs from "dayjs";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import IconTilte from "./IconTilte";
import { CalendarIcon, MemoIcon, PaintIcon, TimerIcon } from "@/comman/assets";
import { colors } from "@/app/write/Write.data";
import TitleContainer from "./TitleContainer";
import IntervalSetter from "./IntervalSetter";
import { useRouter } from "next/navigation";
import ColorSelector from "./ColorSelector";
import DaySelector from "./DaySelector";
import { ColorType, FormModel, PlanDataModel } from "@/comman/model/plan";
import { mutate } from "swr";
import { createPlan, updatePlan } from "@/comman/hooks";
import { useSetAtom } from "jotai";
import { isLoadingSetter } from "@/store";

type IntervalType = "interval" | "focusTime" | "breakTime";
type Props = {
  mode: "edit" | "creat";
  planData?: PlanDataModel;
  startDate: string;
  endDate: string;
  isStart: boolean;
  planId?: string;
  setIsStartDate: Dispatch<SetStateAction<boolean>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  modalOpen: () => void;
};

function WriteForm({
  planId,
  mode,
  planData,
  startDate,
  endDate,
  isStart,
  setIsStartDate,
  setEndDate,
  modalOpen,
}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(planData ? planData.title : "");
  const [memo, setMemo] = useState<string>(planData ? planData.memo : "");
  const [selectedColor, setSelectedColor] = useState<ColorType>("red");
  const [selectedDays, setSelectedDays] = useState<number[]>([dayjs().day()]);
  const [interval, setInterval] = useState<number>(5);
  const [focusTime, setFocusTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  const setIsLoading = useSetAtom(isLoadingSetter);

  useEffect(() => {
    if (planData) {
      const { title, memo, color, days, interval, focusTime, breakTime } =
        planData;
      setTitle(title);
      setMemo(memo);
      setSelectedColor(color);
      setSelectedDays(days);
      setInterval(interval);
      setFocusTime(focusTime);
      setBreakTime(breakTime);
    }
  }, [planData]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.split(" ").join("").length <= 0) {
      return alert("제목은 띄워쓰기를 제외하고 한글자이상 입력해 주세요");
    }
    if (memo.split(" ").join("").length <= 0) {
      return alert("제목은 띄워쓰기를 제외하고 한글자이상 입력해 주세요");
    }
    if (startDate === "") return alert("시작날짜를 설정해 주세요");
    if (endDate === "") return alert("종료날짜를 설정해 주세요");
    if (dayjs(startDate).isAfter(endDate, "day")) {
      setEndDate("");
      return alert("종료날짜는 시작날짜와 같거나 이후로 설정해 주세요.");
    }
    if (selectedDays.length <= 0) return alert("요일을 하루이상 선택해 주세요");
    let isNotDate = false;
    let currentDate = dayjs(startDate);
    while (currentDate.isSameOrBefore(endDate, "day")) {
      if (selectedDays.includes(currentDate.day())) {
        isNotDate = true;
        break;
      }
      currentDate = currentDate.add(1, "day");
    }

    if (!isNotDate) {
      return alert("기간중에 선택한 요일에 해당하는 날짜가 있어야 합니다.");
    }

    setIsLoading(true);

    const formData: FormModel = {
      title,
      memo,
      startDate,
      endDate,
      interval,
      focusTime,
      breakTime,
      color: selectedColor,
      days: selectedDays,
    };

    if (mode === "creat") {
      createPlan(formData)
        .then(() => router.push("/plan"))
        .catch((err) => alert(err.toString()))
        .finally(() => setIsLoading(false));
    }
    if (mode === "edit" && planId) {
      updatePlan(planId, formData)
        .then(() => {
          mutate(`/api/plan/${planId}`);
          router.push("/plan");
        })
        .catch((err) => alert(err.toString()))
        .finally(() => setIsLoading(false));
    }
  };
  const handleDayClick = (idx: number) => {
    if (isStart) {
      return alert("기록이 시작된 플랜은 날짜를 변경할 수 없습니다.");
    }
    const isTrue = selectedDays.includes(idx);

    if (isTrue) {
      setSelectedDays((days) => days.filter((day) => day !== idx));
    } else {
      setSelectedDays((days) => [...days, idx]);
    }
  };
  const handleCountUpClick = (value: number, type: IntervalType) => {
    if (isStart) {
      return alert("기록이 시작된 플랜은 인터벌 설정을 변경할 수 없습니다.");
    }

    switch (type) {
      case "interval":
        if (value === 10) return;
        setInterval((prev) => prev + 1);
        break;
      case "focusTime":
        if (value === 50) return;
        setFocusTime((prev) => prev + 5);
        break;
      case "breakTime":
        if (value === 20) return;
        setBreakTime((prev) => prev + 5);
        break;
      default:
        break;
    }
  };
  const handleCountDownClick = (value: number, type: IntervalType) => {
    if (isStart) {
      return alert("기록이 시작된 플랜은 인터벌 설정을 변경할 수 없습니다.");
    }

    switch (type) {
      case "interval":
        if (value === 1) return;
        setInterval((prev) => prev - 1);
        break;
      case "focusTime":
        if (value <= 5) return;
        setFocusTime((prev) => prev - 5);
        break;
      case "breakTime":
        if (value <= 5) return;
        setBreakTime((prev) => prev - 5);
        break;
      default:
        break;
    }
  };
  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { tagName, value } = e.target;

    switch (tagName) {
      case "INPUT":
        if (value.length > 10) return;
        setTitle(value);
        break;
      case "TEXTAREA":
        if (value.length > 35) return;
        setMemo(value);
        break;
      default:
        break;
    }
  };
  const handleSelectColor = (color: ColorType) => {
    setSelectedColor(color);
  };
  const handleStartDateClick = () => {
    if (isStart) {
      return alert("기록이 시작된 플랜은 시작날짜를 변경할 수 없습니다.");
    }
    modalOpen();
    setIsStartDate(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <section className="h-45pxr mb-20pxr border-b-gray-400 border-b">
        <input
          className="tracking-wide w-full h-full placeholder:font-normal placeholder:text-gray-500 px-5pxr"
          required
          type="text"
          value={title}
          onChange={handleOnchange}
          placeholder="플랜이름을 입력해 주세요."
        />
      </section>
      <section className=" flex flex-col h-110pxr mb-32pxr border-b-gray-400 border-b">
        <IconTilte icon={<MemoIcon />} text={"메모"} />
        <textarea
          value={memo}
          required
          onChange={handleOnchange}
          placeholder="간단한 메모나 상세 계획을 적어주세요."
          className="tracking-wide py-4pxr font-normal w-full h-full placeholder:text-gray-500 px-5pxr"
        />
      </section>
      <section className="flex flex-col mb-32pxr">
        <IconTilte icon={<PaintIcon />} text={"플랜 색상"} />
        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          handleSelectColor={handleSelectColor}
        />
      </section>
      <section className="flex flex-col mb-32pxr">
        <IconTilte icon={<CalendarIcon />} text={"플랜 기간"} />
        <div>
          <TitleContainer title="시작날짜" id="startDate">
            <input
              id={"startDate"}
              value={startDate}
              readOnly
              onClick={handleStartDateClick}
              className="bg-gray-200 tracking-wide caret-transparent w-240pxr h-27pxr rounded-sm text-center font-normal"
            />
          </TitleContainer>
          <TitleContainer title="종료날짜" id="endDate">
            <input
              id={"endDate"}
              value={endDate}
              readOnly
              onClick={() => {
                modalOpen();
                setIsStartDate(false);
              }}
              className="bg-gray-200 tracking-wide caret-transparent w-240pxr h-27pxr rounded-sm text-center font-normal"
            />
          </TitleContainer>
          <TitleContainer title="요일" id="day">
            <DaySelector
              selectedDays={selectedDays}
              handleDayClick={handleDayClick}
            />
          </TitleContainer>
        </div>
      </section>
      <section className="flex flex-col">
        <IconTilte icon={<TimerIcon />} text={"인터벌 설정"} />
        <TitleContainer title="인터벌 세트" id="endDate">
          <IntervalSetter
            leftClick={() => handleCountDownClick(interval, "interval")}
            rightClick={() => handleCountUpClick(interval, "interval")}
            value={interval}
            unit="SET"
          />
        </TitleContainer>
        <TitleContainer title="집중" id="endDate">
          <IntervalSetter
            leftClick={() => handleCountDownClick(focusTime, "focusTime")}
            rightClick={() => handleCountUpClick(focusTime, "focusTime")}
            value={focusTime}
            unit="m"
          />
        </TitleContainer>
        <TitleContainer title="휴식" id="endDate">
          <IntervalSetter
            leftClick={() => handleCountDownClick(breakTime, "breakTime")}
            rightClick={() => handleCountUpClick(breakTime, "breakTime")}
            value={breakTime}
            unit="m"
          />
        </TitleContainer>
      </section>
      <button className="font-normal text-base rounded-md h-40pxr w-170pxr mx-auto mt-45pxr mb-50pxr bg-gray-900 text-white">
        완료
      </button>
    </form>
  );
}

export default WriteForm;
