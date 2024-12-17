export interface Availability {
  day: number;
  fromTime: number;
  toTime: number;
  startDate: string;
  recurringInterval: string;
}

export interface BookingType {
  _id: string;
  title: string;
  details: string;
  duration: number;
  sessionType: string;
  availabilities: Availability[];
}
