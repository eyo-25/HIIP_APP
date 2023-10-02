"use client";

import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import MonthDatePicker from "@/components/write/MonthDatePicker";
import WriteForm from "@/components/write/WriteForm";
import { PlanDetailModel } from "@/comman/model/plan";
import dayjs from "dayjs";

type Props = {
  planData?: PlanDetailModel;
  planId?: string;
  mode: "edit" | "creat";
};

function PlanWriter({ planData, mode, planId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>("");
  const [isStart, setIsStart] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);

  const handleDateSet = (date: string) => {
    isStartDate ? setStartDate(date) : setEndDate(date);
  };
  const modalOpen = () => setIsModalOpen(true);
  const modalClose = () => setIsModalOpen(false);

  useEffect(() => {
    if (planData) {
      const { startDate, endDate, isStart } = planData;
      setStartDate(startDate);
      setEndDate(endDate);
      setIsStart(isStart);
    }
  }, [planData]);

  return (
    <main className="bg-white text-lg font-semibold sroll h-full">
      {isModalOpen && (
        <div
          onClick={modalClose}
          className="absolute z-30 w-full h-full bg-black/60 cursor-pointer"
        >
          <MonthDatePicker
            isStartDate={isStartDate}
            modalClose={modalClose}
            handleDateSet={handleDateSet}
          />
        </div>
      )}
      <div className="flex flex-col mx-auto w-[88%] h-full">
        <section className="flex mt-15pxr mb-10pxr">
          <Link href={"/plan"}>
            <IoArrowBackOutline className="w-30pxr h-30pxr" />
          </Link>
        </section>
        <WriteForm
          planId={planId}
          mode={mode}
          planData={planData}
          startDate={startDate}
          endDate={endDate}
          isStart={isStart}
          setEndDate={setEndDate}
          setIsStartDate={setIsStartDate}
          modalOpen={modalOpen}
        />
      </div>
    </main>
  );
}

export default PlanWriter;
