const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const passport = require("passport");
const session = require("express-session");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const courses = require("./schemamodels/AllCourses");
const User = require("./schemamodels/UserSchema");

const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(User.authenticate()));

const uri = process.env.MONGO_URL;
const PORT = process.env.PORT || 3001;
mongoose
  .connect(uri)
  .then(() => console.log("DB Connected successfully!"))
  .catch((err) => console.log(err));

app.post("/register", function (req, res) {
  User.register(
    new User({ email: req.body.email, username: req.body.username }),
    req.body.password,
    function (err, user) {
      if (err) {
        res.json({
          success: false,
          message: "Error occured while signing up. Error: " + err,
        });
      } else {
        req.login(user, (er) => {
          if (er) {
            res.json({ success: false, message: er });
          } else {
            res.json({
              success: true,
              message: "Congrats! You have been signed up.",
            });
          }
        });
      }
    }
  ) &&
    then(() => {
      passport.serializeUser(User.serializeUser());
      passport.deserializeUser(User.deserializeUser());
    });
});

app.post("/login", function (req, res) {
  if (!req.body.username) {
    res.json({ success: false, message: "Username is empty." });
  } else if (!req.body.password) {
    res.json({ success: false, message: "Password is empty." });
  } else {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({
            success: false,
            message: "username or password incorrect",
          });
        } else {
          res.json(
            {
              success: true,
              message: "Authentication successful",
            },
            passport.serializeUser(User.serializeUser()),
            passport.deserializeUser(User.deserializeUser())
          );
        }
      }
    })(req, res);
  }
});

app.get("/", async (req, res) => {
  let courseList = await courses.find();
  res.send(courseList);
});

app.get("/course-details/:id", async (req, res) => {
  let courseData = await courses.findById(req.params.id).exec();
  res.json(courseData);
});

app.post("/course-review/:id", async (req, res) => {
  const doc = await courses.findById(req.params.id).exec();
  doc.feedback.push(req.body);
  await doc.save();
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server has started running on port ${PORT}`);
});

// -------------------------To save the hard data into database -------------------------

// let allCourses = [
//   {
//     title: "C Programming",
//     price: 499,
//     duration: 30,
//     courseImg:
//       "https://media.istockphoto.com/id/1413990694/photo/python-programming-language-code-on-a-dark-blue-surface-with-glitched-digital-overlay-and.jpg?s=1024x1024&w=is&k=20&c=oBflfc9AshUvukv-dw-xjctbEoScP4i7dAlKTdM9B6E=",
//   },
//   {
//     title: "Python",
//     price: 299,
//     duration: 30,
//     courseImg:
//       "https://media.istockphoto.com/id/1413990694/photo/python-programming-language-code-on-a-dark-blue-surface-with-glitched-digital-overlay-and.jpg?s=1024x1024&w=is&k=20&c=oBflfc9AshUvukv-dw-xjctbEoScP4i7dAlKTdM9B6E=",
//   },
//   {
//     title: "JAVA",
//     price: 899,
//     duration: 30,
//     courseImg:
//       "https://media.istockphoto.com/id/1413990694/photo/python-programming-language-code-on-a-dark-blue-surface-with-glitched-digital-overlay-and.jpg?s=1024x1024&w=is&k=20&c=oBflfc9AshUvukv-dw-xjctbEoScP4i7dAlKTdM9B6E=",
//   },
//   {
//     title: "RUBY",
//     price: 399,
//     duration: 30,
//     courseImg:
//       "https://media.istockphoto.com/id/1413990694/photo/python-programming-language-code-on-a-dark-blue-surface-with-glitched-digital-overlay-and.jpg?s=1024x1024&w=is&k=20&c=oBflfc9AshUvukv-dw-xjctbEoScP4i7dAlKTdM9B6E=",
//   },
//   {
//     title: "C++",
//     price: 449,
//     duration: 30,
//     courseImg:
//       "https://media.istockphoto.com/id/1413990694/photo/python-programming-language-code-on-a-dark-blue-surface-with-glitched-digital-overlay-and.jpg?s=1024x1024&w=is&k=20&c=oBflfc9AshUvukv-dw-xjctbEoScP4i7dAlKTdM9B6E=",
//   },
// ];

// app.post("/courses", (req, res) => {
//   let newCourse = req.body;
//   console.log(newCourse);
//   courses.push(newCourse);
//   res.json({ message: "Course added!" });
// });

// app.get("/courses", (req, res) => {
//   allCourses.forEach((item) => {
//     let newCourse = new Courses({
//       title: item.title,
//       price: item.price,
//       duration: item.duration,
//       courseImg: item.courseImg,
//     });
//     newCourse.save();
//   });
//   res.send(allCourses);
// });

// -------------------------------------------------------------------------------
