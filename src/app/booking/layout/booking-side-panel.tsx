"use client";

import Image from "next/image";
import { ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import cx from "classnames";

import heroImage from "@/../public/img/social-large.jpg";
import { useBookingTypes } from "@/context/booking-types";
import { useManagers } from "@/context/managers";
import { useTheme } from '@/context/theme';

const isExport = process.env.NEXT_PUBLIC_EXPORT_MODE === "true";

const customLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const imageSrc = heroImage?.src || "/img/social-large.jpg";

export function BookingSidePanel() {
  const { selectedBookingType, mode, loading: bookingTypesLoading } = useBookingTypes();
  const { managers } = useManagers();
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
    null
  );

  // Fetch instructors based on the mode
  let instructors: { managerId: string | null; firstName: string; lastName: string; photo?: string }[] = [];
  if ((mode === "class" || mode === "personal") && selectedBookingType) {
    instructors = selectedBookingType.availabilities
      .map((availability) => availability.managerId)
      .filter((id, index, self) => id !== undefined && self.indexOf(id) === index) // Ensure no undefined values
      .map((managerId) => {
        const manager = managers.find((manager) => manager.managerId === managerId);
        return manager
          ? { managerId: manager.managerId, firstName: manager.firstName, lastName: manager.lastName, photo: manager.photo }
          : { managerId: managerId || null, firstName: "Unknown", lastName: "" };
      });
  } else if (mode === "all_classes") {
    const allManagers = managers
      .filter((manager) => manager.roles.includes("instructor"))
      .map((manager) => ({
        managerId: manager.managerId,
        firstName: manager.firstName,
        lastName: manager.lastName,
        photo: manager.photo,
      }));
    instructors = [...new Set(allManagers)];
  }

  if (instructors.length > 1) {
    instructors.unshift({ managerId: null, firstName: "All", lastName: "Instructors" });
  }

  // Determine panel content
  let panelContent;

  if (mode === "class" && selectedBookingType) {
    panelContent = (
      <div className="min-[400px]:text-center md:text-left">
        <h2 className="text-3xl font-extrabold lg:text-2xl xl:text-3xl">
          {selectedBookingType.title}
        </h2>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary-600">
          {selectedBookingType.details || "Class description not available"}
        </p>
        <div className="mt-4 flex flex-col gap-2 rounded-lg border border-primary-200 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="h-5 w-5 text-primary-600" />
            <span>{`${selectedBookingType.duration} minutes`}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UserGroupIcon className="h-5 w-5 text-primary-600" />
            <span>Max Participants: {selectedBookingType.maxBookings || "N/A"}</span>
          </div>
        </div>
      </div>
    );
  } else if (mode === "personal" && selectedBookingType) {
    const instructor = instructors[0];
    panelContent = (
      <div className="min-[400px]:text-center md:text-left">
        <h2 className="text-3xl font-extrabold lg:text-2xl xl:text-3xl">
          {selectedBookingType.title}
        </h2>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary-600">
          {selectedBookingType.details || "Details not available"}
        </p>
        <div className="mt-4 flex flex-col gap-2 rounded-lg border border-primary-200 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="h-5 w-5 text-primary-600" />
            <span>{`${selectedBookingType.duration} minutes`}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UserGroupIcon className="h-5 w-5 text-primary-600" />
            <span>
              Instructor:{" "}
              {instructor
                ? `${instructor.firstName} ${instructor.lastName}`
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    );
  } else if (mode === "all_classes") {
    panelContent = (
      <div className="min-[400px]:text-center md:text-left">
        <h2 className="text-3xl font-extrabold lg:text-2xl xl:text-3xl">
          Explore Classes
        </h2>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary-600">
          Discover a variety of classes and find your fit
        </p>
        <p className="mt-4 text-sm text-gray-600">
          Choose from a range of group classes and personal training sessions
          designed for all fitness levels.
        </p>
        <p className="mt-4 text-sm text-gray-600">
          Click on a class to view more details and book your session.
        </p>
      </div>
    );
  }

  return (
    <aside className="rounded-t-2xl border-8 border-b-0 border-white bg-white bg-opacity-90 backdrop-blur-md lg:rounded-l-2xl lg:rounded-tr-none lg:border-b-8 lg:border-r-0 lg:pr-4 [@supports(backdrop-filter:blur(0))]:bg-opacity-80">
      <div className="-mt-16 px-4 py-8 sm:px-8 md:mt-0 lg:-mt-16 lg:px-6 xl:px-8">
        <div className="flex flex-col items-start gap-8 pt-10 min-[400px]:items-center md:flex-row lg:flex-col lg:items-start">
          {bookingTypesLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="animate-spin h-10 w-10 text-primary-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                ></path>
              </svg>
              <p className="mt-4 text-lg font-medium text-primary-600">Loading...</p>
            </div>
          ) : (
            <>
              {panelContent}

              <AvatarPicker
                title="Filter by Instructor"
                instructors={instructors}
                selectedInstructor={selectedInstructor}
                onSelect={(id) => setSelectedInstructor(id)}
              />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

// ------------------------------
// AvatarPicker Component
// ------------------------------
function AvatarPicker({
  instructors,
  selectedInstructor,
  onSelect,
  title,
}: {
  instructors: { managerId: string | null; firstName: string; lastName: string; photo?: string }[];
  selectedInstructor: string | null;
  onSelect: (id: string | null) => void;
  title: string;
}) {

  return (
    <div>
      {/* Title */}
      <h3
        className="mb-4 text-lg font-semibold"
      >
        {title}
      </h3>

      {/* Avatar Picker Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {instructors.map((instructor) => (
          <button
            key={instructor.managerId || "all"}
            onClick={() => onSelect(instructor.managerId || null)}
            className={cx(
              "flex flex-col items-center text-center p-2 rounded-md border transition",
              selectedInstructor === instructor.managerId
                ? "bg-primary-100 border-primary-500"
                : "hover:bg-gray-100 border-transparent"
            )}
          >
            {/* Avatar */}
            <Avatar
              name={`${instructor.firstName} ${instructor.lastName}`}
              photo={instructor.photo}
            />

            {/* Name */}
            <div className="mt-2 text-sm font-medium max-w-[100px]">
              <p className="truncate">{instructor.firstName}</p>
              <p className="truncate">{instructor.lastName}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ------------------------------
// Avatar Component
// ------------------------------
function Avatar({
  name,
  photo,
}: {
  name: string;
  photo?: string;
}) {
  if (photo) {
    return (
      <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-300">
        <Image
          src={photo}
          alt={name}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
    );
  }

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white">
      {initials}
    </div>
  );
}
