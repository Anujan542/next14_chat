import { formatDateTime } from "@/helpers/date-formats";
import { MessageType } from "@/interfaces";
import { ChatState } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { useSelector } from "react-redux";

const Message = ({ message }: { message: MessageType }) => {
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  const isLoggedInUser = message.sender._id === currentUserData._id;

  if (isLoggedInUser) {
    return (
      <div className="flex justify-end gap-1">
        <div className="flex flex-col gap-1">
          <p className="bg-purple-900 text-white py-2 px-7 rounded-xl rounded-tl-none">
            {message.text}
          </p>
          <span className="text-xs text-gray-500">
            {formatDateTime(message.createdAt)}
          </span>
        </div>
        <img
          src={message.sender.profilePicture}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
      </div>
    );
  } else {
    return (
      <div className="flex gap-1">
        <img
          src={message.sender.profilePicture}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="bg-gray-200 py-2 px-7 rounded-xl rounded-tr-none">
            <span className="text-blue-900 text-xs font-semibold">
              {message.sender.name}
            </span>
            <p className="text-black m-0 pt-1 text-sm">{message.text}</p>
          </div>
          <span className="text-xs text-gray-500">
            {formatDateTime(message.createdAt)}
          </span>
        </div>
      </div>
    );
  }
};

export default Message;
