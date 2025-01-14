"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // For extracting query params
import { getBookingTypes } from "@/services/booking-service";
import { BookingType } from "@/domain/bookingTypes";

const BookingTypesContext = createContext<{
  bookingTypes: BookingType[];
  selectedBookingType: BookingType | null;
  mode: "class" | "personal" | "all_classes";
  loading: boolean;
  error: string | null;
}>({
  bookingTypes: [],
  selectedBookingType: null,
  mode: "all_classes",
  loading: false,
  error: null,
});

export function BookingTypesProvider({ children }) {
  const [bookingTypes, setBookingTypes] = useState<BookingType[]>([]);
  const [selectedBookingType, setSelectedBookingType] = useState<BookingType | null>(null);
  const [mode, setMode] = useState<"class" | "personal" | "all_classes">("all_classes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchBookingTypes = async () => {
      try {
        setLoading(true);
        const businessId = "7dde79e9-cbe8-4a48-ae71-35a111937af1";

        // Fetch booking types via bookingService
        const bookingTypes = await getBookingTypes(businessId);
        setBookingTypes(bookingTypes);

        // Determine selected booking type and mode
        const typeId = searchParams.get("type");
        const selectedType = bookingTypes.find((type) => type.typeId === typeId) || null;

        setSelectedBookingType(selectedType);

        if (selectedType) {
          setMode(selectedType.sessionType === "personalSession" ? "personal" : "class");
        } else {
          setMode("all_classes");
        }
      } catch (err) {
        console.error("Error fetching booking types:", err);
        setError("Failed to fetch booking types. Using fallback data.");
        setBookingTypes([]); // Fallback empty booking types
        setSelectedBookingType(null);
        setMode("all_classes");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingTypes();
  }, [searchParams]); // Re-run when search params change

  return (
    <BookingTypesContext.Provider
      value={{ bookingTypes, selectedBookingType, mode, loading, error }}
    >
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
