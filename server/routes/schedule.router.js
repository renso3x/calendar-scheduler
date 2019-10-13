const express = require("express");

const controller = require("../controllers/schedule.controller");

const router = express.Router();

router.get("/", controller.getSchedules);
router.post("/", controller.createSchedule);
router.put("/:id", controller.updateSchedule);
router.delete("/:id", controller.removeSchedule);

module.exports = router;
