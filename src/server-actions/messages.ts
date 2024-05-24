"use server";

import ChatModel from "@/models/chat-model";
import MessageModel from "@/models/message-model";

export const SendNewMessage = async (payload: {
  text?: string;
  image?: string;
  sender: string;
  chat: string;
}) => {
  try {
    const newMessage = new MessageModel(payload);
    await newMessage.save();
    await ChatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage._id,
    });
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getChatMessages = async (chatId: String) => {
  try {
    const messages = await MessageModel.find({ chat: chatId })
      .populate("sender")
      .sort({ createdAt: 1 });

    return JSON.parse(JSON.stringify(messages));
  } catch (error: any) {}
};
