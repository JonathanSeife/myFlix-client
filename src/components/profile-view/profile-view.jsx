import React, { useState } from "react";
import PropTypes from "prop-types";
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

export function ProfileView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");

  const { user, favoriteMovies, removeFavorite, onBackClick } = props;

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username is required");
      isReq = false;
    } else if (username.length < 4) {
      setUsernameErr("Username must be at least 4 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("A valid email address is required");
      isReq = false;
    }

    return isReq;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          "https://seife-myflix.herokuapp.com/users/${user}",
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          console.log(data);
          alert("Update was sucessful!");
          localStorage.clear();
          window.open("/", "_self");
        })
        .catch((e) => {
          console.error(e);
          alert("Update failed");
        });
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (
      confirm(
        "Deleting a profile cannot be undone. Are you sure you want to delete your profile?"
      )
    ) {
      axios
        .delete("https://seife-myflix.herokuapp.com/users/${user}", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          alert("Profile successfully deleted.");
          localStorage.clear();
          window.open("/", "_self");
        })
        .catch((e) => console.log(e));
    }
  };
  console.log(favoriteMovies);

  return (
    <Container className="profile-container">
      <Card bg="light" text="dark" className="profile-card">
        <Card.Header className="text-center" as="h3">
          Profile
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <Card bg="light" border="dark" text="light">
              <span className="label text-center headline-profile-update">
                Update your profile information
              </span>
            </Card>
            <Form>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter a new Username"
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
              <Button type="submit" onClick={handleSubmit}>
                Update Profile
              </Button>
              <Button
                className="button button-profile-view-delete"
                type="submit"
                onClick={handleDelete}
              >
                Permanentlt Delete My Account
              </Button>
            </Form>
          </CardGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}
