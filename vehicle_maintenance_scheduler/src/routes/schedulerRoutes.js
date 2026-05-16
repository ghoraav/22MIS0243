const express = require("express");

const generateSchedule = require(
  "../services/schedulerService"
);

const router = express.Router();

router.get("/:depotId", async (req, res, next) => {

  try {

    const result = await generateSchedule(
      req.params.depotId
    );

    res.status(200).json(result);

  } catch (error) {

    next(error);

  }
});

module.exports = router;