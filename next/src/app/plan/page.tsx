"use client";

import PlanSection from "@/components/plan/PlanSection";
import { buttonVarients } from "@/components/plan/PlanVariants";
import MetaButton from "@/components/ui/MetaButton";
import NavigationContext from "@/context/NavigationContext";
import { motion } from "framer-motion";
import Link from "next/link";

function PlanPage() {
  return (
    <NavigationContext>
      <div className="relative h-[90%] w-full overflow-hidden">
        <PlanSection />
        <motion.div
          variants={buttonVarients}
          initial="normal"
          animate="animate"
        >
          <Link href={"/write/creat"} aria-label="플랜 작성 페이지로 이동">
            <MetaButton mode={"creat"} />
          </Link>
        </motion.div>
      </div>
    </NavigationContext>
  );
}

export default PlanPage;
