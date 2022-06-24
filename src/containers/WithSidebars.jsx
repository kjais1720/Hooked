import { Navbar, RightSideBar } from "components";
import { Outlet } from "react-router";
export function WithSidebars() {
  return (
    <div className="mb-20 md:mb-0 md:grid md:grid-cols-[6rem_auto_18rem] lg:grid-cols-[18rem_auto_20rem]">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <RightSideBar />
    </div>
  );
}
