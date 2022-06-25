import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const x_position = {
  1: "-translate-x-0",
  2: "-translate-x-[90%]",
  3: "-translate-x-[180%]",
};

export function ImageSlider({ images }) {
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
    <div className="relative overflow-hidden ">
      <div
        className={`ease flex gap-2 transition-all duration-300 ${x_position[activeImg]}`}
      >
      
        {images.map(({ src, title }, idx) => (
          <img
            className={`${
              images.length > 1 ? "w-[90%]" : "w-[100%]"
            } flex-grow rounded-xl object-cover h-[60vh]`}
            key={idx}
            src={src}
            alt={title}
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-2">
          <button
            title="previous picture"
            onClick={moveLeft}
            className="rounded-full text-xl text-light-100 shadow-lg"
          >
            <FaArrowAltCircleLeft />
          </button>
          <button
            title="next picture"
            onClick={moveRight}
            className="rounded-full text-xl text-light-100 shadow-xl"
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      )}
    </div>
  );
}
