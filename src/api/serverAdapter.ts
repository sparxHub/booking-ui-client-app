import axios, { AxiosRequestConfig } from "axios";

// Define a custom API exception
export class ApiException extends Error {
  public status: number;
  public method: string;
  public url: string;

  constructor(status: number, message: string, method: string, url: string) {
    super(message);
    this.status = status;
    this.method = method;
    this.url = url;
  }
}

export interface ServerResponse<T> {
  status: number;
  message?: string;
  params?: T;
}

// Supported HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Base URL for your API
const BASE_URL = "http://localhost:3000/api";

// Generic API handler
export async function serverRequest<T>(
  method: HttpMethod,
  route: string,
  queryParams: Record<string, any> = {},
  body: Record<string, any> = {},
  customHeaders: Record<string, string> = {}
): Promise<ServerResponse<T>> {
  const url = `${BASE_URL}${route}`;

  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${process.env.JWT || ""}`,
      ...customHeaders,
    },
    params: queryParams,
    data: body,
  };

  try {
    const response = await axios(config);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new ApiException(response.status, "API Error", method, url);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new ApiException(
        error.response?.status || 500,
        error.message,
        method,
        url
      );
    }
    throw new ApiException(500, "Unknown error", method, url);
  }
}
