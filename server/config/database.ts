import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const CONNECTION = process.env.MONGODB_CONNECTION || "mondodb://localhost:27017/your-database-name";

// connect to the database
export async function connectDB() {
  try {
    await mongoose.connect(CONNECTION);
    console.log(`Connected to database`);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
}
