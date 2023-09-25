"use client";

import Navbar from "@/components/navbar/Navbar";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  const user = session?.user;
  const path = usePathname();

  if (path === "/auth" || path.startsWith("/write")) return <>{children}</>;

  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
