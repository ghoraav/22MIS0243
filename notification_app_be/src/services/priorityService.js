const fetchNotifications = require(
  "./notificationService"
);

const calculatePriority = require(
  "../utils/calculatePriority"
);

async function getPriorityNotifications() {

  const notifications =
    await fetchNotifications();

  const prioritized = notifications.map(
    notification => ({
      ...notification,
      priorityScore:
        calculatePriority(notification)
    })
  );

  prioritized.sort(
    (a, b) =>
      b.priorityScore - a.priorityScore
  );

  return prioritized.slice(0, 10);
}

module.exports = getPriorityNotifications;