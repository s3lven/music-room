import mongoose from "mongoose";

const activeUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: Date,
    required: true,
  },
});

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
        type: activeUserSchema,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Room", roomSchema);
