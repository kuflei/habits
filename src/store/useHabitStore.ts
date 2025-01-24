import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
    toggleHabitProgress: (id: string, date: string) => void;
}
// set function to update state
// state current state
// we get current state and return new obj
export const useHabitStore = create(
    persist<HabitStore>(
        (set) => ({
            habits: [],

            fetchHabits: async (userId: string) => {
                try {
                    const query = queryString.stringify({ userId });
                    const url = `/habits?${query}`;
                    const habits = await httpClient.get<Habit[]>(url);
                    set({ habits });
                } catch (error) {
                    console.error('Error fetching habits:', error);
                }
            },

            addHabit: async (userId: string, habit: Habit) => {
                try {
                    const url = `/habits`;
                    const newHabit = await httpClient.post<Habit>(url, { userId, habit });
                    set((state) => ({
                        habits: [...state.habits, newHabit],
                    }));
                } catch (error) {
                    console.error('Error adding habit:', error);
                }
            },

            updateHabit: async (userId: string, updatedHabit: Habit) => {
                try {
                    const url = `/habits/${updatedHabit.id}`;
                    const updated = await httpClient.patch<Habit>(url, {
                        userId,
                        habit: updatedHabit,
                    });
                    set((state) => ({
                        habits: state.habits.map((habit) =>
                            habit.id === updated.id ? updated : habit
                        ),
                    }));
                } catch (error) {
                    console.error('Error updating habit:', error);
                }
            },

            deleteHabit: async (habitId: string, userId: string) => {
                try {
                    const query = queryString.stringify({ userId });
                    const url = `/habits/${habitId}?${query}`;
                    await httpClient.delete(url);
                    set((state) => ({
                        habits: state.habits.filter((habit) => habit.id !== habitId),
                    }));
                } catch (error) {
                    console.error('Error deleting habit:', error);
                }
            },

            toggleHabitProgress: (id: string, date: string) => {
                set((state) => {
                    const habit = state.habits.find((habit) => habit.id === id);

                    if (!habit) {
                        console.error('Habit not found for ID:', id);
                        return state;
                    }

                    const updatedProgress = {
                        ...habit.progress,
                        [date]: !habit.progress[date],
                    };

                    return {
                        habits: state.habits.map((habit) =>
                            habit.id === id ? { ...habit, progress: updatedProgress } : habit
                        ),
                    };
                });
            },
        }),
        { name: 'habit-storage' }
    )
);
