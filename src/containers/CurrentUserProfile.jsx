import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, logout } from "slices";
import { EditProfileModal, Profile } from "components";
import { Spinner } from "components";
import { useDocumentTitle } from "utils";
export function CurrentUserProfile() {
  const [isModalOpen, toggleisModalOpen] = useReducer((state) => !state, false);
  const { status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  useDocumentTitle(`${currentUser.username} | Hooked`)
  const logoutUser = () => dispatch(logout());
  const isPageLoading = status.value === "pending" && status.type === "getCurrentUser";
  return isPageLoading ? (
    <Spinner size="lg" />
  ) : (
    <div>
      <Profile
        {...currentUser}
        openEditModal={toggleisModalOpen}
        logoutUser={logoutUser}
        isCurrentUserProfile
      />
      {isModalOpen ? (
        <EditProfileModal user={currentUser} closeModal={toggleisModalOpen} />
      ) : (
        " "
      )}
    </div>
  );
}
