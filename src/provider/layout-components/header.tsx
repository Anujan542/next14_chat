"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import React, { useEffect, useState } from "react";
import CurrentUserInfo from "./current-user-info";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser, UserState } from "@/redux/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const pathName = usePathname();

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const isProtectedRoute =
    pathName.includes("sign-in") || pathName.includes("sign-out");
  if (isProtectedRoute) return null;

  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);

  const getCurrentUser = async () => {
    try {
      const res = await GetCurrentUserFromMongoDB();
      if (res.error) {
        throw new Error(res.error);
      }
      dispatch(SetCurrentUser(res as UserType));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <div className="bg-gray-800 w-full p-5 flex justify-between items-center  border-solid border-b-4 border-yellow-400">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white">Yoda Chat</h1>
        </div>
        <div className="gap-5 flex items-center">
          <span className="text-white text-sm">{currentUserData?.name}</span>
          <Avatar
            className="cursor-pointer"
            onClick={() => setShowUserInfo(true)}
          >
            <AvatarImage src={currentUserData?.profilePicture} />
          </Avatar>
        </div>
      </div>
      {showUserInfo && currentUserData && (
        <CurrentUserInfo
          showUserInfo={showUserInfo}
          setShowUserInfo={setShowUserInfo}
        />
      )}
    </>
  );
};

export default Header;
