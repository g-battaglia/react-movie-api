import { Card, Button } from "react-bootstrap";
import React from "react";

const MovieCard = ({ poster, title, rating, director, year, description }) => {
  return (
    <Card className="" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={poster} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <small>Director: {director}</small>
          <br />
          <small>Year: {year}</small>
          <br />
          <small>IMDB Rating: {rating}</small>{" "}
        </Card.Text>
        <Button variant="outline-dark">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
