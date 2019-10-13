import React, { useState } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getCurrentUser, register } from "../services/auth";
import { Redirect } from "react-router-dom";

import "./Login.css";

const Register = ({ location }) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isSubmitting: false
  });

  const handleChangeText = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      delete state.isSubmitting;
      const response = await register(state);
      if (response.status === 200) {
        const { state } = location;
        window.location = state ? state.from.pathname : "/login";
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _goToSignIn = () => (window.location.href = "/login");

  if (getCurrentUser()) return <Redirect to="/" />;

  return (
    <Container>
      <div className="form-login">
        <Form>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChangeText}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChangeText}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChangeText}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={handleChangeText}
            />
          </FormGroup>
        </Form>
        <Button
          className="btn btn-primary btn-lg btn-block"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <Button
          className="btn btn-secondary btn-lg btn-block"
          onClick={_goToSignIn}
        >
          Login
        </Button>
      </div>
    </Container>
  );
};

export default Register;
