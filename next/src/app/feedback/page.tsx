"use client";

import { useFeedback } from "@/comman/hooks/plan";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import NavigationContext from "@/context/NavigationContext";

export default function FeedbackPage() {
  const { feedBackList, isLoading, error } = useFeedback();

  if (feedBackList) {
    console.log("피드백", feedBackList);
  }

  return (
    <NavigationContext>
      {feedBackList && <FeedbackSection feedBackList={feedBackList} />}
    </NavigationContext>
  );
}
