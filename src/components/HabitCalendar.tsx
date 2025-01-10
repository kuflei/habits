import React, { useState } from 'react';
import { Habit } from '../types/Habit';
import { useHabitStore } from '../store/useHabitStore';

interface HabitCalendarProps { // Describes the structure of an object
    habit: Habit;
}
/*TODO: move to utils folder*/
const generateDateRange = (startDate: string, endDate: string, frequency: number) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + frequency)) {
        dates.push(new Date(d).toISOString().split('T')[0]);
    }

    return dates;
};

const HabitCalendar: React.FC<HabitCalendarProps> = ({ habit }) => {
    const [showFutureDateMessage, setShowFutureDateMessage] = useState(false);
    const toggleHabitProgress = useHabitStore((state) => state.toggleHabitProgress);

    const dateRange = generateDateRange(habit.startDate, habit.endDate, habit.frequency);
    /*TODO: move to utils folder*/
    const today = new Date().toISOString().split('T')[0];

    const handleDateClick = (date: string) => {
        if (date > today) {
            // Not allow to click on the future date
            setShowFutureDateMessage(true);
            setTimeout(() => setShowFutureDateMessage(false), 2000);
            return;
        }

        // Allowed to change color
       /* TODO: ???*/
        if (date < today && !habit.progress[date]) {
            toggleHabitProgress(habit.id, date);
        } else {
            toggleHabitProgress(habit.id, date);
        }
    };

    return (
        <div className="calendar">
            {dateRange.map((date) => (
                <div
                    key={date}
                    /*TODO: library className*/
                    className={`calendar-day ${habit.progress[date] ? 'completed' : ''} ${
                        date < today && !habit.progress[date] ? 'missed' : ''
                    }`}
                    onClick={() => handleDateClick(date)}
                >
                    {new Date(date).getDate()}
                </div>
            ))}

            {showFutureDateMessage && (
                <p className="future-date-message">🚫 Не можна клікати на майбутні дати!</p>
            )}
        </div>
    );
};

export default HabitCalendar;
