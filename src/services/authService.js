const axios = require("axios");

async function getAuthToken() {

  try {

    const response = await axios.post(
      `${process.env.BASE_URL}/evaluation-service/auth`,
      {
        email: process.env.EMAIL,
        name: process.env.NAME,
        rollNo: process.env.ROLL_NO,
        accessCode: process.env.ACCESS_CODE,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      }
    );

    return response.data.access_token;

  } catch (error) {

    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }

    throw new Error(error.message);
  }
}

module.exports = getAuthToken;