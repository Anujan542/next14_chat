"use client";

import { Separator } from "@/components/ui/separator";
import Chat from "./_chat-components/chat";
import ChatArea from "./_chat-components/chatArea";

export default async function Home() {
  return (
    <div className="flex h-[85vh]">
      <Chat />
      <Separator orientation="vertical" className="h-full bg-gray-200" />
      <ChatArea />
    </div>
  );
}
