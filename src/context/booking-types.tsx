// context/booking-types.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getBookingTypes } from "@/services/bookingService";
import { BookingType } from "@/domain/bookingTypes";

const BookingTypesContext = createContext<{
  bookingTypes: BookingType[];
  loading: boolean;
  error: string | null;
}>({
  bookingTypes: [],
  loading: false,
  error: null,
});

export function BookingTypesProvider({ children }) {
  const [bookingTypes, setBookingTypes] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingTypes = async () => {
      try {
        setLoading(true);
        const businessId = "7dde79e9-cbe8-4a48-ae71-35a111937af1";

        // Fetch booking types via bookingService
        const bookingTypes = await getBookingTypes(businessId);

        setBookingTypes(bookingTypes);
      } catch (err) {
        console.error("Error fetching booking types:", err);
        setError("Failed to fetch booking types. Using fallback data.");
        setBookingTypes([]); // Fallback empty booking types
      } finally {
        setLoading(false);
      }
    };

    fetchBookingTypes();
  }, []);

  return (
    <BookingTypesContext.Provider value={{ bookingTypes, loading, error }}>
      {children}
    </BookingTypesContext.Provider>
  );
}

export function useBookingTypes() {
  const context = useContext(BookingTypesContext);
  if (!context) {
    throw new Error(
      "useBookingTypes must be used within a BookingTypesProvider"
    );
  }
  return context;
}
