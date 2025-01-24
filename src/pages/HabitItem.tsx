import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Button, Box, Dialog, DialogContent, DialogActions } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Habit } from '@/types/Habit';
import { useHabitStore } from '@/store/useHabitStore';
import HabitCalendar from '@/features/habits/HabitCalendar';
import HabitForm from '@/features/habits/HabitForm';
import {generateDateRange} from "@/utils/date";

interface HabitItemProps {
    habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const deleteHabit = useHabitStore((state) => state.deleteHabit);
    const { progress, startDate, endDate, reward } = props.habit;
    const { t } = useTranslation();
    const dateRangeOptions = {
        start: startDate,
        end: endDate,
    };
    const cssBox = {mt: 2, p: 2, backgroundColor: '#e7f5e7', borderRadius: 1, border: '1px solid #4caf50', color: '#2e7d32'}
    const dateRange = generateDateRange(dateRangeOptions);

    // Checking if habit done
    const isHabitCompleted = dateRange.every((date) => progress[date]);
    return (
        <div>
            <Card sx={{ mb: 3, p: 2, backgroundColor: isHabitCompleted ? '#eeeeee' : '#fff' }}>
                <CardHeader
                    title={props.habit.name}
                    /*TODO: Періодичність: кожні {{frequency}} днів*/
                    subheader={`🎯`+ t("frequency") +` ${props.habit.frequency}`}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        📅 {t("period")} {props.habit.startDate} - {props.habit.endDate}
                    </Typography>

                    {props.habit.reward && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            🏆 {t("reward")} {props.habit.reward}
                        </Typography>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <HabitCalendar habit={props.habit} />
                    </Box>
                    {isHabitCompleted && (
                        <Box sx={cssBox}>
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
                        <Button variant="contained" color="secondary" onClick={() => deleteHabit(props.habit.id)}>
                            {t("delete")}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
                <DialogContent>
                    <HabitForm habit={props.habit} onClose={() => setIsEditing(false)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditing(false)} color="primary">
                        {t("close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default HabitItem;
