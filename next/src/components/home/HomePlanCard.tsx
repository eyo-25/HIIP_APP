import { HomePlanModel } from "@/comman/model/plan";
import { StatusImg, planColor } from "../plan/PlanCard.data";
import { IoPlaySharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Props = {
  data: HomePlanModel;
  idx: number;
  planListSort: (planList: string) => void;
};

export default function HomePlanCard({ data, idx, planListSort }: Props) {
  const { title, interval, _id, color, status } = data;
  const intervalArray = Array.from({ length: interval }, (_, index) => index);
  const isActive = idx === 0;
  const router = useRouter();

  const handleCardClick = () => {
    if (idx === 0 || status !== "pending") return;

    planListSort(_id);
  };
  const handleQuickStartClick = () => {
    if (status !== "pending") return;
    router.push(`/timer/${_id}`);
  };

  return (
    <li
      key={data._id}
      onContextMenu={(e) => e.preventDefault()}
      onClick={handleCardClick}
      className={`relative font-semibold cursor-pointer flex flex-col mb-18pxr px-35pxr rounded-md ${
        isActive ? "drop-shadow-md bg-white" : "drop-shadow-sm bg-gray-200"
      }`}
    >
      <div className="relative h-full desktop:py-35pxr py-30pxr">
        <div className="flex justify-between">
          <div className="flex">
            <h4
              className={`ellipsis mr-9pxr mt-2pxr font-semibold max-w-[180px] ${
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
