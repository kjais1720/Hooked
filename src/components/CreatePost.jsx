import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "services";
import { closeModal } from "slices";
import {
  PostImagePreview,
  ProfileImage,
  NewPostAttachmentButtons,
  Spinner,
} from "components";

const defaultFormData = {
  content: "",
  images: [],
  imageAlts: {},
};

export function CreatePost({ postToEdit }) {
  const [localImageUrls, setLocalImageUrls] = useState([]);
  const textBox = useRef(null);
  const [postUploadStarted, setPostUploadStarted] = useState(false);
  const [imagesToRemoveFromServer, setImagesToRemoveFromServer] = useState({});
  const [postFormData, setPostFormData] = useState(defaultFormData);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.posts);
  const postImages = postToEdit?.images;
  const postContent = postToEdit?.content;
  const isPostBeingEdited = postToEdit === undefined ? false : true;
  useEffect(() => {
    if (postImages) {
      setLocalImageUrls(postImages.map(({ src }) => src));
    }
    if (postContent) {
      setPostFormData((prev) => ({
        ...prev,
        content: postContent,
      }));
    }
    textBox.current.focus()
    //eslint-disable-next-line
  }, []);

  const handleContentChange = (event) => {
    setPostFormData((prev) => ({ ...prev, content: event.target.value }));
  };

  const removeLocalImage = (indexOfImage, imageUrl) => {
    setLocalImageUrls((prev) => prev.filter((_, i) => i !== indexOfImage));
    setPostFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexOfImage),
    }));
    if (isPostBeingEdited) {
      setImagesToRemoveFromServer((prev) => {
        const imageToRemove = postToEdit.images.find(
          ({ src }) => src === imageUrl
        );
        return imageToRemove
          ? { ...prev, [imageToRemove.publicId]: imageToRemove }
          : prev;
      });
    }
  };
  const handleSubmit = () => {
    const data = new FormData();
    const content = postFormData.content;
    const imageAlts = postFormData.imageAlts;
    if (content.trim() !== "" || postFormData.images.length > 0) {
      data.append("content", content);
      postFormData.images.forEach((image, idx) => {
        data.append(`image-${idx}`, image, `postImage-${idx}`);
      });
      for (const altIndex in imageAlts) {
        data.append(`${altIndex}`, imageAlts[altIndex]);
      }
      if (Object.keys(imagesToRemoveFromServer).length > 0) {
        console.log({ imagesToRemoveFromServer });
        data.append("imagesToRemove", JSON.stringify(imagesToRemoveFromServer));
      }
      if (isPostBeingEdited) {
        dispatch(updatePost({ updatedPost: data, postId: postToEdit._id }));
      } else {
        dispatch(createPost(data));
      }
    }
    setPostUploadStarted(true);
  };
  if (
    (status.type === "createPost" || status.type === "updatePost") &&
    status.value === "fulfilled" &&
    postUploadStarted
  ) {
    dispatch(closeModal());
  }
  const isPostUploadPending =
    (status.type === "createPost" || status.type === "updatePost") &&
    status.value === "pending" &&
    postUploadStarted;

  return (
    <motion.article
      animate={{ scale: [0.5, 1.1, 1] }}
      transition={{ duration: 0.5, linear: true }}
      className="relative grid w-full min-w-[95vw] max-w-[99vw] grid-cols-[3rem_auto] gap-2 overflow-visible oerflow-x-hidden rounded-2xl bg-light-100 p-4 dark:bg-dark-100 md:min-w-[35rem]"
    >
      <figure>
        <ProfileImage size="md" bgShade="darker" isCurrentUserProfile />
      </figure>
      <div className="flex flex-col gap-2">
        <textarea
          ref={textBox}
          onChange={handleContentChange}
          rows={3}
          value={postFormData.content}
          className="border-0 outline-0 dark:bg-dark-100 dark:text-gray-200"
          placeholder="What's on your mind"
        ></textarea>
        <div className="flex w-full max-w-[70vw] gap-2 overflow-x-auto overflow-y-hidden pb-2">
          {localImageUrls.map((url, index) => (
            <PostImagePreview
              key={index}
              url={url}
              index={index}
              setFormData={setPostFormData}
              removeImage={removeLocalImage}
            />
          ))}
        </div>
        <div className="flex w-full justify-between">
          <NewPostAttachmentButtons
            postFormData={postFormData}
            setPostFormData={setPostFormData}
            setLocalImageUrls={setLocalImageUrls}
          />
          {isPostUploadPending ? (
            <button className="rounded-2xl bg-dark-200 py-2 px-4 dark:bg-primary">
              <Spinner size="sm" color="dark" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="rounded-2xl bg-dark-200 py-2 px-4 text-primary dark:bg-primary dark:text-dark-200"
            >
              Post
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
