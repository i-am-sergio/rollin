import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  cui: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true},
  name: { type: String, required: true,},
  lastname: { type: String, required: true,},
  password: { type: String, required: true,},
  role: { type: String, required: true,},
  courses: [{ type: String }],
  labs: [{ type: String }],
});

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;