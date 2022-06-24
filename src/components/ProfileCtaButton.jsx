export function ProfileCtaButton({
  isCurrentUserProfile,
  openEditModal,
  isUserFollowed,
  followUnfollowUser,
}) {
  return isCurrentUserProfile ? (
    <button
      onClick={openEditModal}
      className="flex-grow justify-center rounded-2xl bg-dark-200 p-4 text-center text-xs font-medium text-primary  dark:bg-dark-100 md:flex-grow-0"
    >
      Edit profile
    </button>
  ) : (
    <button
      className="flex-grow justify-center rounded-2xl bg-dark-200 p-4 text-center text-xs font-medium text-primary  dark:bg-dark-100 md:flex-grow-0"
      onClick={followUnfollowUser}
    >
      {isUserFollowed ? "Unfollow" : "Follow"}
    </button>
  );
}
