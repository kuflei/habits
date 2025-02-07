import { createHttpClient } from "@/api/httpClient";
const httpClient = createHttpClient("/api");

export const login = (email: string, password: string) => {
  return httpClient.post("/login", { email, password });
};

export const logout = () => {
  return httpClient.post("/logout", {});
};
