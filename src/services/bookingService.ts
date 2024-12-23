import { serverRequest } from "@/api/serverAdapter";
import { Booking } from "@/domain/bookings";
import { BookingType } from "@/domain/bookingTypes";

/**
 * Fetch booking types for a given business ID.
 * Supports optional filters like managerId, sessionType, bookingTypeState, pagination, and sorting.
 */
export const getBookingTypes = async (
  businessId: string,
  options?: {
    managerId?: string;
    page?: number;
    pageSize?: number;
    search?: string;
    sortField?: string;
    sortAscending?: boolean;
    sessionType?: string;
    bookingTypeState?: string;
    typeIds?: string[];
  }
): Promise<BookingType[]> => {
  // Construct query parameters dynamically
  const queryParams: Record<string, any> = { businessId };

  if (options?.managerId) queryParams.managerId = options.managerId;
  if (options?.page) queryParams.page = options.page;
  if (options?.pageSize) queryParams.pageSize = options.pageSize;
  if (options?.search !== undefined) queryParams.search = options.search; // Allow empty string
  if (options?.sortField) queryParams.sortField = options.sortField;
  if (options?.sortAscending !== undefined)
    queryParams.sortAscending = options.sortAscending;
  if (options?.sessionType) queryParams.sessionType = options.sessionType;
  if (options?.bookingTypeState)
    queryParams.bookingTypeState = options.bookingTypeState;
  if (options?.typeIds && options.typeIds.length > 0)
    queryParams.typeIds = options.typeIds;

  const response = await serverRequest<{ bookingTypes: BookingType[] }>(
    "GET",
    "/memberapp/bookingTypes",
    queryParams
  );

  if (response.status === 0) {
    return response.params?.bookingTypes || [];
  } else {
    throw new Error(response.message || "Failed to fetch booking types");
  }
};

/**
 * Fetch bookings for a given business ID within a date range.
 * Supports optional bookingTypeId.
 */
export const getBookings = async (
  businessId: string,
  from: string,
  to: string,
  bookingTypeId?: string // Optional bookingTypeId
): Promise<Booking[]> => {
  // Construct query parameters dynamically
  const queryParams: Record<string, string> = {
    businessId,
    from,
    to,
  };

  if (bookingTypeId) {
    queryParams.bookingTypeId = bookingTypeId;
  }

  const response = await serverRequest<{ bookings: any[] }>(
    "GET",
    "/memberapp/bookings",
    queryParams
  );

  if (response.status === 0) {
    // Transform API response into Booking[]
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
