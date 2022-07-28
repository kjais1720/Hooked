import { useState } from "react";
import { ProfileCard, UsersList, Spinner, Modal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "slices";
import { useDebouncedFunction } from "utils";
import { FaTimes } from "react-icons/fa";
export function SearchAndSuggestion() {
  const [usersFoundFromSearch, setUsersFoundFromsearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { allUsers, status } = useSelector((state) => state.user);
  const suggestedUsersToShow = allUsers.slice(0, 4);
  const dispatch = useDispatch();
  const isLoading = status.value === "pending" && status.type === "getAllUsers";
  const searchForUser = (searchText) => {
    if (searchText.trim() === "") {
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
    setUsersFoundFromsearch(foundUsers);
  };
  const debouncedSearchFunction = useDebouncedFunction(searchForUser, 1000);
  const searchOnInputChange = (e) => {
    setSearchText(e.target.value);
    debouncedSearchFunction(e.target.value);
  };
  const clearSearch = () => {
    setSearchText("");
    setUsersFoundFromsearch([]);
  };
  return (
    <>
      <div className="m-2 rounded-2xl bg-light-200 text-gray-600 dark:bg-dark-200 dark:text-gray-200 md:fixed md:top-0 md:w-[17rem] lg:w-[21rem] ">
        <div className="relative rounded-2xl bg-light-200 dark:bg-dark-200">
          <div className="relative">
            <input
              type="text"
              className={`w-full rounded-2xl border-none bg-light-100
                           p-4 outline-light-200
                           focus-visible:border-none focus-visible:outline-none
                           dark:bg-dark-100 ${searchText !== "" ? "pr-8" : ""}`}
              placeholder="Find Friends..."
              onChange={searchOnInputChange}
              value={searchText}
            />
            {searchText !== "" ? (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 "
                onClick={clearSearch}
              >
                <FaTimes />
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="absolute -mt-4 max-h-[60vh] w-full overflow-y-auto overflow-x-hidden rounded-b-2xl bg-light-100 shadow-lg dark:bg-dark-100 dark:shadow-dark-200 ">
            {usersFoundFromSearch.length > 0 ? (
              <div className="flex flex-col gap-2 px-2 py-4">
                {usersFoundFromSearch.map((user) => (
                  <ProfileCard key={user._id} {...user} />
                ))}
              </div>
            ) : searchText.trim() !== "" ? (
              <p className="p-2 text-center text-gray-400">No Users found</p>
            ) : (
              ""
            )}
          </div>
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
          {isLoading ? (
            <Spinner size="md" />
          ) : (
            suggestedUsersToShow?.map((user) => (
              <ProfileCard key={user._id} {...user} />
            ))
          )}
        </div>
      </div>
      <Modal childName="allUsersList">
        <UsersList />
      </Modal>
    </>
  );
}
