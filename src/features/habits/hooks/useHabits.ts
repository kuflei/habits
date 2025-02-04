import { useEffect } from "react";
import { useHabitStore } from "@/store/useHabitStore";

export const useHabits = (userId: string | null) => {
  const habits = useHabitStore((state) => state.habits);
  const fetchHabits = useHabitStore((state) => state.fetchHabits);
  const setHabits = useHabitStore.setState;

  useEffect(() => {
    if (!userId) {
      console.error("No userId provided");
      return;
    }

    const storedHabits = JSON.parse(
      localStorage.getItem(`habits-${userId}`) || "[]",
    );

    if (storedHabits.length > 0) {
      setHabits({ habits: storedHabits });
    } else {
      fetchHabits(userId);
    }
  }, [userId, fetchHabits]);

  return habits;
};
