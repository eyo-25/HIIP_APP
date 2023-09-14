"use client";

import { usePlanList } from "@/comman/hooks/plan";
import Navbar from "@/components/navbar/Navbar";
import { updatePlanList } from "@/store";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthGardContext({ children }: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return <>{children}</>;

  return <AuthGardComponent>{children}</AuthGardComponent>;
}

function AuthGardComponent({ children }: Props) {
  const { data, isLoading, error } = usePlanList();
  const setPlanlist = useSetAtom(updatePlanList);

  useEffect(() => {
    if (data) {
      setPlanlist(data);
    }
  }, [data]);

  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
