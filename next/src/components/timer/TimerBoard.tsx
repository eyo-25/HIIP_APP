type Props = {
  count: number;
  interval: number;
  intervalSet: number;
  isBreakSet: boolean;
  isStop: boolean;
};

function TimerBoard({
  count,
  interval,
  isBreakSet,
  isStop,
  intervalSet,
}: Props) {
  const minutes = Math.floor(count / 60);
  const seconds = count - minutes * 60;

  return (
    <section className="z-20 flex flex-col items-center w-full h-[70%]">
      {isStop ? (
        <>
          <h5 className="black-italic text-6xl text-center mb-30pxr">PAUSE</h5>
          <p className="text-center mb-10pxr font-light">다음세트 까지</p>
        </>
      ) : (
        <>
          {isBreakSet && (
            <div>
              <h5 className="black-italic text-6xl text-center mb-54pxr">
                {intervalSet - Math.floor(interval / 2)} SET
                <br />
                BREAK
              </h5>
              <p className="text-center mb-10pxr font-light">다음세트 까지</p>
            </div>
          )}
        </>
      )}
      <div
        className={`flex black-italic ${
          isBreakSet || isStop ? "text-5xl" : "text-7xl"
        }`}
      >
        <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
        <span className="px-5pxr mt-[-5px]">:</span>
        <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
      </div>
      {isStop && (
        <>
          <h5 className="text-center mb-12pxr mt-20pxr font-light">
            진행한 세트
          </h5>
          <p className="black-italic text-5xl">
            {interval % 2 === 0
              ? intervalSet - Math.floor(interval / 2)
              : intervalSet - Math.floor(interval / 2) - 1}
          </p>
        </>
      )}
    </section>
  );
}

export default TimerBoard;
