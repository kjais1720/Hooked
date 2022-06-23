import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useReducer } from "react";
import { Link } from "react-router-dom";
export function SignUp({ formik }) {
  const [showPassword, toggleShowPassword] = useReducer(
    (state) => !state,
    false
  );
  return (
    <div className="min-h-screen bg-primary p-4 md:p-16">
      <div className="rounded-2xl bg-light-100 dark:bg-dark-100 lg:flex">
        <div className=" md:rounded-r-0 rounded-2xl bg-light-200 p-8 dark:bg-dark-200 md:rounded-l-2xl xl:max-w-screen-sm">
          <div className="bg-light-200 px-4 dark:bg-dark-200 md:px-4 lg:px-12 xl:max-w-2xl xl:px-24">
            <h2
              className="xl:text-bold text-center font-display text-4xl font-semibold text-primary lg:text-left
              xl:text-5xl"
            >
              Sign Up
            </h2>
            <div className="mt-12">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex gap-4">
                  <div>
                    <label className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200">
                      Firstname
                    </label>
                    <input
                      className={`w-full py-2 px-4 text-lg
                                dark:bg-gray-800
                                dark:text-gray-200
                                dark:placeholder:text-gray-600
                                  ${
                                    formik.errors.firstname &&
                                    formik.touched.firstname &&
                                    "border-error focus:border-error focus:outline-error"
                                  }
                                  rounded-2xl focus:border-indigo-500 focus:outline-primary`}
                      placeholder="Johnrao"
                      {...formik.getFieldProps("firstname")}
                    />
                    <span className="text-error">
                      {formik.touched.firstname && formik.errors.firstname}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200">
                      Lastname
                    </label>
                    <input
                      className={`w-full py-2 px-4 text-lg
                                dark:bg-gray-800
                                dark:text-gray-200
                                dark:placeholder:text-gray-600
                                  ${
                                    formik.errors.lastname &&
                                    formik.touched.lastname &&
                                    "border-error focus:border-error focus:outline-error"
                                  }
                                  rounded-2xl focus:border-indigo-500 focus:outline-primary`}
                      placeholder="Doekar"
                      {...formik.getFieldProps("lastname")}
                    />
                    <span className="text-error">
                      {formik.touched.lastname && formik.errors.lastname}
                    </span>
                  </div>
                </div>
                <div className="mt-8">
                  <label className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200">
                    Username
                  </label>
                  <input
                    className={`w-full py-2 px-4 text-lg
                                dark:bg-gray-800
                                dark:text-gray-200
                                dark:placeholder:text-gray-600
                                ${
                                  formik.errors.username &&
                                  formik.touched.username &&
                                  "border-error focus:border-error focus:outline-error"
                                }
                                rounded-2xl focus:border-indigo-500 focus:outline-primary`}
                    placeholder="kjais1234"
                    {...formik.getFieldProps("username")}
                  />
                  <span className="text-error">
                    {formik.touched.username && formik.errors.username}
                  </span>
                </div>
                <div className="mt-8">
                  <label className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    className={`w-full rounded-2xl border-2 border-transparent py-2 px-4 
                                text-lg focus:border-primary focus:outline-none
                                dark:bg-gray-800
                                dark:text-gray-200
                                dark:placeholder:text-gray-600
                                ${
                                  formik.errors.email &&
                                  formik.touched.email &&
                                  "border-error focus:border-error"
                                }
                              `}
                    placeholder="johndoe@xyz.com"
                    {...formik.getFieldProps("email")}
                    autoFocus
                  />
                  <span className="text-error">
                    {formik.touched.email && formik.errors.email}
                  </span>
                </div>
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200">
                      Password
                    </label>
                  </div>
                  <div
                    className={`flex w-full gap-2 rounded-2xl border-2 border-transparent py-2 px-4 text-lg 
                                focus:border-primary focus:outline-none
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
                      className="w-full bg-transparent outline-transparent focus:border-transparent focus-visible:bg-transparent focus-visible:outline-0"
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
                  <button
                    className="focus:shadow-outline w-full rounded-full bg-dark-200 p-4 font-display font-semibold
                          tracking-wide text-primary shadow-lg focus:outline-primary
                          dark:bg-dark-100"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="mt-12 text-center font-display text-sm font-semibold text-gray-700">
                Already have an account ?{" "}
                <Link
                  to="/auth/login"
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-center rounded-r-2xl bg-light-100 dark:bg-dark-200 lg:flex ">
          <div className="max-w-xs transform cursor-pointer duration-200 hover:scale-110">
            <img src="/assets/loginIllustration" alt="a man opening a door"/>
          </div>
        </div>
      </div>
    </div>
  );
}
