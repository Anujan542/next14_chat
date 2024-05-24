import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatState } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { SendNewMessage } from "@/server-actions/messages";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const SendMessage = () => {
  const [text, setText] = useState("");

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  const sendMessage = async () => {
    try {
      const payload = {
        text,
        image: "",
        sender: currentUserData._id!,
        chat: selectedChat?._id!,
      };

      const res = await SendNewMessage(payload);

      if (res?.error) throw new Error(res.error);

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 bg-gray-100 border-0 border-t border-solid border-gray-200 flex gap-5">
      <div>{/* emoji*/}emoji</div>
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Type a message"
          className="w-full h-10 px-0"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={sendMessage} variant="destructive" size="default">
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
};

export default SendMessage;
