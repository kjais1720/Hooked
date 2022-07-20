import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "slices";
import { FaSun, FaMoon } from "react-icons/fa";
export function TopTitleBar({title}){
  const dispatch = useDispatch();
  const { darkModePreferred } = useSelector(state => state.theme);
  const changeTheme = ()=> dispatch(toggleTheme());
  return (
    <div className="relative mb-2 items-center flex gap-8 md:gap-0 justify-betwee rounded-2xl bg-light-100 p-4 text-left dark:bg-dark-100 ">
      <a href="/home">
        <img
          style={{ boxShadow: "0 1px 20px hsl(174deg 86% 44%)" }}
          src="/assets/favicon-32x32.png"
          className="w-8 md:hidden "
          alt="Hooked logo"
        />
      </a>
    <h2 className="text-xl font-medium text-gray-600 dark:text-gray-200">
      {title}
    </h2>
      <button
        onClick={changeTheme}
        style={{ filter: "drop-shadow(0 1px 20px hsl(174deg 86% 44%))" }}
       className="text-xl ml-auto">
        {darkModePreferred ? <FaSun /> : <FaMoon/>}
      </button>
  </div>

  )
}