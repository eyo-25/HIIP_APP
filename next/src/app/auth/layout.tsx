import Image from "next/image";
import { AuthBackground } from "@/assets";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="relative flex-center bg-black h-full">
      <div className="absolute h-full w-[30%] left-0pxr top-2pxr bg-gradient-to-r from-blue"></div>
      {children}
      <Image
        className="absolute opacity-70"
        fill
        src={AuthBackground}
        alt="auth 배경"
      />
    </div>
  );
}
