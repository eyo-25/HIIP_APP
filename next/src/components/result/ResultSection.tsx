import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import ResultPushBar from "./ResultPushBar";
import ResultGraph from "./ResultGraph";
import ResultAnalize from "./ResultAnalize";
import { HomePlanModel } from "@/comman/model/plan";
import { resultWord } from "./Result.data";
import LoadingSpinner from "../ui/Loading";

type Props = {
  isLoading: boolean;
  isSuccess: boolean;
  planId: string;
  planData: HomePlanModel | undefined;
};

function ResultSection({ isSuccess, planId, planData, isLoading }: Props) {
  return (
    <>
      <section className="flex flex-col justify-between w-full h-[30%] z-20 px-22pxr py-30pxr">
        <Link href={`/timer/${planId}`} className="flex w-30pxr h-30pxr">
          <IoChevronBack className="text-white w-full h-full" />
        </Link>
        <div className="text-white font-bold text-2xl leading-9">
          {isSuccess ? resultWord["success"] : resultWord["fail"]}
        </div>
      </section>
      <section className="flex-center flex-col bg-gray-100 px-22pxr rounded-t-2xl w-full h-[70%] z-20">
        <div className="h-[85%] w-full">
          {planData && !isLoading ? (
            <>
              <ResultAnalize planData={planData} isSuccess={isSuccess} />
              <ResultGraph planData={planData} isSuccess={isSuccess} />
              <ResultPushBar planData={planData} isSuccess={isSuccess} />
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </section>
    </>
  );
}

export default ResultSection;
