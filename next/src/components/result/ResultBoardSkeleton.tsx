import LoadingSpinner from "../ui/Loading";

type Props = {
  isSuccess: boolean;
};

function ResultBoardSkeleton({ isSuccess }: Props) {
  return (
    <>
      <ul className="flex h-[19%] gap-[6%]">
        {Array.from({ length: 3 }).map((_, idx) => (
          <li
            key={idx}
            className="bg-white flex-center flex-col w-full h-full rounded-md shadow-lg"
          >
            <div className="bg-gray-300 w-[60%] h-14pxr"></div>
            <strong className="bg-gray-300 h-20pxr w-[70%] my-[5%]"></strong>
            <p className="bg-gray-300 h-20pxr w-[70%]"></p>
          </li>
        ))}
      </ul>
      <div className="flex h-[69%] w-full py-[5%]">
        <div className="flex flex-col h-full w-full py-[6%] px-[8%] bg-white rounded-md shadow-lg">
          <LoadingSpinner color="black" text="그래프 분석중..." />
        </div>
      </div>
      <div
        className={`relative overflow-hidden flex-center h-[12%] w-full rounded-md shadow-lg bg-gradient-to-r from-black from-10% via-black via-55% ${
          isSuccess ? "to-blue" : "to-red"
        } to-90%`}
      >
        <div
          className={`absolute cursor-grab mx-10pxr flex-center top-[13%] bottom-[13% w-[18%] h-[74%] border rounded-md text-white left-0pxr`}
        >
          홈
        </div>
        <p className="text-gray-800">밀어서 인터벌 결과적용</p>
      </div>
    </>
  );
}

export default ResultBoardSkeleton;
