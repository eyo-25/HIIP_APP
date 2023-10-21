"use client";

import PlanSection from "@/components/plan/PlanSection";
import NavigationContext from "@/context/NavigationContext";

function PlanPage() {
  return (
    <NavigationContext>
      <div className="relative h-[90%] w-full overflow-hidden">
        <PlanSection />
      </div>
    </NavigationContext>
  );
}

export default PlanPage;
