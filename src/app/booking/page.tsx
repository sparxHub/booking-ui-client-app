'use client';

import { useBookingTypes } from "@/context/booking-types";
import { Calendar } from "../../components/calendar";
import { TimePicker } from "../../components/time-picker";
import { TimezonePicker } from "../../components/timezone-picker";

export default function BookingPage() {
  const { 
    bookingTypes,
    selectedBookingType,
    mode, 
    loading: loadingBookingTypes, 
    error: errorBookingTypes 
  } = useBookingTypes();

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
        <p>Mode: {mode}</p>
        {mode === 'all_classes' && <div>Displaying all available classes...</div>}
        {mode === 'class' && <div>Displaying class session details...</div>}
        {mode === 'personal' && <div>Displaying personal session details...</div>}
        <h1 className="text-center text-2xl font-bold md:text-left">
          Select a Date & Time
        </h1>
      </div>
      <div className="grid min-h-0 md:grid-cols-[1fr,360px] md:divide-x lg:grid-cols-[1fr,40%] xl:grid-cols-[1fr,360px]">
        <div>
          <div className="px-6 sm:px-8 xl:px-10">
            <Calendar mode={mode} selectedBookingType={selectedBookingType} />
          </div>
          <div className="p-4 sm:p-8 xl:p-10">
            <TimezonePicker />
          </div>
        </div>
        <div className="min-h-0">
          <TimePicker />
        </div>
      </div>
    </div>
  );
}
