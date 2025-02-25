import { createHttpClient } from "@/api/httpClient";
import { Habit } from "@/types/Habit";

const httpClient = createHttpClient("/api");
const baseUrl = "/habits";

export const fetchHabits = async (userId: string): Promise<Habit[]> => {
  return httpClient.get<Habit[]>(`${baseUrl}`, { userId });
};
export const fetchPaginationHabits = async (
  userId: string,
  page: number,
  perPage: number,
): Promise<Habit[]> => {
  return httpClient.get<Habit[]>(`${baseUrl}?userId=${userId}&page=${page}&limit=${perPage}`);
};

export const addHabit = async (userId: string, habit: Habit): Promise<Habit> => {
  return httpClient.post<Habit>(`${baseUrl}`, { userId, habit });
};

export const updateHabit = async (userId: string, updatedHabit: Habit): Promise<Habit> => {
  return httpClient.patch<Habit>(`${baseUrl}/${updatedHabit.id}`, {
    userId,
    habit: updatedHabit,
  });
};

export const deleteHabit = async (habitId: string, userId: string): Promise<void> => {
  return httpClient.delete(`${baseUrl}/${habitId}`, { userId });
};

export const toggleHabitProgress = async (
  userId: string,
  habitId: string,
  progress: Record<string, boolean>,
): Promise<void> => {
  return httpClient.patch(`${baseUrl}/${habitId}`, {
    userId,
    habit: { progress },
  });
};
