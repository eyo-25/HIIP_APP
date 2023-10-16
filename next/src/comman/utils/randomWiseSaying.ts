import { wiseSaying } from "@/components/home/Home.data";

export function randomWiseSaying() {
  const randomIndex = Math.floor(Math.random() * wiseSaying.length);

  return wiseSaying[randomIndex];
}
