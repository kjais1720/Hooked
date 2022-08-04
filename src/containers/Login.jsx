import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "services";
import { Login as LoginScreen } from "components";
import { errorMessages } from "constants";
import * as yup from "yup";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { useDocumentTitle } from "utils";

export function Login() {
  useDocumentTitle("Login | Hooked")
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { status, error, currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (status.value === "error") {
      if (error.status === "400") {
        formik.setFieldError("password", errorMessages["400"][1]);
      } else if (error.status === "404") {
        formik.setFieldError("username", errorMessages["404"]);
      }
    } else if (status.value === "fulfilled" && status.type==="authenticateUser") {
      const redirectPath = location.state?.from?.pathname || "/home";
      navigate(redirectPath, { replace: true });
      toast.success(`Welcome back ${currentUser.firstname}!!`);
    }
    //eslint-disable-next-line
  }, [status, error]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required().min(4),
      password: yup.string().required().min(4),
    }),
    onSubmit: (values) => {
      dispatch(authenticateUser({ formData: values, endpoint: "/auth/login" }));
    },
  });
  const guestLogin = () => {
    formik.setFieldValue("username","johnman")
    formik.setFieldValue("password","hooked")
    dispatch(authenticateUser({formData: {username:"johnman", password:"hooked"}, endpoint:"/auth/login" }))
  }
  const isAuthenticationPending = status.value==="pending" && status.type==="authenticateUser"
  return <LoginScreen {...{formik,guestLogin, isAuthenticationPending}} />;
}
