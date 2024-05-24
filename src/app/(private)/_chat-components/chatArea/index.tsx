"use client";
import Recipient from "./recipient";
import { useSelector } from "react-redux";
import { ChatState } from "@/redux/chatSlice";
import Messages from "./messages";
import SendMessage from "./sendMessage";

const ChatArea = () => {
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        {/* animation */}
        <img src="/chat.svg" className="h-96" />
        <span className="font-semibold text-gray-800">
          Select a chat to start conversation...
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Recipient />
      <Messages />
      <SendMessage />
    </div>
  );
};

export default ChatArea;
