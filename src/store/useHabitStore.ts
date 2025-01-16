import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types/Habit';

const rewards = [
    { id: 1, name: 'New Book' },
    { id: 2, name: 'Movie Ticket' },
    { id: 3, name: 'Spa Day' },
    { id: 4, name: 'Fancy Dinner' },
];

interface HabitStore {
    habits: Habit[];
    addHabit: (habit: Habit) => void;
    updateHabit: (updatedHabit: Habit) => void;
    deleteHabit: (id: string) => void;
    toggleHabitProgress: (id: string, date: string) => void;
    rewardsList: { id: number; name: string }[];
    initializeRewards: () => void;
}
// set function to update state
// state current state
// we get current state and return new obj
export const useHabitStore = create(
    persist<HabitStore>(
        (set) => ({
            habits: [],
            rewardsList: [],
            initializeRewards: () => set({ rewardsList: rewards }),

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
