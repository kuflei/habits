import { useQuery } from "@tanstack/react-query";
import { fetchHabits } from "@/api/habits.api";

export const useHabits = (userId: string, page: number, perPage: number) => {
  return useQuery({
    queryKey: ["habits", userId, page, perPage],
    queryFn: () => fetchHabits(userId, page, perPage),
    placeholderData: (previousData) => previousData,
  });
};
