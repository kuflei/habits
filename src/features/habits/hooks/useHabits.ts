import { useQuery, useMutation, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { fetchHabits, fetchPaginationHabits, addHabit } from "@/api/habits.api";
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
    mutationFn: (params: { userId: string, habit: Habit }) => addHabit(params.userId, params.habit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
    onError: (error) => {
      console.error("Error adding habit:", error);
    },
  });
};
