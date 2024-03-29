import { Profile, Spinner } from "components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "services";
import { useDocumentTitle } from "utils";
export function CommonUserProfile() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { status, allUsers, currentUser } = useSelector((state) => state.user);
  const isPageLoading =
    status.value === "pending" && status.type === "getAllUsers";
  useDocumentTitle(`${username} | Hooked`);
  let user;
  let isUserFollowed;
  if (!isPageLoading) {
    user = allUsers.find((user) => user.username === username) ?? {};
    isUserFollowed = currentUser.following?.some((id) => id === user._id);
  }
  const followOrUnfollowUser = () => {
    if (!isUserFollowed) {
      dispatch(followUser(user._id));
      return;
    }
    dispatch(unfollowUser(user._id));
  };

  return isPageLoading ? (
    <Spinner size="md" />
  ) : (
    <Profile
      {...user}
      isCurrentUserProfile={false}
      isUserFollowed={isUserFollowed}
      followOrUnfollowUser={followOrUnfollowUser}
    />
  );
}
