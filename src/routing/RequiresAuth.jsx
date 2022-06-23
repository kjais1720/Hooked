import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export function RequiresAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (!localStorage.getItem("USER_TOKEN")) {
      navigate("/auth/login", { state: { from: location }, replace: true });
      toast.error("You need to login to access this page!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return localStorage.getItem("USER_TOKEN") ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
