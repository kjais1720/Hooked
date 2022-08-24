import {
  Login,
  WithSidebars,
  SignUp,
  LandingPage,
  CurrentUserProfile,
  CommonUserProfile,
  Timeline,
  SinglePost,
  NotFound,
  Explore,
  Notifications,
} from "containers";
import { ProfilePosts } from "components/ProfilePosts";
import { Routes, Route } from "react-router";
import { RequiresAuth } from "./RequiresAuth";
export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<WithSidebars />}>
        <Route element={<RequiresAuth />}>
          <Route path="/home" element={<Timeline />} />
          <Route path="/profile" element={<CurrentUserProfile />}>
            <Route path="" element={<ProfilePosts />} />
            <Route path="likes" element={<ProfilePosts />} />
            <Route path="bookmarks" element={<ProfilePosts />} />
          </Route>
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/profile/:username" element={<CommonUserProfile />}>
          <Route path="" element={<ProfilePosts />} />
          <Route path="likes" element={<ProfilePosts />} />
        </Route>
        <Route path="/explore" element={<Explore />} />
      </Route>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
