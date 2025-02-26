import React, { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Habit } from "@/types/Habit";
import { useHabitStore } from "@/store/useHabitStore";
import HabitCalendar from "@/features/habits/HabitCalendar";
import HabitForm from "@/features/habits/HabitForm";
import { useAuthStore } from "@/store/authStore";
import { getHabitDateRange } from "@/utils/habitDateRange";
import {useDeleteHabit} from "@/features/habits/hooks/useHabits.ts";

interface HabitItemProps {
  habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const deleteHabit = useDeleteHabit();
  const { progress } = props.habit;
  const userId = useAuthStore((state) => state.userId);
  const { t } = useTranslation();
  const dateRange = useMemo(() => getHabitDateRange(props.habit), [props.habit]);

  // Checking if habit done
  const isHabitCompleted = dateRange.every((date) => progress[date]);

  return (
    <div>
      <Card
        sx={{
          mb: 3,
          p: 2,
          backgroundColor: isHabitCompleted ? "#eeeeee" : "#fff",
        }}
      >
        <CardHeader
          title={props.habit.name}
          subheader={`🎯` + t("frequency") + ` ${props.habit.frequency}`}
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
            <Box className="congratulations-message">
              <Typography variant="h6" color="primary">
                🎉 {t("congratulations")} <strong>{props.habit.reward}</strong>
              </Typography>
            </Box>
          )}
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            {!isHabitCompleted && (
              <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                {t("edit")}
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteHabit.mutate([props.habit.id, userId])}
            >
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
