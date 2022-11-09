import React from "react";
import { Container, Row, Button, Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export function GenreView({ genre, movies, onBackClick }) {
  return (
    <Card className="card-top bg-light mb-3">
      <Card.Header className="bg-secondary text-center" as="h3">
        {genre.Name}
      </Card.Header>
      <Card bg="light" border="dark" text="dark">
        <Card.Body className="genre">
          <div className="genre-textarea">
            <span className="genre-name">Genre: </span>
            <span className="value">{genre.Name}</span>
          </div>
          <div className="genre-description-textarea">
            <span className="genre-description">Description: </span>
            <span className="value">{genre.Description}</span>
          </div>
          <Row className="genre-movie-mini-cards">
            {movies.map((m) => (
              <Col md={6} lg={3} key={m._id} className="genre-movie-card-mini">
                <Link to={`/movies/${m._id}`}>
                  <Card className="h-100" bg="dark" text="light">
                    <Card.Img
                      variant="top"
                      crossOrigin="anonymous | use-credentials"
                      src={m.ImagePath}
                    />
                    <Card.Body>
                      <Card.Title className="text-center" as="h6">
                        {m.Title}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <Card.Footer className="bg-secondary text-right">
        <Button
          className="btn btn-danger"
          onClick={() => {
            onBackClick();
          }}
          variant="primary"
        >
          Back
        </Button>
      </Card.Footer>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps)(GenreView);
