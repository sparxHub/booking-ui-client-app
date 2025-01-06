'use client';

import { useBookingTypes } from "@/context/booking-types";
import { Calendar } from "../../components/calendar";
import { TimePicker } from "../../components/time-picker";
import { TimezonePicker } from "../../components/timezone-picker";
import { useBookingAvailabilities } from "@/context/booking-availabilities";
import { useSelectedInstructor } from "@/context/selected-instructor";

export default function BookingPage() {
  const {
    selectedBookingType,
    mode,
    loading: loadingBookingTypes,
    error: errorBookingTypes,
  } = useBookingTypes();
  const { bookings } = useBookingAvailabilities();
  const { selectedInstructor } = useSelectedInstructor();

  // Filter bookings based on mode, selectedBookingType, and selectedInstructor
  const filteredBookings = bookings.filter((booking) => {
    const matchesMode =
      (mode === "personal" && booking.sessionType === "personalSession") ||
      (mode === "class" && booking.sessionType === "classSession") ||
      mode === "all_classes";

    const matchesType =
      !selectedBookingType || booking.typeId === selectedBookingType.typeId;

    const matchesInstructor =
      selectedInstructor === null || // No instructor filtering if "All" is selected
      booking.managerId === selectedInstructor;

    return matchesMode && matchesType && matchesInstructor;
  });

  if (loadingBookingTypes) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="mt-4 text-lg font-semibold text-primary-800">Loading...</p>
        </div>
      </div>
    );
  }

  if (errorBookingTypes) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold text-red-600">
          Error: {errorBookingTypes}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid h-full max-w-lg grid-rows-[auto,1fr] gap-8 md:max-w-none">
      <div className="mt-10 px-4 sm:px-8 xl:px-10">
        <h1 className="text-center text-2xl font-bold md:text-left">
          Select a Date & Time
        </h1>
      </div>
      <div className="grid min-h-0 md:grid-cols-[1fr,360px] md:divide-x lg:grid-cols-[1fr,40%] xl:grid-cols-[1fr,360px]">
        <div>
          <div className="px-6 sm:px-8 xl:px-10">
            {/* Pass filteredBookings as a prop to Calendar */}
            <Calendar bookings={filteredBookings} />
          </div>
          <div className="p-4 sm:p-8 xl:p-10">
            <TimezonePicker />
          </div>
        </div>
        <div className="min-h-0">
          <TimePicker bookings={filteredBookings} mode={mode} />
        </div>
      </div>
    </div>
  );
}
