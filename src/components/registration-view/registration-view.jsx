import React, { useState } from "react";
import PropTypes from "prop-types";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration(username);
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
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
=======
    <>
      <Form className="registration-form">
        <h1 className="registration-header mt-4">Registration</h1>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter a Username"
          />
          {usernameErr && <p>{usernameErr}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password must be a minimum of 8 characters"
            minLength="8"
            required
          />
          {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your Email address"
          />
          {emailErr && <p>{emailErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthdate:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            placeholder="Enter your Birthdate"
          />
          {birthdayErr && <p>{birthdayErr}</p>}
        </Form.Group>
        <Button
          className="btn-dark mt-3 float-right"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </>
>>>>>>> Stashed changes
  );
}

RegistrationView.propTypes = {
<<<<<<< Updated upstream
  onRegistration: PropTypes.func.isRequired,
=======
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.number,
>>>>>>> Stashed changes
};
