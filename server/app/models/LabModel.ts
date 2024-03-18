import { Schema, model } from "mongoose";

const LabSchema = new Schema({
  group: { type: String, required: true },
  course: { type: String, required: true },
  teacher: { type: String, required: true },
  schedule: { type: String, required: true },
  quantity: { type: Number, required: true },
  students: [],
});

const LabModel = model("Labs", LabSchema);

export default LabModel;
