"use client";

import IconTilte from "@/components/write/IconTilte";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { CalendarIcon, MemoIcon, PaintIcon, TimerIcon } from "@/comman/assets";
import { colors } from "./Write.data";
import { FormEvent, useState } from "react";
import TitleContainer from "@/components/write/TitleContainer";
import { DAYS } from "@/comman/constants";
import dayjs from "dayjs";
import IntervalSetter from "@/components/write/IntervalSetter";
import MonthDatePicker from "@/components/write/MonthDatePicker";

export type IntervalType = "interval" | "focusTime" | "breakTime";

type Props = {
  params: {
    slug: string;
  };
};

export default function DetailPage({ params: { slug } }: Props) {
  const [selectColor, setSelectColor] = useState<string>("red");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dayArray, setDayArray] = useState<number[]>([dayjs().day()]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [interval, setInterval] = useState<number>(5);
  const [focusTime, setFocusTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  const [isStart, setIsStart] = useState(true);

  const handleColorSelect = (color: string) => {
    setSelectColor(color);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleDateSet = (date: string) =>
    isStart ? setStartDate(date) : setEndDate(date);
  const handleDayClick = (idx: number) => {
    const isTrue = dayArray.includes(idx);

    if (isTrue) {
      setDayArray((days) => days.filter((day) => day !== idx));
    } else {
      setDayArray((days) => [...days, idx]);
    }
  };

  const handleCountUpClick = (value: number, type: IntervalType) => {
    if (type === "interval") {
      if (value === 10) return;
      setInterval((prev) => prev + 1);
    }
    if (type === "focusTime") {
      if (value === 50) return;
      setFocusTime((prev) => prev + 5);
    }
    if (type === "breakTime") {
      if (value === 20) return;
      setBreakTime((prev) => prev + 5);
    }
  };
  const handleCountDownClick = (value: number, type: IntervalType) => {
    if (type === "interval") {
      if (value === 1) return;
      setInterval((prev) => prev - 1);
    }
    if (type === "focusTime") {
      if (value <= 5) return;
      setFocusTime((prev) => prev - 5);
    }
    if (type === "breakTime") {
      if (value <= 5) return;
      setBreakTime((prev) => prev - 5);
    }
  };
  const modalClose = () => setIsModalOpen(false);

  return (
    <main className="bg-white text-lg font-semibold sroll h-full">
      {isModalOpen && (
        <div
          onClick={modalClose}
          className="absolute z-10 w-full h-full bg-black/60 cursor-pointer"
        >
          <MonthDatePicker
            isStart={isStart}
            modalClose={modalClose}
            handleDateSet={handleDateSet}
          />
        </div>
      )}
      <div className="flex flex-col mx-auto w-[88%] h-full">
        <section className="flex mt-15pxr mb-5pxr">
          <Link href={"/plan"}>
            <IoArrowBackOutline className="w-30pxr h-30pxr" />
          </Link>
        </section>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <section className="h-45pxr mb-20pxr border-b-gray-400 border-b">
            <input
              className="w-full h-full placeholder:font-normal placeholder:text-gray-500 px-5pxr"
              type="text"
              placeholder="플랜이름을 입력해 주세요."
            />
          </section>
          <section className="flex flex-col h-110pxr mb-32pxr border-b-gray-400 border-b">
            <IconTilte icon={<MemoIcon />} text={"메모"} />
            <textarea
              placeholder="간단한 메모나 상세 계획을 적어주세요."
              className="py-4pxr font-normal w-full h-full placeholder:text-gray-500 px-5pxr"
            />
          </section>
          <section className="flex flex-col mb-32pxr">
            <IconTilte icon={<PaintIcon />} text={"플랜 색상"} />
            <div className="flex w-full gap-16pxr px-5pxr py-12pxr border-y-gray-400 border-y">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`bg-${color} w-20pxr h-20pxr rounded-full ${
                    selectColor !== color && "opacity-30"
                  }`}
                ></button>
              ))}
            </div>
          </section>
          <section className="flex flex-col mb-32pxr">
            <IconTilte icon={<CalendarIcon />} text={"플랜 기간"} />
            <div>
              <TitleContainer title="시작날짜" id="startDate">
                <input
                  id={"startDate"}
                  value={startDate}
                  readOnly
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsStart(true);
                  }}
                  className="bg-gray-200 caret-transparent w-240pxr h-27pxr rounded-sm text-center font-normal"
                />
              </TitleContainer>
              <TitleContainer title="종료날짜" id="endDate">
                <input
                  id={"endDate"}
                  value={endDate}
                  readOnly
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsStart(false);
                  }}
                  className="bg-gray-200 caret-transparent w-240pxr h-27pxr rounded-sm text-center font-normal"
                />
              </TitleContainer>
              <TitleContainer title="요일" id="day">
                <ul className="flex w-240pxr">
                  {DAYS.map((day, idx) => (
                    <li key={day} className="flex-center w-full">
                      <button
                        onClick={() => handleDayClick(idx)}
                        className={`text-sm font-normal w-30pxr h-30pxr rounded-sm ${
                          dayArray.includes(idx)
                            ? "bg-gray-900 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {day}
                      </button>
                    </li>
                  ))}
                </ul>
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
      </div>
    </main>
  );
}
