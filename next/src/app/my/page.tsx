"use client";

import { signOut, useSession } from "next-auth/react";

export default function MyPage() {
  const { data: session } = useSession();

  return (
    <>
      {session && session.user && (
        <div className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="user profile" src={session.user.image ?? undefined} />
          <div className="flex-col flex">
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
          </div>
        </div>
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/auth" })}
        className="flex-center mb-13pxr text-sm w-[75%] h-40pxr border border-gray-750 active:bg-gray-750/30"
      >
        Log out
      </button>
    </>
  );
}
