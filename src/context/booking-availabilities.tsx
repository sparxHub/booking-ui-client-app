// context/booking-availabilities.tsx

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
    if (selectedBookingType) {
      const fetchBookings = async () => {
        try {
          setLoading(true);

          const typeId =
            selectedBookingType.sessionType === "personalSession"
              ? selectedBookingType.typeId
              : undefined;

          const bookings = await getBookings(
            new Date().toISOString(),
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            typeId
          );

          setBookings(bookings);
        } catch (err) {
          console.error("Error fetching bookings:", err);
          setError("Failed to fetch bookings. Using fallback data.");
          setBookings([]);
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    } else {
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
