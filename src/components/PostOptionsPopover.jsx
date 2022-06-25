import { FaEllipsisV, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useReducer } from "react"
import { useDispatch } from "react-redux";
import { deletePost } from "services";
export function PostOptionsPopover({postId, isCommentPost}){
  const [showPopover, togglePopover ] = useReducer(state=>!state, false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    if(!isCommentPost){
      dispatch(deletePost(postId))
    }
  }
  return(
    <div className='relative z-10'>
      <ul className={`${showPopover || "hidden"} absolute top-[100%] -translate-x-1/2 p-2 rounded-2xl 
                    bg-light-200 dark:bg-dark-200
                    flex flex-col gap-2 text-xl
                    `}
      >
        <button className="p-2" title="Edit post"><FaEdit/></button>
        <button onClick={handleDelete} className="p-2" title="Delete post"><FaTrash/></button>
      </ul>
      <button title="Options" onClick={togglePopover} className="p-2">
        {showPopover ? <FaTimes/> : <FaEllipsisV/>}
      </button>
    </div>
  )

}