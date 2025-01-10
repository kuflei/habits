import React, { useState } from 'react';
import { Habit } from '../../types/Habit';
import { useHabitStore } from '../../store/useHabitStore';
import { generateDateRange, today } from '../../utils/date';
import classNames from 'classnames';

interface HabitCalendarProps { // Describes the structure of an object
    habit: Habit;
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({ habit }) => {
    const [message, setMessage] = useState(false);
    const toggleHabitProgress = useHabitStore((state) => state.toggleHabitProgress);

    const dateRange = generateDateRange(habit.startDate, habit.endDate, habit.frequency);

    const handleDateClick = (date: string) => {
        if (date > today) {
            // Not allow to click on the future date
            setMessage(true);
            setTimeout(() => setMessage(false), 2000);
            return;
        }

         toggleHabitProgress(habit.id, date);
    };

    return (
        <div className="calendar">
            {dateRange.map((date) => (
                <div
                    key={date}
                    className={classNames('calendar-day', {
                        completed: habit.progress[date],
                        missed: date < today && !habit.progress[date],
                    })}
                    onClick={() => handleDateClick(date)}>
                    {new Date(date).getDate()}
                </div>
            ))}

            {message && (
                <p className="future-date-message">🚫 Не можна клікати на майбутні дати!</p>
            )}
        </div>
    );
};

export default HabitCalendar;
