import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likePost, bookmarkPost } from "services";
import {
  FaThumbsUp,
  FaBookmark,
  FaCommentDots,
  FaShareAlt,
} from "react-icons/fa";
import {
  ImageSlider,
  ProfileImage,
  TimeAgo,
  PostOptionsPopover,
  Spinner,
} from "components";

export function Post({
  _id,
  userId,
  likes,
  comments,
  images,
  content,
  createdAt,
  isCommentPost,
  isSinglePostPage,
}) {
  const { allUsers, currentUser } = useSelector((state) => state.user);
  const { status } = useSelector(state => state.posts)
  const dispatch = useDispatch();
  let postUser;
  let isCurrentUserPost;
  if (currentUser._id === userId) {
    postUser = { ...currentUser };
    isCurrentUserPost = true;
  } else {
    postUser = allUsers.find(({ _id }) => _id === userId) ?? {};
  }
  const { firstname, lastname, username, bookmarks } = postUser;
  const sharePost = async () =>
    await navigator.share({
      url: `http://localhost:3000/post/${_id}`,
      title: `${firstname} ${lastname}'s post on Hooked`,
      text: content,
    });
  const likeHandler = () => {
    dispatch(likePost({ userId: currentUser._id, postId: _id }));
  };
  const addPostToBookmarks = () => {
    dispatch(bookmarkPost(_id));
  };
  const isPostLiked = likes?.some((id) => id === currentUser._id);
  //eslint-disable-next-line
  const isPostSaved = bookmarks?.some((id) => id === _id);
  const isPostLoading =
    status.value === "pending" && status.type === "getAllPosts";
  const isPostLikePending =
    status.value === "pending" &&
    status.type === "likePost" &&
    status.payload === _id;
    return isPostLoading ? (
    <Spinner size="md" />
  ) : (
    <article className=" text-dark-2 flex w-full flex-col gap-2 rounded-lg bg-light-100 p-4 shadow-md dark:bg-dark-100 dark:text-gray-100">
      <header className="flex">
        <div className="flex gap-2">
          <figure className="h-12 w-12 rounded-full ">
            <ProfileImage userId={userId} size="md" variant={200} />
          </figure>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <h3 className="m-0 text-sm font-medium">
                <Link
                  to={isCurrentUserPost ? "/profile" : `/profile/${username}`}
                >
                  {firstname} {lastname}
                </Link>
              </h3>
              <span className="text-sm  text-gray-400">@{username}</span>
            </div>
            <small className="m-0 -mt-2 text-xs text-gray-400">
                <TimeAgo timestamp={createdAt} />
            </small>
          </div>
        </div>
        {isCurrentUserPost ? (
          <div className="ml-auto">
            <PostOptionsPopover postId={_id} isCommentPost={isCommentPost} />
          </div>
        ) : (
          ""
        )}
      </header>
      <div className="flex flex-col gap-2">
        <p>{content}</p>
        {images && <ImageSlider images={images} />}
      </div>
      {!isCommentPost ? (
        <footer
          onClick={(e) => e.stopPropagation()}
          className="flex justify-between"
        >
          {isPostLikePending ? (
            <button>
            <Spinner size="sm" />
            </button>
          ) : (
            <button
              title={isPostLiked ? "Unlike" : "Like"}
              onClick={likeHandler}
              className={`${isPostLiked && "bg-primary/50 text-dark-100 "}
                          align flex items-center gap-1 rounded-lg p-1 text-sm 
                          font-light text-primary transition-all hover:bg-primary/25`}
            >
              <FaThumbsUp />
              <span>{likes?.length}</span>
            </button>
          )}
          <Link
            to={`/post/${_id}`}
            className="flex items-center gap-1 rounded-lg p-1 text-sm text-primary hover:bg-primary/25"
          >
            <FaCommentDots />
            <span>{comments?.length}</span>
          </Link>
          <button
            onClick={addPostToBookmarks}
            className="rounded-lg p-1 text-sm text-primary hover:bg-primary/25"
          >
            <FaBookmark />
          </button>
          <button
            onClick={sharePost}
            className="rounded-lg p-1 text-sm text-primary hover:bg-primary/25"
          >
            <FaShareAlt />
          </button>
        </footer>
      ) : (
        ""
      )}
    </article>
  );
}
