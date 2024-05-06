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

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

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

        {isLoading && (
          <div className="flex justify-center my-20">
            <LoaderIcon className="animate-spin" />
          </div>
        )}

        {!isLoading && users.length > 0 && (
          <div className="flex flex-col gap-3">
            {users.map((user) => {
              if (user._id === currentUserData._id) return null;
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
                  <Button size="sm">Add to chat</Button>
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
