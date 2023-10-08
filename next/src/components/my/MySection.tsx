"use client";

import { AuthUserModel } from "@/comman/model/user";
import MyList from "./MyList";
import { myDocuments, myInteractions } from "./My.data";
import { signOut } from "next-auth/react";

type Props = {
  userData: AuthUserModel | null;
};

function MySection({ userData }: Props) {
  return (
    <>
      {userData && (
        <>
          <section className="flex flex-col h-[20%] px-24pxr mb-[9%] bg-white drop-shadow-sm">
            <div className="flex mt-20pxr">
              <h2 className="font-black text-2xl">MY PAGE</h2>
            </div>
            <div className="flex items-center h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="desktop:h-50pxr desktop:w-50pxr h-45pxr w-45pxr rounded-full mr-12pxr"
                alt="user profile"
                src={userData.image ?? undefined}
              />
              <div className="flex flex-col text-gray-850">
                <div className="flex items-center">
                  <p className="text-xl font-black mr-6pxr">{userData.name}</p>
                  <div className="flex-center bg-black tracking-wide rounded-2xl h-20pxr px-10pxr text-white text-xs font-bold italic">
                    <p>Beginner</p>
                  </div>
                </div>
                <p className="desktop:text-sm text-xs font-middle ml-2pxr tracking-wide">
                  {userData.email}
                </p>
              </div>
            </div>
          </section>
          <section className="px-24pxr desktop:mb-[10%] mb-[8%]">
            <h5 className="text-xl pb-11pxr font-bold border-b-2 border-gray-400">
              Documents
            </h5>
            <ul>
              {myDocuments.map((data) => (
                <MyList key={data.title} data={data} />
              ))}
            </ul>
          </section>
          <section className="px-24pxr desktop:mb-[10%] mb-[8%]">
            <h5 className="text-xl pb-11pxr font-bold border-b-2 border-gray-400">
              Interactions
            </h5>
            <ul>
              {myInteractions.map((data) => (
                <MyList key={data.title} data={data} />
              ))}
            </ul>
          </section>
          <button
            onClick={() => signOut({ callbackUrl: "/auth" })}
            className="flex-center mx-auto tracking-wide desktop:w-180pxr w-150pxr desktop:h-40pxr h-38pxr mb-50pxr bg-gray-900 text-white"
          >
            LOG OUT
          </button>
        </>
      )}
    </>
  );
}

export default MySection;
