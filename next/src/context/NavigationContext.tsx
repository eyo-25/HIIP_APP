"use client";

import Navbar from "@/components/navbar/Navbar";
import { useEffect } from "react";
import AppSplash from "@/components/splash/AppSplash";
import { useAtomValue, useSetAtom } from "jotai";
import { isHomeSplashSetter, is_homesplash_atom } from "@/store";

type Props = {
  children: React.ReactNode;
};

export default function NavigationContext({ children }: Props) {
  const isHomeSplashAtom = useAtomValue(is_homesplash_atom);
  const setIsHomeSplash = useSetAtom(isHomeSplashSetter);

  useEffect(() => {
    if (isHomeSplashAtom) {
      setTimeout(() => {
        setIsHomeSplash();
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
