import { serverRequest } from "@/api/serverAdapter";
import { BookingType } from "@/domain/bookingTypes";

export const getBookingTypes = async (businessId: string): Promise<BookingType[]> => {
  const response = await serverRequest<{ bookingTypes: BookingType[] }>(
    "GET",
    "/memberapp/bookingTypes",
    { businessId }
  );

  if (response.status === 0) {
    return response.params?.bookingTypes || [];
  } else {
    throw new Error(response.message || "Failed to fetch booking types");
  }
};
