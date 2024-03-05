import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/database.js";
import AuthRoute from "./app/routes/AuthRoute.js";
import FileRoute from "./app/routes/FileRoute.js";
import UserRoute from "./app/routes/UserRoute.js";
import AdminRoute from "./app/routes/AdminRoute.js";
import CourseRoute from "./app/routes/CourseRoute.js";
import LabRoute from "./app/routes/LabRoute.js";
import MatriculateRoute from './app/routes/MatriculateRoute.js'

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

// middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // for enabling CORS

// routes
app.use("/auth", AuthRoute);
app.use("/file", FileRoute);
app.use("/user", UserRoute);
app.use("/admin", AdminRoute);
app.use("/course", CourseRoute);
app.use("/lab", LabRoute);
app.use("/matriculate", MatriculateRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on http://localhost:${port}`);
});
