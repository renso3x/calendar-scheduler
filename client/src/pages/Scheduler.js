import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { formatSchedule } from '../utils/schedule';
import {
  createSchedule,
  deleteSchedule,
  updateSchedule
} from '../reducers/schedules';
import Form from '../components/Form';
import Layout from '../components/Layout';
import useStyles from './styles/schedule';

const localizer = momentLocalizer(moment);

const Scheduler = ({
  schedules,
  deleteSchedule,
  createSchedule,
  updateSchedule
}) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const [values, setValues] = useState({
    status: '',
    record: {
      start: '',
      duration: '15',
      title: ''
    }
  });

  const toggle = () => setModal(!modal);

  const reset = () => setValues({ ...values, status: '' });

  const handleSelected = record => {
    const r = window.confirm(
      'Do you want to delete this schedule? Press OK, cancel for editting'
    );

    if (r) {
      handleDelete(record);
      reset();
    } else {
      setValues({ ...values, record, status: 'edit' });
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
    updateSchedule({ id: values.record.id, ...sched });
    toggle();
    reset();
  };

  return (
    <Layout>
      <div className="calendar">
        <Calendar
          events={schedules}
          views={['day']}
          defaultView={'day'}
          step={5}
          defaultDate={new Date()}
          onSelectEvent={handleSelected}
          localizer={localizer}
        />
      </div>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={toggle}
      >
        <AddIcon />
      </Fab>
      <Form
        modal={modal}
        toggle={toggle}
        onSubmit={addSchedule}
        status={values.status}
        onUpdate={handleEditSchedule}
        record={values.record}
      />
    </Layout>
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
