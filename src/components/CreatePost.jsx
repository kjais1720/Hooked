import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "services";
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

export function CreatePost({ isCommentPost, postToEdit }) {
  const [localImageUrls, setLocalImageUrls] = useState([]);
  const [postUploadStarted, setPostUploadStarted] = useState(false);
  const [postFormData, setPostFormData] = useState(defaultFormData);
  const { status } = useSelector((state) => state.posts);
  useEffect(() => {
    if (status.type === "createPost") {
      if (status.value === "fulfilled") {
        setPostFormData(defaultFormData);
        setLocalImageUrls([]);
      } else if (status.value === "error") {
        toast.error("An error occurred please try again!!");
      }
    }
  }, [status]);
  const dispatch = useDispatch();

  const handleContentChange = (event) => {
    setPostFormData((prev) => ({ ...prev, content: event.target.value }));
  };
  const removeLocalImage = (index) => {
    setLocalImageUrls((prev) => prev.filter((_, i) => i !== index));
    setPostFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = () => {
    const data = new FormData();
    const content = postFormData.content;
    if (!isCommentPost) {
      const imageAlts = postFormData.imageAlts;
      if (content !== "") {
        data.append("content", content);
        postFormData.images.forEach((image, idx) => {
          data.append(`image-${idx}`, image, `postImage-${idx}`);
        });
        for (const altIndex in imageAlts) {
          data.append(`${altIndex}`, imageAlts[altIndex]);
        }
        dispatch(createPost(data));
      }
    }
    setPostUploadStarted(true);
    dispatch(closeModal());

  };
  if (
    status.type === "createPost" &&
    status.value === "fulfilled" &&
    postUploadStarted
  ) {

    dispatch(closeModal());
  }
  const isPostUploadPending =
    status.type === "createPost" &&
    status.value === "pending" &&
    postUploadStarted;

  return (
    <section className="relative grid w-full min-w-[95vw] max-w-[99vw] grid-cols-[3rem_auto] gap-2 overflow-x-hidden rounded-2xl bg-light-100 p-4 dark:bg-dark-100 md:min-w-[35rem]">
      <figure>
        <ProfileImage size="md" bgShade="darker" isCurrentUserProfile />
      </figure>
      <div className="flex flex-col gap-2">
        <textarea
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
    </section>
  );
}