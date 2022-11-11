import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import {
  setMovies,
  setUser,
  setFavorite,
  addFavorite,
  deleteFavorite,
} from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { NavBar } from "../navbar/navbar";

import { Row, Col } from "react-bootstrap";

import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
  }

  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    this.props.setFavorite(authData.user.FavoriteMovies || []);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://seife-myflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.props.setMovies(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // add to favorite movies
  addFavorite = (movieId) => {
    let { user, favoriteMovies } = this.props;
    const token = localStorage.getItem("token");
    if (favoriteMovies.some((favId) => favId === movieId)) {
      console.log("Movie already added to favorites!");
    } else {
      if (token !== null && user !== null) {
        this.props.addFavorite(movieId);
        axios
          .post(
            `https://seife-myflix.herokuapp.com/users/${user}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  // delete favorite movies
  deleteFavorite = (movieId) => {
    let { user } = this.props;
    const token = localStorage.getItem("token");
    if (token !== null && user !== null) {
      this.props.deleteFavorite(movieId);
      axios
        .delete(
          `https://seife-myflix.herokuapp.com/users/${user}/movies/${movieId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem("user"));
      this.getMovies(accessToken);
    }
  }

  render() {
    let { movies, user, favoriteMovies } = this.props;

    return (
      <Router>
        <NavBar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
             the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    favoriteMovies={favoriteMovies.map((movieId) => {
                      return movies.find((m) => m._id === movieId);
                    })}
                    user={user}
                    deleteFavorite={this.deleteFavorite.bind(this)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
             the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8} className="movie-view">
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    addFavorite={this.addFavorite.bind(this)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <DirectorView
                    movies={movies.filter(
                      (m) => m.Director.Name === match.params.name
                    )}
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <GenreView
                    movies={movies.filter(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
};

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
    favoriteMovies: state.favoriteMovies,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUser,
  setFavorite,
  addFavorite,
  deleteFavorite,
})(MainView);
