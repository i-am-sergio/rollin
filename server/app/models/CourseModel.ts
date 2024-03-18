import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  labs: [{ type: String }],
  semestre: { type: Number },
  startime: { type: String },
});

const CourseModel = model("Course", CourseSchema);

export default CourseModel;
