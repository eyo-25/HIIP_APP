import { BsGoogle } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";

export const Buttons = [
  {
    title: "구글계정으로 시작",
    icon: <BsGoogle className="ml-2pxr w-22pxr h-22pxr" />,
    provider: "google",
  },
  {
    title: "카카오톡으로 시작",
    icon: <RiKakaoTalkFill className="w-28pxr h-28pxr" />,
    provider: "kakao",
  },
];
