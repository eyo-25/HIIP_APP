import Image from "next/image";
import { AuthBackground, WhiteLogo } from "@/comman/assets";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="relative flex-center bg-black h-full">
      <div className=" w-full z-10 flex-col-center text-white">
        <WhiteLogo className="mb-20pxr" />
        <h1 className="mb-20pxr">Interval Pomodoro Planner</h1>
        {children}
      </div>
      <Image
        className="absolute opacity-70"
        fill
        src={AuthBackground}
        alt="auth 배경"
      />
    </main>
  );
}
