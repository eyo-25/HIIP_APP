"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

type Props = {
  icon: JSX.Element;
  title: string;
  provider: ClientSafeProvider;
  callbackUrl: string;
};

export default function AuthButton({
  icon,
  title,
  provider,
  callbackUrl,
}: Props) {
  return (
    <button
      onClick={() => signIn(provider.id, { callbackUrl })}
      className="flex-center mb-13pxr text-sm w-[75%] h-40pxr border border-gray-750 active:bg-gray-750/30"
    >
      <div className="flex items-center justify-between w-[72%] max-w-[220px]">
        {icon}
        <p className="px-[12%] ellipsis">{title}</p>
      </div>
    </button>
  );
}
