const Log = require(
  "../../../logging_middleware/src/logger"
);
const getDepots = require("./depotService");
const getVehicles = require("./vehicleService");

const knapsack = require("../algorithms/knapsack");

async function generateSchedule(depotId) {

  await Log(
    "backend",
    "info",
    "service",
    `Generating schedule for depot ${depotId}`
  );

  const depots = await getDepots();

  const depot = depots.find(
    d => String(d.ID) === String(depotId)
  );

  if (!depot) {

    await Log(
      "backend",
      "error",
      "service",
      `Depot ${depotId} not found`
    );

    throw new Error("Depot not found");
  }

  const vehicles = await getVehicles();

  await Log(
    "backend",
    "info",
    "service",
    `Fetched ${vehicles.length} vehicle tasks`
  );

  const result = knapsack(
    vehicles,
    depot.MechanicHours
  );

  const totalDuration = result.selectedTasks.reduce(
    (sum, task) => sum + task.Duration,
    0
  );

  await Log(
    "backend",
    "info",
    "service",
    `Optimal schedule generated successfully`
  );

  return {
  success: true,
  depotId: depot.ID,
  mechanicHours: depot.MechanicHours,
  totalImpact: result.totalImpact,
  totalDuration,
  remainingHours:
    depot.MechanicHours - totalDuration,
  totalTasksSelected:
    result.selectedTasks.length,
  selectedTasks: result.selectedTasks
 };
}

module.exports = generateSchedule;