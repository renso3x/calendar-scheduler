import moment from "moment";
import React, { useState } from "react";
import { Container } from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { connect } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "./Scheduler.css";
import Navigation from "../components/Nav";
import { formatSchedule } from "../utils/schedule";
import {
  createSchedule,
  deleteSchedule,
  updateSchedule
} from "../reducers/schedules";
import Form from "../components/Form";

const localizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue"
    }
  });

const Scheduler = ({
  schedules,
  deleteSchedule,
  createSchedule,
  updateSchedule
}) => {
  const [modal, setModal] = useState(false);

  const [values, setValues] = useState({
    status: "",
    record: {
      start: "",
      duration: "15",
      title: ""
    }
  });

  const toggle = () => setModal(!modal);

  const reset = () => setValues({ ...values, status: "" });

  const handleSelected = record => {
    const r = window.confirm(
      "Do you want to delete this schedule? Press OK, cancel for editting"
    );

    if (r) {
      handleDelete(record);
      reset();
    } else {
      setValues({ ...values, record, status: "edit" });

      toggle();
    }
  };

  const handleDelete = record => {
    deleteSchedule(record);
  };

  const addSchedule = sched => {
    createSchedule(sched);
    toggle();
    reset();
  };

  const handleEditSchedule = sched => {
    console.log(sched);
    updateSchedule({ id: values.record.id, ...sched });
    toggle();
    reset();
  };

  return (
    <Container>
      <Navigation />
      <div className="calendar">
        <button
          type="button"
          className="btn btn-primary button"
          data-toggle="modal"
          data-target="#form"
          onClick={toggle}
        >
          Create a Schedule
        </button>
        <Calendar
          events={schedules}
          views={["day"]}
          defaultView={"day"}
          step={5}
          showMultiDayTimes
          defaultDate={new Date()}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper
          }}
          onSelectEvent={handleSelected}
          localizer={localizer}
        />
      </div>
      <Form
        modal={modal}
        toggle={toggle}
        onSubmit={addSchedule}
        status={values.status}
        onUpdate={handleEditSchedule}
        record={values.record}
      />
    </Container>
  );
};

const mapStateToProps = ({ schedules }) => {
  const formattedSchedules = schedules.records.map(sched => {
    const { start, end } = formatSchedule(sched.start, sched.duration);
    return {
      ...sched,
      start,
      end,
      allDays: false
    };
  });

  return { schedules: formattedSchedules };
};

export default connect(
  mapStateToProps,
  {
    deleteSchedule,
    createSchedule,
    updateSchedule
  }
)(Scheduler);
