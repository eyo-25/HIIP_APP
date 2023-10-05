import { atom } from "jotai";
import { is_home_splash_atom } from "..";

export const isHomeSplash = atom(null, (_, set) => {
  set(is_home_splash_atom, () => false);
});
