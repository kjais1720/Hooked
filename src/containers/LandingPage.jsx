import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function LandingPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  if (isLoggedIn) navigate("/home");
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-gray-600 dark:text-gray-200">Welcome</h1>
        <Link
          className="mt-4 rounded-2xl bg-primary p-4 text-gray-600"
          to="/auth/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
