import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import "./CourseDetailsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [studentName, setStudentName] = useState("");
  const [review, setReview] = useState("");
  const courseData = useSelector((state) => state.courses);
  const courseDetails = courseData.coursesList.filter(
    (course) => course._id === id
  )[0];

  return (
    <Container className="mt-5">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Course Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Feedbacks</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Review Course</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="course_details">
                  <img src={courseDetails.courseImg} alt="Error loading!" />
                  <div className="course_details_data">
                    <h5>{courseDetails.title}</h5>
                    <p>{courseDetails.price} INR</p>
                    <p>{courseDetails.duration}+ hrs</p>
                    <p>{courseDetails.details}</p>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                {courseDetails.feedback &&
                  courseDetails.feedback.map((item) => (
                    <div>
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Title>{item.studentName}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted p_tag">
                            {item.review}
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>

                      <br />
                    </div>
                  ))}
              </Tab.Pane>
              <Tab.Pane
                eventKey="third"
                onSubmit={(e) => {
                  e.preventDefault();
                  axios.post(`http://localhost:8000/course-review/${id}`, {
                    studentName,
                    review,
                  });
                  setStudentName("");
                  setReview("");
                }}
              >
                <div>
                  <form method="POST">
                    <div>
                      <label htmlFor="student_name">Name :</label>
                      <input
                        type="text"
                        id="student_name"
                        value={studentName}
                        onChange={(e) => {
                          setStudentName(e.target.value);
                        }}
                      />
                    </div>
                    <br />
                    <div>
                      <label htmlFor="feedback">Feedback : </label>
                      <textarea
                        id="feedback"
                        value={review}
                        onChange={(e) => {
                          setReview(e.target.value);
                        }}
                      />
                    </div>
                    <br />
                    <input type="submit" />
                  </form>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
