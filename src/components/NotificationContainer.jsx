import NotificationToast from "./NotificationToast";

function NotificationContainer({
  notifications,
  removeNotification,
  onNotificationClick,
}) {
  // ==========================================
  // No Notifications
  // ==========================================

  if (
    !notifications ||
    notifications.length === 0
  ) {
    return null;
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div
      className="
        fixed
        top-4
        right-4
        sm:top-5
        sm:right-5
        lg:top-6
        lg:right-6

        z-[9999]

        flex
        flex-col
        items-end
        gap-3

        w-[calc(100%-2rem)]
        max-w-sm

        sm:w-auto
      "
    >
      {notifications.map(
        (notification) => (
          <div
            key={
              notification.id
            }
            className="
              w-full
              sm:w-[360px]
              md:w-[380px]
            "
          >
            <NotificationToast
              notification={
                notification
              }

              onClose={
                removeNotification
              }

              onClick={
                onNotificationClick
              }
            />
          </div>
        )
      )}
    </div>
  );
}

export default NotificationContainer;