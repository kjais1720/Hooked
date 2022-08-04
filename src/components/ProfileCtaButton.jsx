import { DotsLoader } from "components";
import { useSelector } from "react-redux";

export function ProfileCtaButton({
  isCurrentUserProfile,
  openEditModal,
  isUserFollowed,
  followOrUnfollowUser,
  userId,
}) {
  const { status } = useSelector((state) => state.user);
  const isLoading = status.payload === userId && status.value === "pending";
  return isCurrentUserProfile ? (
    <button
      onClick={openEditModal}
      className="flex-grow justify-center rounded-2xl bg-dark-200 p-4 text-center text-xs font-medium text-primary  dark:bg-dark-100 md:flex-grow-0"
    >
      Edit profile
    </button>
  ) : isLoading ? (
    <button className="flex-grow justify-center rounded-2xl bg-dark-200 p-4 text-center text-xs font-medium text-primary  dark:bg-dark-100 md:flex-grow-0">
      <DotsLoader />
    </button>
  ) : (
    <button
      className="flex-grow justify-center rounded-2xl bg-dark-200 p-4 text-center text-xs font-medium text-primary  dark:bg-dark-100 md:flex-grow-0"
      onClick={followOrUnfollowUser}
    >
      {isUserFollowed ? "Unfollow" : "Follow"}
    </button>
  );
}
