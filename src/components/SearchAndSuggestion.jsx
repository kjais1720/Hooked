import { useState } from "react";
import { ProfileCard, AllUsersList, Spinner } from "components";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "slices";
import { useDebouncedFunction } from "utils";
export function SearchAndSuggestion() {
  const [usersFoundFromSearch, setUsersFoundFromsearch] = useState([]);
  const { allUsers, status } = useSelector((state) => state.user);
  const usersToShow = allUsers.slice(0, 4);
  const dispatch = useDispatch();
  const isLoading = status.value === "pending" && status.type === "getAllUsers";
  const searchForUser = (searchText) => {
    if (searchText === "" || searchText === " ") {
      setUsersFoundFromsearch([]);
      return;
    }
    const foundUsers = allUsers.filter(({ firstname, lastname, username }) => {
      const uppercaseFirstname = firstname.toUpperCase();
      const uppercaseLastname = lastname.toUpperCase();
      const uppercaseSearchText = searchText.toUpperCase();
      const uppercaseUsername = username.toUpperCase();
      return (
        uppercaseUsername.includes(uppercaseSearchText) ||
        uppercaseFirstname.includes(uppercaseSearchText) ||
        uppercaseLastname.includes(uppercaseSearchText) ||
        (uppercaseFirstname + " " + uppercaseLastname).includes(
          uppercaseSearchText
        )
      );
    });
    console.log(foundUsers);
    setUsersFoundFromsearch(foundUsers);
  };
  const debouncedSearchFunction = useDebouncedFunction(searchForUser, 1000);
  const searchOnInputChange = (e) => {
    debouncedSearchFunction(e.target.value);
  };
  return (
    <div>
      <div className="m-2 rounded-2xl bg-light-200 text-gray-600 dark:bg-dark-200 dark:text-gray-200 lg:w-[21rem] md:w-[17rem] fixed top-0 ">
        <div className="relative rounded-2xl bg-light-200 dark:bg-dark-200">
          <input
            type="text"
            className="w-full rounded-2xl border-none bg-light-100
                         p-4 outline-light-200
                         focus-visible:border-none focus-visible:outline-none
                         dark:bg-dark-100"
            placeholder="Find Friends..."
            onChange={searchOnInputChange}
          />
          {usersFoundFromSearch.length > 0 ? (
            <div className="absolute mt-2 rounded-2xl flex w-full flex-col gap-2 bg-dark-100 shadow-dark-200 shadow-top shadow-lg px-2 py-4 max-h-[60vh] overflow-y-auto overflow-x-hidden ">
                {usersFoundFromSearch.map((user) => (
                  <ProfileCard key={user._id} {...user} />
                ))}
            </div>
          ) : (
            ""
          )}
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
          {isLoading ? (
            <Spinner size="md" />
          ) : (
            usersToShow?.map((user) => <ProfileCard key={user._id} {...user} />)
          )}
        </div>
      </div>
    </div>
  );
}
