import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const CONNECTION = process.env.MONGODB_CONNECTION;

export async function startServer() {
  try {
    console.log(CONNECTION);
    await mongoose.connect(CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to database`);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
}
