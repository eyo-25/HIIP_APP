type Props = {
  interval: number;
  intervalSet: number;
  count: number;
  setBreakTime: number;
  setFocusTime: number;
  isBreakSet: boolean | undefined;
};

function ProgressBar({
  interval,
  intervalSet,
  count,
  isBreakSet,
  setBreakTime,
  setFocusTime,
}: Props) {
  const total = setFocusTime * intervalSet + setBreakTime * (intervalSet - 1);
  const focusLength = (setFocusTime / total) * 100;
  const breakLength = (setBreakTime / total) * 100;
  const totalSet = intervalSet * 2 - 1;

  const progressBarElements = [];

  for (let i = 0; i < intervalSet; i++) {
    progressBarElements.push("focus");

    if (i < intervalSet - 1) {
      progressBarElements.push("break");
    }
  }

  const getProgressWidth = (idx: number) => {
    if (idx < totalSet - interval) {
      return 100;
    } else if (idx === totalSet - interval) {
      if (isBreakSet) {
        return 100 - (count / (setBreakTime * 60)) * 100;
      } else {
        return 100 - (count / (setFocusTime * 60)) * 100;
      }
    }

    return 0;
  };

  return (
    <section className="flex flex-col justify-end pb-45pxr mobile:pb-35pxr items-center w-full h-[30%] mobile:h-[27%]">
      <div className="desktop:w-240pxr w-210pxr">
        <ul className="flex gap-x-3 mb-20pxr w-full h-5pxr bg-white">
          {progressBarElements.map((type, idx) =>
            type === "focus" ? (
              <li
                key={idx}
                className={`relative h-full bg-white`}
                style={{ width: `${focusLength}%` }}
              >
                <div
                  className={`absolute h-full bg-blue`}
                  style={{ width: `${getProgressWidth(idx)}%` }}
                ></div>
              </li>
            ) : (
              <li
                key={idx}
                className={`relative h-full bg-black`}
                style={{ width: `${breakLength}%` }}
              >
                <div
                  className={`absolute h-full bg-red`}
                  style={{ width: `${getProgressWidth(idx)}%` }}
                ></div>
              </li>
            )
          )}
        </ul>
        <p className="desktop:text-base text-sm text-center ellipsis">
          나중에 울지말고 지금 울면서하자
        </p>
      </div>
    </section>
  );
}

export default ProgressBar;
