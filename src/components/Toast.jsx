import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export const PrivateActionErrorToast = (t) => {
  return (
    <span>
      You need to login first
      <Link className="ml-2 text-indigo-700" to="/auth/login">
        Login
      </Link>
    </span>
  );
};

export function Toast() {
  return (
    <Toaster
      position={"top-center"}
      toastOptions={{
        className: "bg-primary text-dark-200 font-medium",
        style: {
          background: "hsl(174, 86%, 44%)",
          color: "hsl(195, 100%, 6%)",
        },
      }}
    />
  );
}
