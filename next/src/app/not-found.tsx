"use client";
import Link from "next/link";
import { RxArrowTopRight } from "react-icons/rx";

export default function Error() {
  return (
    <main className="flex flex-center h-full w-full bg-black text-white">
      <div className="flex-center flex-col w-full h-[90%] text-center">
        <h2 className=" text-7xl font-black italic leading-tight">
          Not <br />
          Found
        </h2>
        <p className="text-sm mt-[5%] leading-relaxed text-gray-600">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <Link
          href="/"
          aria-label="메인 페이지로 이동"
          className="flex items-center mt-[5%]"
        >
          <p className="text-sm mr-5pxr">홈으로 돌아가기</p>
          <RxArrowTopRight />
        </Link>
      </div>
    </main>
  );
}
