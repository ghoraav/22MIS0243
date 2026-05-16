const axios = require("axios");
const getAuthToken = require("./authService");

async function getDepots() {

  const token = await getAuthToken();

  const response = await axios.get(
    `${process.env.BASE_URL}/evaluation-service/depots`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data.depots;
}

module.exports = getDepots;