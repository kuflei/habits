import { useQuery } from "@tanstack/react-query";
import { fetchHabits } from "@/api/habits.api";

export const useHabits = (userId: string) => {
  return useQuery({
    queryKey: ["habits", userId],
    queryFn: () => fetchHabits(userId),
  });
};
