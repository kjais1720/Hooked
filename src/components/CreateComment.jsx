import { useEffect, useState, forwardRef } from "react";
import { toast } from "react-hot-toast";
import { FaArrowCircleRight } from "react-icons/fa";
import { postComment, editComment } from "services";
import { useSelector, useDispatch } from "react-redux";
import { ProfileImage } from "./ProfileImage";
import { Spinner } from "./Spinner";
export const CreateComment = forwardRef(({ postId, commentToEdit }, ref) => {
  const [commentFormData, setCommentFormData] = useState({
    content: "",
  });
  const [commentUploadStarted, setCommentUploadStarted] = useState(false);
  const isCommentBeingEdited = commentToEdit?.content && true;
  useEffect(() => {
    commentToEdit?.content &&
      setCommentFormData({ content: commentToEdit?.content });
  }, [commentToEdit, setCommentFormData]);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const textChangeHandler = (e) => {
    const { name, value } = e.target;
    setCommentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (commentFormData.content.trim() !== "") {
      if (!isLoggedIn) {
        toast.error("You need to login first!!!");
      } else {
        if (isCommentBeingEdited) {
          dispatch(
            editComment({
              postId,
              commentId: commentToEdit._id,
              content: commentFormData.content,
            })
          );
        } else {
          dispatch(postComment({ postId, formData: commentFormData }));
        }
        setCommentUploadStarted(true);
      }
    }
  };
  if (
    (status.type === "postComment" || status.type === "editComment") &&
    status.value === "fulfilled" &&
    commentUploadStarted
  ) {
    setCommentUploadStarted(false);
    setCommentFormData({ content: "" });
  }
  const isCommentUploadPending =
    (status.type === "postComment" || status.type === "editComment") &&
    status.value === "pending" &&
    commentUploadStarted;
  return (
    <div>
      <article
        className="rounded-2xl bg-light-100 text-gray-600
                        shadow-md dark:bg-dark-100
                        dark:text-gray-200 md:p-4"
      >
        <div className="grid grid-cols-[3rem_auto] gap-2">
          <figure className="hidden md:block">
            <ProfileImage isCurrentUserProfile={true} size="md" variant={200} />
          </figure>
          <form
            onSubmit={submitHandler}
            className="fixed bottom-2 left-2 right-2 z-10 flex gap-1 
                   rounded-3xl bg-primary 
                   p-4 text-gray-600
                   md:static md:flex-col md:bg-transparent md:p-0"
          >
            <textarea
              className="flex-grow border-none bg-transparent
                     text-lg text-dark-200 outline-transparent placeholder:text-gray-600
                     focus:border-none focus:outline-none focus-visible:border-none
                     focus-visible:outline-none md:h-12
                     md:text-gray-200
                     "
              name="content"
              ref={ref}
              value={commentFormData.content}
              onChange={textChangeHandler}
              placeholder="Type your comment here..."
              rows="1"
            />
            {isCommentUploadPending ? (
              <button className="x-4 ml-auto hidden rounded-2xl bg-dark-200 p-2 text-sm text-primary dark:bg-primary dark:text-dark-200 md:block">
                <Spinner size="sm" color="dark" />
              </button>
            ) : (
              <>
                {" "}
                <button
                  type="submit"
                  className="text-2xl text-dark-200 md:hidden"
                >
                  <FaArrowCircleRight />
                </button>
                <button
                  type="submit"
                  className="x-4 ml-auto hidden rounded-2xl bg-dark-200 p-2 text-sm text-primary dark:bg-primary dark:text-dark-200 md:block"
                >
                  Comment
                </button>{" "}
              </>
            )}
          </form>
        </div>
      </article>
    </div>
  );
});
