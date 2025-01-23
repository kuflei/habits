import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types/Habit';
import {apiRequests, addData, updateData, deleteData} from "../features/api/apiRequests";


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
        (set, get) => ({
            habits: [],
            fetchHabits: async (userId: string) => {
                if (!userId) {
                    console.error('No userId provided to fetchHabits');
                    set({ habits: [] });
                    return;
                }
                const url = `/api/habits?userId=${userId}`;
                await apiRequests(url, set, {
                    onSuccess: (data) => set({ habits: data }),
                    onError: (error) => console.error('Error fetching habits:', error),
                });
            },
            addHabit: async (habit, userId) => {
                const url = '/api/habits';
                const payload = { userId, habit };

                await addData(url, payload, set, {
                    onSuccess: (newHabit) =>
                        set((state) => ({
                            habits: [...state.habits, newHabit],
                        })),
                    onError: (error) => console.error('Error adding habit:', error),
                });
            },
            updateHabit: async (updatedHabit: Habit, userId: string) => {
                const url = `/api/habits/${updatedHabit.id}`;
                const payload = { userId, habit: updatedHabit };

                await updateData(url, payload, set, {
                    onSuccess: (updated: Habit) =>
                        set((state) => ({
                            habits: state.habits.map((habit) =>
                                habit.id === updated.id ? updated : habit
                            ),
                        })),
                    onError: (error) => console.error('Error updating habit:', error),
                });
            },

            deleteHabit: async (id, userId) => {
                const url = `/api/habits/${id}?userId=${userId}`;

                await deleteData(url, set, {
                    filterState: (state) => ({
                        ...state,
                        habits: state.habits.filter((habit) => habit.id !== id),
                    }),
                    onError: (error) => console.error('Error deleting habit:', error),
                });
            },

            toggleHabitProgress: async (id, date) => {
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
