import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { updateUser, deleteUser } from "../../actions/actions";

import "./profile-view.scss";

export function ProfileView({
  user,
  movies,
  deleteFavorite,
  favoriteMovies,
  onBackClick,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");

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
    let token = localStorage.getItem("token");

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
    let token = localStorage.getItem("token");
    axios
      .delete("https://seife-myflix.herokuapp.com/users/${user}", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Profile successfully deleted.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.open("/register", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container className="profile-container">
      <Card className="profile-card">
        <Card.Header className="bg-dark text-center text-white" as="h3">
          Profile
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <Card className="border-0">
              <Form className="profile-form">
                <h5 className="profile-description mt-4">Update Profile</h5>
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
                <Button
                  className="btn-dark mt-3 mb-3 float-right"
                  type="submit"
                  variant="primary"
                  onClick={handleUpdate}
                >
                  Submit Update
                </Button>
                <Button
                  className="btn-danger mt-3 mr-3 mb-3 float-right"
                  type="submit"
                  variant="secondary"
                  onClick={handleDelete}
                >
                  Permanently Delete My Account
                </Button>
              </Form>
            </Card>
          </CardGroup>
          <Row className="justify-content-center mt-3" as="h3">
            My Favorite Movies
          </Row>
          <CardGroup className="favorites-card justify-content-center">
            {favoriteMovies.map((m) => (
              <Col
                md={6}
                lg={3}
                key={m._id}
                className="profile-movie-card-mini"
              >
                <Card className="h-100" bg="dark" text="light">
                  <Link
                    to={`/movies/${m._id}`}
                    className="profile-movie-card-link"
                  >
                    <Card.Img
                      variant="top"
                      crossOrigin="anonymous | use-credentials"
                      src={m.ImagePath}
                    />
                    <Card.Body>
                      <Card.Title className="text-center text-light">
                        {m.Title}
                      </Card.Title>
                    </Card.Body>
                  </Link>
                  <Button
                    className="btn btn-danger mt-auto"
                    size="sm"
                    type="button"
                    onClick={() => deleteFavorite(m._id)}
                  >
                    Remove Favorite
                  </Button>
                </Card>
              </Col>
            ))}
          </CardGroup>
        </Card.Body>
        <Card.Footer className="bg-dark text-right">
          <Button
            className="btn btn-danger"
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

ProfileView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleUpdate: (event) => dispatch(updateUser(event)),
  handleDelete: (event) => dispatch(deleteUser(event)),
  deleteFavorite: (event) => dispatch(deleteFavorite(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
