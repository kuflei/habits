import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Habit } from "@/types/Habit";
import * as api from "@/api/habits.api";
import { saveHabits } from "@/features/habits/storage/storageHabits";

interface HabitStore {
  habits: Habit[];
  userId: string | null;
  fetchHabits: (userId: string) => Promise<void>;
  addHabit: (userId: string, habit: Habit) => Promise<void>;
  updateHabit: (userId: string, updatedHabit: Habit) => Promise<void>;
  deleteHabit: (userId: string, id: string) => Promise<void>;
  toggleHabitProgress: (userId: string, id: string, date: string) => Promise<void>;
}

export const useHabitStore = create(
  persist<HabitStore>(
    (set, get) => ({
      habits: [],
      userId: null,

      fetchHabits: async (userId: string) => {
        try {
          const habits = await api.fetchHabits(userId);
          set((state) => {
            const updatedState = { ...state, habits, userId };
            saveHabits(userId, habits);
            return updatedState;
          });
        } catch (error) {
          console.error("Error fetching habits:", error);
        }
      },

      addHabit: async (userId: string, habit: Habit) => {
        try {
          const newHabit = await api.addHabit(userId, habit);
          set((state) => {
            const updatedHabits = [...state.habits, newHabit];
            saveHabits(userId, updatedHabits);
            return { habits: updatedHabits };
          });
        } catch (error) {
          console.error("Error adding habit:", error);
        }
      },

      updateHabit: async (userId: string, updatedHabit: Habit) => {
        try {
          const updated = await api.updateHabit(userId, updatedHabit);
          set((state) => {
            const updatedHabits = state.habits.map((habit) =>
              habit.id === updated.id ? updated : habit,
            );
            saveHabits(userId, updatedHabits);
            return { habits: updatedHabits };
          });
        } catch (error) {
          console.error("Error updating habit:", error);
        }
      },

      deleteHabit: async (habitId: string, userId: string) => {
        try {
          await api.deleteHabit(habitId, userId);
          set((state) => {
            const updatedHabits = state.habits.filter((habit) => habit.id !== habitId);
            saveHabits(userId, updatedHabits);
            return { habits: updatedHabits };
          });
        } catch (error) {
          console.error("Error deleting habit:", error);
        }
      },

      toggleHabitProgress: async (userId: string, habitId: string, date: string) => {
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === habitId
              ? {
                  ...habit,
                  progress: {
                    ...habit.progress,
                    [date]: !habit.progress?.[date],
                  },
                }
              : habit,
          ),
        }));

        try {
          const updatedHabit = get().habits.find((h) => h.id === habitId);
          if (!updatedHabit) return;
          await api.toggleHabitProgress(userId, habitId, updatedHabit.progress);
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      },
    }),
    {
      name: "habit-storage",
    },
  ),
);
