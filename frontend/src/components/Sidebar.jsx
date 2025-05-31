import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton";
import { Users, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Close modal on click outside or Enter
  useEffect(() => {
    if (!showSearchModal) return;
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowSearchModal(false);
      }
    };
    const handleEnter = (e) => {
      if (e.key === "Enter") setShowSearchModal(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEnter);
    };
  }, [showSearchModal]);

  const filteredUsers = users
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true))
    .filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Multiverse</span>
        </div>
        {/* Search icon for mobile - under Contacts, centered */}
        <div className="mt-3 flex justify-center lg:hidden">
          <button
            className="btn btn-sm btn-circle"
            onClick={() => setShowSearchModal(true)}
            aria-label="Search users"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
        {/* Search input for desktop */}
        <div className="mt-4 relative hidden lg:block">
          <input
            type="text"
            className="input input-sm w-full pl-9"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
      w-full p-3 flex items-center gap-3
      hover:bg-base-300 transition-colors
      ${
        selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
      }
    `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {(onlineUsers || []).includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
          rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>

      {/* Mobile search modal */}
      {showSearchModal && (
        <div
          className="fixed left-0 right-0 z-50 flex items-start justify-center pointer-events-auto"
          style={{ top: "70px" }} // Adjust this value to match your navbar height (e.g., 56px or 64px)
        >
          {/* Only the search bar, icon, and text, no modal background */}
          <div
            className="w-full max-w-xs bg-base-100 rounded-b-xl shadow-lg"
            ref={modalRef}
          >
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  className="input input-sm w-full pl-9"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
