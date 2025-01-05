/**
 * Manager role enum for describing manager permissions.
 */
export type ManagerRole = "viewer" | "editor" | "instructor" | "admin";

/**
 * Gender enum for managers.
 */
export type Gender = "male" | "female" | "other";

/**
 * Manager domain model representing a manager entity.
 */
export interface Manager {
  managerId: string;
  businessId: string;
  firstName: string;
  lastName: string;
  roles: ManagerRole[];
  email: string;
  phoneNumber?: string;
  birthDate?: string; // ISO Date format
  gender: Gender;
  photo?: string; // URL to photo
  color?: number;
  createdAt: string; // ISO Date format
  updatedAt: string; // ISO Date format
}
