import React, { useState } from "react";
import PropTypes from "prop-types";
<<<<<<< Updated upstream
=======
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./login-view.scss";
>>>>>>> Stashed changes

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
<<<<<<< Updated upstream
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
=======
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
>>>>>>> Stashed changes
  );
}
LoginView.propTypes = {
<<<<<<< Updated upstream
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
=======
  username: PropTypes.string,
  password: PropTypes.string,
>>>>>>> Stashed changes
};

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (event) => dispatch(handleSubmit(event)),
});

export default connect(null, mapDispatchToProps)(LoginView);
