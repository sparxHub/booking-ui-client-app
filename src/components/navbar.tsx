"use client";

import { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Dialog } from "../app/dialogs/dialog"; // Import the Dialog component
// import { useTheme } from "@/context/theme";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Fake login state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  // const { theme } = useTheme();

  const primaryBg = "bg-primary-900";
  const primaryHoverBg = "hover:bg-primary-800";
  const primaryText = "text-primary-900";

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission
    setIsLoggedIn(true);
    setIsDialogOpen(false); // Close dialog after sign-in
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md shadow-md transition-colors duration-300`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className={`text-lg font-bold flex items-center space-x-2 ${primaryText}`}>
            <div className={`w-6 h-6 rounded-full ${primaryBg}`}></div> {/* Fake logo */}
            <span>My App</span>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notification Button */}
                <button
                  className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <BellIcon className="w-6 h-6 text-gray-500" />
                </button>

                {/* User Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      ND
                    </div>
                    <span className="font-medium">Nadav</span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Sign Up */}
                <button
                  className={`px-4 py-2 rounded-full text-white ${primaryBg} ${primaryHoverBg}`}
                  onClick={() => setIsLoggedIn(true)}
                >
                  Sign Up
                </button>
                {/* Sign In */}
                <button
                  className={`px-4 py-2 border rounded-full ${primaryText} border-primary-900 hover:bg-primary-800`}
                  onClick={() => setIsDialogOpen(true)} // Open dialog
                >
                  Sign In
                </button>

              </>
            )}
          </div>
        </div>
      </header>

      {/* Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h2 className="text-xl font-bold">Sign In</h2>
        <p className="text-gray-500 mb-4">Please sign in or sign up</p>
        <form className="space-y-4" onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="password"
            placeholder="Your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-full text-white ${primaryBg} ${primaryHoverBg}`}
          >
            Sign In
          </button>
        </form>
      </Dialog>
    </>
  );
}
