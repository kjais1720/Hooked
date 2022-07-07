export { login, logout, getCurrentUser, getUserById } from "./userSlice";
export { openModal, closeModal, toggleModal } from "./modalSlice";
export {
  getTimelinePosts,
  getPostById,
  setSortingOrder,
  getUserBookmarks,
  getUserLikes,
  getUserPosts,
  sortPosts,
  getExploreFeedPosts,
} from "./postsSlice";

export { toggleTheme } from "./themeSlice"
