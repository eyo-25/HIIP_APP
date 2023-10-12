import {
  BadBackground,
  GoodBackground,
  PerfectBackground,
  SadBackground,
  SosoBackground,
} from "@/comman/assets";
import { StaticImageData } from "next/image";

export type RatingType = "BAD" | "SAD" | "SOSO" | "GOOD" | "PERFECT";
export const scoreMessageData: Record<
  RatingType,
  { message: string[]; image: StaticImageData }
> = {
  SAD: {
    message: ["유튜브 조금만 덜봤다면", "지금보다는 좋은 결과 였다."],
    image: SadBackground,
  },
  BAD: {
    message: ["지금같은 마인드는", "쓰레기통에 넣어두록 하자"],
    image: BadBackground,
  },
  SOSO: {
    message: ["시작이 반이라는 데", "아직 반정도 밖에 안왔네?"],
    image: SosoBackground,
  },
  GOOD: {
    message: ["지금 이순간을 기억하고", "앞으로 한 발자국 더 나아가자!"],
    image: GoodBackground,
  },
  PERFECT: {
    message: ["Todo를 완벽히 냈어!", "승리를 즐기면서 이대로 가보자고."],
    image: PerfectBackground,
  },
};
