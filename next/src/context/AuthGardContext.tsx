"use client";

import Navbar from "@/components/navbar/Navbar";
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function AuthGardContext({ children }: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return <>{children}</>;

  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
