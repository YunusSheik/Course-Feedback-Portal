import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function CourseCard(props) {
  return (
    <Link to={`/course-details/${props.id}`}>
      <Card>
        <Card.Img variant="top" src={props.courseImg} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.duration} hrs</Card.Text>
          <Card.Text>{props.price} INR</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
