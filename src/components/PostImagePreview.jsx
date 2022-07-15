import { FaTimes } from "react-icons/fa"
import { useState, useReducer } from "react";
export function PostImagePreview({ src, index, removeImage, setFormData }) {
  const [showAltTextPopover, toggleAltTextPopover] = useReducer(
    (state) => !state,
    false
  );
  const [altText, setAltText] = useState("");
  const changeHandler = (e) => setAltText(e.target.value);
  const saveAltText = () => {
    setFormData((prev) => ({
      ...prev,
      imageAlts: {
        ...prev.imageAlts,
        [`imageAlt-${index}`]: altText,
      },
    }));
    toggleAltTextPopover();
  };
  return (
    <div
      onClick={toggleAltTextPopover}
      className="relative h-32 w-32 flex-shrink-0 rounded-2xl bg-light-200 dark:bg-dark-200"
    >
      <button
        className="absolute right-2 top-2 rounded-full bg-gray-800/50 p-2 text-gray-200"
        onClick={() => removeImage(index, src)}
      >
        <FaTimes />
      </button>
      <img
        src={src}
        className="h-32 w-32 rounded-2xl object-contain"
        alt="post"
      />
      <button
        className="absolute left-2 bottom-2 rounded-2xl bg-gray-800/50 p-2 text-gray-200"
        onClick={(e) => {
          e.stopPropagation();
          toggleAltTextPopover();
        }}
        type="button"
      >
        Alt
      </button>
      {showAltTextPopover && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute -bottom-2 rounded-2xl bg-light-200 p-2 dark:bg-dark-200"
        >
          <input
            value={altText}
            onChange={changeHandler}
            type="text"
            className="w-full rounded-xl bg-light-100 p-1 text-xs dark:bg-dark-100 dark:text-gray-200"
          />
          <button
            className="mt-1 rounded-2xl bg-primary p-1 text-xs dark:text-dark-200"
            onClick={saveAltText}
          >
            save
          </button>
        </div>
      )}
    </div>
  );
}