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
          alt="Hooked logo"
        />
        <h1 className="text-gray-600 dark:text-gray-200">
          Get{" "}
          <span
            style={{ textShadow: "0 1px 20px hsl(174deg 86% 44%)" }}
            className="text-primary"
          >
            Hooked
          </span>{" "}
          with your friends.
        </h1>
        <div className="mt-8">
          <Link
            className="rounded-2xl bg-primary p-4 font-extrabold text-dark-200"
            to="/auth/login"
          >
            Login
          </Link>
          <button className="mx-4">
            <Link
              to="/explore"
              className="group relative inline-block text-sm font-medium text-primary focus:outline-none focus:ring "
            >
              <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-2xl bg-primary transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
              <span className="relative block rounded-2xl border border-current bg-dark-200 px-8 py-3">
                Explore
              </span>
            </Link>
          </button>
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
