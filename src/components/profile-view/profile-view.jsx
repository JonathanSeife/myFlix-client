import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Col, Row } from "react-bootstrap";
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
    )
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
    <Form className="profile-form">
      <h1 className="profile-header mt-5">Profile</h1>
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
        className="btn-dark mt-3 float-right"
        type="submit"
        variant="primary"
        onClick={handleUpdate}
      >
        Submit Update
      </Button>
      <Button
        className="btn-danger mt-3 mr-3 float-right"
        type="submit"
        variant="secondary"
        onClick={handleDelete}
      >
        Permanently Delete My Account
      </Button>
      <h2 className="fav-heading">Favorite Movies</h2>
      <Row md={{ offset: 3 }}>
        {user.FavoriteMovies &&
          movies
            .filter((m) => user.FavoriteMovies.includes(m._id))
            .map((movie) => (
              <Col
                xs={12}
                md={3}
                className="main-grid-item mb-3"
                key={movie._id}
              >
                <Card className="w-100">
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Img
                      variant="top"
                      src={movie.ImagePath}
                      alt={`Poster: ${movie.Title}`}
                      title={movie.Title}
                      className="image-link"
                    />
                  </Link>
                  <Card.Body className="cardbody d-flex">
                    <Card.Title>
                      <h3 className="heading card-title">{movie.Title}</h3>
                    </Card.Title>

                    <Button
                      className="align-self-end ml-auto"
                      type="submit"
                      onClick={() => deleteFavorite(movie._id)}
                    ></Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        {!user.FavoriteMovies && (
          <Col>
            <p>You have not added any movies to your favorites list yet.</p>
          </Col>
        )}
      </Row>
    </Form>
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

export default connect(mapStateToProps)(ProfileView);
