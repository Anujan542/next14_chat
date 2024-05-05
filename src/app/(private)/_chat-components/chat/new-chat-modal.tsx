import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  showNewChatModal: boolean;
  setShowNewChatModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewChatModal = ({
  showNewChatModal,
  setShowNewChatModal,
}: ModalProps) => {
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
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatModal;
