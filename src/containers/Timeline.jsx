import { useSelector } from "react-redux";
import { Post, Spinner } from "components";
import { getTimelinePosts } from "slices";
export function Timeline() {
  const {
    status: { type, value },
  } = useSelector((state) => state.posts);
  const timelinePosts = useSelector(getTimelinePosts);
  const isPageLoading = type === "getAllPosts" && value === "pending";
  return (
    <section className="rounded-2xl bg-light-200 p-2 dark:bg-dark-200">
      <h2 className="mb-2 rounded-2xl bg-light-100 p-4 text-left text-xl font-medium text-gray-600 dark:text-gray-200 dark:bg-dark-100">
        Home
      </h2>

      {isPageLoading ? (
        <Spinner size="lg"/>
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
