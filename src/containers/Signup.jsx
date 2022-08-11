import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "services";
import { SignUp as SignUpScreen } from "components";
import { toast } from "react-hot-toast";
import { errorMessages } from "constants";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "utils";

export function SignUp() {
  useDocumentTitle("Signup | Hooked")
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { status, error, currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (status.value === "error") {
      if (error.status === "400") {
        formik.setFieldError("username", errorMessages[error.status][0]);
      }
    } else if (status.value === "fulfilled" && status.type==="authenticateUser") {
      const redirectPath = location.state?.from?.pathname || "/home";
      navigate(redirectPath, { replace: true });
      toast.success(`Welcome aboard ${currentUser.firstname}!!`);
    }
    //eslint-disable-next-line
  }, [status, error]);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    validationSchema: yup.object({
      firstname: yup.string().required(),
      lastname: yup.string(),
      email: yup.string().email().required(),
      username: yup.string().required().min(4),
      password: yup.string().required().min(6),
    }),
    onSubmit: (values) => {
      dispatch(
        authenticateUser({
          formData: values,
          endpoint: "/auth/register",
        })
      );
    },
  });
  const isAuthenticationPending = status.value==="pending" && status.type==="authenticateUser"
  return <SignUpScreen formik={formik} isAuthenticationPending={isAuthenticationPending} />;
}
