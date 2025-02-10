import { generateDateRange } from "@/utils/date";
import { Habit } from "@/types/Habit";

export function getHabitDateRange(habit: Habit): string[] {
  const options = {
    start: habit.startDate,
    end: habit.endDate,
    frequency: habit.frequency,
  };
  return generateDateRange(options);
}
