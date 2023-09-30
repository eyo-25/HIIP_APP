import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import ResultPushBar from "./ResultPushBar";
import ResultGraph from "./ResultGraph";

type Props = {
  isSuccess: boolean;
  planId: string;
};

function ResultSection({ isSuccess, planId }: Props) {
  return (
    <>
      <section className="flex flex-col justify-between w-full h-[30%] z-20 px-22pxr py-30pxr">
        <Link href={`/timer/${planId}`} className="flex w-30pxr h-30pxr">
          <IoChevronBack className="text-white w-full h-full" />
        </Link>
        <p className="text-white font-bold text-2xl leading-9">
          성공을 맛 봤으니
          <br />
          꾸준함을 맛볼 차례다.
        </p>
      </section>
      <section className="flex-center flex-col bg-gray-100 px-22pxr rounded-t-2xl w-full h-[70%] z-20">
        <div className="h-[85%] w-full">
          <ul className="flex h-[19%] gap-[6%]">
            <li className="bg-white flex-center flex-col w-full h-full rounded-md shadow-lg">
              <div className="text-sm text-white bg-black px-8pxr rounded-xl">
                +18
              </div>
              <strong className="font-bold text-xl my-[3%]">30%</strong>
              <p className="text-xs">성공률</p>
            </li>
            <li className="bg-white flex-center flex-col w-full h-full rounded-md shadow-lg">
              <div className="text-sm text-white bg-black px-8pxr rounded-xl">
                +18
              </div>
              <strong className="font-bold text-xl my-[3%]">30%</strong>
              <p className="text-xs">평균 세트</p>
            </li>
            <li className="bg-white flex-center flex-col w-full h-full rounded-md shadow-lg">
              <div className="text-sm text-white bg-black px-8pxr rounded-xl">
                +18
              </div>
              <strong className="font-bold text-xl my-[3%]">30%</strong>
              <p className="text-xs">진행률</p>
            </li>
          </ul>
          <ResultGraph isSuccess={isSuccess} />
          <ResultPushBar isSuccess={isSuccess} />
        </div>
      </section>
    </>
  );
}

export default ResultSection;
