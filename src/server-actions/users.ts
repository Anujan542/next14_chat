"use server";
import { ConnectMongoDB } from "@/config/db-config";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";

ConnectMongoDB();

export const GetCurrentUserFromMongoDB = async () => {
  try {
    const clerkUser = await currentUser();

    // check clerk user already exist
    const mongoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id });
    if (mongoUser) {
      return JSON.parse(JSON.stringify(mongoUser));
    }
    // svae the new user in mongoDB

    let email = "";
    if (clerkUser?.emailAddresses) {
      email = clerkUser?.emailAddresses[0]?.emailAddress || "";
    }

    const clerkUserPayload = {
      clerkUserId: clerkUser?.id,
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      userName: clerkUser?.username,
      email,
      profilePicture: clerkUser?.imageUrl,
    };
    const newUser = await UserModel.create(clerkUserPayload);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const UpdateUserProfilepicture = async (
  userId: string,
  payload: any
) => {
  try {
    const updatePicture = await UserModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    return JSON.parse(JSON.stringify(updatePicture));
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await UserModel.find({});
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

