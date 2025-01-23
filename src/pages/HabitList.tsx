import React from 'react';
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import { useHabitStore } from '@/store/useHabitStore';
import HabitItem from '@/pages/HabitItem';
import {useAuthStore} from "@/store/authStore.ts";

const HabitList = () => {
    const userId = useAuthStore((state) => state.userId);
    const habits = useHabitStore((state) => state.habits);
    const fetchHabits = useHabitStore((state) => state.fetchHabits);
    const { t } = useTranslation();

    useEffect(() => {
        if (userId) {
            console.log('Fetching habits for userId:', userId);
            fetchHabits(userId);
        } else {
            console.error('No userId provided');
        }
    }, [userId, fetchHabits]);

    if (!Array.isArray(habits)) {
        return <p>No habits available.</p>;
    }

    return (
        <div className="habit-list">
            <h1>{t('allHabits')}</h1>
            {habits.map((habit) => (
                <HabitItem key={habit.id} habit={habit}/>
            ))}
        </div>
    );
};

export default HabitList;
