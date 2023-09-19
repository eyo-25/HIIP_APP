import { IoPlaySharp } from "react-icons/io5";
import { DEFAULTMEMO, StatusImg, planColor } from "./PlanCard.data";
import { SelectPlanModel, SimplePlanModel } from "@/comman/model/plan";
import { useRef, useState } from "react";
import { PencilIcon, XIcon } from "@/comman/assets";
import useOnClickOutside from "@/comman/hooks/onClickOutside";

type Props = {
  planData: SimplePlanModel;
  selectedPlanId?: string;
  selectPlan: (planData: SelectPlanModel) => void;
};

export default function PlanCard({
  planData,
  selectedPlanId,
  selectPlan,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const modalRef = useRef(null);

  const { title, memo, interval, _id, startDate, endDate, status, color } =
    planData;
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
  useOnClickOutside(modalRef, () => setIsModalOpen(false));

  return (
    <li
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
        <div
          ref={modalRef}
          className="absolute flex top-[-15px] right-20pxr gap-8pxr"
        >
          <button className="flex-center w-34pxr h-34pxr bg-gray-600 rounded-full">
            <XIcon />
          </button>
          <button
            className={`flex-center w-34pxr h-34pxr rounded-full ${planColor[color]}`}
          >
            <PencilIcon />
          </button>
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
