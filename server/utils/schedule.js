const moment = require("moment");

module.exports = {
  checkSchedule: (start, duration) => {
    const format = "H";
    const beforeTime = moment("08:00", format);
    const afterTime = moment("17:00", format);

    var starTime = moment("08:00", format).add(start, "m"); // e.g. 2:45 pm
    var endTime = moment(starTime, format).add(duration, "m"); // e.g. 3:15 pm

    let starScheduleIsBetween = starTime.isBetween(beforeTime, afterTime);

    let endSchedIsBetween = endTime.isBetween(beforeTime, afterTime);

    if (starScheduleIsBetween && endSchedIsBetween) {
      console.log("is between");
      console.log(starTime.format("hh:mm a"));
      console.log(endTime.format("hh:mm a"));
      return true;
    } else {
      console.log(starTime.format("hh:mm a"));
      console.log(endTime.format("hh:mm a"));
      return false;
    }
  }
};
