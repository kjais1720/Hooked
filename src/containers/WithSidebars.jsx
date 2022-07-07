import { Navbar, SearchAndSuggestion, CreatePost, Modal } from "components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { getAllUsers, getAllPosts } from "services";
export function WithSidebars() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="mb-20 md:mb-0 md:grid md:grid-cols-[6rem_auto_18rem] lg:grid-cols-[18rem_auto_22rem]">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <div className="hidden md:block">
        <SearchAndSuggestion />
      </div>
      <Modal childName="createPost">
        <CreatePost />
      </Modal>
    </div>
  );
}
