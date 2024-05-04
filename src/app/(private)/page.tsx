import { ConnectMongoDB } from "@/config/db-config";
// import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
// import { UserButton } from "@clerk/nextjs";
ConnectMongoDB();
export default async function Home() {
  // const loggedInUserData = await GetCurrentUserFromMongoDB();

  return <div className="p-5">Home</div>;
}
