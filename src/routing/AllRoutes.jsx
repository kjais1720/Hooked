import {
  Login,
  WithSidebars,
  SignUp,
  LandingPage,
  CurrentUserProfile,
  CommonUserProfile,
  Timeline,
  SinglePost,
} from "containers";
import { Routes, Route } from "react-router";
import { RequiresAuth } from "./RequiresAuth";

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<RequiresAuth />}>
        <Route element={<WithSidebars />}>
          <Route path="/home" element={<Timeline />} />
          <Route path="/profile" element={<CurrentUserProfile />} />
          <Route path="/profile/:username" element={<CommonUserProfile />} />
          <Route path="/post/:postId" element={<SinglePost />} />
        </Route>
      </Route>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
    </Routes>
  );
}
