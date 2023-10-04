"use client";

import MySection from "@/components/my/MySection";
import { useSession } from "next-auth/react";

function MyPage() {
  const { data: session } = useSession();
  const userData = session?.user;

  return (
    <main className="relative h-[90%] w-full sroll">
      <MySection userData={userData} />
    </main>
  );
}

export default MyPage;
