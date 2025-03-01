import React from "react";
import NavItem from "@/components/navitem/NavItem";
import Logo, { LogoMobile } from "../logo/Logo";
import {
  FiHome,
  FiFolder,
  FiBookmark,
  FiUser,
  FiRefreshCw,
  FiAward,
  FiLogOut,
  FiCoffee
} from "react-icons/fi";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

// Zustand store
import useAuthStore from "@/store/authStore";
import useModalStore from "@/store/modalStore";

const Sidebar: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { openModal } = useModalStore();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await firebaseSignOut(auth);
      document.cookie = "accessToken=; max-age=0; path=/; samesite=strict";
      useAuthStore.getState().signOut();
      localStorage.removeItem("auth-storage");
      localStorage.removeItem("user");
      window.location.reload();
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Sign-Out failed.", error);
    }
  };

  return (
    <div className="flex flex-col md:w-[20%] w-[12%]  h-screen bg-primaryBg text-primary border-r border-gray-700 shadow-lg md:px-4 px-1">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        {/* Show LogoMobile on small screens and Logo on larger screens */}
        <div className="block lg:hidden">
          <LogoMobile classNames="h-12 w-auto mx-auto" to="/" />
        </div>
        <div className="hidden lg:block">
          <Logo classNames="h-12 w-auto mx-auto" to="/" />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex-1 space-y-2">
        <NavItem icon={<FiHome className="text-2xl" />} label="Home" to="/" />
        <NavItem icon={<FiFolder className="text-2xl" />} label="Structures" to="/folders" />
        <NavItem icon={<FiRefreshCw className="text-2xl" />} label="Templates" to="/templates" />
        <NavItem icon={<FiBookmark className="text-2xl" />} label="Bookmarks" to="/bookmarks" />
        <NavItem icon={<FiAward className="text-2xl" />} label="Contributors" to="/contributors" />
        <NavItem icon={<FiUser className="text-2xl" />} label="Profile" to="/profile" />
      </div>

      {/* buy me a coffee */}
      <div className="mt-auto mb-2 py-1">
        <button
          onClick={() => openModal("donate")}
          className="w-full flex items-center lg:justify-start justify-center md:px-4 md:py-3 py-1 text-lg font-semibold bg-primary md:rounded-xl rounded-sm text-white transition-all duration-200"
        >
          <FiCoffee className="lg:mr-3 text-2xl font-extrabold" />
          <span className="hidden lg:inline">Buy Me a Coffee</span> {/* Hide label on small screens */}
        </button>
      </div>

      {/* Logout - Conditional Rendering */}
      {isAuthenticated && (
        <div className="mt-auto mb-2 border-t border-gray-700 py-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center md:justify-start justify-center md:px-4 md:py-3 text-lg font-semibold hover:bg-primary rounded-xl hover:text-white transition-all duration-200"
          >
            <FiLogOut className="md:mr-3 text-2xl font-extrabold" />
            <span className="hidden lg:inline">Logout</span> {/* Hide label on small screens */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
