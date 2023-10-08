function PlanCardSkeleton() {
  return (
    <div className="relative drop-shadow-sm cursor-pointer flex flex-col mt-18pxr px-35pxr rounded-md bg-white">
      <div className="relative desktop:py-35pxr py-25pxr">
        <div className="flex justify-between mb-15pxr">
          <div className="flex w-[50%]">
            <div className="w-[60%] h-28pxr mr-9pxr bg-gray-200"></div>
            <div className="h-28pxr w-28pxr bg-gray-200"></div>
          </div>
          <div className="h-28pxr w-50pxr bg-gray-200"></div>
        </div>
        <div className="flex flex-col h-48pxr w-full gap-8pxr">
          <div className="h-16pxr w-full bg-gray-200"></div>
          <div className="h-16pxr w-full bg-gray-200"></div>
        </div>
        <ul className="absolute flex gap-[1%] bottom-0pxr w-full h-7pxr">
          {Array.from({ length: 4 }).map((_, idx) => (
            <li className="w-full bg-gray-200" key={idx}></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlanCardSkeleton;
