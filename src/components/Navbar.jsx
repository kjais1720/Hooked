import { FaHome, FaSearch, FaPlus, FaBell, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <div className="relative z-10">
      <div className="m-2 rounded-2xl bg-light-200 dark:bg-dark-100">
        <nav
          className="md:max-w-48 space-between md:rounded-0 fixed bottom-0 
                        left-0 right-0 z-10
                        m-2 flex items-center
                        justify-around gap-2 rounded-3xl bg-light-100 text-2xl
                        font-medium dark:bg-primary dark:text-dark-200 md:sticky 
                        md:top-2 md:flex-col md:items-center md:justify-start md:gap-2
                        md:bg-light-200 md:p-4 md:dark:bg-dark-100 dark:md:text-gray-200 lg:items-start"
        >
          <NavLink
            className="md:text-md flex items-center gap-2 rounded-2xl p-4 hover:bg-gray-400/25 md:text-xl"
            to="/home"
          >
            <FaHome title="home" />
            <p className="hidden lg:block">Home</p>
          </NavLink>
          <NavLink
            className="md:text-md flex items-center gap-2 rounded-2xl p-4 hover:bg-gray-400/25 md:text-xl"
            to="/explore"
          >
            <FaSearch title="search" />
            <p className="hidden lg:block">Explore</p>
          </NavLink>
          <button className="md:text-md flex items-center justify-center gap-2 rounded-2xl bg-dark-100 p-4 text-xl text-primary hover:bg-dark-100/75 dark:bg-dark-200 hover:dark:bg-dark-200/75 md:order-1 lg:w-full">
            <FaPlus title="create post" />
            <p className="hidden lg:block">New Post</p>
          </button>
          <NavLink
            className="md:text-md flex items-center gap-2 rounded-2xl p-4 hover:bg-gray-400/25 md:text-xl"
            to="/notifications"
          >
            <FaBell title="notifications" />
            <p className="hidden lg:block">Notifications</p>
          </NavLink>
          <NavLink
            className="md:text-md flex items-center gap-2 rounded-2xl p-4 hover:bg-gray-400/25 md:text-xl"
            to="/profile"
          >
            <FaUser/>
            <p className="hidden lg:block">Profile</p>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
