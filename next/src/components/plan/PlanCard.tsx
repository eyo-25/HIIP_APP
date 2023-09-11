import { PlanType } from "@/comman/types";
import { IoPlaySharp } from "react-icons/io5";

type Props = {
  data: PlanType;
};

const DEFAULTMEMO = (
  <>
    계획 실천 후 피드백이나 <br />
    실천 중 메모를 적어주세요
  </>
);

export default function PlanCard({ data }: Props) {
  const { title, memo, interval, status, id } = data;
  const intervalArray = Array.from({ length: interval }, (_, index) => index);

  return (
    <li className="relative flex flex-col mt-18pxr px-35pxr bg-white rounded-md drop-shadow-xl">
      <div className="relative py-35pxr">
        <div className="flex justify-between mb-15pxr">
          <h4 className="ellipsis font-semibold max-w-[190px]">{title}</h4>
          <div className="flex items-center">
            <p className="mr-12pxr text-lg text-gray-800">
              {interval} <span className="text-base text-gray-700">SET</span>
            </p>
            <IoPlaySharp className="text-gray-600" />
          </div>
        </div>
        <p className="text-gray-600 font-normal h-48pxr ellipsis-2">
          {memo === "" ? DEFAULTMEMO : memo}
        </p>
        <ul className="absolute flex gap-[1%] bottom-0pxr w-full h-7pxr">
          {intervalArray.map((index) => (
            <li className="w-full bg-black" key={index}></li>
          ))}
        </ul>
      </div>
    </li>
  );
}
