export const createHttpClient = (baseUrl: string) => {
  const request = async <T, P = Record<string, unknown>>(
    url: string,
    method: "GET" | "POST" | "PATCH" | "DELETE",
    payload?: P,
    headers: Record<string, string> = { "Content-Type": "application/json" },
  ): Promise<T> => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          ...headers,
          "Content-Type": headers["Content-Type"] ?? "application/json",
        },
        ...(payload && { body: JSON.stringify(payload) }),
      };

      const response = await fetch(`${baseUrl}${url}`, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error ${method} ${url}: ${response.status} - ${errorText}`,
        );
      }

      return response.json();
    } catch (error) {
      throw new Error(`HTTP request failed: ${error}`);
    }
  };

  const httpMethod =
    <T, P = Record<string, unknown>>(method: "GET" | "POST" | "PATCH" | "DELETE") =>
    async (url: string, payload?: P): Promise<T> => request<T, P>(url, method, payload);

  return {
    get: httpMethod("GET"),
    post: httpMethod("POST"),
    patch: httpMethod("PATCH"),
    delete: httpMethod("DELETE"),
  };
};
