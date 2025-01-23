import React, { useState } from 'react';
import { Paper, Typography, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import classNames from 'classnames';
import {useTranslation} from "react-i18next";
import { Habit } from '@/types/Habit';
import { useHabitStore } from '@/store/useHabitStore';
import { generateDateRange, getDayOfMonth, today } from '@/utils/date';

interface HabitCalendarProps { // Describes the structure of an object
    habit: Habit;
}

const HabitCalendar: React.FC<HabitCalendarProps> = (props) => {
    const [message, setMessage] = useState(false);
    const toggleHabitProgress = useHabitStore((state) => state.toggleHabitProgress);
    const { t } = useTranslation();
    const dateRangeOptions = {
        start: props.habit.startDate,
        end: props.habit.endDate,
        frequency: props.habit.frequency
    };
    const dateRange = generateDateRange(dateRangeOptions);
    const cssPaper = {
        padding: 1,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '4px',
        '&:hover': {
            boxShadow: 3,
        }
    }
    const handleDateClick = (date: string) => {
        if (date > today) {
            // Not allow to click on the future date
            setMessage(true);
            setTimeout(() => setMessage(false), 2000);
            return;
        }
         toggleHabitProgress(props.habit.id, date);
    };

    return (
        <Grid container spacing={1} sx={{ mt: 2 }}>
            {dateRange.map((date) => {
                return (
                    <Grid size={{ xs: 2, md: 1 }} key={`habit-${props.habit.id}-${date}`}>
                        <Paper
                            onClick={() => handleDateClick(date)}
                            sx={cssPaper}
                            className={classNames('calendar-day', {
                                completed: props.habit.progress[date],
                                missed: date < today && !props.habit.progress[date],
                            })}>
                            <Typography variant="body2">{getDayOfMonth(date)}</Typography>
                        </Paper>
                    </Grid>
                );
            })}

            {message && (
                <Grid size={{ xs: 12 }}>
                    <Alert severity="warning" sx={{ mt: 2, textAlign: 'center' }}>
                        🚫 {t("noFutureDates")}
                    </Alert>
                </Grid>
            )}
        </Grid>
    );
};

export default HabitCalendar;
