// domain/bookings.ts

/**
 * Booking domain model
 * Represents a single booking with relevant details.
 */
export interface Booking {
  /** Unique identifier for the booking */
  _id: string;

  /** Unique ID for the booking */
  bookingId: string;

  /** Reference to the business ID */
  businessId: string;

  /** Reference to the booking type */
  typeId: string;

  /** ID of the manager (instructor) for the booking */
  managerId: string;

  /** Type of session: classSession or personalSession */
  sessionType: string;

  /** Start time of the booking in ISO format */
  startTime: string;

  /** Duration of the booking in minutes */
  duration: number;

  /** Maximum number of concurrent bookings allowed */
  maxBookings: number | null;

  /** List of member IDs who have confirmed the booking */
  bookedMemberIds: string[] | null;

  /** List of member IDs who are on the waiting list */
  waitingMemberIds: string[] | null;

  /** Remote session details */
  remoteSession: {
    /** Whether the session is a remote session */
    isEnabled: boolean;

    /** Optional: Vendor name for remote session (Zoom, Google Meet, etc.) */
    vendor?: string;

    /** Optional: Meeting ID for the remote session */
    meetingId?: string;

    /** Optional: Join URL for participants */
    joinUrl?: string;

    /** Optional: Admin URL for the instructor/manager */
    adminUrl?: string;
  };

  /** Timestamp for when the booking was created */
  createdAt: string;

  /** Timestamp for when the booking was last updated */
  updatedAt: string;

  /** Optional comment associated with the booking */
  comment?: string;
}
