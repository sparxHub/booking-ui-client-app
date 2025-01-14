"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getBookings } from "@/services/booking-service";
import { Booking } from "@/domain/bookings";
import { BookingType } from "@/domain/bookingTypes";

const BookingAvailabilitiesContext = createContext<{
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}>({
  bookings: [],
  loading: false,
  error: null,
});

export function BookingAvailabilitiesProvider({
  children,
  selectedBookingType,
}: {
  children: React.ReactNode;
  selectedBookingType: BookingType | null;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch bookings when `selectedBookingType` is defined
    if (selectedBookingType) {
      const fetchBookings = async () => {
        try {
          setLoading(true);
          const businessId = "7dde79e9-cbe8-4a48-ae71-35a111937af1";

          // Determine whether to filter by typeId (only for personal sessions)
          const typeId =
            selectedBookingType.sessionType === "personalSession"
              ? selectedBookingType.typeId
              : undefined;

          // Fetch bookings
          const bookings = await getBookings(
            businessId,
            new Date().toISOString(),
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Next 30 days
            typeId // Pass typeId only for personal sessions
          );

          setBookings(bookings);
        } catch (err) {
          console.error("Error fetching bookings:", err);
          setError("Failed to fetch bookings. Using fallback data.");
          setBookings([]); // Fallback empty bookings
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    } else {
      // Reset state when there is no `selectedBookingType`
      setBookings([]);
      setError(null);
      setLoading(false);
    }
  }, [selectedBookingType]);

  return (
    <BookingAvailabilitiesContext.Provider value={{ bookings, loading, error }}>
      {children}
    </BookingAvailabilitiesContext.Provider>
  );
}

export function useBookingAvailabilities() {
  const context = useContext(BookingAvailabilitiesContext);
  if (!context) {
    throw new Error(
      "useBookingAvailabilities must be used within a BookingAvailabilitiesProvider"
    );
  }
  return context;
}
