const mongoose = require("mongoose");

const AllCoursesSchema = new mongoose.Schema({
  title: { type: String },
  details: { type: String },
  price: { type: Number },
  duration: { type: Number },
  courseImg: { type: String },
  feedback: { type: Array },
});

module.exports = mongoose.model("courses", AllCoursesSchema);
