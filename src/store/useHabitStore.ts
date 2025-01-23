import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types/Habit';


interface HabitStore {
    habits: Habit[];
    addHabit: (habit: Habit) => void;
    updateHabit: (updatedHabit: Habit) => void;
    deleteHabit: (id: string) => void;
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
                console.log('Fetching habits for userId:', userId);
                if (!userId) {
                    console.error('No userId provided to fetchHabits');
                    set({ habits: [] });
                    return;
                }
                try {
                    const response = await fetch(`/api/habits?userId=${userId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch habits');
                    }
                    const habits = await response.json();
                    console.log('Fetched habits:', habits);
                    set({ habits });
                } catch (error) {
                    console.error('Error fetching habits:', error);
                    set({ habits: [] });
                }
            },
            addHabit: async (habit, userId) => {
                try {
                    const response = await fetch('/api/habits', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId, habit }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to add habit');
                    }

                    const newHabit = await response.json();
                    set((state) => ({
                        habits: [...state.habits, newHabit],
                    }));
                } catch (error) {
                    console.error('Error adding habit:', error);
                }
            },



            updateHabit: async (updatedHabit, userId) => {
                try {
                    const response = await fetch(`/api/habits/${updatedHabit.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId, habit: updatedHabit }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to update habit');
                    }

                    const updated = await response.json();
                    set((state) => ({
                        habits: state.habits.map((habit) =>
                            habit.id === updated.id ? updated : habit
                        ),
                    }));
                } catch (error) {
                    console.error('Error updating habit:', error);
                }
            },


            deleteHabit: async (id, userId) => {
                try {
                    const response = await fetch(`/api/habits/${id}?userId=${userId}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete habit');
                    }

                    set((state) => ({
                        habits: state.habits.filter((habit) => habit.id !== id),
                    }));
                } catch (error) {
                    console.error('Error deleting habit:', error);
                }
            },


            toggleHabitProgress: async (id, date) => {
                set((state) => {
                    const habit = state.habits.find((h) => h.id === id);

                    if (!habit) {
                        console.error('Habit not found for ID:', id);
                        return state;
                    }

                    const updatedProgress = {
                        ...habit.progress,
                        [date]: !habit.progress[date],
                    };

                    // Оновлюємо локальний стан
                    return {
                        habits: state.habits.map((h) =>
                            h.id === id ? { ...h, progress: updatedProgress } : h
                        ),
                    };
                });

                try {
                    const habit = get().habits.find((h) => h.id === id);

                    if (!habit) {
                        throw new Error('Habit not found after update');
                    }

                    // Надсилаємо PATCH запит до сервера
                    const response = await fetch(`/api/habits/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ habit }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to update habit progress on server');
                    }

                    console.log('Habit progress updated successfully');
                } catch (error) {
                    console.error('Error toggling habit progress:', error.message);
                }
            },


        }),
        { name: 'habit-storage' }
    )
);
