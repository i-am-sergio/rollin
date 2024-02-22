//Course Model
import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const CourseModel = mongoose.model("Courses", CourseSchema);
export default CourseModel;
