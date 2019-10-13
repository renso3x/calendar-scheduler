import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Label
} from "reactstrap";

import "./Form.css";

const Form = ({ modal, toggle, onSubmit, status, onUpdate }) => {
  const [state, setState] = useState({
    start: "",
    duration: "15",
    title: ""
  });

  const handleChangeText = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleSubmit = () => {
    return !status ? onSubmit(state) : onUpdate(state);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} className="modal-title">
        Schedule Details
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="exampleTime">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChangeText}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleTime">Start Time</Label>
          <Input
            type="time"
            name="start"
            value={state.start}
            onChange={handleChangeText}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleTime">Duration</Label>
          <Input
            type="select"
            name="duration"
            value={state.duration}
            onChange={handleChangeText}
          >
            <option>15</option>
            <option>30</option>
            <option>45</option>
            <option>60</option>
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          {!status ? "Submit" : "Update"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

Form.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  onSubmit: PropTypes.func,
  onUpdate: PropTypes.func
};

export default Form;
