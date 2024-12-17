export interface Booking {
  _id: string;
  typeId: string;
  sessionType: string;
  startTime: string;
  duration: number;
  bookedMemberIds: string[];
}
