import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaLink } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {
  MutualFollowersBar,
  ProfileImage,
  ProfileCtaButton,
  SkeletonLoader,
} from "components";
import { navigateToPreviousPage } from "utils";

const profileSectionButtons = [
  {
    key: 0,
    type: "Posts",
    path: "",
  },
  {
    key: 1,
    type: "Likes",
    path: "",
  },
  {
    key: 2,
    type: "Bookmarks",
    path: "",
  },
];

export function Profile({
  _id,
  firstname,
  lastname,
  username,
  about,
  website,
  profilePicture,
  coverPicture,
  location,
  followers,
  following,
  isCurrentUserProfile,
  openEditModal,
  isUserFollowed,
  followUnfollowUser,
  userPosts,
  logoutUser,
}) {
  const navigate = useNavigate();
  return (
    <div className="m-2 mx-auto rounded-2xl bg-light-200 dark:bg-dark-200">
      <div className="m-2 flex items-center gap-4 rounded-2xl bg-light-100 p-2 dark:bg-dark-100">
        <button
          onClick={()=>navigateToPreviousPage(navigate)}
          className="p-2 text-2xl font-extrabold text-white"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-medium text-gray-600 dark:text-gray-200">
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
              className="h-[30vh] rounded-2xl object-cover md:h-[40vh]"
              src={coverPicture || "/assets/cover.jpg"}
              alt="profile cover"
            />
          </figure>
          <div className="relative flex -translate-y-1/2 justify-center px-4 md:justify-start">
            <figure className="rounded-full border-8 border-light-200 dark:border-dark-200">
              <ProfileImage
                userId={_id}
                size="lg"
                bgShade="lighter"
              />
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
            <div className="flex justify-center gap-8 md:justify-start">
              <h4 className="flex items-center justify-center gap-2 text-sm font-light text-gray-500 dark:text-gray-400 ">
                <FaMapMarkerAlt /> {location ?? "Location"}
              </h4>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-1 text-indigo-600"
              >
                <FaLink /> {website || "https://xyz.com"}
              </a>
            </div>
            <p className="text-sm dark:text-gray-300">
              {about || "Write something about yourself"}
            </p>
          </div>
          <div className="flex justify-center gap-2 md:justify-start md:gap-4">
            <Link
              to="followers"
              className="flex-grow justify-center rounded-2xl 
                      bg-light-100 p-4 text-center 
                        text-xs dark:bg-dark-100  md:flex-grow-0"
            >
              <span className="text-primary">{followers?.length}</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">
                Followers
              </span>
            </Link>
            <Link
              to="following"
              className=" flex-grow rounded-2xl bg-light-100 p-4 text-center text-xs dark:bg-dark-100  md:flex-grow-0"
            >
              <span className="text-primary">{following?.length}</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">
                Following
              </span>
            </Link>
            <ProfileCtaButton
              isCurrentUserProfile={isCurrentUserProfile}
              openEditModal={openEditModal}
              isUserFollowed={isUserFollowed}
              followUnfollowUser={followUnfollowUser}
            />
          </div>
          {isCurrentUserProfile ? " " : <MutualFollowersBar />}
        </div>
      </header>
      <main className="mt-4">
        <div className="flex gap-2 px-4">
          {profileSectionButtons.map(({ type, path, key }) => {
            return (
              <NavLink
                key={key}
                to={path}
                className={({ isActive }) =>
                  `flex-grow rounded-2xl p-2 px-4 text-center dark:bg-dark-100 ${
                    isActive
                      ? "bg-dark-100 text-primary"
                      : "bg-light-100 text-dark-200 dark:text-light-200"
                  }`
                }
              >
                {type}
              </NavLink>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 p-4">
          {/* To be filled with posts */}
          <SkeletonLoader/>
        </div>
      </main>
    </div>
  );
}
