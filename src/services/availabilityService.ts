import { serverRequest } from "@/api/serverAdapter";
import { Booking } from "@/domain/bookings";

export const getBookings = async (
  businessId: string,
  from: string,
  to: string
): Promise<Booking[]> => {
  const response = await serverRequest<{ bookings: Booking[] }>(
    "GET",
    "/memberapp/bookings",
    { businessId, from, to }
  );

  if (response.status === 0) {
    return response.params?.bookings || [];
  } else {
    throw new Error(response.message || "Failed to fetch bookings");
  }
};
