import { wiseSaying } from "@/components/home/Home.data";

export function randomWiseSaying() {
  const randomIndex = Math.floor(Math.random() * (wiseSaying.length + 1));
  const randomWiseSaying = wiseSaying[randomIndex];
  const randomWiseSayingArray = randomWiseSaying?.split("-");

  return randomWiseSayingArray;
}
