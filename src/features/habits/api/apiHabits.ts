import { createHttpClient } from "@/features/api/httpClient";
import { Habit } from "@/types/Habit";
import queryString from "query-string"; /*TODO: move query-string to httpClient*/

const httpClient = createHttpClient("/api");
const baseUrl = "/habits";

export const fetchHabits = async (userId: string): Promise<Habit[]> => {
  const query = queryString.stringify({ userId });
  const url = `${baseUrl}?${query}`;
  return await httpClient.get<Habit[]>(url);
};

export const addHabit = async (
  userId: string,
  habit: Habit,
): Promise<Habit> => {
  const url = `${baseUrl}`;
  return await httpClient.post<Habit>(url, { userId, habit });
};

export const updateHabit = async (
  userId: string,
  updatedHabit: Habit,
): Promise<Habit> => {
  const url = `${baseUrl}/${updatedHabit.id}`;
  return await httpClient.patch<Habit>(url, { userId, habit: updatedHabit });
};

export const deleteHabit = async (
  habitId: string,
  userId: string,
): Promise<void> => {
  const query = queryString.stringify({ userId });
  const url = `${baseUrl}/${habitId}?${query}`;
  await httpClient.delete(url);
};

export const toggleHabitProgress = async (
  userId: string,
  habitId: string,
  progress: Record<string, boolean>,
): Promise<void> => {
  const url = `${baseUrl}/${habitId}`;
  await httpClient.patch(url, { userId, habit: { progress } });
};
