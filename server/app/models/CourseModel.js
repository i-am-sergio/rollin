import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  labs: [{ type: String }],
  semestre: { type: Number},
});

const CourseModel = mongoose.model("Course", CourseSchema);

export default CourseModel;
