import moment from "moment";

const format = "H";

export const formatSchedule = (start, duration) => {
  // var starTime = moment("08:00", format).add(0, "m"); // e.g. 2:45 pm
  // var endTime = moment(starTime, format).add(50, "m");
  const timeStart = start.split(":");
  var sched = moment().toDate(); // This will return a copy of the Date that the moment uses
  sched.setHours(timeStart[0]);
  sched.setMinutes(timeStart[1]);

  const endTime = moment(sched, format).add(duration, "m");

  return {
    start: new Date(sched),
    end: new Date(endTime)
  };
};
