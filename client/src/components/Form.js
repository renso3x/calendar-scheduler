import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import useStyles from './styles/form';

const Form = ({ modal, toggle, onSubmit, status, onUpdate, record }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    start: '',
    duration: '15',
    title: ''
  });

  useEffect(() => {
    setState(record);
  }, [record]);

  const handleChangeText = name => evt => {
    setState({
      ...state,
      [name]: evt.target.value
    });
  };

  const handleSubmit = () => {
    return !status ? onSubmit(state) : onUpdate(state);
  };

  return (
    <Dialog open={modal} maxWidth="md">
      <DialogTitle>Schedule Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          className={classes.textField}
          type="text"
          name="title"
          placeholder="Title"
          value={state.title}
          onChange={handleChangeText('title')}
          fullWidth
        />
        <TextField
          margin="normal"
          className={classes.textField}
          fullWidth
          type="time"
          name="start"
          onChange={handleChangeText('start')}
        />
        <TextField
          id="standard-select-currency-native"
          select
          label="Native select"
          className={classes.textField}
          value={state.duration}
          onChange={handleChangeText('duration')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select the duration"
          margin="normal"
          fullWidth
        >
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
          <option value="60">60</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleSubmit}>
          {!status ? 'Submit' : 'Update'}
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Form.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  onSubmit: PropTypes.func,
  onUpdate: PropTypes.func
};

export default Form;
