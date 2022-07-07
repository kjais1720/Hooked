import { FaArrowCircleRight } from "react-icons/fa";
import { postComment } from "services";
import { useDispatch } from "react-redux";
import { ProfileImage } from "./ProfileImage";
import { useState } from "react";
export function CreateComment({ postId }) {
  const [formData, setFormData] = useState({
    content: "",
  });
  const dispatch = useDispatch();
  const textChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postComment({ postId, formData }));
    setFormData({ content: "" });
  };
  return (
    <div>
      <article
        className="hidden rounded-2xl bg-light-100 p-2
                        text-gray-600 dark:bg-dark-100
                        dark:text-gray-200 md:block shadow-md"
      >
        <div class="grid grid-cols-[3rem_auto]">
          <figure>
            <ProfileImage isCurrentUserProfile={true} size="md" variant={200} />
          </figure>
          <form onSubmit={submitHandler} className="flex flex-col gap-1">
            <textarea
              name="content"
              placeholder="Write your comment..."
              value={formData.content}
              onChange={textChangeHandler}
              className="border-0 p-2 outline-0 dark:bg-dark-100 dark:text-gray-200"
            ></textarea>
            <button
              type="submit"
              className="ml-auto rounded-2xl bg-dark-200 py-2 px-4 text-primary dark:bg-primary dark:text-dark-200"
            >
              Comment
            </button>
          </form>
        </div>
      </article>
      <form
        onSubmit={submitHandler}
        className="z-100 fixed bottom-2 left-2 right-2 flex gap-1 rounded-3xl bg-primary p-4 text-gray-600 md:hidden"
      >
        <textarea
          className="flex-grow border-none bg-transparent
                     text-lg outline-transparent
                     placeholder:text-gray-600 focus:border-none focus:outline-none
                     focus-visible:border-none
                     focus-visible:outline-none
                     "
          name="content"
          value={formData.content}
          onChange={textChangeHandler}
          placeholder="Type your comment here..."
          rows="1"
        />
        <button type="submit" className="text-2xl text-dark-200">
          <FaArrowCircleRight />
        </button>
      </form>
    </div>
  );
}
