import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { stopBubbling } from "utils";
const x_position = {
  1: "-translate-x-0",
  2: "-translate-x-[90%]",
  3: "-translate-x-[180%]",
  4: "-translate-x-[270%]",
};

export function ImageSlider({ images, showOriginalImageSize }) {
  const [activeImg, setActiveImg] = useState(1);
  const moveLeft = () => {
    setActiveImg((prev) => {
      let newIdx = prev - 1;
      if (newIdx < 1) newIdx = 1;
      return newIdx;
    });
  };

  const moveRight = () => {
    setActiveImg((prev) => {
      let newIdx = prev + 1;
      if (newIdx > images.length) newIdx = images.length;
      return newIdx;
    });
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className={`ease flex gap-2 transition-all duration-300 ${x_position[activeImg]}`}
      >
        {images.map(({ src, title }, idx) => (
          <figure
            key={idx}
            className={`${images.length > 1 ? "w-[90%]" : "w-[100%]"} ${
              showOriginalImageSize || "h-[50vh] md:h-[60vh]"
            } min-w-[90%] flex-grow rounded-2xl bg-light-200 dark:bg-dark-200`}
          >
            <img
              className="h-full w-full rounded-2xl object-contain"
              src={src}
              alt={title}
            />
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <div
          onClick={stopBubbling}
          className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-2"
        >
          <button
            title="previous picture"
            onClick={moveLeft}
            className={`relative ${
              activeImg === 1 && "hidden"
            } rounded-full text-xl text-gray-600 dark:text-gray-200 shadow-xl`}
          >
            <FaArrowAltCircleLeft />
          </button>
          <button
            title="next picture"
            onClick={moveRight}
            className={`${
              activeImg === images.length && "hidden"
            } ml-auto rounded-full text-xl text-gray-600 dark:text-gray-200 shadow-xl`}
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      )}
    </div>
  );
}
