import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchHabits, fetchPaginationHabits } from "@/api/habits.api";

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
