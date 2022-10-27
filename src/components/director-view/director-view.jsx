import React from "react";
import PropTypes from "prop-types";
import { CardGroup, Button, Card, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

export default class DirectorView extends React.Component {
  render() {
    const { movies, director, onBackClick } = this.props;

    return (
      <Card bg="dark" text="light">
        <Card.Header className="text-center" as="h3">
          {director.Name}
        </Card.Header>
        <Card.Body className="director-textarea">
          <Card bg="light" border="dark" text="dark">
            <div className="movie-director-bio">
              <span className="label">Director Bio: </span>
              <span className="value">{movie.Director.Bio}</span>
            </div>
            <div className="movie-director-born">
              <span className="label">Director Born: </span>
              <span className="value">{movie.Director.Born}</span>
            </div>
            <CardGroup className="card-group-director-mini-cards">
              {movies.map((m) => (
                <Col
                  md={6}
                  lg={3}
                  key={m._id}
                  className="director-movie-card-mini"
                >
                  <Link to={`/movies/${m._id}`}>
                    <Card className="h-100" bg="dark" text="light">
                      <Card.Img
                        variant="top"
                        crossOrigin="anonymous | use-credentials"
                        src={m.ImagePath}
                      />
                      <Card.Body>
                        <Card.Title>{m.Title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </CardGroup>
          </Card>
        </Card.Body>
        <Card.Footer className="text-right">
          <Button
            className="button-director-view"
            variant="secondary"
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

DirectorView.propTypes = {
  movies: PropTypes.array.isRequired,
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Born: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
