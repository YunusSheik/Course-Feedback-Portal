import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import { fetchCourses } from "../redux/courseSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AllCourses() {
  const dispatch = useDispatch();
  const allCourses = useSelector((state) => state.courses.coursesList);

  useEffect(() => {
    axios.get("http://localhost:8000").then((res) => {
      dispatch(fetchCourses(res.data));
    });
  }, []);
  return (
    <Container className="mt-5">
      <Row xs={1} md={3} className="g-4">
        {allCourses &&
          allCourses.map((course) => (
            <Col key={course._id}>
              <CourseCard
                id={course._id}
                courseImg={course.courseImg}
                title={course.title}
                price={course.price}
                duration={course.duration}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
