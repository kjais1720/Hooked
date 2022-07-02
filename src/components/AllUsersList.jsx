import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { ProfileCard, Modal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "slices";
export function AllUsersList() {
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Modal childName="allUsersList">
      <motion.article
        animate={{ scale: [0.5, 1, 1.1, 1] }}
        transition={{ duration: 0.5 }}
        className="max-w-[96vw] rounded-2xl bg-light-100 p-4 dark:bg-dark-200"
      >
        <header className="flex">
          <h3 className="text-xl text-gray-600 dark:text-gray-200">
            All users
          </h3>
          <button
            onClick={() => dispatch(closeModal())}
            className="ml-auto rounded-full bg-light-200 p-2 dark:bg-dark-100"
          >
            <FaTimes />
          </button>
        </header>
        <div className="mt-2 flex max-h-[60vh] flex-col gap-2 overflow-y-auto overflow-x-hidden px-2">
          {allUsers.map((user) => (
            <ProfileCard key={user._id} {...user} />
          ))}
        </div>
      </motion.article>
    </Modal>
  );
}
