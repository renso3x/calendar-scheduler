const db = require("../config/db");
const { setSchedulerFormat } = require("../utils/schedule");

module.exports = {
  getSchedules: async (req, res, next) => {
    try {
      if (!req.isAuth) {
        throw new Error("UnAuthorized");
      }
      const schedules = await db.models.schedule.findAll({
        where: {
          userId: req.userId
        }
      });
      res.status(200).send(schedules);
    } catch (e) {
      next(e);
    }
  },
  createSchedule: async (req, res, next) => {
    try {
      if (!req.isAuth) {
        throw new Error("Not Authenticated");
      }
      const isValidSched = setSchedulerFormat(
        req.body.start,
        req.body.duration
      );

      if (!isValidSched) {
        throw new Error(`Please create in between 8AM - 5PM`);
      }

      const sched = await db.models.schedule.create({
        start: req.body.start,
        duration: req.body.duration,
        title: req.body.title,
        userId: req.userId
      });
      res.status(200).send(sched);
    } catch (e) {
      next(e);
    }
  },
  updateSchedule: async (req, res, next) => {
    try {
      if (!req.isAuth) {
        throw new Error("Not Authenticated");
      }

      const isValidSched = setSchedulerFormat(
        req.body.start,
        req.body.duration
      );

      if (!isValidSched) {
        throw new Error(`Please create in between 8AM - 5PM`);
      }

      const existingSchedule = await db.models.schedule.findAll({
        where: {
          userId: req.userId,
          id: req.params.id
        }
      });

      if (!existingSchedule) {
        throw new Error("Schedule does not exist.");
      }

      await db.models.schedule.update(
        {
          start: req.body.start,
          duration: req.body.duration,
          title: req.body.title
        },
        {
          where: {
            userId: req.userId,
            id: req.params.id
          }
        }
      );

      const sched = await db.models.schedule.findAll({
        where: { id: req.params.id }
      });

      res.status(200).send(sched);
    } catch (e) {
      next(e);
    }
  },
  removeSchedule: async (req, res, next) => {
    try {
      if (!req.isAuth) {
        throw new Error("Not Authenticated");
      }

      const scedule = await db.models.schedule.destroy({
        where: {
          id: req.params.id
        }
      });

      if (scedule === 0) {
        throw new Error("Sorry, unable to find scedule.");
      }

      res
        .status(200)
        .send({ success: true, message: "You have successfully deleted." });
    } catch (e) {
      next(e);
    }
  }
};
