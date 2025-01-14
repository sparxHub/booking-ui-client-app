import { serverRequest } from "@/api/serverAdapter";
import { Manager } from "@/domain/managers";

/**
 * Fetch managers for a given business ID and optional filters.
 */
export const getManagers = async (
  businessId: string,
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
    { businessId, ...params }
  );

  if (response.status === 0) {
    return response.params?.managers || [];
  } else {
    throw new Error(response.message || "Failed to fetch managers");
  }
};
