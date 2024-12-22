import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Construct the URI safely
    const uri = process.env.MONGO_URI.endsWith('/')
      ? `${process.env.MONGO_URI}todo`
      : `${process.env.MONGO_URI}/todo`;

    // Connect to MongoDB
    const connectionInstance = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`\n MongoDB connected to database: ${connectionInstance.connection.name}`);
  } catch (error) {
    console.error("MONGODB connection FAILED:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
