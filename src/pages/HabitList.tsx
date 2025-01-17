import React from 'react';
import {useTranslation} from "react-i18next";
import { useHabitStore } from '@/store/useHabitStore';
import HabitItem from '@/pages/HabitItem';

const HabitList: React.FC = () => {
    const habits = useHabitStore((state) => state.habits);
    const { t } = useTranslation();

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
