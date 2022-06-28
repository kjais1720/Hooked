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
  Notifications
} from "containers";
import { ProfilePosts } from "components/ProfilePosts";
import { Routes, Route } from "react-router";
import { RequiresAuth } from "./RequiresAuth";

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<RequiresAuth />}>
        <Route element={<WithSidebars />}>
          <Route path="/home" element={<Timeline />} />
          <Route path="/profile" element={<CurrentUserProfile />} >
            <Route path="" element={<ProfilePosts/>} />
            <Route path="likes" element={<ProfilePosts/>} />
            <Route path="bookmarks" element={<ProfilePosts/>} />
          </Route>
          <Route path="/profile/:username" element={<CommonUserProfile />}>
            <Route path="" element={<ProfilePosts/>} />
            <Route path="likes" element={<ProfilePosts/>} />
            <Route path="bookmarks" element={<ProfilePosts/>} />
          </Route>
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/notifications" element={<Notifications/>} />
        </Route>
      </Route>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}
