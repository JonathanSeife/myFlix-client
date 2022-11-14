import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validate = () => {
    setUsernameErr(false);
    setPasswordErr(false);
    setEmailErr(false);

    let isReq = true;
    if (!username) {
      setUsernameErr("Username required.");
      isReq = false;
    } else if (username.length < 5) {
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
    if (!email) {
      setEmailErr("E-mail required.");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Enter a valid E-mail address.");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://seife-myflix.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="registration-container">
      <Form className="registration-form">
        <h1 className="registration-header mt-4 text-white">Registration</h1>
        <Form.Group>
          <Form.Label className="text-white">Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter a Username"
          />
          {usernameErr && <p className="error">{usernameErr}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label className="text-white">Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password must be a minimum of 8 characters"
            minLength="8"
            required
          />
          {passwordErr && <p className="error">{passwordErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-white">Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your Email address"
          />
          {emailErr && <p className="error">{emailErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-white">Birthdate:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            placeholder="Enter your Birthdate"
          />
        </Form.Group>
        <Button
          className="btn-dark mt-3 float-right"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.number,
};
