import { NotificationCard, TopTitleBar } from "components";
import { getNotifications } from "services";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "slices";
import { useDocumentTitle } from "utils";
export function Notifications() {
  useDocumentTitle("Notifications | Hooked");
  const dispatch = useDispatch();
  const { notifications } = useSelector(getCurrentUser);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  return (
    <section className="rounded-2xl bg-light-200 p-2 dark:bg-dark-200">
      <TopTitleBar title="Notifications" />
      <div className="flex flex-col items-center justify-between gap-2 py-2">
        {notifications.length > 0 ? (
          notifications?.map((notification) => (
            <NotificationCard key={notification._id} {...notification} />
          ))
        ) : (
          <div class="text-center">
            <div className="m-auto mt-8 w-fit rotate-12 rounded bg-primary px-2 text-xl text-light-200 dark:text-dark-200">
              No new notifications
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
