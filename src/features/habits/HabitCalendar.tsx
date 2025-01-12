import React, { useState } from 'react';
import { Habit } from '../../types/Habit';
import { useHabitStore } from '../../store/useHabitStore';
import { generateCalendarTiles, today } from '../../utils/date';
import classNames from 'classnames';
import { Paper, Typography, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {useTranslation} from "react-i18next";

interface HabitCalendarProps { // Describes the structure of an object
    habit: Habit;
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({ habit }) => {
    const [message, setMessage] = useState(false);
    const toggleHabitProgress = useHabitStore((state) => state.toggleHabitProgress);
    const { t } = useTranslation();
    const dateRange = generateCalendarTiles(habit.startDate, habit.endDate, habit.frequency);

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
        <Grid container spacing={1} sx={{ mt: 2 }}>
            {dateRange.map((date) => {
                return (
                    <Grid size={{ xs: 2, md: 1 }} key={date}>
                        <Paper
                            onClick={() => handleDateClick(date)}
                            sx={{
                                padding: 1,
                                textAlign: 'center',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                '&:hover': {
                                    boxShadow: 3,
                                },
                            }}
                            className={classNames('calendar-day', {
                                completed: habit.progress[date],
                                missed: date < today && !habit.progress[date],
                            })}
                        >
                            <Typography variant="body2">{new Date(date).getDate()}</Typography>
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
