"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { UserType } from "@/interfaces";
import { UserState } from "@/redux/userSlice";
import { useClerk } from "@clerk/nextjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

interface userInfoProps {
  showUserInfo: boolean;
  setShowUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentUserInfo = ({ setShowUserInfo, showUserInfo }: userInfoProps) => {
  const router = useRouter();
  const { signOut } = useClerk();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelctedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Check if files array exists and has at least one file
    setSelctedFile(file || null); // If file is undefined, set it to null
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut();
      setShowUserInfo(false);
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{key}</span>
        <span className=" text-gray-500">{value}</span>
      </div>
    );
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Programmatically trigger input click
    }
  };

  return (
    <Sheet
      open={showUserInfo}
      defaultOpen={false}
      onOpenChange={() => setShowUserInfo(false)}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile Info</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-10 mt-5">
          <div className="flex flex-col justify-center items-center">
            <Avatar className="w-30 h-20 rounded-full">
              <AvatarImage
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : currentUserData?.profilePicture
                }
              />
            </Avatar>

            <span
              className="mt-3 text-gray-500 text-center cursor-pointer"
              onClick={handleClick}
            >
              Update profile picture
            </span>
            <input
              ref={inputRef}
              className="mt-3 cursor-pointer hidden"
              id="picture"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <Separator className="my-4" />

        <div className="flex flex-col gap-6">
          {getProperty("Name", currentUserData?.name)}
          {getProperty("Username", currentUserData?.userName)}
          {getProperty("id", currentUserData?._id)}
          {getProperty(
            "Joined on",
            dayjs(currentUserData?.createdAt).format("DD MM YYYY hh:mm A")
          )}
        </div>
        <div className="mt-14 flex flex-col gap-4">
          <Button
            className="w-full uppercase bg-yellow-300 text-black"
            disabled={!selectedFile}
          >
            Update Profile Picture
          </Button>
          <Button className="w-full uppercase" onClick={logOut}>
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CurrentUserInfo;
