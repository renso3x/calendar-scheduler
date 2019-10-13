const moment = require("moment");

const format = "H";
const beforeTime = moment("08:00", format);
const afterTime = moment("17:00", format);

module.exports = {
  csvScheduleParser: (start, duration) => {
    var starTime = moment("08:00", format).add(start, "m"); // e.g. 2:45 pm
    var endTime = moment(starTime, format).add(duration, "m"); // e.g. 3:15 pm

    let starScheduleIsBetween = starTime.isBetween(beforeTime, afterTime);
    let endSchedIsBetween = endTime.isBetween(beforeTime, afterTime);

    return starScheduleIsBetween && endSchedIsBetween;
  },
  setSchedulerFormat: (start, duration) => {
    const splitTime = start.split(":");
    var sched = moment().toDate(); // This will return a copy of the Date that the moment uses
    sched.setHours(splitTime[0]);
    sched.setMinutes(splitTime[1]);

    const starTime = moment(sched, format);
    const durationTime = moment(starTime, format).add(duration, "m");

    const starScheduleIsBetween = starTime.isBetween(beforeTime, afterTime);
    let endSchedIsBetween = durationTime.isBetween(beforeTime, afterTime);

    return starScheduleIsBetween && endSchedIsBetween;
  }
};
