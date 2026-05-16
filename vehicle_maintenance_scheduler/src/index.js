require("dotenv").config();

const app = require("./app");

const PORT = 4000;

app.listen(PORT, async () => {

  console.log(`Vehicle Scheduler running on port ${PORT}`);

});