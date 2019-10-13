import React, { useState } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { authenticate, setToken, getCurrentUser } from "../services/auth";
import { Redirect } from "react-router-dom";

import "./Login.css";

const Login = ({ location }) => {
  const [state, setState] = useState({
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
      const response = await authenticate(state);
      if (response.status === 200) {
        setToken(response.data.token);
        const { state } = location;
        window.location = state ? state.from.pathname : "/";
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _goToRegister = () => (window.location.href = "/register");
  if (getCurrentUser()) return <Redirect to="/" />;

  return (
    <Container>
      <div className="form-login">
        <Form>
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
        <button className="btn btn-primary btn-block" onClick={handleSubmit}>
          Login
        </button>
        <button className="btn btn-secondary btn-block" onClick={_goToRegister}>
          Register
        </button>
      </div>
    </Container>
  );
};

export default Login;
