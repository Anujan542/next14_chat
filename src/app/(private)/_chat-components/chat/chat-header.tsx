import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewChatModal from "./new-chat-modal";

const ChatHeader = () => {
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-gray-600 font-bold text-xl uppercase">My Chats</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">
              <EllipsisVertical />
            </Button>
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
      <NewChatModal
        showNewChatModal={showNewChatModal}
        setShowNewChatModal={setShowNewChatModal}
      />
    </>
  );
};

export default ChatHeader;
