import React, { useState } from 'react';
import { Habit } from '../types/Habit';
import { useHabitStore } from '../store/useHabitStore';
import HabitCalendar from '../features/habits/HabitCalendar';
import Modal from '../components/Modal';
import HabitForm from '../features/habits/HabitForm';
import {Button} from "@mui/material";
import {generateDateRange} from "../utils/date.ts";

interface HabitItemProps {
    habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const deleteHabit = useHabitStore((state) => state.deleteHabit);
    const { progress, startDate, endDate, reward } = habit;

    const dateRange = generateDateRange(startDate, endDate);
    // Checking if habit done
    const isHabitCompleted = dateRange.every((date) => progress[date]);
    return (
        <div className="habit-card">
            <div className="habit-header">
                <h3>{habit.name}</h3>
                <p>🎯 Періодичність: кожні {habit.frequency} днів</p>
                <p>📅 Період: {habit.startDate} - {habit.endDate}</p>
                {habit.reward && <p>🏆 Винагорода: {habit.reward}</p>}
            </div>
            <HabitCalendar habit={habit} />

            {isHabitCompleted && (
                <div className="reward-message">
                    🎉 Вітаємо! Ви досягли своєї звички! Ваша винагорода: <strong>{reward}</strong>
                </div>
            )}
            <div className="habit-actions">
                {!isHabitCompleted && (<Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>Редагувати</Button>)}
                <Button variant="contained" color="secondary" onClick={() => deleteHabit(habit.id)}>Видалити</Button>
            </div>

            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <HabitForm habit={habit} onClose={() => setIsEditing(false)} />
            </Modal>
        </div>
    );
};

export default HabitItem;
