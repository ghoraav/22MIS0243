const axios = require("axios");

const getAuthToken = require("./authService");

async function fetchNotifications() {

  const token = await getAuthToken();

  const response = await axios.get(
    `${process.env.BASE_URL}/evaluation-service/notifications`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data.notifications;
}

module.exports = fetchNotifications;