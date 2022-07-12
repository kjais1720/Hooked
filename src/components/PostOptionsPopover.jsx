import { FaEllipsisV, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useReducer } from "react";
import { motion } from "framer-motion";
export function PostOptionsPopover({ editPost, deletePost }) {
  const [showPopover, togglePopover] = useReducer((state) => !state, false);
  return (
    <div className="relative z-10">
      {showPopover ? (
        <div
          className="fixed inset-0 bg-transparent"
          onClick={togglePopover}
        ></div>
      ) : (
        ""
      )}
      <motion.ul
        className={`relative flex gap-2 rounded-2xl
                    bg-light-200 text-lg dark:bg-dark-200
                    `}
      >
        {showPopover ? (
          <motion.div
            initial={{ maxWidth: 0, }}
            animate={{ maxWidth: 100 }}
            className="flex gap-2 overflow-hidden"
          >
            <button onClick={editPost} className={`p-2`} title="Edit post">
              <FaEdit />
            </button>
            <button onClick={deletePost} className={`p-2`} title="Delete post">
              <FaTrash />
            </button>
          </motion.div>
        ) : (
          ""
        )}
        <button title="Options" onClick={togglePopover} className="p-2">
          {showPopover ? <FaTimes /> : <FaEllipsisV />}
        </button>
      </motion.ul>
    </div>
  );
}
