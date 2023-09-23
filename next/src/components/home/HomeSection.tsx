"use client";

import { useState } from "react";
import HomeHeader from "./HomeHeader";
import HomeInfo from "./HomeInfo";
import HomePlanListBoard from "./HomePlanListBoard";
import { useTouchHandlers } from "@/comman/utils/touchHandlers";
import { useMouseHandlers } from "@/comman/utils/mouseHandlers";
import MetaButton from "../ui/MetaButton";
import Link from "next/link";

function HomeSection() {
  const [isExtend, setIsExtend] = useState(false);
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsExtend);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsExtend,
    isExtend
  );

  return (
    <div
      className={`w-full h-full z-10 ${isExtend && "bg-black/50"}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      <section className="w-full h-[12%]">
        <HomeHeader />
      </section>
      <section className={`w-full ${isExtend ? "h-[19%]" : "h-[48%]"}`}>
        <HomeInfo isExtend={isExtend} />
      </section>
      <section
        className={`bg-white w-full rounded-t-3xl ${
          isExtend ? "h-[69%]" : "h-[40%]"
        }`}
      >
        <HomePlanListBoard />
      </section>
      <Link href={"/write/creat"}>
        <MetaButton mode={"creat"} />
      </Link>
    </div>
  );
}

export default HomeSection;
