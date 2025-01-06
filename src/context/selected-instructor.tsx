"use client";

import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export const SelectedInstructorContext = createContext<{
  selectedInstructor: string | null;
  setSelectedInstructor: Dispatch<SetStateAction<string | null>>;
}>({
  selectedInstructor: null,
  setSelectedInstructor: () => {},
});

export function SelectedInstructorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
    null
  );

  return (
    <SelectedInstructorContext.Provider
      value={{ selectedInstructor, setSelectedInstructor }}
    >
      {children}
    </SelectedInstructorContext.Provider>
  );
}

export function useSelectedInstructor() {
  const context = useContext(SelectedInstructorContext);
  if (!context) {
    throw new Error(
      "useSelectedInstructor must be used within a SelectedInstructorProvider"
    );
  }
  return context;
}
