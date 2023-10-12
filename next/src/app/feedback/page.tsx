"use client";

import { useFeedback } from "@/comman/hooks/plan";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import NavigationContext from "@/context/NavigationContext";

export default function FeedbackPage() {
  const { feedBackList, isLoading, error } = useFeedback();

  return (
    <NavigationContext>
      {feedBackList && <FeedbackSection feedBackList={feedBackList} />}
    </NavigationContext>
  );
}
