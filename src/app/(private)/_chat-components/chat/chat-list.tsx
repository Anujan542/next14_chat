"use client";
import { ChatState, SetChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { getAllChats } from "@/server-actions/chats";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./chat-card";
import { LoaderIcon } from "lucide-react";

const ChatList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const { chats }: ChatState = useSelector((state: any) => state.chat);

  const getChats = async () => {
    try {
      setLoading(true);

      const res = await getAllChats(currentUserData?._id!);

      if (res.error) throw new Error(res.error);

      dispatch(SetChats(res));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserData) {
      getChats();
    }
  }, [currentUserData]);

  return (
    <div>
      <div className="flex flex-col gap-5 mt-7">
        {loading && (
          <div className="flex justify-center">
            <LoaderIcon className="animate-spin" />
          </div>
        )}
        {chats.length > 0 &&
          chats.map((chat) => <ChatCard key={chat._id} chat={chat} />)}
      </div>
    </div>
  );
};

export default ChatList;
