"use client";

import { AuthBackground, WhiteLogo } from "@/assets";
import Image from "next/image";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { useSession, signIn, signOut } from "next-auth/react";

const Buttons = [
  {
    title: "구글계정으로 시작",
    icon: <BsGoogle className="w-22pxr h-22pxr" />,
  },
  {
    title: "페이스북으로 시작",
    icon: <BsFacebook className="w-22pxr h-22pxr" />,
  },
];

export default function AuthPage() {
  const { data: session } = useSession();

  return (
    <div className="relative flex-center bg-black h-full">
      <div className="absolute h-full w-[30%] left-0pxr top-2pxr bg-gradient-to-r from-blue"></div>
      <article className=" w-full z-10 flex-col-center text-white">
        <WhiteLogo className="mb-20pxr" />
        <h1 className="mb-20pxr">Interval Pomodoro Planner</h1>
        {Buttons.map(({ title, icon }, i) => (
          <button
            onClick={() => signIn()}
            key={i}
            className="flex-center mb-13pxr text-sm w-[75%] h-40pxr border border-gray-750 active:bg-gray-750/30"
          >
            <div className="flex items-center justify-between w-[65%] max-w-[220px]">
              {icon}
              <p className="px-[12%] ellipsis">{title}</p>
            </div>
          </button>
        ))}
      </article>
      <Image
        className="absolute opacity-70"
        fill
        src={AuthBackground}
        alt="auth 배경"
      />
    </div>
  );
}
