import { ChatState } from "@/redux/chatSlice";
import React from "react";
import { useSelector } from "react-redux";

const Recipient = () => {
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  let chatName = "";
  let chatImage = "";

  if (selectedChat?.isGroupChat) {
    chatName = selectedChat.groupName;
    chatImage = selectedChat.groupProfilePicture;
  } else {
    const receiverName = selectedChat?.users.find(
      (user) => user._id !== selectedChat?._id
    );
    chatName = receiverName?.name!;
    chatImage = receiverName?.profilePicture!;
  }

  return (
    <div className="flex justify-between py-3 px-3 border-b-4 border-0">
      <div className="flex gap-5 items-center">
        <img src={chatImage} alt="" className="w-10 h-10 rounded-full" />
        <span className="text-gray-600 text-sm">{chatName}</span>
      </div>
    </div>
  );
};

export default Recipient;
