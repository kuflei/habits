import { useQuery, useMutation, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import {
  fetchHabits,
  fetchPaginationHabits,
  addHabit,
  updateHabit,
  deleteHabit,
  toggleHabitProgress,
} from "@/api/habits.api";
import { Habit } from "@/types/Habit";

export const useHabits = (userId: string) => {
  return useQuery({
    queryKey: ["habits", userId],
    queryFn: () => fetchHabits(userId),
  });
};
export const usePaginationHabits = (userId: string, page: number, perPage: number) => {
  return useQuery({
    queryKey: ["habits", userId, page, perPage],
    queryFn: () => fetchPaginationHabits(userId, page, perPage),
    placeholderData: keepPreviousData,
  });
};
export const useAddHabits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([userId, habit]: [string, Habit]) => addHabit(userId, habit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
    onError: (error) => {
      console.error("Error adding habit:", error);
    },
  });
};

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([userId, habit]: [string, Habit]) => updateHabit(userId, habit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([habitId, userId]: [string, string]) => deleteHabit(habitId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};
export const useToggleHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([userId, habitId, progress]: [string, string, Record<string, boolean>]) =>
      toggleHabitProgress(userId, habitId, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};
