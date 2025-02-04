import { createHttpClient } from "@/features/api/httpClient";
import { Habit } from "@/types/Habit";
import queryString from "query-string";

const httpClient = createHttpClient("/api");

export const fetchHabits = async (userId: string): Promise<Habit[]> => {
  const query = queryString.stringify({ userId });
  const url = `/habits?${query}`;
  return await httpClient.get<Habit[]>(url);
};

export const addHabit = async (
  userId: string,
  habit: Habit,
): Promise<Habit> => {
  const url = `/habits`;
  return await httpClient.post<Habit>(url, { userId, habit });
};

export const updateHabit = async (
  userId: string,
  updatedHabit: Habit,
): Promise<Habit> => {
  const url = `/habits/${updatedHabit.id}`;
  return await httpClient.patch<Habit>(url, { userId, habit: updatedHabit });
};

export const deleteHabit = async (
  habitId: string,
  userId: string,
): Promise<void> => {
  const query = queryString.stringify({ userId });
  const url = `/habits/${habitId}?${query}`;
  await httpClient.delete(url);
};

export const toggleHabitProgress = async (
  userId: string,
  habitId: string,
  progress: any,
): Promise<void> => {
  const url = `/habits/${habitId}`;
  await httpClient.patch(url, { userId, habit: { progress } });
};
