import { X, Trash2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, clearMessages } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showToast, setShowToast] = useState(false);

  const handleClearChat = async () => {
    await clearMessages(selectedUser._id);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      {/* Toast popup */}
      {showToast && (
        <div className="fixed left-1/2 top-8 z-[9999] -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-base animate-fade-in-up">
          Message history cleared
        </div>
      )}
      <div className="p-2.5 border-b border-base-300 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                />
              </div>
            </div>

            {/* User info */}
            <div>
              <h3 className="font-medium">{selectedUser.fullName}</h3>
              <p className="text-sm text-base-content/70">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              title="Clear chat history"
              className="btn btn-xs btn-ghost text-error"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => setSelectedUser(null)}>
              <X />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
