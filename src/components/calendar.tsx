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
import { BookingType } from "@/domain/bookingTypes";

export function Calendar({
  mode,
  selectedBookingType,
}: {
  mode: "personal" | "class" | "all_classes";
  selectedBookingType: BookingType | null;
}) {
  const { bookings } = useBookingAvailabilities();
  const { setSelectedDate } = useSelectedDate();
  const { theme } = useTheme();

  // Log mode and selectedBookingType for debugging
  console.log("Mode:", mode);
  console.log("Selected Booking Type:", selectedBookingType);

  // Filter bookings based on mode and selectedBookingType
  const filteredBookings =
    mode === "personal"
      ? bookings.filter((booking) => booking.typeId === selectedBookingType?._id)
      : mode === "class"
      ? bookings.filter((booking) => booking.typeId === selectedBookingType?._id)
      : bookings; // all_classes includes all bookings

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
                    bookings: filteredBookings,
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
function getCalendarCellClasses({
  date,
  isSelected,
  isDisabled,
  bookings,
  theme,
}) {
  // Working out which days have availability
  const hasAvailability = bookings.some((booking) =>
    isSameDay(parseDateTime(booking.startTime.split("T")[0]), date)
  );
  // Today's day
  const isCurrentDay = isToday(date, getLocalTimeZone());

  // Possible UI "states" of a calendar day:
  type Status =
    | "SELECTED"
    | "DISABLED"
    | "VACANCY"
    | "NO_VACANCY"
    | "TODAY_NO_VACANCY";

  // Function to work out in which "status" the day is
  const getStatus: () => Status = () => {
    if (isSelected) return "SELECTED";
    if (isDisabled) return "DISABLED";
    if (hasAvailability) return "VACANCY";
    return isCurrentDay ? "TODAY_NO_VACANCY" : "NO_VACANCY";
  };

  // Common classes for all calendar days
  const baseClasses =
    "relative mx-auto grid aspect-square w-16 sm:w-20 md:w-24 max-w-full place-items-center focus:outline-none";

  // Style variants for each possible UI "state"
  const statusClasses: Record<Status, string> = {
    SELECTED: `bg-primary-900 font-bold text-white bg-stripes rounded-md`,
    DISABLED: "pointer-events-none text-slate-300",
    VACANCY: `bg-primary-400 font-bold text-primary-200 hover:bg-primary-300 rounded-md`,
    NO_VACANCY: "text-slate-800 hover:bg-slate-100 rounded-md",
    TODAY_NO_VACANCY: `bg-primary-700 font-bold hover:bg-slate-100 hover:text-slate-800 rounded-md`,
  };

  // Mix all classes in a blender, serve with ice 🍹
  return cx(baseClasses, statusClasses[getStatus()]);
}
