import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likePost, bookmarkPost } from "services";
import { stopBubbling } from "utils";
import {
  FaCommentDots,
} from "react-icons/fa";
import {
  BsHandThumbsUp,
  BsBookmark,
  BsHandThumbsUpFill,
  BsBookmarkFill,
  BsShare
} from "react-icons/bs";
import {
  ImageSlider,
  ProfileImage,
  TimeAgo,
  PostOptionsPopover,
  Spinner,
  Modal,
  CreatePost,
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
  isInSinglePostPage,
  postIdOfComment,
}) {
  const { allUsers, currentUser } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToPostPage = () => {
    if (!isInSinglePostPage) {
      navigate(`/post/${_id}`);
    }
  };
  let postUser;
  let isCurrentUserPost;
  if (currentUser._id === userId) {
    postUser = { ...currentUser };
    isCurrentUserPost = true;
  } else {
    postUser = allUsers.find(({ _id }) => _id === userId) ?? {};
  }
  const { firstname, lastname, username, bookmarks } = postUser;
  const sharePost = async (e) => {
    e.stopPropagation();
    await navigator.share({
      url: `https://hooked-social.vercel.app/post/${_id}`,
      title: `${firstname} ${lastname}'s post on Hooked`,
      text: content,
    });
  };
  const likeHandler = (e) => {
    e.stopPropagation();
    dispatch(likePost({ userId: currentUser._id, postId: _id }));
  };
  const addPostToBookmarks = (e) => {
    e.stopPropagation();
    dispatch(bookmarkPost(_id));
  };
  const isPostLiked = likes?.some(
    (likedUserId) => likedUserId === currentUser._id
  );
  const isPostBookmarked = bookmarks?.some(
    (bookmarkedPostId) => bookmarkedPostId === _id
  );
  const isPostLoading =
    status.value === "pending" && status.type === "getAllPosts";
  const isPostLikeOrBookmarkPending =
    status.value === "pending" &&
    status.type === "likePost" &&
    status.payload === _id;
  return isPostLoading ? (
    <Spinner size="md" />
  ) : (
    <article
      onClick={navigateToPostPage}
      className="text-dark-2 flex w-full cursor-pointer flex-col gap-2 rounded-2xl bg-light-100 p-4 shadow-md dark:bg-dark-100 dark:text-gray-100"
    >
      <header className="flex">
        <div className="flex gap-2">
          <figure onClick={stopBubbling} className="h-12 w-12 rounded-full ">
            <Link to={isCurrentUserPost ? "/profile" : `/profile/${username}`}>
              <ProfileImage userId={userId} size="md" bgShade="darker" />
            </Link>
          </figure>
          <div className="flex flex-col gap-2">
            <div onClick={stopBubbling} className="flex gap-1">
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
          <div onClick={stopBubbling} className="ml-auto">
            <PostOptionsPopover
              postId={isCommentPost ? postIdOfComment : _id}
              commentId={isCommentPost && _id}
              isCommentPost={isCommentPost}
            />
          </div>
        ) : (
          ""
        )}
      </header>
      <div className="flex flex-col gap-2">
        <p className="text-sm">{content}</p>
        {images && (
          <ImageSlider
            showOriginalImageSize={isInSinglePostPage}
            images={images}
          />
        )}
      </div>
      {!isCommentPost ? (
        <footer
          onClick={(e) => e.stopPropagation()}
          className="flex justify-between"
        >
          {isPostLikeOrBookmarkPending ? (
            <button>
              <Spinner size="sm" color="primary" />
            </button>
          ) : (
            <button
              title={isPostLiked ? "Unlike" : "Like"}
              onClick={likeHandler}
              className={`align flex items-center gap-1 rounded-lg p-1 text-sm 
                          font-light text-primary transition-all hover:bg-primary/25
              `}
            >
              {isPostLiked ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
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
            className="rounded-lg p-1 text-sm font-extrabold text-primary hover:bg-primary/25"
          >
            {isPostBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
          </button>
          <button
            onClick={sharePost}
            className="rounded-lg p-1 text-sm text-primary hover:bg-primary/25"
          >
            <BsShare />
          </button>
        </footer>
      ) : (
        ""
      )}
      <Modal childName={`editPost_${_id}`}>
        <CreatePost
          postToEdit={{
            _id,
            userId,
            likes,
            comments,
            images,
            content,
            createdAt,
          }}
        />
      </Modal>
    </article>
  );
}
