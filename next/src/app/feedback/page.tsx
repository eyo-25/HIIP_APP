"use client";

import { useFeedback } from "@/comman/hooks/plan";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import LoadingSpinner from "@/components/ui/Loading";
import NavigationContext from "@/context/NavigationContext";
import Link from "next/link";
import { RxArrowTopRight } from "react-icons/rx";

export default function FeedbackPage() {
  const { feedBackList, isLoading, error } = useFeedback();

  return (
    <NavigationContext>
      <main className="w-full overflow-hidden sroll h-full text-white">
        {isLoading && (
          <div className="absolute flex flex-col h-full w-full bg-black">
            <LoadingSpinner text="피드백 로딩중..." />
            <div className="h-[11%] w-full"></div>
          </div>
        )}
        {!isLoading && feedBackList && 0 >= feedBackList.length && (
          <div className="flex-center flex-col w-full h-[90%] text-center bg-black">
            <h2 className=" text-7xl font-black italic leading-tight">
              Not <br />
              Plan
            </h2>
            <p className="text-sm mt-[5%] leading-relaxed text-gray-600">
              플랜을 생성하고 HIIP에서 제공하는 <br />
              FEEDBACK을 받아보세요
            </p>
            <Link href="/write/creat" className="flex items-center mt-[5%]">
              <p className="text-sm mr-5pxr">플랜 생성하러가기</p>
              <RxArrowTopRight />
            </Link>
          </div>
        )}
        {!isLoading && feedBackList && 0 < feedBackList.length && (
          <FeedbackSection feedBackList={feedBackList} />
        )}
      </main>
    </NavigationContext>
  );
}
