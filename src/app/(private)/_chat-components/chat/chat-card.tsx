import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChatType } from "@/interfaces";
import { ChatState, SetSelectedChat } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatCard = ({ chat }: { chat: ChatType }) => {
  const dispatch = useDispatch();

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  let chatName = "";
  let chatImage = "";
  let lastMessage = "";
  let lastMessageSenderName = "";
  let lastMessageTime = "";

  if (chat.isGroupChat) {
    chatName = chat.groupName;
    chatImage = chat.groupProfilePicture;
  } else {
    const receiverName = chat.users.find(
      (user) => user._id !== currentUserData?._id
    );
    chatName = receiverName?.name!;
    chatImage = receiverName?.profilePicture!;
  }

  const isChatSelected = selectedChat?._id === chat?._id;

  return (
    <div
      className={`flex justify-between hover:bg-gray-200 py-3 px-2 rounded cursor-pointer ${
        isChatSelected ? "bg-gray-200 border border-gray-300 border-solid " : ""
      }`}
      onClick={() => dispatch(SetSelectedChat(chat))}
    >
      <div className="flex gap-5 items-center">
        <Avatar className="w-10 h-10 rounded-full">
          <AvatarImage src={chatImage} />
        </Avatar>
        <span className="text-gray-500 text-sm">{chatName}</span>
      </div>

      <div>
        <span>{lastMessage}</span>
      </div>
    </div>
  );
};

export default ChatCard;
