"use client";

import {
  Button,
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
} from "react-aria-components";
import {
  isSameDay,
  parseDateTime,
  isToday,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import cx from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import { useBookingAvailabilities } from "@/context/booking-availabilities";
import { useSelectedDate } from "@/context/selected-date";
import { useTheme } from "@/context/theme";
import { useEffect, useState } from "react";
import { Booking } from "@/domain/bookings"; // Import Booking type

export function Calendar({ mode, selectedBookingType }) {
  const { bookings } = useBookingAvailabilities();
  const { setSelectedDate } = useSelectedDate();
  const { theme } = useTheme();

  // State to hold filtered bookings with explicit type annotation
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Filter bookings based on mode or selectedBookingType
    const filter = bookings.filter((booking) => {
      console.log("booking:", booking);
      console.log("selectedBookingType:", selectedBookingType);

      if (mode === "personal") {
        return (
          booking.typeId === selectedBookingType?.typeId 
        );
      } else if (mode === "class") {
        return (
          booking.typeId === selectedBookingType?.typeId 
        );
      }

      return true; // Show all bookings for "all_classes"
    });

    console.log("Filtered Bookings Updated:", filter);
    setFilteredBookings(filter);
  }, [bookings, mode, selectedBookingType]);

  return (
    <AriaCalendar
      aria-label="Booking availabilities"
      onChange={setSelectedDate}
      minValue={today(getLocalTimeZone())}
      maxValue={today(getLocalTimeZone()).add({ months: 6 })}
    >
      <header className="flex items-center justify-between">
        <Heading className="text-lg font-semibold text-primary-800" />
        <MonthsNavigation theme={theme} />
      </header>

      {/* HTML Table */}
      <CalendarGrid
        className="mt-4 w-full table-fixed border-separate border-spacing-2"
        weekdayStyle="long"
      >
        <>
          {/* Header row (week days) */}
          <CalendarGridHeader>
            {(day) => (
              <CalendarHeaderCell className="pb-4">
                <abbr
                  className="cursor-help text-sm font-semibold uppercase tracking-wider text-primary-600 no-underline"
                  title={day}
                >
                  {day.slice(0, 3)}
                </abbr>
              </CalendarHeaderCell>
            )}
          </CalendarGridHeader>

          {/* Body rows (dates) */}
          <CalendarGridBody>
            {(date) => (
              <CalendarCell
                date={date}
                className={({ isSelected, isDisabled }) =>
                  getCalendarCellClasses({
                    date,
                    isSelected,
                    isDisabled,
                    bookings: bookings,
                    theme,
                  })
                }
              >
                {({ isSelected, formattedDate }) => (
                  <>
                    <span>{formattedDate}</span>
                    {isToday(date, getLocalTimeZone()) && (
                      <span
                        className={cx(
                          "absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                          isSelected ? "bg-white" : "bg-primary-500"
                        )}
                      ></span>
                    )}
                  </>
                )}
              </CalendarCell>
            )}
          </CalendarGridBody>
        </>
      </CalendarGrid>
    </AriaCalendar>
  );
}

// ----------------------------
// Months navigation
// ----------------------------
function MonthsNavigation({ theme }) {
  const monthNavigationButtonClasses = cx(
    "grid aspect-square w-12 max-w-full place-items-center rounded-full",
    "border text-primary-700 hover:text-primary-900 focus:outline-none",
    `border-primary-300 hover:border-primary-500 focus:ring focus:ring-primary-300 focus:ring-offset-1`
  );

  return (
    <div className="flex gap-2">
      <Button slot="previous" className={monthNavigationButtonClasses}>
        <ChevronLeftIcon className="-ml-0.5 h-6 w-6" />
      </Button>
      <Button slot="next" className={monthNavigationButtonClasses}>
        <ChevronRightIcon className="ml-0.5 h-6 w-6" />
      </Button>
    </div>
  );
}

// ----------------------------
// Calendar cell styles
// ----------------------------
function getCalendarCellClasses({ date, isSelected, isDisabled, bookings, theme }) {
  const hasAvailability = bookings.some((booking) => {
    const bookingDate = parseDateTime(booking.startTime.split("T")[0]);
    const isSame = isSameDay(date, bookingDate);

    // console.log(
    //   `Checking Booking: ${booking._id}, Booking Date: ${bookingDate}, Cell Date: ${date}, Match: ${isSame}`
    // );

    return isSame;
  });

  const isCurrentDay = isToday(date, getLocalTimeZone());

  const getStatus = () => {
    if (isSelected) return "SELECTED";
    if (isDisabled) return "DISABLED";
    if (hasAvailability) return "VACANCY";
    return isCurrentDay ? "TODAY_NO_VACANCY" : "NO_VACANCY";
  };

  const baseClasses =
    "relative mx-auto grid aspect-square w-16 sm:w-20 md:w-24 max-w-full place-items-center focus:outline-none";

  const statusClasses = {
    SELECTED: "bg-primary-900 font-bold text-white bg-stripes rounded-md",
    DISABLED: "pointer-events-none text-slate-300",
    VACANCY: "bg-primary-400 font-bold text-primary-200 hover:bg-primary-300 rounded-md",
    NO_VACANCY: "text-slate-800 hover:bg-slate-100 rounded-md",
    TODAY_NO_VACANCY: "bg-primary-700 font-bold hover:bg-slate-100 hover:text-slate-800 rounded-md",
  };

  // console.log("Status for date:", date.toString(), getStatus());
  return cx(baseClasses, statusClasses[getStatus()]);
}
