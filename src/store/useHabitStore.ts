import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types/Habit';

interface HabitStore {
    habits: Habit[];
    addHabit: (habit: Habit) => void;
    updateHabit: (updatedHabit: Habit) => void;
    deleteHabit: (id: string) => void;
    toggleHabitProgress: (id: string, date: string) => void;
    rewardsList: string[];
    setRewardsList: (rewards: string[]) => void;
}
// set function to update state
// state current state
// we get current state and return new obj
export const useHabitStore = create(
    persist<HabitStore>(
        (set) => ({
            habits: [],
            rewardsList: [],
            setRewardsList: (rewards) => set({ rewardsList: rewards }),

            addHabit: (habit) =>
                set((state) => ({
                    habits: [...state.habits, habit],
                })),

            updateHabit: (updatedHabit) =>
                set((state) => ({
                    habits: state.habits.map((habit) =>
                        habit.id === updatedHabit.id ? updatedHabit : habit
                    ),
                })),

            deleteHabit: (id) =>
                set((state) => ({
                    habits: state.habits.filter((habit) => habit.id !== id),
                })),

            toggleHabitProgress: (id, date) =>
                set((state) => ({
                    habits: state.habits.map((habit) =>
                        habit.id === id
                            ? {
                                ...habit,
                                progress: {
                                    ...habit.progress,
                                    [date]: !habit.progress[date],
                                },
                            }
                            : habit
                    ),
                })),
        }),
        { name: 'habit-storage' }
    )
);
