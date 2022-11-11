import React from "react";
import { CardGroup, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, addFavorite } = this.props;

    return (
      <Card className="card-top bg-light mb-3">
        <Card.Header className="bg-secondary text-center" as="h3">
          {movie.Title}
          <Button
            className="btn btn-danger float-right"
            type="button"
            onClick={() => addFavorite(movie._id)}
          >
            Add to Favorites
          </Button>
        </Card.Header>
        <CardGroup>
          <Card bg="light" border="dark" text="dark">
            <Card.Body className="movie-textarea">
              <div className="image-wrapper float-left pr-3">
                <img src={movie.ImagePath} />
              </div>
              <div className="movie-view-title">
                <span className="movie-title">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="description">
                <span className="movie-description">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
              <div className="movie-genre-name">
                <span className="genre-name">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="movie-genre-description">
                <span className="genre-description">Genre description: </span>
                <span className="value">{movie.Genre.Description}</span>
              </div>
              <div className="movie-director-bio">
                <span className="director-bio">Director Bio: </span>
                <span className="value">{movie.Director.Bio}</span>
              </div>
              <div className="movie-director-born">
                <span className="director-born">Director Born: </span>
                <span className="value">{movie.Director.Born}</span>
              </div>
            </Card.Body>
          </Card>
        </CardGroup>
        <Card.Footer className="bg-secondary text-right">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button className="btn btn-danger mt-2 ml-2" variant="primary">
              Director's Page
            </Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button className="btn btn-danger mt-2 ml-2" variant="primary">
              Genre's Page
            </Button>
          </Link>
          <Button
            className="btn btn-danger mt-2 ml-2"
            variant="primary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (event) => dispatch(deleteFavorite(event)),
  addFavorite: (event) => dispatch(setFavorite(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieView);
