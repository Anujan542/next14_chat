"use server";
import ChatModel from "@/models/chat-model";

export const createChat = async (payload: any) => {
  try {
    const chat = await ChatModel.create(payload);

    return JSON.parse(JSON.stringify(chat));
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
    }).populate("users");
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};
