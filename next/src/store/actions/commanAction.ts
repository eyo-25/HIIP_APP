import { atom } from "jotai";
import { is_homesplash_atom, is_loading_atom } from "..";

export const isHomeSplashSetter = atom(null, (_, set) => {
  set(is_homesplash_atom, false);
});

export const isLoadingSetter = atom(null, (_, set, isLoading: boolean) => {
  set(is_loading_atom, isLoading);
});
