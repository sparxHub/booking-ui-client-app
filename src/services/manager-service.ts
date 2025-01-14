import { serverRequest } from "@/api/server-adapter";
import { Manager } from "@/domain/managers";

/**
 * Fetch managers with optional filters.
 */
export const getManagers = async (
  params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    sortField?: string;
    sortAscending?: boolean;
    roles?: string[];
  }
): Promise<Manager[]> => {
  const response = await serverRequest<{ managers: Manager[] }>(
    "GET",
    "/memberapp/managers",
    params // Only pass optional filters; businessId is handled in serverRequest
  );

  if (response.status === 0) {
    return response.params?.managers || [];
  } else {
    throw new Error(response.message || "Failed to fetch managers");
  }
};
