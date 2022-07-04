import { FaHome, FaSearch, FaPlus, FaBell, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "slices";
export function Navbar() {
  const dispatch = useDispatch();
  const openCreatePostModal = () => {
    dispatch(openModal("createPost"));
  };
  return (
    <div className="relative z-10">
      <nav
        className="md:max-w-48 space-between md:rounded-0 fixed bottom-0 
                        left-0 right-0 z-10
                        m-2 flex items-center justify-around
                        gap-2 rounded-3xl bg-light-100 text-2xl font-medium
                        dark:bg-primary dark:text-dark-200 md:top-0 md:max-w-[17rem] md:w-[5rem] lg:w-[17rem] 
                        md:flex-col md:items-center md:justify-start md:gap-2 md:bg-light-200
                        md:p-4 md:dark:bg-dark-100 dark:md:text-gray-200 lg:items-start"
      >
        <h1 className="hidden select-none text-4xl font-extrabold text-primary lg:block">
          Hooked.
        </h1>
        <h1 className="hidden select-none text-4xl font-extrabold text-primary md:block lg:hidden">
          H.
        </h1>
        <NavLink
          className="md:text-md flex items-center gap-2 rounded-2xl p-4 hover:bg-gray-400/25 md:w-full md:text-xl"
          to="/home"
        >
          <FaHome title="home" />
          <p className="hidden lg:block">Home</p>
        </NavLink>
        <NavLink
          className="md:text-md flex items-center gap-2 rounded-2xl p-4 hover:bg-gray-400/25 md:w-full md:text-xl"
          to="/explore"
        >
          <FaSearch title="search" />
          <p className="hidden lg:block">Explore</p>
        </NavLink>
        <button
          onClick={openCreatePostModal}
          className="md:text-md bg-dark-10 flex items-center justify-center gap-2 rounded-2xl bg-dark-100
                       p-4 text-xl font-bold text-primary hover:bg-dark-200/75 md:order-1 md:w-full md:bg-primary md:text-dark-200 md:hover:bg-primary/75"
        >
          <FaPlus title="create post" />
          <p className="hidden lg:block">New Post</p>
        </button>
        <NavLink
          className="md:text-md flex items-center gap-2 rounded-2xl p-4 hover:bg-gray-400/25 md:w-full md:text-xl"
          to="/notifications"
        >
          <FaBell title="notifications" />
          <p className="hidden lg:block">Notifications</p>
        </NavLink>
        <NavLink
          className="md:text-md flex items-center gap-2 rounded-2xl p-4 hover:bg-gray-400/25 md:w-full md:text-xl"
          to="/profile"
        >
          <FaUser />
          <p className="hidden lg:block">Profile</p>
        </NavLink>
      </nav>
    </div>
  );
}
