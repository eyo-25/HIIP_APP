import { IoPlaySharp } from "react-icons/io5";
import { DEFAULTMEMO, StatusImg, planColor } from "./PlanCard.data";
import { SelectPlanModel, SimplePlanModel } from "@/comman/model/plan";
import { useRef, useState } from "react";
import { PencilIcon, XIcon } from "@/comman/assets";
import Link from "next/link";
import { mutate } from "swr";

import { removePlan, useOnClickOutside } from "@/comman/hooks";

type Props = {
  planData: SimplePlanModel;
  selectedPlanId?: string;
  selectPlan: (planData: SelectPlanModel | null) => void;
};

export default function PlanCard({
  planData,
  selectedPlanId,
  selectPlan,
}: Props) {
  const { title, memo, interval, _id, startDate, endDate, status, color } =
    planData;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const cardRef = useRef(null);
  const intervalArray = Array.from({ length: interval }, (_, index) => index);
  const isActive = selectedPlanId === _id;

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
      removePlan(_id)
        .then((res) => {
          mutate(`/api/plan`);
          selectPlan(null);
        })
        .catch((err) => alert(err.toString()));
    }
  };

  return (
    <li
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
        <div className="absolute flex top-[-22px] right-15pxr">
          <button
            onClick={handleDeleteClick}
            className="z-20 flex-center w-45pxr h-45pxr"
          >
            <div className="flex-center w-34pxr h-34pxr rounded-full drop-shadow-md bg-gray-600">
              <XIcon />
            </div>
          </button>
          <Link
            className="z-20 flex-center w-45pxr h-45pxr"
            href={`/write/edit/${_id}`}
          >
            <div
              className={`flex-center drop-shadow-md w-34pxr h-34pxr rounded-full ${planColor[color]}`}
            >
              <PencilIcon />
            </div>
          </Link>
        </div>
      )}
      <div className="relative py-35pxr">
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
            <IoPlaySharp className="text-gray-600" />
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
    </li>
  );
}
