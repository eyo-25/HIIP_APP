import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import ResultPushBar from "./ResultPushBar";
import ResultGraph from "./ResultGraph";
import ResultAnalize from "./ResultAnalize";
import { HomePlanModel } from "@/comman/model/plan";

type Props = {
  isSuccess: boolean;
  planId: string;
  planData: HomePlanModel | undefined;
};

function ResultSection({ isSuccess, planId, planData }: Props) {
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
        {planData && (
          <div className="h-[85%] w-full">
            <ResultAnalize planData={planData} />
            <ResultGraph isSuccess={isSuccess} />
            <ResultPushBar isSuccess={isSuccess} />
          </div>
        )}
      </section>
    </>
  );
}

export default ResultSection;
