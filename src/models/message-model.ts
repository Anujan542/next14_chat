import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    readBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "users",
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["messages"]) {
  mongoose.deleteModel("messages");
}

const MessageModel = mongoose.model("messages", MessageSchema);

export default MessageModel;
