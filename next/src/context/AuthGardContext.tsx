"use client";

import Navbar from "@/components/navbar/Navbar";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = {
  children: React.ReactNode;
};

export default function AuthGardContext({ children }: Props) {
  const path = usePathname();
  const isNav = !(
    path === "/auth" ||
    path.startsWith("/write") ||
    path.startsWith("/timer")
  );

  return (
    <div className="relative overflow-hidden mx-auto h-full w-full max-w-md bg-gray-200">
      {children}
      {isNav && <Navbar />}
    </div>
  );
}
