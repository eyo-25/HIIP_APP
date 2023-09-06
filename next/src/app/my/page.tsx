"use client";

import { signOut } from "next-auth/react";

export default function MyPage() {
  return (
    <button
      onClick={() => signOut()}
      className="flex-center mb-13pxr text-sm w-[75%] h-40pxr border border-gray-750 active:bg-gray-750/30"
    ></button>
  );
}
