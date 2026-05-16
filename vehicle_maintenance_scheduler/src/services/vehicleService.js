const axios = require("axios");
const getAuthToken = require("./authService");

async function getVehicles() {

  const token = await getAuthToken();

  const response = await axios.get(
    `${process.env.BASE_URL}/evaluation-service/vehicles`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data.vehicles;
}

module.exports = getVehicles;