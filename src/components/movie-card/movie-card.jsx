import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card className="card-movie h-100 d-flex flex-column justify-content-between">
        <Card.Img
          className="card-image-poster"
          variant="top"
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Footer className="card-footer bg-white border-bottom-0 text-left">
            <Link to={`/movies/${movie._id}`}>
              <Button className="btn btn-danger" variant="primary">
                Open
              </Button>
            </Link>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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
  onMovieClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps)(MovieCard);
