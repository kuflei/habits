import { createHttpClient } from "@/features/api/httpClient";
const httpClient = createHttpClient('/api');

export const login = async (email: string, password: string) => {
    return await httpClient.post(`/login`, { email, password });
};

export const logout = async () => {
    return await httpClient.post(`/logout`, {});
};