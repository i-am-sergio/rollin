import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import FileRoute from "./routes/FileRoute.js";

const app = express();

// middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // for enabling CORS

// routes
app.use("/", FileRoute);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
