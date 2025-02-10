import queryString from "query-string";

export const createHttpClient = (baseUrl: string) => {
  const request = async <T, P = Record<string, unknown>>(
    url: string,
    method: "GET" | "POST" | "PATCH" | "DELETE",
    payload?: P,
    queryParams?: Record<string, unknown>,
    headers: Record<string, string> = { "Content-Type": "application/json" },
  ): Promise<T> => {
    try {
      const query = queryParams ? `?${queryString.stringify(queryParams)}` : "";
      const options: RequestInit = {
        method,
        headers: {
          ...headers,
          "Content-Type": headers["Content-Type"] ?? "application/json",
        },
        ...(payload && { body: JSON.stringify(payload) }),
      };

      const response = await fetch(`${baseUrl}${url}${query}`, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${method} ${url}: ${response.status} - ${errorText}`);
      }

      return response.json();
    } catch (error) {
      throw new Error(`HTTP request failed: ${error}`);
    }
  };

  const httpMethod =
    <T, P = Record<string, unknown>>(method: "GET" | "POST" | "PATCH" | "DELETE") =>
    async (url: string, payload?: P, queryParams?: Record<string, unknown>): Promise<T> =>
      request<T, P>(url, method, payload, queryParams);

  return {
    get: (url: string, queryParams?: Record<string, unknown>) => httpMethod("GET")(url, undefined, queryParams),
    post: httpMethod("POST"),
    patch: httpMethod("PATCH"),
    delete: (url: string, queryParams?: Record<string, unknown>) => httpMethod("DELETE")(url, undefined, queryParams),
  };
};
