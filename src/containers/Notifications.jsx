import { NotificationCard } from "components";
import { getNotifications } from "services";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "slices";
import { useDocumentTitle } from "utils";
export function Notifications() {
  useDocumentTitle("Notifications | Hooked")
  const dispatch = useDispatch();
  const { notifications } = useSelector(getCurrentUser);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  return (
    <section className="rounded-2xl bg-light-200 p-2 dark:bg-dark-200">
      <h2 className="mb-2 rounded-2xl bg-light-100 p-4 text-left text-xl font-medium text-gray-600 dark:bg-dark-100 dark:text-gray-200">
        Notifications
      </h2>
      <div className="flex flex-col items-center justify-between gap-2 py-2">
        {notifications?.map((notification) => (
          <NotificationCard key={notification._id} {...notification} />
        ))}
      </div>
    </section>
  );
}
