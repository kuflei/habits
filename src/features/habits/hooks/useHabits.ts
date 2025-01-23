import { useEffect } from 'react';
import { useHabitStore } from '@/store/useHabitStore';

export const useHabits = (userId: string | null) => {
    const habits = useHabitStore((state) => state.habits);
    const fetchHabits = useHabitStore((state) => state.fetchHabits);

    useEffect(() => {
        if (userId) {
            fetchHabits(userId);
        } else {
            console.error('No userId provided');
        }
    }, [userId, fetchHabits]);

    return habits;
};
