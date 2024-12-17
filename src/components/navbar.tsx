import { useState } from "react";
import { Button } from "@/components/shared/button"; // Use shared button component
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  FaTwitter as TwitterIcon,
  FaFacebookF as FacebookIcon,
  FaInstagram as InstagramIcon,
} from "react-icons/fa";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Fake login state
  const [showMenu, setShowMenu] = useState(false); // Dropdown menu state

  return (
    <div className="flex flex-wrap items-center justify-between border-b border-primary-700 py-2">
      {/* Left Section: Login & Join Buttons */}
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <div className="relative">
            <Button
              size="small"
              impact="outline"
              className="flex items-center gap-2"
              onClick={() => setShowMenu(!showMenu)}
            >
              Nadav Daniel
              <ChevronDownIcon className="h-5 w-5" />
            </Button>

            {showMenu && (
              <div className="absolute right-0 z-50 mt-2 w-48 rounded border bg-white shadow-md">
                <div className="py-2">
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                    My Profile
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                    My Bookings
                  </button>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setShowMenu(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Button
              size="small"
              impact="outline"
              onClick={() => {
                setIsLoggedIn(true);
                setShowMenu(false);
              }}
            >
              Log in
            </Button>
            <Button size="small" impact="bold">
              Join now
            </Button>
          </>
        )}
      </div>

      {/* Social Icons: Shown only on Medium and Larger Screens */}
      <div className="hidden sm:flex items-center gap-2">
        <Button size="small" shape="square" impact="none">
          <TwitterIcon className="h-5 w-5 text-primary-800" />
        </Button>
        <Button size="small" shape="square" impact="none">
          <FacebookIcon className="h-5 w-5 text-primary-800" />
        </Button>
        <Button size="small" shape="square" impact="none">
          <InstagramIcon className="h-5 w-5 text-primary-800" />
        </Button>
      </div>

      {/* Social Icons: Shown only on Small Screens */}
      <div className="flex sm:hidden mt-2 w-full justify-left gap-2">
        <Button size="small" shape="square" impact="none">
          <TwitterIcon className="h-5 w-5 text-primary-800" />
        </Button>
        <Button size="small" shape="square" impact="none">
          <FacebookIcon className="h-5 w-5 text-primary-800" />
        </Button>
        <Button size="small" shape="square" impact="none">
          <InstagramIcon className="h-5 w-5 text-primary-800" />
        </Button>
      </div>
    </div>
  );
}
