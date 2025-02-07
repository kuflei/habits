import { createHttpClient } from "./httpClient.ts";

describe("httpClient", () => {
  const baseUrl = "https://test.com";
  const client = createHttpClient(baseUrl);
  const originalFetch = global.fetch;
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    jest.clearAllMocks();
  });
  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("Should make a GET request and return data", async () => {
    const expectedData = { data: "result" };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => expectedData,
    });

    const result = await client.get("/test-endpoint");

    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/test-endpoint`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    expect(result).toEqual(expectedData);
  });
  it("Should handle a 404 GET request", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => "404 not found",
    });
    await expect(client.get("/test-endpoint")).rejects.toThrow(
      "Error GET /test-endpoint",
    );
  });
  it("Should make a POST request successfully", async () => {
    const expectedData = { data: "result" };
    const payload = { key: "value" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => expectedData,
    });
    const result = await client.post("/test-endpoint", payload);
    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/test-endpoint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    expect(result).toEqual(expectedData);
  });
  it("Should failed POST request", async () => {
    const payload = { key: "value" };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => "Bad Request",
    });

    await expect(client.post("/test-endpoint", payload)).rejects.toThrow(
      "HTTP request failed: Error: Error POST /test-endpoint: 400 - Bad Request",
    );
  });
  it("should make a DELETE request successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await client.delete("/test-endpoint");

    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/test-endpoint`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  });

  it("should failed DELETE request", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => "Bad Request",
    });

    await expect(client.delete("/test-endpoint")).rejects.toThrow(
      "HTTP request failed: Error: Error DELETE /test-endpoint: 400 - Bad Request",
    );
  });
});
