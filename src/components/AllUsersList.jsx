import { FaTimes } from "react-icons/fa";
import { ProfileCard, Modal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "slices";
export function AllUsersList() {
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Modal childName="allUsersList">
      <article className="rounded-2xl bg-light-100 p-4 dark:bg-dark-100">
        <header className="flex">
          <h3 className="text-xl text-gray-600 dark:text-gray-200">
            All users
          </h3>
          <button
            onClick={() => dispatch(closeModal())}
            className="ml-auto rounded-full bg-light-200 p-2 dark:bg-dark-200"
          >
            <FaTimes />
          </button>
        </header>
        <div className="max-h-[60vh] mt-2 overflow-y-auto overflow-x-hidden">
          {allUsers.map((user) => (
            <ProfileCard key={user._id} {...user} />
          ))}
        </div>
      </article>
    </Modal>
  );
}
