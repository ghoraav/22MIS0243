function calculatePriority(notification) {

  const typeWeights = {
    placement: 10,
    result: 7,
    event: 5
  };

  const type =
    notification.type?.toLowerCase() || "event";

  const typeScore =
    typeWeights[type] || 1;

  const currentTime = Date.now();

  const notificationTime =
    new Date(notification.timestamp).getTime();

  const hoursOld =
    (currentTime - notificationTime) /
    (1000 * 60 * 60);

  const recencyScore =
    Math.max(0, 10 - hoursOld);

  const priorityScore =
    (typeScore * 0.7) +
    (recencyScore * 0.3);

  return Number(priorityScore.toFixed(2));
}

module.exports = calculatePriority;