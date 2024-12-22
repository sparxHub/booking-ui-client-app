// bookingService.ts
import { serverRequest } from "@/api/serverAdapter";
import { Booking } from "@/domain/bookings";
import { BookingType } from "@/domain/bookingTypes";

/**
 * Fetch booking types for a given business ID.
 */
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

/**
 * Fetch bookings for a given business ID within a date range.
 */
export const getBookings = async (
  businessId: string,
  from: string,
  to: string
): Promise<Booking[]> => {
  const response = await serverRequest<{ bookings: any[] }>(
    "GET",
    "/memberapp/bookings",
    { businessId, from, to }
  );

  if (response.status === 0) {
    // Transform response to Booking[]
    return response.params?.bookings.map((booking) => ({
      _id: booking._id,
      bookingId: booking.bookingId,
      businessId: booking.businessId,
      typeId: booking.typeId,
      managerId: booking.managerId,
      sessionType: booking.sessionType,
      startTime: booking.startTime,
      duration: booking.duration,
      maxBookings: booking.maxBookings ?? null,
      bookedMemberIds: booking.bookedMemberIds,
      waitingMemberIds: booking.waitingMemberIds,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      remoteSession: booking.remoteSession,
    })) || [];
  } else {
    throw new Error(response.message || "Failed to fetch bookings");
  }
};
