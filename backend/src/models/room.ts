import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    activeUsers: [
      {
        username: String,
        joinedAt: Date,
        socketId: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Room", roomSchema);
