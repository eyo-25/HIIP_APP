import { useLayoutEffect, useState } from "react";
import { randomWiseSaying } from "@/comman/utils/randomWiseSaying";

type Props = {
  isExtend: boolean;
};

function HomeInfo({ isExtend }: Props) {
  const [wiseSaying, setWiseSaying] = useState<string[]>([]);

  useLayoutEffect(() => setWiseSaying(randomWiseSaying()), []);

  return (
    <div className="flex flex-col items-center h-full text-white">
      {!isExtend && (
        <div className="flex-center flex-col text-2xl leading-loose h-[78%]">
          {wiseSaying.map((word, idx) => (
            <p key={idx}>{word}</p>
          ))}
        </div>
      )}
      <div
        className={`relative flex items-end w-full ${
          isExtend ? "h-full" : "h-[22%]"
        }`}
      >
        <div className="absolute flex w-full top-[-5px]">
          <p className="italic font-black text-[80px] mx-auto">
            10
            <span className="text-sm">D.DAY</span>
          </p>
        </div>
        {isExtend && (
          <ul className="w-full grid grid-cols-4 px-25pxr pb-18pxr text-center">
            <li>
              <p className="text-lg">4 SET</p>
              <h5 className="text-xs font-thin text-gray-600">남은 세트</h5>
            </li>
            <li>
              <p className="text-lg">100%</p>
              <h5 className="text-xs font-thin text-gray-600">계획 성공</h5>
            </li>
            <li>
              <p className="text-lg">0 SET</p>
              <h5 className="text-xs font-thin text-gray-600">평균 세트</h5>
            </li>
            <li>
              <p className="text-lg">100%</p>
              <h5 className="text-xs font-thin text-gray-600">계획 진행</h5>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomeInfo;
