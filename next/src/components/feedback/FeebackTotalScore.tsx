import { useSession } from "next-auth/react";
import { scoreMessageData } from "./feedback.data";
import { ScoreInfoType } from "./FeedbackSection";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";

type Props = {
  scoreInfo: ScoreInfoType;
};

function FeebackTotalScore({ scoreInfo }: Props) {
  const { data: session } = useSession();
  const userData = session?.user;

  return (
    <>
      <div className="flex flex-col z-30 h-full w-full">
        <div className="flex-center h-[40%] pt-[15%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="desktop:h-40pxr desktop:w-40pxr h-35pxr w-35pxr rounded-full mr-12pxr"
            alt="user profile"
            src={userData.image ?? undefined}
          />
          <p className="text-center text-xs">
            {userData.name}님의 플랜 피드백입니다.
          </p>
        </div>
        <div className="flex-center flex-col">
          <p className="desktop:text-xl">종합점수 : {scoreInfo.score}</p>
          <h5 className="font-black py-[6%] italic desktop:text-7xl text-6xl">
            {scoreInfo.rating}
          </h5>
          <div className="flex-center flex-col font-light text-sm leading-snug text-gray-500">
            <p>{scoreMessageData[scoreInfo.rating].message[0]}</p>
            <p>{scoreMessageData[scoreInfo.rating].message[1]}</p>
          </div>
        </div>
        <div className="absolute flex flex-col items-center bottom-30pxr w-full ">
          <p className="text-xs mb-5pxr font-light">상세한 분석</p>
          <IoIosArrowDown className="w-25pxr h-25pxr" />
        </div>
      </div>
      <Image
        className="absolute opacity-60"
        fill
        src={scoreMessageData[scoreInfo.rating].image}
        alt="timer 배경"
      />
    </>
  );
}

export default FeebackTotalScore;
