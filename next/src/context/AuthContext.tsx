"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) {
  const path = usePathname();
  const isAuth = path === "/auth";

  return (
    <SessionProvider>
      <div className={`${isAuth ? "h-full" : "h-[90%]"}`}>{children}</div>
      {!isAuth && <Navbar />}
    </SessionProvider>
  );
}
