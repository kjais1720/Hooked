import {
  useLocation,
  useOutletContext,
  useParams,
  Link,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserPosts, getUserBookmarks, getUserLikes } from "slices";
import { Post, SkeletonLoader } from "components";

export function ProfilePosts() {
  const { pathname } = useLocation();
  const { username } = useParams();
  const { _id, bookmarks, likes, isCurrentUserProfile } = useOutletContext();
  const { status } = useSelector((state) => state.posts);
  const userPosts = useSelector((state) => getUserPosts(state, _id));
  const userLikes = useSelector((state) => getUserLikes(state, likes ?? []));
  const userBookmarks = useSelector((state) =>
    getUserBookmarks(state, bookmarks ?? [])
  );
  const allTypesOfPosts = {
    "": userPosts,
    likes: userLikes,
    bookmarks: userBookmarks,
  };
  const postTypeToShow =
    username === undefined
      ? pathname.slice(9)
      : pathname.slice(10 + username.length);
  const postsToShow = allTypesOfPosts[postTypeToShow];
  const arePostsLoading =
    (status.type === "getAllPosts" && status.value === "pending") ||
    postsToShow === undefined;
  const profileSectionButtons = [
    {
      key: 0,
      type: "Posts",
      path: `/profile${username ? "/" + username : ""}`,
    },
    {
      key: 1,
      type: "Likes",
      path: `/profile/${username ? username + "/" : ""}likes`,
    },
    {
      key: 2,
      type: "Bookmarks",
      path: `/profile/${username ? username + "/" : ""}bookmarks`,
    },
  ];
  const isLinkActive = (path) => path === pathname;
  const shouldHideBookmarks = !isCurrentUserProfile;
  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        {profileSectionButtons.map(({ type, path, key }) => {
          if(shouldHideBookmarks && type==="Bookmarks"){
            return ''
          }
          return (
            <Link
              key={key}
              to={path}
              className={`flex-grow shadow-md rounded-2xl p-2 px-4 text-center dark:bg-dark-100 ${
                isLinkActive(path)
                  ? "bg-dark-100 text-primary"
                  : "bg-light-100 text-dark-200 dark:text-light-200"
              }`}
            >
              {type}
            </Link>
          );
        })}
      </div>
      {arePostsLoading ? (
        <SkeletonLoader />
      ) : postsToShow.length > 0 ? (
        postsToShow.map((post) => post && <Post key={post._id} {...post} />)
      ) : (
        <div className="text-center">
          <div className="w-fit text-xl m-auto mt-8 rotate-12 rounded bg-primary dark:text-dark-200 text-light-200 px-2">
            No posts to show
          </div>
        </div>
      )}
    </section>
  );
}
