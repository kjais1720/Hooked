import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, logout } from "slices";
import { EditProfileModal, Profile } from "components";
import { Spinner } from "components/Spinner";
export function CurrentUserProfile() {
  const [showModal, toggleShowModal] = useReducer((state) => !state, false);
  const { status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const logoutUser = () => dispatch(logout())
  const isPageLoading = status.value === "pending" && status.type==="getCurrentUser";
  return isPageLoading ? (
    <div className="my-8 w-full text-center">
      <Spinner/>
    </div>
  ) : (
    <div>
      <Profile
        {...currentUser}
        openEditModal={toggleShowModal}
        logoutUser={logoutUser}
        isCurrentUserProfile
      />
      {showModal ? (
        <EditProfileModal user={currentUser} closeModal={toggleShowModal} />
      ) : (
        " "
      )}
    </div>
  );
}
