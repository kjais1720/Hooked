import { useReducer } from "react";
import { isFileSizeInValid } from "utils";
import { FaImage, FaCamera } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import Picker from "emoji-picker-react";
import { toast } from "react-hot-toast";

export function NewPostAttachmentButtons({
  setPostFormData,
  setLocalImageUrls,
  postFormData,
}) {
  const [isEmojiOpen, toggleEmojiOpen] = useReducer((state) => !state, false);

  const onEmojiClick = (event, emojiObject) => {
    setPostFormData((prev) => ({
      ...prev,
      content: prev.content + emojiObject.emoji,
    }));
  };

  const handleImageChange = (event) => {
    let newImages = [...event.target.files];
    if (postFormData.images.length === 4) {
      toast.error("You can only upload 4 images at once!");
      return;
    } else if (newImages.length + postFormData.images.length > 4) {
      toast.error("You can only upload 4 images at once!");
      const totalNewImagesAllowed = 4 - postFormData.images.length;
      if (totalNewImagesAllowed === 0) {
        return;
      }
      newImages = newImages.slice(0, totalNewImagesAllowed);
    }
    const invalidImages = newImages.filter(isFileSizeInValid);
    if (invalidImages.length > 0) {
      toast.error("Image cannot exceed 2mb");
      newImages = newImages.filter((file) => !isFileSizeInValid(file, 2));
    }
    if (newImages.length > 0) {
      const newLocalImageUrls = newImages.map((image) =>
        ({src:URL.createObjectURL(image)})
      );
      setLocalImageUrls((prev) => [...prev, ...newLocalImageUrls]);
      setPostFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };
  return (
    <div className="relative flex gap-2 rounded-2xl bg-dark-200 py-2 px-4 text-primary dark:bg-primary dark:text-dark-200">
      <label htmlFor="image" className="cursor-pointer text-xl">
        <FaImage />
      </label>
      <input
        type={"file"}
        multiple
        id="image"
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
      <button className="relative text-xl" onClick={toggleEmojiOpen}>
        <MdInsertEmoticon />
      </button>
      {isEmojiOpen && (
        <div className="relative z-10">
          <Picker
            pickerStyle={{ position: "absolute", top: "120%" }}
            onEmojiClick={onEmojiClick}
          />
        </div>
      )}
      <label htmlFor="captureImage" className="cursor-pointer text-xl">
        <FaCamera />
      </label>
      <input
        type="file"
        id="captureImage"
        onChange={handleImageChange}
        className="hidden"
        capture="camera"
        accept="image/*"
      />
    </div>
  );
}
