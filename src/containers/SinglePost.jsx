import { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getPostById } from "slices";
import { Post, CreateComment } from "components";
import { navigateToPreviousPage, useDocumentTitle } from "utils";
export function SinglePost() {
  useDocumentTitle("See Post | Hooked");
  const { postId } = useParams();
  const navigate = useNavigate();
  const [commentToEdit, setCommentToEdit] = useState({});
  const commentRef = useRef();
  const goToPreviousPage = () => navigateToPreviousPage(navigate);
  const post = useSelector((state) => getPostById(state, postId)) ?? {};
  const comments = post.comments?.length ? post.comments : [];
  const focusCommentTextBox = () => {
    commentRef.current.focus()};
  return (
    <section className="relative z-10 my-2 flex flex-col gap-4 px-2">
      <div className="flex items-center gap-4 rounded-2xl bg-light-100 p-2 dark:bg-dark-100">
        <button
          onClick={goToPreviousPage}
          className="text-2xl text-gray-600 dark:text-gray-200"
        >
          <FaArrowLeft />
        </button>
        <span className="text-2xl text-gray-600 dark:text-gray-200">Post</span>
      </div>
      <Post {...post} isInSinglePostPage />
      <CreateComment {...{ commentToEdit, postId }} ref={commentRef} />
      <p className="text-lg text-primary">
        Comments{" "}
        <span className="text-gray-600 dark:text-gray-200">
          {comments?.length ?? "0"}
        </span>
      </p>
      <div className="flex flex-col gap-2">
        {comments.map((comment) => (
          <Post
            {...comment}
            isCommentPost
            key={comment._id}
            postIdOfComment={postId}
            setCommentToEdit={setCommentToEdit}
            focusCommentTextBox={focusCommentTextBox}
          />
        ))}
      </div>
    </section>
  );
}
