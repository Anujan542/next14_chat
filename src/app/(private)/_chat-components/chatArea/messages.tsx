import { MessageType } from "@/interfaces";
import { ChatState } from "@/redux/chatSlice";
import { getChatMessages } from "@/server-actions/messages";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./message";

const Messages = () => {
  const [messages, setMessage] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  const getAllChatMessages = async () => {
    try {
      setLoading(true);

      const res = await getChatMessages(selectedChat?._id!);
      setMessage(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllChatMessages();
  }, [selectedChat]);

  return (
    <div className="flex-1 p-3">
      <div className="flex flex-col gap-5">
        {messages.map((message) => {
          return <Message key={message._id} message={message} />;
        })}
      </div>
    </div>
  );
};

export default Messages;
