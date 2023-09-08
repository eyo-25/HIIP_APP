import React from "react";

type Props = {
  isWeekly: boolean;
};

function Calendar({ isWeekly }: Props) {
  console.log("캘린더 렌더링");

  return <article className="w-full h-full bg-slate-400"></article>;
}

export default React.memo(Calendar);
