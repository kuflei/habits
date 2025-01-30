import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import queryString from 'query-string';
import { Habit } from '@/types/Habit';
import {createHttpClient} from "@/features/api/httpClient";
const httpClient = createHttpClient('/api');

interface HabitStore {
    habits: Habit[];
    fetchHabits: (userId: string) => Promise<void>;
    addHabit: (userId: string, habit: Habit) => Promise<void>;
    updateHabit: (userId: string, updatedHabit: Habit) => Promise<void>;
    deleteHabit: (userId: string, id: string) => Promise<void>;
    toggleHabitProgress: (userId: string, id: string, date: string) => Promise<void>;
}
// set function to update state
// state current state
// we get current state and return new obj

export const useHabitStore = create(
    persist<HabitStore>(
        (set, get) => ({
            habits: [],
            userId: null,

            fetchHabits: async (userId: string) => {
                try {
                    const query = queryString.stringify({ userId });
                    const url = `/habits?${query}`;
                    const habits = await httpClient.get<Habit[]>(url);

                    console.log("Fetched habits from API:", habits);
                    set((state) => {
                        const updatedState = { ...state, habits, userId };

                        localStorage.setItem(`habits-${userId}`, JSON.stringify(habits));

                        return updatedState;
                    });
                } catch (error) {
                    console.error("Error fetching habits:", error);
                }
            },

            addHabit: async (userId: string, habit: Habit) => {
                try {
                    const url = `/habits`;
                    const newHabit = await httpClient.post<Habit>(url, { userId, habit });

                    set((state) => {
                        const updatedHabits = [...state.habits, newHabit];

                        localStorage.setItem(`habits-${userId}`, JSON.stringify(updatedHabits));

                        return { habits: updatedHabits };
                    });
                } catch (error) {
                    console.error("Error adding habit:", error);
                }
            },


            updateHabit: async (userId: string, updatedHabit: Habit) => {
                try {
                    const url = `/habits/${updatedHabit.id}`;
                    const updated = await httpClient.patch<Habit>(url, {
                        userId,
                        habit: updatedHabit,
                    });

                    set((state) => {
                        const updatedHabits = state.habits.map((habit) =>
                            habit.id === updated.id ? updated : habit
                        );

                        localStorage.setItem(`habits-${userId}`, JSON.stringify(updatedHabits));

                        return { habits: updatedHabits };
                    });
                } catch (error) {
                    console.error("Error updating habit:", error);
                }
            },


            deleteHabit: async (habitId: string, userId: string) => {
                try {
                    const query = queryString.stringify({ userId });
                    const url = `/habits/${habitId}?${query}`;
                    await httpClient.delete(url);

                    set((state) => {
                        const updatedHabits = state.habits.filter((habit) => habit.id !== habitId);

                        localStorage.setItem(`habits-${userId}`, JSON.stringify(updatedHabits));

                        return { habits: updatedHabits };
                    });
                } catch (error) {
                    console.error("Error deleting habit:", error);
                }
            },

            toggleHabitProgress: async (userId: string, habitId: string, date: string) => {
                set((state) => {
                    const habitIndex = state.habits.findIndex((habit) => habit.id === habitId);

                    if (habitIndex === -1) {
                        console.error("Habit not found for ID:", habitId);
                        return state;
                    }

                    const updatedHabits = [...state.habits];
                    const habit = updatedHabits[habitIndex];

                    habit.progress = habit.progress || {};

                    habit.progress[date] = !habit.progress[date];

                    return { habits: updatedHabits };
                });

                try {
                    const updatedHabit = get().habits.find((h) => h.id === habitId);
                    if (!updatedHabit) return;

                    const url = `/habits/${habitId}`;
                    await httpClient.patch(url, {
                        userId,
                        habit: { progress: updatedHabit.progress },
                    });

                } catch (error) {
                    console.error("Error updating progress:", error);
                }
            },

        }),
        {
            name: "habit-storage",
            storage: createJSONStorage(() => window.localStorage),
            onRehydrateStorage: (state) => {
                console.log("Rehydrated state from localStorage:", state);
            },
        }
    )
);
