import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AllCourses from "./components/AllCourses";
import CourseDetailsPage from "./components/CourseDetailsPage";
import StudentLogin from "./components/StudentLogin";
import StudentSignUp from "./components/StudentSignUp";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/register" element={<StudentSignUp />} />
        <Route path="/" element={<AllCourses />} />
        <Route path="/course-details/:id" element={<CourseDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
