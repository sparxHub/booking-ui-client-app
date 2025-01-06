"use client";

import cx from "classnames";
import { Avatar } from "./Avatar";

export function AvatarPicker({
  instructors,
  selectedInstructor,
  onSelect,
  title,
}: {
  instructors: {
    managerId: string | null;
    firstName: string;
    lastName: string;
    photo?: string;
  }[];
  selectedInstructor: string | null;
  onSelect: (id: string | null) => void;
  title: string;
}) {
  return (
    <div className="flex flex-col">
      {/* Title */}
      <h3 className="mb-4 text-lg font-semibold text-primary-600">{title}</h3>

      {/* Scrollable Container */}
      <div className="max-h-[300px] overflow-y-auto border border-primary-200 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4">
          {instructors.map((instructor) => (
            <button
              key={instructor.managerId || "all"}
              onClick={() => onSelect(instructor.managerId || null)}
              className={cx(
                "flex flex-col items-center text-center p-2 rounded-md border transition",
                selectedInstructor === instructor.managerId
                  ? "bg-primary-100 border-primary-500"
                  : "hover:bg-gray-100 border-transparent"
              )}
            >
              {/* Avatar */}
              <Avatar
                name={`${instructor.firstName} ${instructor.lastName}`}
                photo={instructor.photo}
              />

              {/* Name */}
              <div className="mt-2 text-sm font-medium max-w-[80px]">
                <p className="truncate">{instructor.firstName}</p>
                <p className="truncate">{instructor.lastName}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
