import { useEffect } from "react";
import { Toast } from "components"
import { AllRoutes } from "routing";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserFromBackend } from "services";
function App() {
  const { isLoggedIn, status: authStatus } = useSelector((state) => state.user);
  const { darkModePreferred } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn && authStatus.value === "idle") {
      dispatch(getCurrentUserFromBackend()); // To get the current user on mount
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className={darkModePreferred ? "dark" : ""}>
      <div className="overflow-x-hidden bg-light-200 text-gray-600 dark:text-gray-200 dark:bg-dark-200">
        <AllRoutes />
      </div>
      <Toast/>
    </div>
  );
}

export default App;
