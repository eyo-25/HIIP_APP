import { useRef, useState } from "react";
import Link from "next/link";
import { mutate } from "swr";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { IoPlaySharp } from "react-icons/io5";
import { DEFAULTMEMO, StatusImg, planColor } from "./PlanCard.data";
import { SelectPlanModel, SimplePlanModel } from "@/comman/model/plan";
import { PencilIcon, XIcon } from "@/comman/assets";
import { removePlan, useOnClickOutside } from "@/comman/hooks";
import { useRouter } from "next/navigation";
import { today } from "@/comman/utils/today";
import { planCardVariants } from "./PlanVariants";

type Props = {
  planData: SimplePlanModel;
  selectedPlanId?: string;
  clickedDate: dayjs.Dayjs;
  selectPlan: (planData: SelectPlanModel | null) => void;
  loadingSetter: (isBoardLoading: boolean) => void;
};

export default function PlanCard({
  planData,
  selectedPlanId,
  clickedDate,
  selectPlan,
  loadingSetter,
}: Props) {
  const { title, memo, interval, _id, startDate, endDate, status, color } =
    planData;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const cardRef = useRef(null);
  const intervalArray = Array.from({ length: interval }, (_, index) => index);
  const isActive = selectedPlanId === _id;
  const router = useRouter();

  const handleSelectPlan = () => {
    !isActive && selectPlan({ title, _id, startDate, endDate });
  };
  const handleStartPress = () => {
    handleSelectPlan();
    setPressTimer(
      setTimeout(() => {
        setIsModalOpen(true);
      }, 1000)
    );
  };
  const handleEndPress = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
    }
  };
  useOnClickOutside(cardRef, () => setIsModalOpen(false));

  const handleDeleteClick = () => {
    const ok = confirm("플랜을 삭제하시겠습니까?");
    if (ok) {
      loadingSetter(true);
      removePlan(_id)
        .then((res) => {
          let currentMonth = dayjs(startDate);
          while (currentMonth.isSameOrBefore(endDate, "month")) {
            mutate(
              `/api/calendar?date=${currentMonth.year()}-${
                currentMonth.month() + 1
              }`
            );
            currentMonth = currentMonth.add(1, "month");
          }
          selectPlan(null);
        })
        .catch((err) => alert(err.toString()))
        .finally(() => {
          setTimeout(() => {
            loadingSetter(false);
          }, 100);
        });
    }
  };
  const handleQuickStartClick = () => {
    if (status !== "pending") return;
    if (!clickedDate.isSame(today, "day")) return;
    router.push(`/timer/${_id}`);
  };

  return (
    <motion.li
      variants={planCardVariants}
      whileTap="click"
      ref={cardRef}
      onContextMenu={(e) => e.preventDefault()}
      onClick={handleSelectPlan}
      onMouseDown={handleStartPress}
      onMouseUp={handleEndPress}
      onTouchStart={handleStartPress}
      onTouchEnd={handleEndPress}
      className={`relative cursor-pointer flex flex-col mt-18pxr px-35pxr rounded-md bg-white ${
        isActive ? "drop-shadow-xl" : "drop-shadow-sm"
      }`}
    >
      {isModalOpen && (
        <div className="absolute flex desktop:top-[-22px] top-[-18px] right-15pxr">
          <button
            onClick={handleDeleteClick}
            className="z-20 flex-center desktop:w-45pxr desktop:h-45pxr w-40pxr h-40pxr"
          >
            <div className="flex-center desktop:w-34pxr desktop:h-34pxr w-32pxr h-32pxr rounded-full drop-shadow-md bg-gray-600">
              <XIcon />
            </div>
          </button>
          <Link
            className="z-20 flex-center desktop:w-45pxr desktop:h-45pxr w-40pxr h-40pxr"
            href={`/write/edit/${_id}`}
          >
            <div
              className={`flex-center drop-shadow-md desktop:w-34pxr w-32pxr h-32pxr desktop:h-34pxr rounded-full ${planColor[color]}`}
            >
              <PencilIcon />
            </div>
          </Link>
        </div>
      )}
      <div className="relative desktop:py-35pxr py-25pxr">
        <div className="flex justify-between mb-15pxr">
          <div className="flex">
            <h4
              className={`ellipsis mr-9pxr font-semibold max-w-[180px] ${
                isActive ? "text-gray-900" : "text-gray-800"
              }`}
            >
              {title.slice(0, 12)}
            </h4>
            <div className={`mt-2pxr ${!isActive && "opacity-50"}`}>
              {StatusImg[status]}
            </div>
          </div>
          <div className="flex items-center">
            <p className={"mr-12pxr text-lg text-gray-900"}>
              {interval}{" "}
              <span className="text-base text-gray-700 font-normal">SET</span>
            </p>
            <IoPlaySharp
              onClick={handleQuickStartClick}
              className="text-gray-600"
            />
          </div>
        </div>
        <p className="text-gray-600 font-normal h-48pxr ellipsis-2">
          {memo === "" ? DEFAULTMEMO : memo}
        </p>
        <ul className="absolute flex gap-[1%] bottom-0pxr w-full h-7pxr">
          {intervalArray.map((index) => (
            <li
              className={`w-full ${planColor[color]} ${
                !isActive && "opacity-50"
              }`}
              key={index}
            ></li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
