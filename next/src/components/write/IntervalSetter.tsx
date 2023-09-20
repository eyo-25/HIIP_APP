type Props = {
  value: number;
  unit: string;
  leftClick: () => void;
  rightClick: () => void;
};

function IntervalSetter({ value, unit, leftClick, rightClick }: Props) {
  return (
    <div className="flex w-200pxr text-lg text-gray-850 justify-between italic font-black">
      <button
        onClick={(e) => {
          e.preventDefault();
          leftClick();
        }}
        className="flex-center w-30pxr h-30pxr rounded-full bg-gray-300 text-gray-800"
      >
        -
      </button>
      {value} {unit}
      <button
        onClick={(e) => {
          e.preventDefault();
          rightClick();
        }}
        className="flex-center w-30pxr h-30pxr rounded-full bg-gray-300 text-gray-800"
      >
        +
      </button>
    </div>
  );
}

export default IntervalSetter;
