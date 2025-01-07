import mongoose from "mongoose";

export const databaseConfig = async (uri: string | undefined) => {
  if (!uri) {
    console.error("Mongo URI is undefined. Please check environment variables");
    return;
  }

  try {
    // Connect the client to the server
    await mongoose.connect(uri);
  } catch (error) {
    console.error(error);
  }
};
