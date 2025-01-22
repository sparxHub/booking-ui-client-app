"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useBookingTypes } from "@/context/booking-types";
import { useAuth } from "@/context/auth-context";
import { ServiceSteps } from "@/components/service-steps";
import { NavBar } from "@/components/navbar";
import heroImage from "@/../public/img/social-large.jpg";
import { Logo } from "@/components/logo";
import { useTheme } from "@/context/theme";
import { LoginDialog } from "@/app/auth/login";
import { SettingsService } from "@/services/settings-service";

const isExport = process.env.NEXT_PUBLIC_EXPORT_MODE === "true";

import defaultThemes from "../../../themes.json";

const customLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const imageSrc = heroImage?.src || "/img/social-large.jpg";

export default function HomePageClient() {
  const { user, logout, loginWithGoogle } = useAuth();
  const { bookingTypes, loading, error } = useBookingTypes();
  const { theme } = useTheme();

  const [title, setTitle] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");

  useEffect(() => {
    const loadTexts = async () => {
      const fetchedTitle = await SettingsService.getText("title", "Default Title");
      const fetchedDescription = await SettingsService.getText(
        "description",
        "Default Description"
      );
      setTitle(fetchedTitle);
      setDescription(fetchedDescription);
    };

    loadTexts();
  }, []);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginDialogOpen(true);
  };

  const handleJoinClick = () => {
    console.log("Redirect to sign-up page or open sign-up dialog.");
  };

  const handleLogoutClick = async () => {
    await logout();
  };

  const serviceData = [
    {
      title: "Classes",
      items: bookingTypes
        .filter((type) => type.sessionType === "classSession")
        .map((type) => ({
          title: type.title,
          description: type.details || "Detailed description not available.",
          duration: `${type.duration || 45}m`,
          type: "Group",
          action: `/booking?type=${type.typeId}`,
        })),
    },
    {
      title: "Personal Classes",
      items: bookingTypes
        .filter((type) => type.sessionType === "personalSession")
        .map((type) => ({
          title: type.title,
          description:
            type.details || "Personalized session details not available.",
          duration: `${type.duration || 30}m`,
          type: "Private",
          action: `/booking?type=${type.typeId}`,
        })),
    },
    {
      title: "External Link",
      url: "https://example.com",
    },
  ].filter((section) => {
    if (section.items !== undefined) {
      return section.items.length > 0;
    }
    return true;
  });

  return (
    <div className="relative mx-auto max-w-3xl p-0 pt-8 sm:p-4 xl:p-10">
      <div className="text-center">
        <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-primary-800 shadow-md">
          <Image
            src={imageSrc}
            loader={isExport ? customLoader : undefined}
            priority
            sizes="(min-width: 640px) 400px, 200px"
            width={128}
            height={128}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold text-primary-900">{title}</h1>
        <p className="mt-2 text-left text-lg text-primary-200 sm:text-center">
          {description}
        </p>
      </div>

      <NavBar
        isLoggedIn={!!user}
        userName={user?.displayName || "User"}
        onLoginClick={handleLoginClick}
        onJoinClick={handleJoinClick}
        onLogoutClick={handleLogoutClick}
      />

      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p>Error loading services: {error}</p>
      ) : (
        <ServiceSteps steps={serviceData} />
      )}

      <div className="absolute left-1/2 -translate-x-1/2 transform pt-10">
        <Logo
          primaryColor={defaultThemes[theme].primary[800]}
          dotColor={defaultThemes[theme].primary[200]}
          width="170px"
          height="70px"
        />
      </div>

      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
      />
    </div>
  );
}
