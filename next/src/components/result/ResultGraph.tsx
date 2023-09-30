import { DAYS } from "@/comman/constants";

type Props = {
  isSuccess: boolean;
};

function ResultGraph({ isSuccess }: Props) {
  return (
    <div className="flex h-[69%] w-full py-[5%]">
      <div className="flex flex-col h-full w-full py-[6%] px-[8%] bg-white rounded-md shadow-lg">
        <div className="flex flex-col items-center">
          <strong className="text-lg font-bold mb-3pxr">COACH TIP</strong>
          <p className="text-center text-sm">
            어제보다 평균 집중시간이
            <br />
            <span
              className={`font-semibold ${
                isSuccess ? "text-blue" : "text-red"
              }`}
            >
              12% 하락{" "}
            </span>
            하였습니다
          </p>
        </div>
        <div className="relative flex flex-col h-full w-full">
          <div className="grid grid-rows-4 my-6pxr h-full pb-18pxr">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="border-b border-gray-800"></div>
            ))}
            <ul className="absolute grid grid-cols-7 h-full w-full">
              {DAYS.map((day) => (
                <li
                  key={day}
                  className="flex flex-col justify-end items-center"
                >
                  <div
                    className={`h-full w-[50%] my-4pxr ${
                      isSuccess ? "bg-blue" : "bg-red"
                    }`}
                  ></div>
                  <p className="text-sm text-gray-900">{day}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultGraph;
