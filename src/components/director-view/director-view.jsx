import React from "react";
import { CardGroup, Button, Card, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import "./director-view.scss";

export function DirectorView({ movies, director, onBackClick }) {
  return (
    <div className="directorview-container">
      <Card className="card-top bg-light mb-3">
        <Card.Header className="bg-dark text-center text-white" as="h3">
          {director.Name}
        </Card.Header>
        <Card bg="light" border="dark" text="dark">
          <Card.Body className="director-textarea">
            <div className="movie-director-bio">
              <span className="label-director">Director Bio: </span>
              <span className="value">{director.Bio}</span>
            </div>
            <div className="movie-director-born">
              <span className="label-born">Director Born: </span>
              <span className="value">{director.Born}</span>
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
                        <Card.Title className="text-center" as="h6">
                          {m.Title}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </CardGroup>
          </Card.Body>
        </Card>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps)(DirectorView);
