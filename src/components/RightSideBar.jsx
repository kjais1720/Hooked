import { FaSearch } from "react-icons/fa";
import { ProfileCard, AllUsersList } from "components";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "slices";
export function RightSideBar() {
  const { allUsers } = useSelector((state) => state.user);
  const usersToShow = allUsers.slice(0, 4);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="m-2 hidden rounded-2xl bg-light-200 text-gray-600 dark:bg-dark-200 dark:text-gray-200 md:sticky md:top-2 md:block ">
        <div className="flex items-center gap-2 rounded-2xl bg-light-100 px-4 py-2 dark:bg-dark-100">
          <input
            type="text"
            className="flex-grow border-none bg-light-100 
                       p-2 outline-light-200 
                       focus-visible:border-none focus-visible:outline-transparent
                       dark:bg-dark-100"
            placeholder="Find Friends..."
          />
          <button className="text-gray-600 dark:text-gray-400">
            <FaSearch />
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex gap-2 rounded-2xl bg-light-100 p-4 text-gray-600 dark:bg-dark-100 dark:text-light-200">
            Who to follow?
            <button
              onClick={() => dispatch(openModal("allUsersList"))}
              className="ml-auto text-primary"
            >
              Show More
            </button>
          </div>
          <AllUsersList />
          {usersToShow?.map((user) => (
            <ProfileCard key={user._id} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
}
