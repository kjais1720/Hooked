import { useSelector, useDispatch } from "react-redux";
import { Post, SkeletonLoader, NoPostsFound } from "components";
import { getTimelinePosts } from "slices";
import { setSortingOrder } from "slices";
export function Timeline() {
  const { sortBy } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const sortPosts = (e) => {
    dispatch(setSortingOrder(e.target.value));
  };
  const {
    status: { type, value },
  } = useSelector((state) => state.posts);
  const timelinePosts = useSelector(getTimelinePosts);
  const isPageLoading = type === "getAllPosts" && value === "pending";
  return (
    <section className="rounded-2xl bg-light-200 p-2 dark:bg-dark-200">
      <h2 className="mb-2 rounded-2xl bg-light-100 p-4 text-left text-xl font-medium text-gray-600 dark:bg-dark-100 dark:text-gray-200">
        Home
      </h2>
      <div className="flex items-center justify-between py-2">
        <p className="text-xl font-bold">Posts</p>
        <div>
          <span className="mr-2">Sort by</span>
          <button
            className={`rounded-l-2xl py-1 px-2 text-sm ${
              sortBy === "TRENDING"
                ? "bg-primary text-dark-200"
                : "bg-dark-100 text-gray-200"
            }`}
            value="TRENDING"
            onClick={sortPosts}
          >
            Trending
          </button>
          <button
            className={`rounded-r-2xl py-1 px-2 text-sm ${
              sortBy === "DATE"
                ? "bg-primary text-dark-200"
                : "bg-dark-100 text-gray-200"
            }`}
            value="DATE"
            onClick={sortPosts}
          >
            Date
          </button>
        </div>
      </div>
      {isPageLoading ? (
        <div className="mt-4 flex flex-col gap-2">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      ) : timelinePosts.length > 0 ? (
        <div class="mt-16">
          <NoPostsFound />
        </div>
      ) : (
        <div className="mt-2 flex flex-col gap-2">
          {timelinePosts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      )}
    </section>
  );
}
