import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validate = () => {
    setUsernameErr(false);
    setPasswordErr(false);
    let isReq = true;
    if (!username) {
      setUsernameErr("Username required.");
      isReq = false;
    } else if (username.length < 4) {
      setUsernameErr("Username must be at least 5 characters long.");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password required.");
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr("Password must be at least 8 characters long.");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://seife-myflix.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("User doesn't exist.");
        });
    }
  };
  return (
    <>
      <Form className="login-form">
        <h1 className="login-header mt-4">Login</h1>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameErr && <p>{usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* code added here to display validation error */}
          {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Button
          className="btn-dark mt-5 float-right"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Link to="/register">
          <Button
            className="btn-dark mt-5 mr-3 float-right"
            variant="secondary"
            type="button"
          >
            Sign Up
          </Button>
        </Link>
      </Form>
    </>
  );
}
LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (event) => dispatch(handleSubmit(event)),
});

export default connect(null, mapDispatchToProps)(LoginView);
