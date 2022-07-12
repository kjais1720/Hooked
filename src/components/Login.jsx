import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { DotsLoader } from "components";
export function Login({ formik, guestLogin, isAuthenticationPending }) {
  const [showPassword, toggleShowPassword] = useReducer(
    (state) => !state,
    false
  );
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-4 md:block md:p-16">
      <div className="rounded-2xl bg-light-100 dark:bg-dark-100 lg:flex">
        <div className=" md:rounded-r-0 rounded-2xl bg-light-200 p-8 dark:bg-dark-200 md:rounded-l-2xl xl:max-w-screen-sm">
          <div className=" bg-light-200 dark:bg-dark-200 md:px-4 lg:px-12 xl:max-w-2xl xl:px-24">
            <h2
              className="xl:text-bold text-center font-display text-4xl font-semibold text-primary lg:text-left
              xl:text-5xl"
            >
              Log in
            </h2>
            <div className="mt-12">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200">
                    Username
                  </label>
                  <input
                    className={`w-full rounded-2xl border-2 border-transparent py-2 px-4 
                                text-lg focus:border-primary focus:outline-none
                                dark:bg-gray-800
                                dark:text-gray-200
                                dark:placeholder:text-gray-600
                                ${
                                  formik.errors.username &&
                                  formik.touched.username &&
                                  "border-error focus:border-error"
                                }
                              `}
                    placeholder="user@123"
                    {...formik.getFieldProps("username")}
                    autoFocus
                  />
                  <span className="text-error">
                    {formik.touched.username && formik.errors.username}
                  </span>
                </div>
                <div className="mt-8">
                  <label className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <div
                    className={`flex w-full gap-2 rounded-2xl border-2 border-transparent py-2 px-4 text-lg 
                                focus:border-primary focus:outline-none
                                focus-visible:border-none focus-visible:outline-none
                                dark:bg-gray-800
                                dark:text-gray-200
                                dark:placeholder:text-gray-600
                                ${
                                  formik.errors.password &&
                                  formik.touched.password &&
                                  "border-error focus:border-error"
                                }
                              `}
                  >
                    <input
                      className="w-full bg-transparent"
                      {...formik.getFieldProps("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="*********"
                    />
                    <button type="button" onClick={toggleShowPassword}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <span className="text-error">
                    {formik.touched.password && formik.errors.password}
                  </span>
                </div>
                <div className="mt-10">
                  {isAuthenticationPending ? (
                    <button
                      type="button"
                      className="focus:shadow-outline w-full rounded-full bg-dark-200 p-4 font-display font-semibold
                          tracking-wide text-primary shadow-lg focus:outline-none
                          dark:bg-dark-100"
                    >
                      <DotsLoader size="md" />
                    </button>
                  ) : (
                    <button
                      className="focus:shadow-outline w-full rounded-full bg-dark-200 p-4 font-display font-semibold
                          tracking-wide text-primary shadow-lg focus:outline-none
                          dark:bg-dark-100"
                    >
                      Log In
                    </button>
                  )}
                  <button className="m-auto" onClick={guestLogin}>
                    Login as a guest
                  </button>
                </div>
              </form>
              <div className="mt-12 text-center font-display text-sm font-semibold text-gray-600 dark:text-gray-200">
                Don't have an account ?{" "}
                <Link
                  to="/auth/signup"
                  className="cursor-pointer text-primary hover:text-primary/75"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-center rounded-r-2xl bg-light-100 dark:bg-dark-100 lg:flex ">
          <div className="max-w-xs transform cursor-pointer duration-200 hover:scale-110">
            <img
              src="/assets/loginIllustration.svg"
              alt="A man opening a door"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
