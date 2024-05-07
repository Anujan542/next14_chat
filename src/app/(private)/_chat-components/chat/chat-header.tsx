"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import NewChatModal from "./new-chat-modal";
import { Input } from "@/components/ui/input";

const ChatHeader = () => {
  const [showNewChatModal, setShowNewChatModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-gray-600 font-bold text-xl uppercase">My Chats</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setShowNewChatModal(true)}>
              New Chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Create Group Chat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Input
        type="text"
        placeholder="search chats..."
        className="mt-5 w-full rounded-md px-3 h-10 bg-gray-200 "
      />
      {showNewChatModal && (
        <NewChatModal
          showNewChatModal={showNewChatModal}
          setShowNewChatModal={setShowNewChatModal}
        />
      )}
    </>
  );
};

export default ChatHeader;
