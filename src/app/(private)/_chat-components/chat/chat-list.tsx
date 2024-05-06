"use client";
import { SetChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { getAllChats } from "@/server-actions/chats";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const getChats = async () => {
    try {
      setLoading(true);

      const res = await getAllChats(currentUserData?._id!);

      if (res.errroe) throw new Error(res.error);

      dispatch(SetChats(res));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChats();
  }, [currentUserData]);

  return (
    <div>
      <h5>ChatList</h5>
    </div>
  );
};

export default ChatList;
