const axios = require("axios");
const initializeToken = require("../config/auth");

async function sendLog(payload) {

  try {

    const token = await initializeToken();

    const response = await axios.post(
      `${process.env.BASE_URL}/evaluation-service/logs`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {

    if (error.response) {

      return {
        success: false,
        status: error.response.status,
        data: error.response.data
      };
    }

    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = sendLog;
