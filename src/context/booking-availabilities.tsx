"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { serverRequest } from "@/api/serverAdapter"; // Import the generic API handler
import { Availability } from "@/utils/generate-booking-availabilities";
import { generateBookingAvailabilities } from "@/utils/generate-booking-availabilities";

const BookingAvailabilitiesContext = createContext<{
  bookingAvailabilities: Availability[];
  loading: boolean;
  error: string | null;
}>({
  bookingAvailabilities: [],
  loading: false,
  error: null,
});

export function BookingAvailabilitiesProvider({ children }) {
  const [bookingAvailabilities, setBookingAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingAvailabilities = async () => {
      try {
        setLoading(true);
        const businessId = "7dde79e9-cbe8-4a48-ae71-35a111937af1";
        
        // Fetch booking types
        const response = await serverRequest<{ bookings: any[] }>(
          "GET",
          "/memberapp/bookings",
          {
            from: new Date().toISOString(),
            to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Next 30 days
            businessId,
          }
        );

        // Transform API response into Availability[] format
        if (response.status === 0 && response.params?.bookings) {
          const transformedAvailabilities = response.params.bookings.map((booking) => ({
            startTime: booking.startTime,
            endTime: new Date(new Date(booking.startTime).getTime() + booking.duration * 60000).toISOString(),
          }));
          setBookingAvailabilities(transformedAvailabilities);
        } else {
          throw new Error(response.message || "Failed to fetch bookings");
        }
      } catch (err) {
        console.error("Error fetching availabilities:", err);
        setError("Failed to fetch booking availabilities. Using fallback data.");
        setBookingAvailabilities(generateBookingAvailabilities()); // Fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchBookingAvailabilities();
  }, []);

  return (
    <BookingAvailabilitiesContext.Provider
      value={{ bookingAvailabilities, loading, error }}
    >
      {children}
    </BookingAvailabilitiesContext.Provider>
  );
}

export function useBookingAvailabilities() {
  const context = useContext(BookingAvailabilitiesContext);
  if (context === undefined) {
    throw new Error(
      "useBookingAvailabilities must be used within a BookingAvailabilitiesProvider"
    );
  }
  return context;
}
