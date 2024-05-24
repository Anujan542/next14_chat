"use server";
import ChatModel from "@/models/chat-model";

export const createChat = async (payload: any) => {
  try {
    await ChatModel.create(payload);

    const newChat = await ChatModel.find({
      users: {
        $in: [payload.createdBy],
      },
    })
      .populate("users")
      .sort({ updatedAt: -1 });

    return JSON.parse(JSON.stringify(newChat));
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async (userId: string) => {
  try {
    const users = await ChatModel.find({
      users: {
        $in: [userId],
      },
    })
      .populate("users")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};
