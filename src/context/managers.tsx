"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getManagers } from "@/services/managerService";
import { Manager } from "@/domain/managers";

const ManagersContext = createContext<{
  managers: Manager[];
  loading: boolean;
  error: string | null;
}>({
  managers: [],
  loading: false,
  error: null,
});

export function ManagersProvider({ children }: { children: React.ReactNode }) {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setLoading(true);
        const businessId = "7dde79e9-cbe8-4a48-ae71-35a111937af1"; // Replace with dynamic businessId if needed
        const fetchedManagers = await getManagers(businessId);
        setManagers(fetchedManagers);
      } catch (err) {
        console.error("Error fetching managers:", err);
        setError("Failed to fetch managers");
        setManagers([]); // Fallback to empty managers list
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  return (
    <ManagersContext.Provider value={{ managers, loading, error }}>
      {children}
    </ManagersContext.Provider>
  );
}

export function useManagers() {
  const context = useContext(ManagersContext);
  if (!context) {
    throw new Error("useManagers must be used within a ManagersProvider");
  }
  return context;
}
