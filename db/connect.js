import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";

/**
 * Connect to MongoDB using Mongoose
 * @returns {Promise<void>}
 */

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error(
        "MongoDB URI is not defined in the environment variables"
      );
    }
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
