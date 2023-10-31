import { atom } from "jotai";
import { is_homesplash_atom } from "..";

export const isHomeSplashSetter = atom(null, (_, set) => {
  set(is_homesplash_atom, false);
});
