import { FaSun, FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toggleTheme } from "slices";
export function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkModePreferred } = useSelector((state) => state.theme);
  const changeTheme = () => dispatch(toggleTheme());
  const { isLoggedIn } = useSelector((state) => state.user);
  if (isLoggedIn) navigate("/home");
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center md:px-40">
        <img
          style={{ filter: "drop-shadow(0 1px 20px hsl(174deg 86% 44%))" }}
          src="/assets/favicon-32x32.png"
          className="absolute top-8 left-8 w-8"
        />
        <h1 className="text-gray-600 dark:text-gray-200">
          Get{" "}
          <span
            style={{ textShadow: "0 1px 20px hsl(174deg 86% 44%)" }}
            class="text-primary"
          >
            Hooked
          </span>{" "}
          with your friends.
        </h1>
        <div class="mt-8">
          <Link
            className="rounded-2xl bg-primary p-4 font-extrabold text-dark-200"
            to="/auth/login"
          >
            Login
          </Link>
        </div>
      </div>
      <button
        onClick={changeTheme}
        style={{ filter: "drop-shadow(0 1px 20px hsl(174deg 86% 44%))" }}
        className="absolute top-8 right-8 ml-auto text-xl"
      >
        {darkModePreferred ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
}
