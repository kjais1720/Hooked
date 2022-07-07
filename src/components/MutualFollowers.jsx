import { useDispatch, useSelector } from "react-redux";
import { Modal, UsersList, ProfileImage } from "components";
import { openModal } from "slices";
import { Link } from "react-router-dom";

export function MutualFollowersBar({ otherUserFollowers }) {
  const { currentUser } = useSelector((state) => state.user);
  const { followers: currentUserFollowers } = currentUser;
  const mutualFollowerIds =
    currentUserFollowers?.filter((userId) =>
      otherUserFollowers?.includes(userId)
    ) ?? [];
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const mutualFollowers = allUsers.filter(({ _id }) =>
    mutualFollowerIds.includes(_id)
  );
  const totalMutualFollowers = mutualFollowers.length;
  const openMutualFollowersList = () => dispatch(openModal("mutualFollowers"));

  return totalMutualFollowers > 0 ? (
    <>
      <div className="mx-auto flex w-fit items-center gap-2 rounded-2xl bg-light-100 py-1 px-4 pl-6 text-xs text-dark-200 shadow-md dark:bg-dark-100 dark:text-light-200 md:m-0 ">
        {mutualFollowerIds.slice(0, 4).map((followerId) => (
          <div key={followerId} className="-ml-4">
            <ProfileImage userId={followerId} size="sm" bgShade="darker" />
          </div>
        ))}{" "}
        <span>
          followed by{" "}
          <Link
            className="text-primary"
            to={`/profile/${mutualFollowers[0].username}`}
          >
            {mutualFollowers[0].firstname}
          </Link>
          {totalMutualFollowers > 1 ? (
            totalMutualFollowers === 2 ? (
              <>
                &{" "}
                <Link
                  className="text-primary"
                  to={`/profile/${mutualFollowers[1].username}`}
                >
                  {mutualFollowers[1].firstname}
                </Link>
              </>
            ) : (
              <>
                ,{" "}
                <Link
                  className="text-primary"
                  to={`/profile/${mutualFollowers[1].username}`}
                >
                  {mutualFollowers[1].firstname}
                </Link> and{" "}
                <button
                  onClick={openMutualFollowersList}
                  className="text-primary"
                >
                  {totalMutualFollowers - 2} others
                </button>
              </>
            )
          ) : (
            ""
          )}
        </span>
      </div>
      <Modal childName="mutualFollowers">
        <UsersList listTitle="Mutual Followers" userIds={mutualFollowerIds} />
      </Modal>
    </>
  ) : (
    ""
  );
}
