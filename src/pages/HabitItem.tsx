import React, { useState } from 'react';
import { Habit } from '../types/Habit';
import { useHabitStore } from '../store/useHabitStore';
import HabitCalendar from '../features/habits/HabitCalendar';
import Modal from '../components/Modal';
import HabitForm from '../features/habits/HabitForm';
import {generateDateRange} from "../utils/date";
import { Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface HabitItemProps {
    habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const deleteHabit = useHabitStore((state) => state.deleteHabit);
    const { progress, startDate, endDate, reward } = habit;
    const { t } = useTranslation();
    const dateRange = generateDateRange(startDate, endDate);

    // Checking if habit done
    const isHabitCompleted = dateRange.every((date) => progress[date]);
    return (
        <div>
            <Card sx={{ mb: 3, p: 2, backgroundColor: isHabitCompleted ? '#eeeeee' : '#fff' }}>
                <CardHeader
                    title={habit.name}
                    /*TODO: Періодичність: кожні {{frequency}} днів*/
                    subheader={`🎯`+ t("frequency") +` ${habit.frequency}`}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        📅 {t("period")} {habit.startDate} - {habit.endDate}
                    </Typography>

                    {habit.reward && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            🏆 {t("reward")} {habit.reward}
                        </Typography>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <HabitCalendar habit={habit} />
                    </Box>
                    {isHabitCompleted && (
                        <Box sx={{mt: 2, p: 2, backgroundColor: '#e7f5e7', borderRadius: 1, border: '1px solid #4caf50', color: '#2e7d32'}}>
                            <Typography variant="h6" color="primary">
                                🎉 {t("congratulations")} <strong>{reward}</strong>
                            </Typography>
                        </Box>
                    )}
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        {!isHabitCompleted && (
                            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                                {t("edit")}
                            </Button>
                        )}
                        <Button variant="contained" color="secondary" onClick={() => deleteHabit(habit.id)}>
                            {t("delete")}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <HabitForm habit={habit} onClose={() => setIsEditing(false)} />
            </Modal>
        </div>
    );
};

export default HabitItem;
