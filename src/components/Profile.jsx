import { useNavigate, Outlet } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaLink } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {
  MutualFollowersBar,
  ProfileImage,
  ProfileCtaButton,
  Modal,
  UsersList,
} from "components";
import { navigateToPreviousPage } from "utils";
import { openModal } from "slices";
import { useDispatch } from "react-redux";

export function Profile({
  _id,
  firstname,
  lastname,
  username,
  about,
  website,
  coverPicture,
  location,
  followers,
  following,
  isCurrentUserProfile,
  openEditModal,
  isUserFollowed,
  followOrUnfollowUser,
  bookmarks,
  likes,
  logoutUser,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openFollowersList = () =>
    dispatch(openModal(`${username}_followersList`));
  const openFollowingList = () =>
    dispatch(openModal(`${username}_followingList`));
  return (
    <div className="relative z-0 m-2 mx-auto rounded-2xl bg-light-200 dark:bg-dark-200">
      <div className="m-2 flex items-center gap-4 rounded-2xl bg-light-100 p-2 dark:bg-dark-100">
        <button
          onClick={() => navigateToPreviousPage(navigate)}
          className="text-dark-gray-600 p-2 text-2xl font-extrabold dark:text-white"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-medium text-gray-600 dark:text-gray-200">
          {firstname} {lastname}
        </h2>
        {isCurrentUserProfile && (
          <button
            onClick={logoutUser}
            className="ml-auto p-2 text-2xl text-gray-600 dark:text-gray-200"
          >
            <MdLogout />
          </button>
        )}
      </div>
      <header>
        <div className="relative ">
          <figure className="h-full w-full px-2">
            <img
              className="h-[25vh] rounded-2xl object-cover md:h-[40vh]"
              src={coverPicture?.src || "/assets/cover.png"}
              alt="profile cover"
            />
          </figure>
          <div className="relative flex -translate-y-1/2 justify-center px-4 md:justify-start">
            <figure className="rounded-full border-8 border-light-200 dark:border-dark-200">
              <ProfileImage userId={_id} size="lg" bgShade="lighter" />
            </figure>
          </div>
        </div>
        <div className="-mt-20 flex flex-col gap-4 p-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-200 ">
              {`${firstname} ${lastname}`}
            </h3>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 ">
              @{username}
            </h4>
          </div>
          <div className="text-center md:text-left">
            <div className="flex flex-col items-center justify-center gap-2 text-xs md:flex-row md:justify-start md:gap-8 md:text-sm">
              <h4 className="flex items-center justify-center gap-2 font-light text-gray-500 dark:text-gray-400 ">
                {location ? (
                  <>
                    <FaMapMarkerAlt /> {location}{" "}
                  </>
                ) : (
                  ""
                )}
              </h4>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-1 text-indigo-600"
              >
                {website ? (
                  <>
                    <FaLink /> {website}{" "}
                  </>
                ) : (
                  ""
                )}
              </a>
            </div>
            <p className="mt-4 text-sm dark:text-gray-300">{about}</p>
          </div>
          <div className="flex justify-center gap-2 md:justify-start md:gap-4">
            <button
              onClick={openFollowersList}
              className="flex-grow justify-center rounded-2xl bg-light-100 p-4 
                      text-center text-xs font-bold 
                        shadow-md dark:bg-dark-100  md:flex-grow-0"
            >
              <span className="text-primary">{followers?.length}</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">
                Followers
              </span>
            </button>
            <button
              onClick={openFollowingList}
              className=" flex-grow rounded-2xl bg-light-100 p-4 text-center text-xs font-bold shadow-md dark:bg-dark-100  md:flex-grow-0"
            >
              <span className="text-primary">{following?.length}</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">
                Following
              </span>
            </button>
            <ProfileCtaButton
              isCurrentUserProfile={isCurrentUserProfile}
              openEditModal={openEditModal}
              isUserFollowed={isUserFollowed}
              followOrUnfollowUser={followOrUnfollowUser}
              userId={_id}
            />
          </div>
          {isCurrentUserProfile ? (
            " "
          ) : (
            <MutualFollowersBar otherUserFollowers={followers} />
          )}
        </div>
      </header>
      <main className="mt-4">
        <Outlet context={{ _id, bookmarks, likes, isCurrentUserProfile }} />
      </main>
      <Modal childName={`${username}_followersList`}>
        <UsersList listTitle="Followers" userIds={followers} />
      </Modal>
      <Modal childName={`${username}_followingList`}>
        <UsersList listTitle="Following" userIds={following} />
      </Modal>
    </div>
  );
}
