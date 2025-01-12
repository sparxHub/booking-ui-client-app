"use client";

import Image from "next/image";
import { ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useBookingTypes } from "@/context/booking-types";
import { useManagers } from "@/context/managers";
import { AvatarPicker } from "@/components/AvatarPicker";
import { useSelectedInstructor } from "@/context/selected-instructor";

const heroImage = "/img/social-large.jpg";

export function BookingSidePanel() {
  const { selectedBookingType, mode, loading: bookingTypesLoading } = useBookingTypes();
  const { managers } = useManagers();
  const { selectedInstructor, setSelectedInstructor } = useSelectedInstructor();

  let instructors: { 
    managerId: string | null; 
    firstName: string; 
    lastName: string; 
    photo?: string 
  }[] = [];

  if ((mode === "class" || mode === "personal") && selectedBookingType) {
    instructors = selectedBookingType.availabilities
      .map((availability) => availability.managerId)
      .filter((id, index, self) => id !== undefined && self.indexOf(id) === index)
      .map((managerId) => {
        const manager = managers.find((manager) => manager.managerId === managerId);
        return manager
          ? {
              managerId: manager.managerId,
              firstName: manager.firstName,
              lastName: manager.lastName,
              photo: manager.photo,
            }
          : { managerId: managerId || null, firstName: "Unknown", lastName: "" };
      });
  } else if (mode === "all_classes") {
    instructors = managers
      .filter((manager) => manager.roles.includes("instructor"))
      .map((manager) => ({
        managerId: manager.managerId,
        firstName: manager.firstName,
        lastName: manager.lastName,
        photo: manager.photo,
      }));

    instructors = [...new Map(instructors.map((inst) => [inst.managerId, inst])).values()];
  }

  if (instructors.length > 1) {
    instructors.unshift({
      managerId: null,
      firstName: "All",
      lastName: "Instructors",
    });
  }

  let panelContent;

  if (mode === "class" && selectedBookingType) {
    panelContent = (
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-extrabold lg:text-2xl xl:text-3xl">
          {selectedBookingType.title}
        </h2>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary-600">
          {selectedBookingType.details || "Class description not available"}
        </p>
        <div className="mt-4 flex flex-col gap-2 border border-primary-200 p-4">
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
    const instructor = instructors.find((inst) => inst.managerId === selectedInstructor);
    panelContent = (
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-extrabold lg:text-2xl xl:text-3xl">
          {selectedBookingType.title}
        </h2>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary-600">
          {selectedBookingType.details || "Details not available"}
        </p>
        <div className="mt-4 flex flex-col gap-2 border border-primary-200 p-4">
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
      <div className="text-center md:text-left">
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
    <aside className="border-8 border-b-0 border-white bg-white bg-opacity-90 backdrop-blur-md lg:rounded-l-2xl lg:rounded-tr-none lg:border-b-8 lg:border-r-0 lg:pr-4 sm:rounded-none">
      <div className="-mt-16 px-4 py-8 md:mt-0 lg:-mt-16 lg:px-6 xl:px-8">
        <div className="flex flex-col gap-8 pt-10">
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
