import { ProfileImage, Spinner } from "components";
import { followUser, unfollowUser } from "services";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "slices";
import { Link } from "react-router-dom";
export function ProfileCard({ firstname, lastname, username, _id }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const currentUser = useSelector(getCurrentUser);
  const isUserFollowed = currentUser.following?.some((id) => id === _id);
  const followUnfollowUser = () => {
    if (!isUserFollowed) {
      dispatch(followUser(_id));
      return;
    }
    dispatch(unfollowUser(_id));
  };

  const isLoading =
    (status.type === "followUser" || status.type === "unfollowUser") &&
    status.payload === _id &&
    status.value === "pending";
  return (
    <article className="flex gap-2 rounded-2xl bg-light-100 p-4 shadow-md shadow-dark-200 dark:bg-dark-100">
      <Link to={`/profile/${username}`}>
        <ProfileImage userId={_id} size="md" bgShade="darker" />
      </Link>
      <Link to={`/profile/${username}`}>
        <h3 className="text-sm font-medium text-gray-600 dark:text-light-200">
          {firstname} {lastname}
        </h3>
        <h4 className="text-xs text-gray-400 dark:text-gray-400">
          @{username}
        </h4>
      </Link>
      {isLoading ? (
        <button className="ml-auto text-primary">
          <Spinner size="md" />
        </button>
      ) : (
        <button
          onClick={followUnfollowUser}
          className="ml-auto text-sm text-primary"
        >
          {isUserFollowed ? "Unfollow" : "Follow"}
        </button>
      )}
    </article>
  );
}
