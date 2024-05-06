"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserType } from "@/interfaces";
import { getAllUsers } from "@/server-actions/users";
import { LoaderIcon } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/userSlice";
import { createChat } from "@/server-actions/chats";
import { toast } from "@/components/ui/use-toast";
import { ChatState } from "@/redux/chatSlice";

interface ModalProps {
  showNewChatModal: boolean;
  setShowNewChatModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewChatModal = ({
  showNewChatModal,
  setShowNewChatModal,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const { chats }: ChatState = useSelector((state: any) => state.chat);

  const getUsers = async () => {
    try {
      setIsLoading(true);

      const res = await getAllUsers();

      setUsers(res as UserType[]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addUserToChat = async (userId: string) => {
    try {
      setSelectedUserId(userId);
      setIsLoading(true);

      const res = await createChat({
        users: [userId, currentUserData?._id],
        createdBy: currentUserData?._id,
        isGrouoChat: false,
      });

      if (res.error) throw new Error(res.error);
      setShowNewChatModal(false);
      toast({
        title: "Chat created successfully",
        variant: "default",
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-10 md:right-100 bg-green-400",
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Dialog
      open={showNewChatModal}
      onOpenChange={() => setShowNewChatModal(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-900 text-center text-xl font-bold">
            Create New Chat
          </DialogTitle>
        </DialogHeader>

        {isLoading && !selectedUserId && (
          <div className="flex justify-center my-20">
            <LoaderIcon className="animate-spin" />
          </div>
        )}

        {!isLoading && users.length > 0 && (
          <div className="flex flex-col gap-3">
            {users.map((user) => {
              const chatAlreadyCreated = chats.find((chat) =>
                chat.users.find((u) => u?._id === user?._id)
              );
              if (user._id === currentUserData._id || chatAlreadyCreated)
                return null;
              return (
                <div
                  key={user._id}
                  className="flex justify-between items-center"
                >
                  <div className="flex gap-5 items-center">
                    <Avatar className="w-10 h-10 rounded-full">
                      <AvatarImage src={user.profilePicture} />
                    </Avatar>
                    <Label>{user.name}</Label>
                  </div>
                  <Button onClick={() => addUserToChat(user?._id)} size="sm">
                    Add to chat
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewChatModal;
