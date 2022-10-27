import React from "react";
import PropTypes from "prop-types";
import { CardGroup, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card class="card bg-light mb-3">
        <Card.Header className="text-center" as="h3">
          {movie.Title}
          <Button
            className="button-add-favorite-moview-view"
            size="sm"
            type="button"
            onClick={() => addFavorite(movie._id)}
          >
            Add to favorites
          </Button>
        </Card.Header>
        <CardGroup>
          <Card bg="light" border="dark" text="dark">
            <Card.Body className="movie-textarea">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
              <div className="movie-genre-name">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="movie-genre-description">
                <span className="label">Genre description: </span>
                <span className="value">{movie.Genre.Description}</span>
              </div>
              <div className="movie-director-bio">
                <span className="label">Director Bio: </span>
                <span className="value">{movie.Director.Bio}</span>
              </div>
              <div className="movie-director-born">
                <span className="label">Director Born: </span>
                <span className="value">{movie.Director.Born}</span>
              </div>
            </Card.Body>
          </Card>
        </CardGroup>
        <Card.Footer className="text-right">
          <Button
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
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
