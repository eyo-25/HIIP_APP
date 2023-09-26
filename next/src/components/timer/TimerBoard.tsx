type Props = {
  count: number;
  interval: number;
  isBreakSet: boolean;
  isStop: boolean;
};

function TimerBoard({ count, interval, isBreakSet, isStop }: Props) {
  const minutes = Math.floor(count / 60);
  const seconds = Math.floor(count - minutes);

  return (
    <section className="z-20 flex flex-col items-center w-full h-[73%]">
      {isBreakSet && (
        <div>
          <h5 className="black-italic text-6xl text-center mb-54pxr">
            {interval} SET
            <br />
            BREAK
          </h5>
          <p className="text-center mb-12pxr font-light">다음세트 까지</p>
        </div>
      )}
      <div
        className={`flex black-italic ${isBreakSet ? "text-5xl" : "text-7xl"}`}
      >
        <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
        <span className="px-5pxr mt-[-5px]">:</span>
        <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
      </div>
    </section>
  );
}

export default TimerBoard;
