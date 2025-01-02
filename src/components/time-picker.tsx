"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import cx from "classnames";
import { useDateFormatter } from "react-aria";
import {
  getLocalTimeZone,
  isSameDay,
  parseDateTime,
} from "@internationalized/date";

import { useSelectedDate } from "@/context/selected-date";
import { Booking } from "@/domain/bookings";

export function TimePicker({
  bookings,
  mode,
}: {
  bookings: Booking[];
  mode: "class" | "personal" | "all_classes";
}) {
  const { selectedDate } = useSelectedDate();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const formatter = useDateFormatter({ dateStyle: "full" });

  const availabilities = bookings.filter((booking) =>
    isSameDay(parseDateTime(booking.startTime.split("T")[0]), selectedDate)
  );
  const hasAvailability = availabilities.length > 0;

  return (
    <div className="relative grid h-full grid-rows-[auto,1fr] overflow-hidden px-4 sm:px-8 lg:px-6 xl:px-10">
      <div className="flex h-12 items-center justify-center md:justify-start">
        <h2 className="text-lg font-semibold">
          {formatter.format(selectedDate.toDate(getLocalTimeZone()))}
        </h2>
      </div>

      <div className="-mx-4 mt-4 overflow-y-auto px-4">
  <div className="relative">
    {hasAvailability ? (
      <ul className="space-y-2 pt-2 sm:pb-8 md:pb-40">
        {availabilities.map((availability) => (
          <TimeSlot
            key={availability.startTime}
            availability={availability}
            mode={mode}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        ))}
      </ul>
    ) : (
      <div className="relative">
        {/* Add blur effect here */}
        <ul
          className="space-y-2 py-2 blur-sm"
          style={{
            backdropFilter: "blur(4px)", // Apply blur effect
            WebkitBackdropFilter: "blur(4px)", // Safari compatibility
          }}
          aria-hidden="true"
        >
          {["8:00 AM", "9:00 AM", "2:00 PM", "4:00 PM"].map((time) => (
            <li
              key={time}
              className="rounded-lg bg-primary-100 px-5 py-3 text-center font-semibold text-primary-700 opacity-40
              [@supports_not_(backdrop-filter:blur(0))]:line-through [@supports_not_(backdrop-filter:blur(0))]:opacity-20"
            >
              {time}
            </li>
          ))}
        </ul>
        {/* Fallback text */}
        <p className="mt-2 pb-4 text-center text-sm text-slate-500 sm:pb-8">
          No booking availabilities on this day.
        </p>
      </div>
    )}
  </div>
</div>
    </div>
  );
}

// ------------------------------
// TimeSlot Component
// ------------------------------
function TimeSlot({
  availability,
  selectedTime,
  setSelectedTime,
  mode,
}: {
  availability: Booking;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  mode: "class" | "personal" | "all_classes";
}) {
  const router = useRouter();
  const timeFormatter = useDateFormatter({ timeStyle: "short" });
  const isSelected = selectedTime === availability.startTime;

  const bookedCount = availability.bookedMemberIds?.length ?? 0;
  const maxBookings = availability.maxBookings || 1;
  const availableSeats = maxBookings - bookedCount;
  const availabilityRate = bookedCount / maxBookings;

  const seatColor =
    availabilityRate <= 0.3
      ? "text-red-600"
      : availabilityRate <= 0.5
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <li
      className={cx(
        "relative flex flex-col items-center justify-between rounded-lg border px-4 py-3 transition-all cursor-pointer",
        isSelected ? "bg-primary-600 text-white" : "bg-white"
      )}
      onClick={() => setSelectedTime(availability.startTime)}
    >
      <div className="flex w-full justify-between items-center">
        {mode === "all_classes" ? (
          <span
            className="max-w-[75%] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold"
            title={availability.typeId}
          >
            {availability.typeId}
          </span>
        ) : (
          <span className="text-lg font-semibold">
            {timeFormatter.format(new Date(availability.startTime))}
          </span>
        )}

        {mode === "all_classes" && (
          <span
            className="max-w-[25%] text-right overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500"
            title={availability.managerId}
          >
            {availability.managerId || "N/A"}
          </span>
        )}
      </div>

      {mode === "class" || mode === "all_classes" ? (
        <div className="mt-1 flex w-full justify-between text-sm">
          <span
            className={cx("overflow-hidden text-ellipsis whitespace-nowrap", seatColor)}
            title={`${availableSeats} seats available`}
            style={{ maxWidth: "50%" }}
          >
            {availableSeats} seats available
          </span>
          {mode === "all_classes" && (
            <span
              className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap text-sm"
              style={{ maxWidth: "50%" }}
              title={availability.managerId}
            >
              {availability.managerId || "N/A"}
            </span>
          )}
        </div>
      ) : null}

      {isSelected && (
        <div className="mt-3 flex w-full justify-between">
          <button
            className="w-full rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
            onClick={() =>
              router.push(
                `/booking/booking-details?time=${availability.startTime}`
              )
            }
          >
            Confirm
          </button>
        </div>
      )}
    </li>
  );
}
