import { ProfileImage } from "components";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "slices";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { deleteNotification } from "services";
const NotificationLink = ({ path, title }) => {
  return (
    <Link className="mx-1 font-medium text-primary" to={path}>
      {title}
    </Link>
  );
};
export function NotificationCard({ _id, type, payload }) {
  const { userId, postId } = payload;
  const notificationUser =
    useSelector((state) => getUserById(state, userId)) ?? {};
  const dispatch = useDispatch();
  const { username, firstname, lastname } = notificationUser;
  const NotificationMessage = (() => {
    switch (type) {
      case "follow":
        return (
          <p>
            You were followed by
            <NotificationLink
              title={`${firstname} ${lastname}`}
              path={`/profile/${username}`}
            />
          </p>
        );
      case "like":
        return (
          <p>
            Your <NotificationLink title="Post" path={`/post/${postId}`} /> was
            liked by
            <NotificationLink
              title={`${firstname} ${lastname}`}
              path={`/profile/${username}`}
            />
          </p>
        );
      case "comment":
        return (
          <p>
            <NotificationLink
              title={`${firstname} ${lastname}`}
              path={`/profile/${username}`}
            />
            commented on your{" "}
            <NotificationLink title="Post" path={`/post/${postId}`} />
          </p>
        );
      default:
        break;
    }
  })();
  const deleteThisNotification = () => {
    dispatch(deleteNotification(_id));
  };
  return (
    <article className="relative flex w-full gap-2 rounded-2xl bg-light-100 p-4 shadow-md dark:bg-dark-100">
      <ProfileImage userId={userId} size="md" bgShade="darker" />
      {NotificationMessage}
      <button
        className=" absolute top-2 right-2 rounded-full p-2 dark:bg-dark-200 dark:text-gray-200"
        onClick={deleteThisNotification}
      >
        <FaTimes />
      </button>
    </article>
  );
}
