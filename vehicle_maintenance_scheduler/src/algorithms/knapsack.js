function knapsack(tasks, maxHours) {

  const n = tasks.length;

  const dp = Array(n + 1)
    .fill()
    .map(() => Array(maxHours + 1).fill(0));

  for (let i = 1; i <= n; i++) {

    const duration = tasks[i - 1].Duration;
    const impact = tasks[i - 1].Impact;

    for (let hours = 0; hours <= maxHours; hours++) {

      if (duration <= hours) {

        dp[i][hours] = Math.max(
          impact + dp[i - 1][hours - duration],
          dp[i - 1][hours]
        );

      } else {

        dp[i][hours] = dp[i - 1][hours];

      }
    }
  }

  let selectedTasks = [];
  let remainingHours = maxHours;

  for (let i = n; i > 0; i--) {

    if (dp[i][remainingHours] !== dp[i - 1][remainingHours]) {

      selectedTasks.push(tasks[i - 1]);

      remainingHours -= tasks[i - 1].Duration;
    }
  }

  return {
    totalImpact: dp[n][maxHours],
    selectedTasks
  };
}

module.exports = knapsack;