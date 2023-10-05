"use client";

import Navbar from "@/components/navbar/Navbar";
import { useEffect } from "react";
import AppSplash from "@/components/splash/AppSplash";
import { useAtomValue, useSetAtom } from "jotai";
import { isHomeSplash, is_home_splash_atom } from "@/store";

type Props = {
  children: React.ReactNode;
};

export default function NavigationContext({ children }: Props) {
  const isHomeSplashAtom = useAtomValue(is_home_splash_atom);
  const setTaxPrice = useSetAtom(isHomeSplash);

  useEffect(() => {
    if (isHomeSplashAtom) {
      setTimeout(() => {
        setTaxPrice();
      }, 1800);
    }
  }, []);

  if (isHomeSplashAtom) return <AppSplash />;

  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
