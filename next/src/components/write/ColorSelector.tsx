import { ColorType } from "@/comman/model/plan";
import React from "react";

type Props = {
  colors: ColorType[];
  selectedColor: ColorType;
  handleSelectColor: (color: ColorType) => void;
};

function ColorSelector({ colors, selectedColor, handleSelectColor }: Props) {
  return (
    <div className="flex w-full gap-16pxr px-5pxr py-12pxr border-y-gray-400 border-y">
      {colors.map((color) => (
        <button
          key={color}
          onClick={(e) => {
            e.preventDefault();
            handleSelectColor(color);
          }}
          className={`bg-${color} w-20pxr h-20pxr rounded-full ${
            selectedColor !== color && "opacity-30"
          }`}
        ></button>
      ))}
    </div>
  );
}

export default ColorSelector;
