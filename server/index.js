import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import FileRoute from "./app/routes/FileRoute.js";

const app = express();
const port = 5000;

// middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // for enabling CORS

// routes
app.use("/", FileRoute);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
