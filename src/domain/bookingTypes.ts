// domain/bookingTypes.ts

/**
 * Availability details for a booking type.
 */
export interface Availability {
  /** Day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday) */
  day: number;

  /** Start time of availability in minutes (e.g., 480 for 8:00 AM) */
  fromTime: number;

  /** End time of availability in minutes */
  toTime: number;

  /** ID of the manager handling this availability */
  managerId?: string;

  /** Start date when this availability begins (ISO format) */
  startDate: string;

  /** End date when this availability ends (ISO format) */
  endDate?: string;

  /** Recurring interval for the availability (e.g., weekly, monthly, none) */
  recurringInterval: string;

  /** Indicates whether the session is remote */
  isRemoteSession: boolean;
}

/**
 * BookingType domain model
 * Represents a type of booking (e.g., Yoga Class, Personal Training).
 */
export interface BookingType {
  /** Unique identifier for the booking type */
  typeId: string;

  /** Title or name of the booking type */
  title: string;

  /** Detailed description of the booking type */
  details: string;

  /** State of the booking type (active, inactive, deleted) */
  state: string;

  /** Session type (classSession or personalSession) */
  sessionType: string;

  /** List of availabilities for this booking type */
  availabilities: Availability[];

  /** Duration of each session in minutes */
  duration: number;

  /** Skip interval between consecutive slots in minutes */
  slotSkip: number;

  /** Maximum concurrent bookings allowed for this booking type */
  maxBookings: number;

  /** Timestamp for when the booking type was created */
  createdAt: string;

  /** Timestamp for when the booking type was last updated */
  updatedAt: string;
}
