"use client";

import { useFeedback } from "@/comman/hooks/plan";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import LoadingSpinner from "@/components/ui/Loading";
import NavigationContext from "@/context/NavigationContext";

export default function FeedbackPage() {
  const { feedBackList, isLoading, error } = useFeedback();

  return (
    <NavigationContext>
      {isLoading && (
        <div className="absolute flex flex-col h-full w-full bg-black">
          <LoadingSpinner text="피드백 로딩중..." />
          <div className="h-[11%] w-full"></div>
        </div>
      )}
      {!isLoading && feedBackList && 0 < feedBackList.length && (
        <FeedbackSection feedBackList={feedBackList} />
      )}
    </NavigationContext>
  );
}
