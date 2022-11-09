import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import {
  setMovies,
  setUser,
  setFavorite,
  setFilter,
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
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
        favoriteMovies: JSON.parse(localStorage.getItem("favoriteMovies")),
      });
      this.getMovies(accessToken);
    }
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
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  onLoggedIn(authData) {
    this.props.setUser(authData.user);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // add to favorite movies
  addFavorite = (movieId) => {
    const { user } = this.props;
    let token = localStorage.getItem("token");
    if (token !== null && user !== null) {
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
          this.props.setFavorite(movieId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // delete favorite movies
  deleteFavorite = (movieId) => {
    const { user } = this.props;
    let token = localStorage.getItem("token");
    if (token !== null && user !== null) {
      axios
        .delete(
          `https://seife-myflix.herokuapp.com/users/${user}/movies/${movieId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          this.props.deleteFavorite(movieId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    let { movies } = this.props;
    let { user } = this.state;
    return (
      <Router>
        <NavBar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) {
                return <Redirect to="/" />;
              }
              return (
                <Col md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) {
                return <Redirect to="/" />;
              }
              return (
                <Col>
                  <ProfileView
                    user={user}
                    movies={movies}
                    deleteFavorite={this.deleteFavorite}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col md={8}>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    addFavorite={this.addFavorite}
                    deleteFavorite={this.deleteFavorite}
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
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUser,
  setFavorite,
  deleteFavorite,
})(MainView);
