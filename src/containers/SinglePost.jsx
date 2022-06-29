import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getPostById } from "slices";
import { Post, CreateComment } from "components";
import { navigateToPreviousPage } from "utils";
export function SinglePost(){
  const { postId } = useParams()
  const navigate = useNavigate();
  const goToPreviousPage = () => navigateToPreviousPage(navigate)
  const post = useSelector(state=>getPostById(state,postId)) ?? {};
  const comments = post.comments?.length ? post.comments : [];
  return(
    <section className="my-2 px-2 relative z-10 flex flex-col gap-4">
      <div className="p-2 flex items-center gap-4 rounded-2xl bg-light-100 dark:bg-dark-100">
        <button onClick={goToPreviousPage} className="text-2xl text-gray-600 dark:text-gray-200">
          <FaArrowLeft/>
        </button>
        <span className="text-2xl text-gray-600 dark:text-gray-200">Post</span>
      </div>
      <Post {...post} isSinglePostPage />
      <CreateComment postId={postId} />
      <p className="text-lg text-primary">Comments <span className="text-gray-600 dark:text-gray-200">{comments?.length ?? "0"}</span></p>
      <div className="flex flex-col gap-2">
      {comments.map(comment => <Post key={comment._id} isCommentPost {...comment} />)}
      </div>
    </section>
  )
} 