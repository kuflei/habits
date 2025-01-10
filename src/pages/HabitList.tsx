import React from 'react';
import { useHabitStore } from '../store/useHabitStore';
import HabitItem from './HabitItem';

const HabitList: React.FC = () => {
    const habits = useHabitStore((state) => state.habits);

    return (
        <div className="habit-list">
            {habits.map((habit) => (
                <HabitItem key={habit.id} habit={habit} />
            ))}
        </div>
    );
};

export default HabitList;
