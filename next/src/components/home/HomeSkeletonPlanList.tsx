function HomeSkeletonPlanList() {
  return (
    <ul className="h-full pt-26pxr w-full px-24pxr mx-auto overflow-hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        <li
          key={index}
          className="relative font-semibold cursor-pointer flex flex-col mb-18pxr px-35pxr rounded-md drop-shadow-sm bg-gray-100"
        >
          <div className="relative h-full desktop:py-35pxr py-30pxr">
            <div className="flex justify-between py-4pxr">
              <div className="flex">
                <div className="w-80pxr mr-8pxr bg-gray-300"></div>
                <div className="w-20pxr bg-gray-300"></div>
              </div>
              <div className="h-20pxr w-50pxr bg-gray-300"></div>
            </div>
            <ul className="absolute flex gap-[1%] bottom-0pxr w-full h-7pxr">
              {Array.from({ length: 4 }).map((_, index) => (
                <li className="w-full bg-gray-300" key={index}></li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default HomeSkeletonPlanList;
